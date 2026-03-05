# Hela Malmö består av plankor som jag testat

Herklubben Herkules officiella plankrating i Malmö.

En ytterst seriös och vetenskapligt rigorös utvärdering av stadens plankor.  
Resultaten presenteras i realtid baserat på ett Google Spreadsheet där klubbens medlemmar sätter betyg.

## Hur det fungerar

1. Medlemmar i Herklubben Herkules fyller i betyg i ett Google Spreadsheet.
2. Den här sidan hämtar spreadsheetet som CSV.
3. Appen parser datan och presenterar resultaten per restaurang.
4. Varje restaurang kan expanderas för att visa individuella betyg.

Kategorier som bedöms:

- Kött
- Duchesse
- Tillbehör
- Helhet

Samt ett totalt betyg.

## Teknisk stack

Projektet är byggt med:

- React
- TypeScript
- Vite
- CSS
- Google Sheets (som datakälla)
- Vercel (hosting)

Ingen backend behövs — sidan läser direkt från Google Sheets.

## Projektstruktur

```
src/
  App.tsx
  App.css
  sheet/
    parseRatings.ts
    useGoogleSheetCsv.ts
assets/
  plankor-desktop.png
  plankor-mobile.png
```

## Lokal utveckling

Installera dependencies:

```bash
npm install
```

Starta dev-server:

```bash
npm run dev
```

Appen kör då på:

```
http://localhost:5173
```

## Bygga projektet

```bash
npm run build
```

Output hamnar i:

```
dist/
```

## Deployment

Projektet deployas automatiskt via Vercel.

Varje push till `main` triggar en ny deploy.

## Data

Datan kommer från detta Google Spreadsheet:

https://docs.google.com/spreadsheets/d/1-EIVc_TxYcESzluoEaI_DTnbjb9igdeeCkFB6SWjfnY

Sheetet läses som CSV via:

```
https://docs.google.com/spreadsheets/d/.../export?format=csv&gid=0
```

## Herklubben Herkules

En exklusiv sammanslutning av plankentusiaster med ett gemensamt mål:

Att metodiskt kartlägga kvaliteten på Malmös plankor.

Forskningen pågår kontinuerligt.
