# Peck · Tè, tisane e infusi

Webapp per telefono che aiuta a conoscere e consigliare la selezione di tè, tisane e infusi Peck.

- **Prima schermata:** scelta della lingua (italiano, inglese, francese, spagnolo, russo, cinese, arabo con testo da destra a sinistra).
- **Consigliami:** 4 domande (momento, teina, gusto, caldo o freddo) e fino a 3 proposte.
- **Catalogo:** ricerca e filtri per categoria, scheda prodotto con preparazione (°C, minuti, grammi), gusto, abbinamenti, origine.
- **Studia:** schede da girare per imparare il catalogo; i progressi restano salvati sul telefono.

Statica, senza build: HTML, CSS e JavaScript. Installabile sulla schermata home e utilizzabile offline (service worker).

## Avvio in locale

```
python3 -m http.server 8000
```

Poi apri http://localhost:8000. Per usarla dal telefono va pubblicata su un hosting statico in HTTPS (ad esempio GitHub Pages).

## Struttura

| File | Contenuto |
| --- | --- |
| `index.html` | pagina dell'app |
| `css/app.css` | stile e colori Peck |
| `js/i18n.js` | testi dell'interfaccia nelle 7 lingue |
| `js/data.js` | catalogo prodotti (schema descritto in testa al file) |
| `js/app.js` | logica: lingua, consigli, catalogo, studio |
| `img/` | icona e foto dei prodotti |

## Catalogo

`js/data.js` contiene per ora **6 prodotti di esempio** generici, segnalati nell'app come tali. Vanno sostituiti con le schede del PDF `Digitalizzato_20261011-1104`. Quando il catalogo vero è caricato, impostare `window.PECK_SAMPLE = false`.
