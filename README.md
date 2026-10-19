# Objective OS v0.2 — React

Aplicație în română, dark mode, pentru iPhone, publicabilă pe GitHub Pages.

## Funcții
- 28 de obiective din sprintul 2026
- SMART și DUMB editabile pentru fiecare obiectiv
- progres numeric și istoric al schimbărilor
- etape intermediare pentru proiecte
- obiceiuri zilnice cu istoric pe 7 zile
- calendar de ture 24/48
- export/import JSON
- migrare automată a datelor din `objectiveos-v1` dacă aplicația rulează la **aceeași adresă și în același browser**

## Publicare în GitHub Pages fără instalare locală
1. În aplicația veche, exportă un backup JSON din secțiunea Date. Păstrează-l în Fișiere pe iPhone.
2. Creează un repository GitHub nou, de exemplu `objective-os-react`, de tip Public. Poți și reutiliza `objective-os`, dar fă întâi o copie de siguranță.
3. Încarcă **conținutul** acestui folder la rădăcina repository-ului, inclusiv folderul `.github/workflows`. GitHub web upload poate omite fișierele ascunse; verifică existența `.github/workflows/deploy.yml`. Dacă nu poți încărca folderul `.github`, creează fișierul manual în GitHub cu **Add file → Create new file**, folosind numele `.github/workflows/deploy.yml` și conținutul din pachet.
4. În repository: Settings → Pages → Build and deployment → Source → **GitHub Actions**.
5. Deschide tabul Actions și așteaptă finalizarea workflow-ului **Deploy Objective OS**. Dacă nu pornește, deschide workflow-ul și apasă Run workflow.
6. Adresa va fi `https://UTILIZATOR.github.io/NUME-REPOSITORY/`.
7. Deschide adresa în Safari pe iPhone → Partajare → Adaugă pe ecranul principal.
8. Importă backup-ul JSON din meniul Date al aplicației noi. **Datele din vechea aplicație nu migrează automat între două adrese web diferite.**

## Dezvoltare locală (opțional)
```bash
npm install
npm run dev
```
Pentru verificarea versiunii finale:
```bash
npm run build
```

## Atenție
- Datele sunt salvate doar în `localStorage` al browserului, nu într-un cont online. Exportă backup-uri periodic.
- Repository-ul Public conține doar codul și obiectivele inițiale, nu și datele introduse local.
- Prima versiune React nu include încă sincronizare cloud, notificări sau planificarea automată a sarcinilor.
