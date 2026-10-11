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
| `js/data.js` | catalogo: 44 prodotti, origini e ingredienti tradotti (schema in testa al file) |
| `js/desc/*.js` | descrizioni dei prodotti, un file per lingua (`it.js` è il testo originale) |
| `js/app.js` | logica: lingua, consigli, catalogo, studio |
| `js/flags.js` | bandiere delle lingue (SVG) |
| `img/` | logo Peck e icone dell'app |

## Catalogo

Fonte: PDF `Digitalizzato_20261011-1104`, trascritto nel Google Doc "Peck catalogo tè" (44 schede, pagine 1–45; la pagina 40 non ha una scheda). Ogni prodotto riporta il numero di pagina del PDF (`page`).

Cosa viene dal PDF e cosa no:

- **Dal PDF:** nome, categoria, descrizione, origine, ingredienti, temperatura, tempo di infusione, grammi, gusti, momenti e "da bere in purezza" quando citati.
- **Stimato:** il livello di teina, che il PDF non indica, è assegnato in base al tipo di tè (tisane, rooibos e infusi di frutta senza teina).
- **Dedotto dagli ingredienti:** i gusti di "Aurora Borealis" (speziato) e "Infuso alle erbe di montagna e miele" (floreale, dolce), per cui il PDF non ne indica.
- **Tradotto:** descrizioni, origini, ingredienti e nomi descrittivi nelle altre 6 lingue.

Quattro prodotti non hanno descrizione nel PDF (Aurora Borealis, Rooibos alla prugna, Tè verde e bianco al gelsomino e agrumi, Infuso alle erbe di montagna e miele): l'app mostra ingredienti e preparazione.

Per aggiungere un prodotto: aggiungi una riga `P(...)` in `js/data.js` e la descrizione con lo stesso `id` in ciascun file di `js/desc/`.

## Foto

Le foto sono illustrative e **non ritraggono i prodotti Peck**: rappresentano il tipo di tè (sfuso, gaiwan, tè alla menta, spezie, fiori secchi…). Vengono da [Pexels](https://www.pexels.com/license/), che ne permette l'uso gratuito anche commerciale senza obbligo di attribuzione; l'app mostra comunque "Foto indicativa · Pexels".

Le foto sono collegate, non salvate nel progetto: il telefono le carica da `images.pexels.com` (dopo la prima apertura restano in cache per l'uso offline). Se una foto non si carica, al suo posto compare il riquadro colorato della categoria. L'elenco delle foto e l'abbinamento ai prodotti sono in fondo a `js/data.js`: per sostituirne una basta cambiare il numero della foto Pexels.

## Pubblicazione con GitHub Pages

1. Su GitHub apri il repository → **Settings** → **Pages**.
2. In "Build and deployment" scegli **Deploy from a branch**, il branch `claude/funny-dijkstra-y6mqt0` (o `main` dopo il merge) e la cartella `/ (root)`.
3. Dopo un paio di minuti l'app è su `https://<utente>.github.io/peck-tea/`. Aprila dal telefono e usa "Aggiungi a schermata Home".

## Logo e bandiere

- **Logo:** `img/peck-logo.png` è ritagliato dallo screenshot di peck.it caricato su Drive ("Peck") e reso trasparente. L'app lo usa come maschera, quindi prende il colore del tema (oro scuro in chiaro, oro chiaro in scuro). Nello screenshot il logo è piccolo (circa 50×70 pixel): se Peck fornisce il file originale (SVG o PNG grande), basta sostituire `img/peck-logo.png` e rigenerare `img/icon-*.png`.
- **Bandiere:** disegnate in SVG dentro `js/flags.js`. Per l'arabo c'è la bandiera degli Emirati Arabi Uniti; si cambia in quello stesso file.
