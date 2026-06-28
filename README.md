# BabyReiseHelfer

Statische Affiliate-Ratgeber-Website für Baby-Reiseprodukte, gebaut mit Astro. Die Seite ist für GitHub und Cloudflare Pages vorbereitet, nutzt keine Datenbank, keinen Warenkorb und keinen kostenpflichtigen Dienst.

## Installation

```bash
npm install
```

## Lokale Entwicklung

```bash
npm run dev
```

Astro zeigt danach die lokale URL im Terminal an, meist `http://localhost:4321`.

## Build

```bash
npm run build
```

Der fertige statische Build landet im Ordner `dist`.

## Vorschau nach dem Build

```bash
npm run preview
```

## Deployment auf Cloudflare Pages

1. Projekt auf GitHub hochladen.
2. In Cloudflare Pages ein neues Projekt erstellen und das GitHub-Repository verbinden.
3. Framework preset: `Astro`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy starten.

Die Domain in `astro.config.mjs` steht aktuell auf `https://babyreisehelfer.pages.dev`. Wenn du später eine eigene Domain nutzt, passe den Wert `site` dort sowie die Sitemap-URL in `public/robots.txt` an.

## GitHub Push

Änderungen lokal prüfen und danach committen:

```bash
git status
npm run build
git add .
git commit -m "Add travel affiliate section with Amazon and Digistore24 links"
git push
```

Wenn noch kein Remote existiert:

```bash
git remote add origin https://github.com/DEIN-NAME/DEIN-REPO.git
git branch -M main
git push -u origin main
```

## Betreiberangaben für Impressum eintragen

Die Anbieterkennzeichnung wird zentral gepflegt in:

```text
src/data/legal.ts
```

Trage dort Betreibername, ladungsfähige Anschrift und E-Mail-Adresse ein:

```ts
export const legalProfile = {
  operatorName: 'Dein rechtlicher Betreibername',
  ownerName: 'Dein Name',
  addressLines: ['Straße Hausnummer', 'PLZ Ort', 'Land'],
  email: 'kontakt@deine-domain.de'
};
```

Solange diese Angaben leer sind, veröffentlicht die Impressumsseite keine erfundenen Kontaktdaten und weist sichtbar darauf hin, dass die Anbieterkennzeichnung noch ergänzt werden muss.

## Amazon-Affiliate-Links eintragen

Die Produktdaten liegen zentral in:

```text
src/data/products.ts
```

Neben Amazon-Produkten liegen dort auch die Babyschlummerland-Ratgeber für den neuen Babyschlaf-Bereich. Diese Einträge sind mit `affiliateNetwork: 'babyschlummerland'` gekennzeichnet und nutzen Links im Format `https://www.babyschlummerland.de/.../#aff=Benman8810`.

Die neuen Reiseprodukte für Urlaub, Reisen mit Kind, Flugreise, Familienurlaub und Madeira liegen separat in:

```text
src/data/travelProducts.ts
```

Dort sind 50 Reiseprodukte in dieser Struktur gepflegt:

```ts
{
  id: 'reisebett-baby-kompakt',
  name: 'Kompaktes Baby-Reisebett',
  category: 'Reisebett Baby',
  shortDescription: 'Kurze Beschreibung',
  benefits: ['Vorteil 1', 'Vorteil 2'],
  bestFor: 'Ideale Nutzungssituation',
  priceRange: 'Mittelklasse',
  affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER_EINFUEGEN',
  affiliateStatus: 'placeholder',
  buttonText: 'Amazon-Link folgt',
  image: '/travel-product-images/reisebett-baby-kompakt.webp',
  imageAlt: 'Alt-Text',
  ratingText: 'Keine Amazon-Bewertung angezeigt'
}
```

Solange `affiliateUrl` den Platzhalter `AMAZON_AFFILIATE_LINK_HIER_EINFUEGEN` enthält oder `affiliateStatus: 'placeholder'` gesetzt ist, wird kein Amazon-Link geöffnet. Die Buttons zeigen dann `Amazon-Link folgt`.

Echte Amazon-Affiliate-Links ersetzt du direkt in `src/data/travelProducts.ts`:

```ts
affiliateUrl: 'https://www.amazon.de/dp/ASIN?tag=epic05e-21'
```

Wichtig: Nur geprüfte Amazon.de-Links mit deiner Tracking-ID `tag=epic05e-21` eintragen. Keine Amazon-Bilder, Preise, Sternebewertungen oder Rezensionen kopieren.

Meine Amazon-PartnerNet Tracking-ID lautet:

```text
epic05e-21
```

Neue Amazon-Links müssen diese ID enthalten, in der Regel als Parameter `tag=epic05e-21`. Eine kurze Anleitung ist auch auf der Website unter `/produkt-links-eintragen/` verfügbar.

Jedes Produkt hat diese Linkfelder:

```ts
amazonSearchTerm: 'Zamboo Universal Sonnensegel UV 50 Kinderwagen Sonnenschutz',
amazonProductUrl: 'https://www.amazon.de/dp/B0D6YZWGNM',
affiliateUrl: 'https://www.amazon.de/dp/B0D6YZWGNM?tag=epic05e-21',
affiliateStatus: 'ready'
```

Die Buttons sind mit `rel="nofollow sponsored noopener noreferrer"` markiert und sichtbar als Werbung/Affiliate-Link gekennzeichnet.

Solange `affiliateStatus: 'placeholder'` gesetzt ist, wird kein Amazon-Link geöffnet. Die Produktbuttons zeigen dann sichtbar `Amazon-Link folgt`.

Erst wenn ein echter Amazon.de-Link mit Tracking-ID geprüft wurde und der Status bewusst auf `ready` gesetzt wurde, öffnet der Button den Affiliate-Link:

```ts
affiliateUrl: 'https://www.amazon.de/...&tag=epic05e-21',
affiliateStatus: 'ready'
```

Wichtig: Der Link muss `tag=epic05e-21` enthalten. Ohne diese Tracking-ID wird der Button im Code nicht als bereit behandelt.

Amazon-Regeln für die Produktpflege:

- keine Amazon-Produktbilder kopieren oder einbinden
- keine Amazon-Preise anzeigen
- keine Amazon-Sternebewertungen anzeigen
- keine Rezensionstexte kopieren
- keine Behauptungen wie `bester`, `Testsieger` oder `Nr. 1` ohne eigenen belegbaren Test
- Produkttexte neutral formulieren und Sicherheits-/Herstellerhinweise respektieren

## Neue Produkte ergänzen

In `src/data/products.ts` ein weiteres Objekt in das `products`-Array einfügen. Ein Produkt braucht diese Felder:

```ts
{
  id: 'eindeutige-produkt-id',
  title: 'Produktname',
  category: 'kategorie-slug',
  amazonSearchTerm: 'Suchbegriff für spätere Kontrolle',
  amazonProductUrl: 'https://www.amazon.de/dp/ASIN',
  affiliateUrl: 'https://www.amazon.de/dp/ASIN?tag=epic05e-21',
  affiliateStatus: 'ready',
  shortDescription: 'Kurze Beschreibung',
  idealFor: 'Ideale Nutzungssituation',
  whyItFits: 'Warum das Produkt zur Nische passt',
  whatToLookFor: ['Worauf achten 1', 'Worauf achten 2'],
  benefits: ['Vorteil 1', 'Vorteil 2'],
  pros: ['Pro 1', 'Pro 2'],
  cons: ['Hinweis 1', 'Hinweis 2'],
  buttonText: 'Produkt ansehen',
  imageType: 'stroller-sunshade',
  image: '/product-images/eindeutige-produkt-id.webp',
  icon: 'passender-icon-name',
  legalNote: 'Kurzer Hinweis zu Sicherheit, Herstellerangaben oder fachlicher Prüfung'
}
```

Produktbilder liegen lokal unter `public/product-images/` und werden über `image` eingebunden. Amazon-Bilder dürfen dafür nicht kopiert, hotgelinkt oder als Screenshot verwendet werden.

`imageType` steuert die eigene Fallback-Illustration in `src/components/ProductVisual.astro`, falls noch kein WebP-Bild vorhanden ist. Verfügbare Visual-Typen sind unter anderem `stroller-sunshade`, `changing-mat`, `night-light`, `beach-tent`, `baby-earmuffs`, `first-aid-box`, `stroller-fan`, `bottle-warmer`, `travel-crib`, `thermos-bottle`, `packing-cubes`, `document-organizer`, `mosquito-net`, `stroller-organizer` und `rain-cover`.

Wenn das Produkt auf Kategorie-Seiten erscheinen soll, prüfe zusätzlich `src/data/categories.ts`.

## Neue Reiseprodukte ergänzen

Neue Reiseprodukte für den Urlaub-Bereich fügst du in `src/data/travelProducts.ts` in das Array `travelProducts` ein. Danach kannst du die Produkt-ID in `src/data/travelPages.ts` bei einer Hauptseite oder im Frontmatter eines Artikels unter `featuredProductIds` verwenden.

Für neue Amazon-Produkte gilt:

- `affiliateUrl` zuerst als `AMAZON_AFFILIATE_LINK_HIER_EINFUEGEN` lassen, wenn der Link noch nicht geprüft ist
- später durch einen echten Amazon.de-PartnerNet-Link mit `tag=epic05e-21` ersetzen
- keine aktuellen Preise oder Sternebewertungen manuell eintragen
- bei Baby-, Medizin-, Sonnen- und Sicherheitsprodukten vorsichtig formulieren und Herstellerangaben beachten

## Digistore24-Links

Die Digistore24-Reiseempfehlungen liegen zentral in:

```text
src/data/digistoreLinks.ts
```

Aktuell gepflegt sind:

- `https://www.madeira-bus.com/pdf#aff=Benman8810` als prominent passende Empfehlung für `/madeira-mit-bus/`
- `https://www.digistore24.com/redir/702242/Benman8810/` als allgemeiner Mallorca-Reiseratgeber nur unter „Weitere Reise-Empfehlungen“
- `https://www.digistore24.com/redir/40363/Benman8810/` als allgemeiner Spar-/Reiseratgeber nur unter „Weitere Reise-Empfehlungen“

Die Platzierung steuerst du über `placement: 'prominent'` oder `placement: 'secondary'`. Ein Link sollte nur prominent erscheinen, wenn er inhaltlich wirklich zur jeweiligen Familienreise- oder Babyreise-Seite passt.

## Reise-Seiten und Reiseartikel

Die SEO-Daten, FAQs, Produktauswahlen, Digistore-Einbindungen und CTAs der neuen Hauptseiten liegen in:

```text
src/data/travelPages.ts
```

Die Hauptseiten sind:

- `/urlaub/`
- `/reisen-mit-kind/`
- `/familienurlaub/`
- `/flugreise-mit-kind/`
- `/reiseprodukte/`
- `/urlaub-ratgeber/`
- `/madeira-mit-bus/`
- `/beste-reiseprodukte/`

Neue Reiseartikel legst du wie alle Ratgeber unter `src/content/ratgeber/` an. Wenn ein Artikel Reiseprodukte anzeigen soll, trägst du die IDs aus `src/data/travelProducts.ts` unter `featuredProductIds` ein.

## Neue Artikel hinzufügen

Neue Ratgeberartikel legst du als Markdown-Datei an:

```text
src/content/ratgeber/mein-neuer-artikel.md
```

Das Frontmatter sollte so aussehen:

```md
---
title: "Mein Artikel"
description: "SEO-Meta-Beschreibung"
excerpt: "Kurzer Teaser für Karten"
category: "packlisten"
date: 2026-06-20
readingTime: 6
featuredProductIds:
  - kinderwagen-sonnenschutz
tags:
  - Packliste
---
```

Der Dateiname wird zur URL, zum Beispiel `/ratgeber/mein-neuer-artikel/`.

## Marketing-Content für Social Media

Die Social-Media-Drafts liegen unter:

```text
marketing/
  pinterest/
  instagram/
  tiktok/
  calendar/
```

Enthalten sind:

- `marketing/pinterest/pins.json` und `marketing/pinterest/pins.md`: Pinterest-Pin-Drafts für Ratgeber, Kategorien und Produktübersichten
- `marketing/pinterest/boards.json` und `marketing/pinterest/boards.md`: Board-Ideen mit Keywords und später einzutragenden Pinterest-Board-IDs
- `marketing/pinterest/posted-log.json`: Protokoll erfolgreich veröffentlichter Pins
- `public/pinterest/generated-images/`: öffentlich deploybare Pin-Bilder im Format 1000 x 1500 px
- `marketing/pinterest/30-day-plan.md`: 30 Tage Pinterest-Plan mit einem Pin pro Tag
- `marketing/instagram/posts.json` und `marketing/instagram/posts.md`: Instagram-Carousel-Drafts mit Captions und Hashtags
- `marketing/tiktok/scripts.json` und `marketing/tiktok/scripts.md`: TikTok/Reels-Skripte mit Hooks, Szenen und Voiceover
- `marketing/calendar/30-day-plan.md`: 30-Tage-Plan mit Pinterest, Instagram und TikTok/Reels

Die Inhalte sind bewusst Drafts. Vor Veröffentlichung bitte manuell prüfen:

- Ziel-URL zeigt auf BabyReiseHelfer und nicht direkt auf Amazon-Affiliate-Links
- keine Amazon-Bilder, Preise, Sternebewertungen oder Rezensionen verwenden
- keine Markenlogos, Wasserzeichen oder Plattform-UI in Bildmaterial übernehmen
- medizinische Inhalte wie Reiseapotheke neutral und vorsichtig formulieren
- Plattformregeln und aktuelle API-Regeln prüfen

Optional vorbereitet ist:

```text
scripts/generate-pinterest-content.ts
scripts/generate-pinterest-images.ts
scripts/pinterest-fetch-boards.ts
scripts/pinterest-post-dry-run.ts
scripts/pinterest-post-ready.ts
```

Der Generator aktualisiert lokale Pinterest-Drafts ohne externe API. Der Bildgenerator erstellt eigene Pin-Grafiken ohne Amazon-Bilder, Preise oder Sternebewertungen. `pinterest-fetch-boards.ts` liest zuerst Board-IDs mit `boards:read`. Das Dry-Run-Script prüft nur Pins mit `status: "ready"` und veröffentlicht bewusst nichts. Echtes Posting läuft erst, wenn `ENABLE_PINTEREST_POSTING=true` gesetzt ist, `PINTEREST_ACCESS_TOKEN` vorhanden ist und `PINTEREST_TOKEN_SCOPES` `pins:write` enthält. Tokens gehören niemals ins Repository. Details stehen in `marketing/pinterest/README.md`.

## Klick-Tracking

Affiliate-Buttons lösen clientseitig diese Funktion aus:

```ts
trackAffiliateClick(productId, productTitle)
```

Die Funktion liegt in:

```text
src/lib/affiliateTracking.ts
```

Standardmäßig wird in der Browser-Konsole geloggt. Wenn später Plausible oder Google Analytics eingebunden wird, ist die Übergabe bereits vorbereitet.

## SEO

Umgesetzt sind:

- individuelle `title`- und `meta description`-Werte pro Seite
- OpenGraph-Metadaten
- strukturierte Daten für Website, Kategorie-Seiten und Artikel
- `sitemap.xml`
- `robots.txt`
- sprechende URLs
- saubere H1/H2/H3-Struktur über Layout und Markdown

## Rechtliche Hinweise, die du selbst prüfen solltest

Bitte vor Veröffentlichung fachkundig prüfen:

- vollständiges Impressum mit korrekten Anbieterangaben
- Datenschutzerklärung passend zu Hosting, Analytics und externen Diensten
- Amazon-Partnerprogramm-Richtlinien und notwendige Kennzeichnungen
- korrekte Formulierung von Affiliate-Hinweisen
- keine Anzeige von Amazon-Preisen, Amazon-Bewertungen oder Amazon-Produktbildern ohne zulässige API-Nutzung
- medizinische Aussagen in Reiseapotheke-Artikeln

Die vorhandenen Seiten `Impressum` und `Datenschutz` sind vorbereitete Basistexte. Trage vor dauerhaftem kommerziellem Betrieb deine echten Betreiberangaben in `src/data/legal.ts` ein und lasse die Rechtstexte fachkundig prüfen.
