"""Render 1000x1500 text pins for guides. Bullets must come from the guide's own headings.
Usage: python3 marketing/pins/make_guide_pins.py -> out/guide-<slug>.png"""
import html, pathlib, subprocess

OUT = pathlib.Path(__file__).resolve().parent / "out"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PINS = [
    {"slug": "late-payment-email-templates", "c": "#B91C1C", "kicker": "5 COPY-PASTE EMAILS",
     "h": "Client Hasn't Paid? Send These", "b": ["Friendly reminder before the due date", "Gentle nudge: 1 day late", "Firm follow-up: 7 days late",
                                                   "Escalation: 14 to 21 days late", "Final notice: 30+ days late"]},
    {"slug": "invoice-payment-terms", "c": "#1D4ED8", "kicker": "INVOICE PAYMENT TERMS",
     "h": "Net 30, Due on Receipt & More, Explained", "b": ["Due on receipt", "Net 7, Net 14 and Net 30", "End of month (EOM) terms",
                                                             "Early payment discount: 2/10 Net 30", "Copy-paste payment terms block"]},
    {"slug": "proforma-invoice", "c": "#6D28D9", "kicker": "INVOICING BASICS",
     "h": "What Is a Proforma Invoice?", "b": ["Proforma vs commercial invoice", "Proforma vs quote (estimate)", "When you actually need one",
                                                "What to include on it", "Common mistakes to avoid"]},
]
CSS = """*{box-sizing:border-box;margin:0}html,body{width:1000px;height:1500px;overflow:hidden}
body{font-family:-apple-system,Helvetica,Arial,sans-serif;background:var(--c);color:#fff;padding:80px 75px;display:flex;flex-direction:column}
.k{align-self:flex-start;background:#FFD54F;color:#1F2D3D;font-weight:800;font-size:30px;padding:12px 28px;border-radius:99px}
h1{font-size:92px;line-height:1.02;font-weight:900;margin:40px 0 50px;letter-spacing:-2px}
.card{background:#fff;color:#111;border-radius:28px;padding:50px 54px;flex:1;display:flex;flex-direction:column;justify-content:center;box-shadow:0 30px 60px rgba(0,0,0,.3)}
.card div{font-size:42px;font-weight:700;line-height:1.25;padding:22px 0;border-bottom:2px solid #eee;display:flex;gap:22px}
.card div:last-child{border:0}.card span{color:var(--c);font-weight:900;min-width:52px}
.foot{text-align:center;font-size:34px;font-weight:800;margin-top:40px}"""
OUT.mkdir(exist_ok=True)
for p in PINS:
    src = OUT / f"guide-{p['slug']}.html"
    rows = "".join(f"<div><span>{i + 1}</span>{html.escape(x)}</div>" for i, x in enumerate(p["b"]))
    src.write_text(f'<!doctype html><meta charset="utf-8"><style>:root{{--c:{p["c"]}}}{CSS}</style><div class="k">{p["kicker"]}</div>'
                   f'<h1>{html.escape(p["h"])}</h1><div class="card">{rows}</div><div class="foot">Free guide · sendinvoicefree.com</div>')
    subprocess.run([CHROME, "--headless=new", "--hide-scrollbars", "--force-device-scale-factor=1", "--window-size=1000,1500",
                    f"--screenshot={OUT / ('guide-' + p['slug'] + '.png')}", src.as_uri()], check=True, capture_output=True)
    print(OUT / f"guide-{p['slug']}.png")
