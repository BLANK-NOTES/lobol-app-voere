# LOBOL – Fabriek & Boerdery App

A self-contained web app (HTML/CSS/JavaScript, no build step) for managing a
feed factory and farm: products, factory stock, truck loading & comparison,
sales, customers, deliveries, duties, reminders, notes, a feed calculator,
cattle guides, health records and more. It runs **entirely in your browser**
and stores everything **on your device** — no server, no account needed.

It is also a **PWA (Progressive Web App)**, so you can install it on your
iPhone home screen, use it offline, and have it update itself over wifi.

---

## 1) Put it on GitHub

You need a free GitHub account (github.com). Pick whichever method suits you.

### Easiest: upload through the website (use a computer for this first step)
1. Go to **github.com → New repository**.
   - Name it e.g. `lobol-app`. Set it to **Public** (required for free GitHub Pages). Click **Create repository**.
2. On the new repo page click **“uploading an existing file”**.
3. Unzip the download, then **drag the *contents*** of the `lobol` folder
   (all the `.html`, `.css`, `.js` files **and** the `icons` folder) into the page.
   - Tip: dragging the whole `icons` folder keeps the icons in their subfolder.
4. Click **Commit changes**.

### Or with Git (terminal)
```bash
cd lobol
git init
git add .
git commit -m "LOBOL app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/lobol-app.git
git push -u origin main
```

### On iPhone only (no computer)
Install the free **Working Copy** app, create/clone the repo there, copy the
files in (Files app → unzip → move into the Working Copy repo), commit and push.

---

## 2) Turn on GitHub Pages (this gives you the app’s web address)

1. In your repo: **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/(root)** → **Save**.
4. Wait ~1 minute, then refresh. Pages shows your live URL, like:
   `https://YOUR-USERNAME.github.io/lobol-app/`

---

## 3) Install it on your iPhone

1. Open the GitHub Pages URL in **Safari** (it must be Safari for install to work).
2. Tap the **Share** button → **Add to Home Screen** → **Add**.
3. You now have a **LOBOL** icon. Opening it runs full-screen like a normal app,
   and it works even with no signal (offline).

---

## 4) Live updates over wifi

When you change a file in the repo (edit on github.com, or push from Git /
Working Copy), the installed app **updates itself the next time it opens with
internet** — no reinstalling. A built-in service worker fetches the fresh files
and reloads once to apply them. With no internet, the last cached version runs.

> If you ever want to force every device to grab a clean copy of all files,
> bump the version string in `service-worker.js` (`lobol-cache-v1` → `v2`).

---

## 5) Saving your data so you don’t lose anything

- **Automatic:** every product, sale, truck count, note, etc. is saved in your
  browser’s storage on that device. Closing the app or updating it does **not**
  erase it. The app also asks the browser to keep this data “persistent”.
- **Manual backup / share (recommended regularly):**
  open the **“Uitvoer & Rugsteun”** page in the app.
  - **Stoor Rugsteun** downloads a single `.json` file with *everything*. Save it
    to Files / iCloud, AirDrop it, or email it to yourself.
  - **Kies Lêer** restores from that `.json` (e.g. on a new phone).
  - You can also export individual sections to CSV (opens in Excel / Google Sheets).

> Two practical notes for iPhone:
> 1. Data is **per-device and per-browser**. To move to a new phone, use the
>    JSON backup above.
> 2. iOS can clear website data if you go a very long time without opening the
>    app. Adding it to the Home Screen and taking an occasional JSON backup
>    keeps you safe.

---

## Project structure

`index.html` loads small feature modules, each with its own file:

| Area | File |
|---|---|
| App shell / page markup | `index.html` |
| Data layer & defaults | `data.js` |
| Navigation / routing / theme / modals | `nav.js` |
| Weather widget | `weather.js`, `weather.css` |
| Dashboard | `dashboard.js` |
| Products / Stock / Trucks / Sales / … | `products.js`, `stock.js`, `trucks.js`, `sales.js`, … |
| Styles | `base.css`, `extra.css`, `style.css`, `inligting.css`, `trucks.css`, `mobile.css` |
| PWA | `manifest.webmanifest`, `service-worker.js`, `icons/` |

**Legacy / unused:** `app.js` and `Dieregesond.JS` are the old single-file
version kept for reference; nothing loads them and they can be deleted safely.

---

Built to run anywhere a static file host will serve it. No backend, no tracking.
