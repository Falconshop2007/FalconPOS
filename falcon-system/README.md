# Falcon System – POS, Stock, Invoices & Repairs

A complete shop-management web app for a computer & laptop business:
**POS with product pictures, A4 + 80 mm invoices, stock with serial numbers, repairs & warranty,
users with roles, support tickets, monthly income reports.**

It is plain HTML + CSS + JavaScript. **No build step, no server, no database to install.**
All data is stored in the browser (`localStorage`).

---

## 1. Run it on your computer (localhost)

You need nothing installed for option A. Options B–D need Python, Node.js or VS Code.

| Option | How |
|---|---|
| **A. Double-click** | Open the folder and double-click `index.html` |
| **B. Windows** | Double-click `start.bat` (needs Python) → opens http://localhost:8080 |
| **C. Mac / Linux** | `./start.sh` (needs Python 3) → http://localhost:8080 |
| **D. Node.js** | `npm start` → http://localhost:8080 |
| **E. VS Code** | Install the *Live Server* extension → right-click `index.html` → *Open with Live Server* |

> Use an `http://localhost` address when you can (options B–E). Everything also works from `file://`,
> but browsers treat each address as a separate "site", so **data saved at `localhost:8080` is not
> visible at `file://…` or at your GitHub Pages address.** Pick one address and keep using it,
> or move data with *Settings → Download backup / Restore*.

### Default logins (change them immediately!)

| Role | Username | Password |
|---|---|---|
| Admin | `admin` | `admin123` |
| Sales boy | `sales` | `sales123` |

Change passwords with the **🔑 Password** button (your own) or **Users → Change password** (admin).

---

## 2. Put it on GitHub

```bash
cd falcon-system
git init
git add .
git commit -m "Falcon System POS"
git branch -M main
git remote add origin https://github.com/<your-username>/falcon-system.git
git push -u origin main
```

(Create the empty repository `falcon-system` on github.com first – do **not** add a README there.)

### Free hosting with GitHub Pages

The file `.github/workflows/pages.yml` is already included.

1. On GitHub open your repo → **Settings → Pages**.
2. Under *Build and deployment → Source* choose **GitHub Actions**.
3. Push any change (or run the workflow from the *Actions* tab).
4. Your app appears at `https://<your-username>.github.io/falcon-system/`.

*(Alternative without Actions: Settings → Pages → Source "Deploy from a branch" → `main` / `/ (root)`.)*

### Free hosting with Vercel

1. Go to vercel.com → **Add New → Project** → import the GitHub repo.
2. Framework preset: **Other**. Leave *Build command* and *Output directory* empty.
3. Deploy. Every `git push` redeploys automatically.

---

## 3. Project structure

```
falcon-system/
├── index.html              Page skeleton: welcome screen, login, layout
├── css/style.css           All styles (layout, cards, POS, invoice, print, login)
├── js/
│   ├── logo.js             Company logo as a data URI (used on printed invoices)
│   ├── invcss.js           CSS copied into "Download invoice file"
│   ├── seed.js             Starting stock list, imported once on first run
│   ├── app.js              The whole application (data, views, actions)
│   └── splash.js           Welcome animation + sticky title bar
├── assets/logo.jpg         Logo / favicon
├── dist/
│   └── falcon-system-single.html   Everything in ONE file (email it, USB stick, double-click)
├── docs/USER-GUIDE.md      How to use every page
├── .github/workflows/pages.yml     GitHub Pages deployment
├── start.bat / start.sh / package.json   One-click local server
└── .gitignore
```

### Where is the code for…?

| I want to change… | Look in |
|---|---|
| Colours, sizes, layout | `css/style.css` (colour variables are at the top, `--p` is the pink brand colour) |
| Company name, phone, email, invoice footer | In the app: **Settings** page |
| Invoice layout (A4) | `rcptHTML()` in `js/app.js` and the `.sheet` rules in `css/style.css` |
| 80 mm receipt | `rc80()` in `js/app.js` |
| Pages (Dashboard, POS, Stock…) | functions named `vDash`, `vPOS`, `vStock`, `vInv`, `vRepairs`, `vReport`, `vUsers`, `vSupport`, `vSet` |
| Starting stock | `js/seed.js` (only used when the browser has no data yet) |
| Roles and permissions | `adm()`, `ced()`, `myTabs()` in `js/app.js` |

---

## 4. Good to know

* **Data lives in the browser.** Each browser/computer has its own copy. Use **Settings → Download backup**
  regularly, and **Restore** to move data to another computer.
* To reset everything, clear the site data in the browser (or run `localStorage.removeItem('falcon_v2')` in the console).
* Passwords are stored hashed, but login runs in the browser, so this is convenience protection – not
  bank-grade security. For several shops/devices sharing live data you need a real backend
  (for example Supabase or Firebase) – the code is organised so the `D` data object can be replaced by API calls.
* Printing: the **Print** buttons open the browser print window – choose any installed printer.
  For the 80 mm receipt choose your thermal printer and set margins to *None*.
