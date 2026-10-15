"""Render 1000x1500 Pinterest pins for the free /tools/ calculators.
Usage: python3 marketing/pins/make_tool_pins.py  (screenshots the live pages, then renders pins into out/)"""
import html, pathlib, subprocess

OUT = pathlib.Path(__file__).resolve().parent / "out"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SITE = "https://sendinvoicefree.com/tools/"
PINS = [
    {"id": "tool-etsy", "slug": "etsy-fee-calculator", "c": "#A04000", "h": "Free Etsy Fee Calculator",
     "sub": "How much does Etsy take from your sale?", "b": ["Every fee, line by line", "Your real profit & margin", "The price you need"]},
    {"id": "tool-rate", "slug": "freelance-hourly-rate-calculator", "c": "#0B5345", "h": "What Should I Charge per Hour?",
     "sub": "Free freelance hourly rate calculator", "b": ["Covers tax, costs & time off", "Hourly, day & monthly rate", "No sign-up"]},
    {"id": "tool-reorder", "slug": "reorder-point-calculator", "c": "#0E6251", "h": "When Should I Reorder Stock?",
     "sub": "Free reorder point calculator for small shops", "b": ["Reorder point in units", "How much to order", "No sign-up"]},
]
CSS = """*{box-sizing:border-box;margin:0}html,body{width:1000px;height:1500px;overflow:hidden}
body{font-family:-apple-system,Helvetica,Arial,sans-serif;background:var(--c);color:#fff;padding:70px;display:flex;flex-direction:column}
.badge{align-self:flex-start;background:#FFD54F;color:#1F2D3D;font-weight:800;font-size:28px;padding:12px 26px;border-radius:99px}
h1{font-size:84px;line-height:1.03;font-weight:900;margin:32px 0 16px;letter-spacing:-1.5px}
.sub{font-size:36px;font-weight:600;opacity:.92;margin-bottom:36px}
.shot{flex:1;border-radius:24px;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,.35);background:#17181c}
.shot img{width:100%;height:100%;object-fit:cover;object-position:top left}
ul{list-style:none;font-size:36px;font-weight:700;line-height:1.6;margin-top:34px}li:before{content:"✓  ";color:#FFD54F}
.foot{text-align:center;font-size:30px;font-weight:800;margin-top:20px}"""

OUT.mkdir(exist_ok=True)
for p in PINS:
    shot = OUT / f"{p['id']}-shot.png"
    subprocess.run([CHROME, "--headless=new", "--hide-scrollbars", "--force-device-scale-factor=1", "--window-size=1180,1000", "--virtual-time-budget=4000",
                    f"--screenshot={shot}", SITE + p["slug"] + "/"], check=True, capture_output=True)
    src = OUT / f"{p['id']}.html"
    src.write_text(f'<!doctype html><meta charset="utf-8"><style>:root{{--c:{p["c"]}}}{CSS}</style>'
                   f'<div class="badge">FREE CALCULATOR</div><h1>{html.escape(p["h"])}</h1><div class="sub">{html.escape(p["sub"])}</div>'
                   f'<div class="shot"><img src="{shot.name}"></div>'
                   f'<ul>{"".join(f"<li>{html.escape(x)}</li>" for x in p["b"])}</ul><div class="foot">sendinvoicefree.com</div>')
    subprocess.run([CHROME, "--headless=new", "--hide-scrollbars", "--force-device-scale-factor=1", "--window-size=1000,1500",
                    f"--screenshot={OUT / (p['id'] + '.png')}", src.as_uri()], check=True, capture_output=True)
    print(OUT / f"{p['id']}.png")
