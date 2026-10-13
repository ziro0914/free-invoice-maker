"""Render 1000x1500 Pinterest pin images with headless Chrome.

Usage: python3 marketing/pins/make_pins.py
Output: marketing/pins/out/<slug>.png
"""
import html
import json
import pathlib
import subprocess

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = pathlib.Path(__file__).resolve().parent / "out"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

PROFESSIONS = {p["slug"]: p for p in json.load(open(ROOT / "data/professions.json"))}

PINS = [
    {"slug": "photographer", "headline": "Photography Invoice Template", "accent": "#7c3aed"},
    {"slug": "contractor", "headline": "Contractor Invoice Template", "accent": "#ea580c"},
    {"slug": "graphic-designer", "headline": "Graphic Designer Invoice Template", "accent": "#db2777"},
    {"slug": "tutor", "headline": "Tutoring Invoice Template", "accent": "#0891b2"},
    {"slug": "checklist", "headline": "What to Include on an Invoice", "accent": "#16a34a"},
]

CHECKLIST = [
    "Your name or business name",
    "Client name and address",
    "Unique invoice number",
    "Invoice date and due date",
    "Itemized services with rates",
    "Subtotal, tax and total due",
    "Payment terms (e.g. Net 14)",
    "How to pay you",
]

CSS = """
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1000px;height:1500px;overflow:hidden}
body{font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;background:var(--a);color:#111;
 display:flex;flex-direction:column;padding:70px 70px 60px}
.badge{align-self:flex-start;background:#fff;color:var(--a);font-weight:800;font-size:30px;
 padding:14px 28px;border-radius:999px;letter-spacing:.5px}
h1{color:#fff;font-size:84px;line-height:1.02;font-weight:900;margin:36px 0 18px;letter-spacing:-1.5px}
.sub{color:rgba(255,255,255,.92);font-size:34px;font-weight:600;margin-bottom:44px}
.card{background:#fff;border-radius:28px;padding:48px 50px;box-shadow:0 30px 60px rgba(0,0,0,.25);flex:1;
 display:flex;flex-direction:column}
.top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:34px}
.logo{width:84px;height:84px;border-radius:18px;background:var(--a);opacity:.9}
.inv{text-align:right}.inv b{font-size:46px;letter-spacing:2px;color:#111}
.inv div{font-size:22px;color:#666;margin-top:6px}
table{width:100%;border-collapse:collapse;font-size:24px}
th{text-align:left;color:#888;font-weight:700;font-size:19px;text-transform:uppercase;letter-spacing:1px;
 border-bottom:3px solid #eee;padding:0 0 14px}
th.r,td.r{text-align:right}
td{padding:20px 0;border-bottom:2px solid #f2f2f2;vertical-align:top}
td.d{padding-right:20px;line-height:1.3}
.terms{margin-top:34px;font-size:23px;line-height:1.45;color:#555}.terms b{display:block;color:#888;font-size:19px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.tot{margin-top:auto;display:flex;justify-content:space-between;align-items:center;background:#f6f6f6;
 border-radius:16px;padding:26px 30px;font-size:30px;font-weight:800}
.tot span:last-child{color:var(--a);font-size:44px}
ul{list-style:none;font-size:34px;line-height:1.25}
li{display:flex;gap:22px;align-items:flex-start;padding:25px 0;border-bottom:2px solid #f2f2f2}
li:before{content:"✓";flex:none;width:46px;height:46px;border-radius:50%;background:var(--a);color:#fff;
 font-weight:900;font-size:28px;display:flex;align-items:center;justify-content:center}
.foot{color:#fff;text-align:center;font-size:30px;font-weight:700;margin-top:40px}
"""


def money(n):
    return f"${n:,.2f}" if n % 1 else f"${n:,.0f}"


def card_invoice(p):
    rows, total = [], 0
    for it in p["items"]:
        amt = it["qty"] * it["rate"]
        total += amt
        rows.append(
            f'<tr><td class="d">{html.escape(it["desc"])}</td><td class="r">{it["qty"]:g}</td>'
            f'<td class="r">{money(amt)}</td></tr>'
        )
    return (
        '<div class="card"><div class="top"><div class="logo"></div>'
        '<div class="inv"><b>INVOICE</b><div>#0042 · Due in 14 days</div></div></div>'
        '<table><tr><th>Description</th><th class="r">Qty</th><th class="r">Amount</th></tr>'
        + "".join(rows)
        + f'</table><div class="terms"><b>Payment terms</b>{html.escape(p["payment_terms"])}</div><div class="tot"><span>Total due</span><span>{money(total)}</span></div></div>'
    )


def card_checklist():
    return '<div class="card"><ul>' + "".join(f"<li>{html.escape(x)}</li>" for x in CHECKLIST) + "</ul></div>"


def render(pin):
    if pin["slug"] == "checklist":
        sub, card = "A simple checklist for freelancers", card_checklist()
    else:
        sub, card = "Editable · Download as PDF", card_invoice(PROFESSIONS[pin["slug"]])
    page = (
        f'<!doctype html><meta charset="utf-8"><style>:root{{--a:{pin["accent"]}}}{CSS}</style>'
        f'<div class="badge">FREE · NO SIGNUP · NO WATERMARK</div>'
        f'<h1>{html.escape(pin["headline"])}</h1><div class="sub">{sub}</div>{card}'
        f'<div class="foot">Free Invoice Maker</div>'
    )
    src = OUT / f"{pin['slug']}.html"
    src.write_text(page)
    png = OUT / f"{pin['slug']}.png"
    subprocess.run(
        [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
         "--window-size=1000,1500", f"--screenshot={png}", src.as_uri()],
        check=True, capture_output=True,
    )
    src.unlink()
    print(png)


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    for pin in PINS:
        render(pin)
