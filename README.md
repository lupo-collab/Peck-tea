# Peck · Tè, tisane e infusi

Webapp per telefono che aiuta a conoscere e consigliare la selezione di tè, tisane e infusi Peck.

- **Prima schermata:** scelta della lingua (italiano, inglese, francese, spagnolo, russo, cinese, arabo con testo da destra a sinistra).
- **Consigliami:** 4 domande (momento, teina, gusto, caldo o freddo) e fino a 3 proposte.
- **Catalogo:** ricerca e filtri per categoria. La scheda prodotto ha: perché sceglierlo, preparazione (°C, minuti, grammi), gusto, provenienza e tipo di tè, cosa contiene, teina (indicatore e mg indicativi per tazza), testo originale del catalogo. Tornando indietro la lista riprende dal punto in cui eri, con il prodotto appena visto evidenziato; funziona anche il tasto/gesto «indietro» del telefono.
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
| `js/pitch/*.js` | testi di vendita «Perché sceglierlo», un file per lingua |
| `js/app.js` | logica: lingua, consigli, catalogo, studio |
| `js/flags.js` | bandiere delle lingue (SVG) |
| `img/` | logo Peck e icone dell'app |

## Catalogo

Fonte: PDF `Digitalizzato_20261011-1104`, trascritto nel Google Doc "Peck catalogo tè" (44 schede, pagine 1–45; la pagina 40 non ha una scheda; più 5 prodotti aggiunti dalle etichette, vedi sotto). Ogni prodotto riporta il numero di pagina del PDF (`page`).

Cosa viene dal PDF e cosa no:

- **Dal PDF:** nome, categoria, descrizione, origine, ingredienti, temperatura, tempo di infusione, grammi, gusti, momenti e "da bere in purezza" quando citati.
- **Stimato:** il livello di teina, che il PDF non indica, è assegnato in base al tipo di tè (tisane, rooibos e infusi di frutta senza teina; Heart Melodies «poca» per la caffeina naturale del cacao). I mg per tazza mostrati nell'app sono valori indicativi per tipo di tè.
- **Testi di vendita («Perché sceglierlo»):** scritti a partire dalle schede del PDF e da caratteristiche note del tipo di tè (provenienza, lavorazione, abbinamenti consigliati); non contengono dati inventati su raccolti, premi o prezzi. Le versioni non italiane vanno fatte rivedere da madrelingua.
- **Dedotto dagli ingredienti:** i gusti di "Aurora Borealis" (speziato) e "Infuso alle erbe di montagna e miele" (floreale, dolce), per cui il PDF non ne indica.
- **Tradotto:** descrizioni, origini, ingredienti e nomi descrittivi nelle altre 6 lingue.

### Aggiunte da etichetta (novembre 2026)

Cinque prodotti aggiunti dalle foto delle etichette delle latte (cartella Drive «te»): **Tè oolong rosa e lampone**, **Earl Grey Fiore Blu**, **Tè verde all'amarena e frutto della passione**, **Tè verde all'arancia**, **Tè nero fragola, cioccolato e caffè**. Per questi il catalogo PDF non ha schede (`page: null`):

- **Dall'etichetta:** nome, ingredienti e percentuali, allergeni, dose per il tè fragola/cioccolato/caffè (3 g in 200 ml).
- **Indicativo (`brewTypical`):** temperatura e tempo, scelti in linea con blend simili trovati online; l'app lo segnala sotto la preparazione.
- **Stimato:** teina e gusti, come per gli altri prodotti.
- **Correzioni da etichetta:** Lady Chatterley ha tè verde 93% (non 83%); Pleasure Forest si prepara con 5 g in 200 ml a 100 °C per 3–5 minuti.
- **Allergeni:** inseriti solo dove l'etichetta li riporta (Pleasure Forest, Earl Grey Fiore Blu, Tè nero fragola/cioccolato/caffè). Per gli altri prodotti l'app invita a controllare l'etichetta: non significa «senza allergeni».

Quattro prodotti non hanno descrizione nel PDF (Aurora Borealis, Rooibos alla prugna, Tè verde e bianco al gelsomino e agrumi, Infuso alle erbe di montagna e miele): l'app mostra ingredienti e preparazione.

Per aggiungere un prodotto: aggiungi una riga `P(...)` in `js/data.js`, la descrizione con lo stesso `id` in ciascun file di `js/desc/` e il testo di vendita in ciascun file di `js/pitch/`.

## Foto

Le foto sono illustrative e **non ritraggono i prodotti Peck**: rappresentano il tipo di tè (sfuso, gaiwan, tè alla menta, spezie, fiori secchi…). Vengono da [Pexels](https://www.pexels.com/license/), che ne permette l'uso gratuito anche commerciale senza obbligo di attribuzione; l'app mostra comunque "Foto indicativa · Pexels".

Le foto sono collegate, non salvate nel progetto: il telefono le carica da `images.pexels.com` (dopo la prima apertura restano in cache per l'uso offline). Se una foto non si carica, al suo posto compare il riquadro colorato della categoria. L'elenco delle foto e l'abbinamento ai prodotti sono in fondo a `js/data.js`: per sostituirne una basta cambiare il numero della foto Pexels.

## Pubblicazione con GitHub Pages

1. Su GitHub apri il repository → **Settings** → **Pages**.
2. In "Build and deployment" scegli **Deploy from a branch**, il branch `claude/funny-dijkstra-y6mqt0` (o `main` dopo il merge) e la cartella `/ (root)`.
3. Dopo un paio di minuti l'app è su `https://<utente>.github.io/peck-tea/`. Aprila dal telefono e usa "Aggiungi a schermata Home".

## Logo e bandiere

- **Logo:** `img/peck-logo.png` è ritagliato dallo screenshot di peck.it caricato su Drive ("Peck") e reso trasparente. L'app lo usa come maschera, quindi prende il colore del tema (oro scuro in chiaro, oro chiaro in scuro). Nello screenshot il logo è piccolo (circa 50×70 pixel): se Peck fornisce il file originale (SVG o PNG grande), basta sostituire `img/peck-logo.png` e rigenerare `img/icon-*.png`.
- **Carattere:** Raleway (Google Fonts), lo stesso di peck.it: titoli in neretto 800, etichette e pulsanti in 700.
- **Bandiere:** disegnate in SVG dentro `js/flags.js`. Per l'arabo c'è la bandiera degli Emirati Arabi Uniti; si cambia in quello stesso file.
