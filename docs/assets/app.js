/* Free Invoice Maker — runs entirely in the browser. No data leaves the device. */
(function () {
  'use strict';

  var STORE_KEY = 'fim.v1';
  var CURRENCIES = {
    USD: '$', EUR: '€', GBP: '£', CAD: 'CA$', AUD: 'A$', NZD: 'NZ$', INR: '₹',
    JPY: '¥', SGD: 'S$', CHF: 'CHF ', ZAR: 'R', PHP: '₱', MXN: 'MX$', BRL: 'R$'
  };

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  function save(data) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) { /* private mode */ }
  }

  function today(offsetDays) {
    var d = new Date();
    d.setDate(d.getDate() + (offsetDays || 0));
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function money(n, cur) {
    var sym = CURRENCIES[cur] || '';
    var digits = cur === 'JPY' ? 0 : 2;
    var s = Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
    return (n < 0 ? '-' : '') + sym + s;
  }

  function num(v) { var n = parseFloat(v); return isFinite(n) ? n : 0; }

  var form = $('#invoice-form');
  if (!form) return;

  var prefill = window.FIM_PREFILL || {};
  var stored = load();
  var state = {
    business: stored.business || { name: '', email: '', address: '', phone: '' },
    client: { name: '', email: '', address: '' },
    number: stored.nextNumber || 'INV-0001',
    issued: today(0),
    due: today(14),
    currency: stored.currency || 'USD',
    taxRate: stored.taxRate != null ? stored.taxRate : 0,
    discount: 0,
    notes: prefill.payment_terms || stored.notes || 'Payment due within 14 days. Thank you for your business!',
    logo: stored.logo || '',
    items: (prefill.items && prefill.items.length ? prefill.items : [
      { desc: 'Service description', qty: 1, rate: 100 }
    ]).map(function (it) { return { desc: it.desc, qty: it.qty, rate: it.rate }; })
  };

  // ---------- bind simple fields ----------
  function bindField(name, get, set) {
    var el = form.elements[name];
    if (!el) return;
    el.value = get();
    el.addEventListener('input', function () { set(el.value); render(); });
  }
  bindField('biz_name', function () { return state.business.name; }, function (v) { state.business.name = v; });
  bindField('biz_email', function () { return state.business.email; }, function (v) { state.business.email = v; });
  bindField('biz_phone', function () { return state.business.phone; }, function (v) { state.business.phone = v; });
  bindField('biz_address', function () { return state.business.address; }, function (v) { state.business.address = v; });
  bindField('client_name', function () { return state.client.name; }, function (v) { state.client.name = v; });
  bindField('client_email', function () { return state.client.email; }, function (v) { state.client.email = v; });
  bindField('client_address', function () { return state.client.address; }, function (v) { state.client.address = v; });
  bindField('number', function () { return state.number; }, function (v) { state.number = v; });
  bindField('issued', function () { return state.issued; }, function (v) { state.issued = v; });
  bindField('due', function () { return state.due; }, function (v) { state.due = v; });
  bindField('tax', function () { return state.taxRate; }, function (v) { state.taxRate = num(v); });
  bindField('discount', function () { return state.discount; }, function (v) { state.discount = num(v); });
  bindField('notes', function () { return state.notes; }, function (v) { state.notes = v; });

  var curSel = form.elements.currency;
  Object.keys(CURRENCIES).forEach(function (c) {
    var o = document.createElement('option');
    o.value = c; o.textContent = c;
    curSel.appendChild(o);
  });
  curSel.value = state.currency;
  curSel.addEventListener('change', function () { state.currency = curSel.value; render(); });

  // ---------- logo ----------
  var logoInput = form.elements.logo;
  logoInput.addEventListener('change', function () {
    var f = logoInput.files && logoInput.files[0];
    if (!f) return;
    if (f.size > 500 * 1024) { alert('Please use a logo under 500 KB.'); logoInput.value = ''; return; }
    var r = new FileReader();
    r.onload = function () { state.logo = r.result; render(); };
    r.readAsDataURL(f);
  });
  $('#logo-clear').addEventListener('click', function () { state.logo = ''; logoInput.value = ''; render(); });

  // ---------- line items ----------
  var itemsBody = $('#items');
  function renderItems() {
    itemsBody.innerHTML = '';
    state.items.forEach(function (it, i) {
      var row = document.createElement('div');
      row.className = 'item-row';
      row.innerHTML =
        '<input aria-label="Description" class="desc" value="">' +
        '<input aria-label="Quantity" class="qty" type="number" step="any" min="0" value="">' +
        '<input aria-label="Rate" class="rate" type="number" step="any" min="0" value="">' +
        '<span class="amt"></span>' +
        '<button type="button" class="del" aria-label="Remove line">×</button>';
      $('.desc', row).value = it.desc;
      $('.qty', row).value = it.qty;
      $('.rate', row).value = it.rate;
      $('.desc', row).addEventListener('input', function (e) { it.desc = e.target.value; render(); });
      $('.qty', row).addEventListener('input', function (e) { it.qty = num(e.target.value); render(); });
      $('.rate', row).addEventListener('input', function (e) { it.rate = num(e.target.value); render(); });
      $('.del', row).addEventListener('click', function () { state.items.splice(i, 1); renderItems(); render(); });
      itemsBody.appendChild(row);
    });
  }
  $('#add-item').addEventListener('click', function () {
    state.items.push({ desc: '', qty: 1, rate: 0 });
    renderItems(); render();
    var last = $$('.item-row .desc', itemsBody).pop();
    if (last) last.focus();
  });

  function totals() {
    var subtotal = state.items.reduce(function (s, it) { return s + num(it.qty) * num(it.rate); }, 0);
    var discount = Math.min(state.discount, subtotal);
    var tax = (subtotal - discount) * state.taxRate / 100;
    return { subtotal: subtotal, discount: discount, tax: tax, total: subtotal - discount + tax };
  }

  // ---------- live preview ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function nl(s) { return esc(s).replace(/\n/g, '<br>'); }

  function render() {
    var t = totals();
    var cur = state.currency;
    $$('.item-row', itemsBody).forEach(function (row, i) {
      var it = state.items[i];
      $('.amt', row).textContent = money(num(it.qty) * num(it.rate), cur);
    });
    var p = $('#preview');
    p.innerHTML =
      '<div class="pv-head">' +
        '<div>' + (state.logo ? '<img class="pv-logo" alt="" src="' + state.logo + '">' : '') +
          '<div class="pv-biz"><strong>' + esc(state.business.name || 'Your Business') + '</strong><br>' +
          nl(state.business.address) + (state.business.email ? '<br>' + esc(state.business.email) : '') +
          (state.business.phone ? '<br>' + esc(state.business.phone) : '') + '</div></div>' +
        '<div class="pv-meta"><h2>INVOICE</h2>' +
          '<div># ' + esc(state.number) + '</div>' +
          '<div>Issued: ' + esc(state.issued) + '</div>' +
          '<div>Due: ' + esc(state.due) + '</div></div>' +
      '</div>' +
      '<div class="pv-bill"><span>Bill to</span><br><strong>' + esc(state.client.name || 'Client name') + '</strong><br>' +
        nl(state.client.address) + (state.client.email ? '<br>' + esc(state.client.email) : '') + '</div>' +
      '<table class="pv-table"><thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>' +
        state.items.map(function (it) {
          return '<tr><td>' + esc(it.desc) + '</td><td>' + num(it.qty) + '</td><td>' + money(num(it.rate), cur) +
            '</td><td>' + money(num(it.qty) * num(it.rate), cur) + '</td></tr>';
        }).join('') +
      '</tbody></table>' +
      '<div class="pv-totals">' +
        '<div><span>Subtotal</span><span>' + money(t.subtotal, cur) + '</span></div>' +
        (t.discount ? '<div><span>Discount</span><span>-' + money(t.discount, cur) + '</span></div>' : '') +
        (state.taxRate ? '<div><span>Tax (' + state.taxRate + '%)</span><span>' + money(t.tax, cur) + '</span></div>' : '') +
        '<div class="pv-total"><span>Total due</span><span>' + money(t.total, cur) + '</span></div>' +
      '</div>' +
      (state.notes ? '<div class="pv-notes"><span>Notes &amp; terms</span><br>' + nl(state.notes) + '</div>' : '');
    persist();
  }

  function persist() {
    var data = load();
    data.business = state.business;
    data.currency = state.currency;
    data.taxRate = state.taxRate;
    data.logo = state.logo;
    save(data);
  }

  function bumpNumber(n) {
    var m = String(n).match(/^(.*?)(\d+)$/);
    if (!m) return n;
    var next = String(parseInt(m[2], 10) + 1);
    while (next.length < m[2].length) next = '0' + next;
    return m[1] + next;
  }

  // ---------- PDF (jsPDF, drawn directly so text stays selectable) ----------
  function makePdf() {
    var jsPDF = window.jspdf && window.jspdf.jsPDF;
    if (!jsPDF) { window.print(); return; }
    var doc = new jsPDF({ unit: 'pt', format: 'letter' });
    var W = doc.internal.pageSize.getWidth();
    var H = doc.internal.pageSize.getHeight();
    var M = 48, y = M;
    var cur = state.currency;
    // jsPDF core fonts lack some currency glyphs; fall back to ISO code
    var pdfMoney = function (n) {
      var s = money(n, cur);
      return /[₹₱€£¥]/.test(s) ? s.replace(/[₹₱€£¥]/, '') + ' ' + cur : s;
    };

    if (state.logo) {
      try {
        var props = doc.getImageProperties(state.logo);
        var lh = 48, lw = Math.min(160, props.width * lh / props.height);
        doc.addImage(state.logo, M, y, lw, lh);
        y += lh + 10;
      } catch (e) { /* unsupported image */ }
    }
    doc.setFont('helvetica', 'bold'); doc.setFontSize(13);
    doc.text(state.business.name || 'Your Business', M, y + 4);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(80);
    var bizLines = [].concat(
      doc.splitTextToSize(state.business.address || '', 230),
      state.business.email ? [state.business.email] : [],
      state.business.phone ? [state.business.phone] : []
    );
    doc.text(bizLines, M, y + 20);

    doc.setTextColor(20); doc.setFont('helvetica', 'bold'); doc.setFontSize(24);
    doc.text('INVOICE', W - M, M + 10, { align: 'right' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(80);
    doc.text(['# ' + state.number, 'Issued: ' + state.issued, 'Due: ' + state.due], W - M, M + 30, { align: 'right' });

    y = Math.max(y + 24 + bizLines.length * 12, M + 90);
    doc.setFontSize(8.5); doc.setTextColor(130); doc.text('BILL TO', M, y);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(20);
    doc.text(state.client.name || 'Client name', M, y + 15);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(80);
    var cl = [].concat(doc.splitTextToSize(state.client.address || '', 260), state.client.email ? [state.client.email] : []);
    doc.text(cl, M, y + 29);
    y += 40 + cl.length * 12;

    var cx = { desc: M + 8, qty: W - M - 210, rate: W - M - 110, amt: W - M - 8 };
    doc.setFillColor(243, 244, 246); doc.rect(M, y, W - 2 * M, 22, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(60);
    doc.text('DESCRIPTION', cx.desc, y + 14);
    doc.text('QTY', cx.qty, y + 14, { align: 'right' });
    doc.text('RATE', cx.rate, y + 14, { align: 'right' });
    doc.text('AMOUNT', cx.amt, y + 14, { align: 'right' });
    y += 22;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(20);
    state.items.forEach(function (it) {
      var lines = doc.splitTextToSize(it.desc || '', cx.qty - cx.desc - 40);
      var rh = Math.max(24, lines.length * 12 + 12);
      if (y + rh > H - 140) { doc.addPage(); y = M; }
      doc.text(lines, cx.desc, y + 16);
      doc.text(String(num(it.qty)), cx.qty, y + 16, { align: 'right' });
      doc.text(pdfMoney(num(it.rate)), cx.rate, y + 16, { align: 'right' });
      doc.text(pdfMoney(num(it.qty) * num(it.rate)), cx.amt, y + 16, { align: 'right' });
      y += rh;
      doc.setDrawColor(229); doc.line(M, y, W - M, y);
    });

    var t = totals();
    y += 18;
    var row = function (label, val, bold) {
      doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.setFontSize(bold ? 12 : 10);
      doc.text(label, cx.rate - 40, y, { align: 'right' });
      doc.text(val, cx.amt, y, { align: 'right' });
      y += bold ? 20 : 16;
    };
    row('Subtotal', pdfMoney(t.subtotal));
    if (t.discount) row('Discount', '-' + pdfMoney(t.discount));
    if (state.taxRate) row('Tax (' + state.taxRate + '%)', pdfMoney(t.tax));
    row('Total due', pdfMoney(t.total), true);

    if (state.notes) {
      y += 14;
      if (y > H - 100) { doc.addPage(); y = M; }
      doc.setFontSize(8.5); doc.setTextColor(130); doc.setFont('helvetica', 'normal');
      doc.text('NOTES & TERMS', M, y);
      doc.setFontSize(9.5); doc.setTextColor(60);
      doc.text(doc.splitTextToSize(state.notes, W - 2 * M), M, y + 14);
    }
    doc.save((state.number || 'invoice').replace(/[^\w.-]+/g, '_') + '.pdf');

    var data = load();
    data.nextNumber = bumpNumber(state.number);
    save(data);
    if (window.gtag) window.gtag('event', 'download_pdf', { profession: prefill.slug || 'general' });
  }

  $('#download').addEventListener('click', makePdf);
  $('#print').addEventListener('click', function () { window.print(); });
  $('#reset').addEventListener('click', function () {
    if (!confirm('Clear this invoice (your business details are kept)?')) return;
    state.client = { name: '', email: '', address: '' };
    state.items = [{ desc: '', qty: 1, rate: 0 }];
    state.discount = 0;
    ['client_name', 'client_email', 'client_address', 'discount'].forEach(function (n) { form.elements[n].value = n === 'discount' ? 0 : ''; });
    renderItems(); render();
  });

  renderItems();
  render();
})();
