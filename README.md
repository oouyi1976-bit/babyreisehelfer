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

Die Buttons sind mit `rel="sponsored nofollow noopener"` markiert und sichtbar als Werbung/Affiliate-Link gekennzeichnet.

Solange `affiliateStatus: 'placeholder'` gesetzt ist, wird kein Amazon-Link geöffnet. Die Produktbuttons zeigen dann sichtbar `Link noch nicht eingetragen`.

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
- `marketing/pinterest/boards.md`: Board-Ideen mit Keywords und passenden Pin-Typen
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
scripts/pinterest-post-dry-run.ts
```

Der Generator aktualisiert lokale Pinterest-Drafts ohne externe API. Das Dry-Run-Script zeigt nur Pins mit `status: "ready"` an und veröffentlicht bewusst nichts. Tokens gehören niemals ins Repository. Details stehen in `marketing/pinterest/README.md`.

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
