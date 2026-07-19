# Offizielle Amazon-Produktbilder fuer den Reise-Ratgeber

Stand: 19. Juli 2026

## Status

**PA-API-Zugang nicht vorhanden. Für diese Produkte werden offizielle SiteStripe-Bildcodes benötigt.**

Im lokalen Projekt sind keine Variablen `AMAZON_ACCESS_KEY`, `AMAZON_SECRET_KEY`, `AMAZON_PARTNER_TAG` oder `AMAZON_MARKETPLACE` gesetzt. Deshalb wurden keine Amazon-Bilder abgerufen, gespeichert oder aus Produktseiten uebernommen. Die Produktkarten im Ratgeber verwenden bis zum Eintragen eines offiziellen Bild-Links bewusst kein lokales Ersatzbild.

## Offizielle Bilder eintragen

1. Im Amazon-PartnerNet das passende Produkt mit derselben ASIN oeffnen.
2. Ueber SiteStripe einen **Bild-Link** oder **Text-und-Bild-Link** mit der Tracking-ID `epic05e-21` erzeugen.
3. Die offizielle Bild-URL aus dem bereitgestellten Code in `src/data/amazonArticleProducts.ts` bei der passenden ASIN als `amazonImageUrl` eintragen.
4. Im selben Eintrag `amazonImageSource: 'sitestripe'` setzen. Bei einem offiziellen PA-API-Ergebnis ist der Wert `amazonImageSource: 'pa-api'`.
5. Keine Amazon-Bilddatei lokal speichern, keine Amazon-HTML- oder Bild-URL aus einer Produktseite ableiten und keine Screenshots verwenden.
6. `npm run build` ausfuehren, pruefen und nach GitHub pushen. Cloudflare Pages stellt die Bild-URLs dann direkt von Amazon bereit.

Beispiel fuer einen bereits freigegebenen Bild-Link:

```ts
{
  productId: 'wickelrucksack-reise-handgepaeck',
  asin: 'B08T7VKR2R',
  amazonImageUrl: 'OFFIZIELLE_SITESTRIPE_BILD_URL_HIER',
  amazonImageSource: 'sitestripe'
}
```

Die Komponenten lesen ausschliesslich `amazonImageUrl`. Bild, Produkttitel und Button verlinken auf denselben Affiliate-Link mit `tag=epic05e-21`.

## Benötigte SiteStripe-Bildcodes

| Produkt | ASIN | Affiliate-Link | Position auf der Seite | Offizieller SiteStripe-Bildcode / Bild-URL |
| --- | --- | --- | --- | --- |
| Wickelrucksack als Handgepaeck | B08T7VKR2R | https://www.amazon.de/dp/B08T7VKR2R?tag=epic05e-21 | Tipp 1, Handgepaeck und Ordnung | _noch einzutragen_ |
| Orzbow faltbare Wickelunterlage | B097D8BPZG | https://www.amazon.de/dp/B097D8BPZG?tag=epic05e-21 | Handgepaeck und Ordnung | _noch einzutragen_ |
| CANBOX Kompressions-Packwuerfel | B0DQNBG4F2 | https://www.amazon.de/dp/B0DQNBG4F2?tag=epic05e-21 | Handgepaeck und Ordnung | _noch einzutragen_ |
| NEWIROVE Reisedokumententasche | B0H5VQSPQ4 | https://www.amazon.de/dp/B0H5VQSPQ4?tag=epic05e-21 | Handgepaeck und Ordnung | _noch einzutragen_ |
| hauck Dream N Play Plus | B0CT8Z1C43 | https://www.amazon.de/dp/B0CT8Z1C43?tag=epic05e-21 | Ruhigere Naechte im Hotel | _noch einzutragen_ |
| Amazon Basics Reise-Verdunkelungsvorhang | B08ZNW1GWB | https://www.amazon.de/dp/B08ZNW1GWB?tag=epic05e-21 | Ruhigere Naechte im Hotel | _noch einzutragen_ |
| Zamboo Reisebett-Moskitonetz | B0779WZVWD | https://www.amazon.de/dp/B0779WZVWD?tag=epic05e-21 | Ruhigere Naechte im Hotel | _noch einzutragen_ |
| Babymoov Babyphone Expert Care | B07NGR3ZFD | https://www.amazon.de/dp/B07NGR3ZFD?tag=epic05e-21 | Ruhigere Naechte im Hotel | _noch einzutragen_ |
| Auslaufsichere Kinder-Trinkflasche | B0C1H3MGJ7 | https://www.amazon.de/dp/B0C1H3MGJ7?tag=epic05e-21 | Essen, Trinken und Sauberkeit | _noch einzutragen_ |
| Snackbox mit Faechern | B07C275388 | https://www.amazon.de/dp/B07C275388?tag=epic05e-21 | Essen, Trinken und Sauberkeit | _noch einzutragen_ |
| Silikon-Laetzchen fuer unterwegs | B08GFCX964 | https://www.amazon.de/dp/B08GFCX964?tag=epic05e-21 | Essen, Trinken und Sauberkeit | _noch einzutragen_ |
| Feuchttuecherbox fuer unterwegs | B0C77Y3QGM | https://www.amazon.de/dp/B0C77Y3QGM?tag=epic05e-21 | Essen, Trinken und Sauberkeit | _noch einzutragen_ |
| Babymoov Aquani 3-in-1 | B0CWPMY35L | https://www.amazon.de/dp/B0CWPMY35L?tag=epic05e-21 | Schatten, Ruhe und Ordnung | _noch einzutragen_ |
| Alpine Muffy Baby Classic | B0DG3T5CNR | https://www.amazon.de/dp/B0DG3T5CNR?tag=epic05e-21 | Schatten, Ruhe und Ordnung | _noch einzutragen_ |
| FURTALK Baby-Sonnenhut mit Nackenschutz | B0CQ243X1M | https://www.amazon.de/dp/B0CQ243X1M?tag=epic05e-21 | Schatten, Ruhe und Ordnung | _noch einzutragen_ |
| LÄSSIG Kinderwagen-Organizer | B0CT91SRQM | https://www.amazon.de/dp/B0CT91SRQM?tag=epic05e-21 | Schatten, Ruhe und Ordnung | _noch einzutragen_ |
| Reiseapotheke-Organizer fuer Baby und Kind | B0B698Z6N6 | https://www.amazon.de/dp/B0B698Z6N6?tag=epic05e-21 | Tipp 9 und Sidebar | _noch einzutragen_ |
| Reisebuggy mit kleinem Faltmass | B0FXWGMBRD | https://www.amazon.de/dp/B0FXWGMBRD?tag=epic05e-21 | Sidebar | _noch einzutragen_ |
| Luftige Babytrage fuer warme Reiseziele | B09F3Q46Z6 | https://www.amazon.de/dp/B09F3Q46Z6?tag=epic05e-21 | Sidebar | _noch einzutragen_ |
| Digitale Kofferwaage | B0186K8T9O | https://www.amazon.de/dp/B0186K8T9O?tag=epic05e-21 | Sidebar | _noch einzutragen_ |
