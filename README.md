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

Die Domain in `astro.config.mjs` steht aktuell auf `https://babyreisehelfer.de`. Wenn du eine andere Domain nutzt, passe den Wert `site` dort sowie die Sitemap-URL in `public/robots.txt` an.

## Amazon-Affiliate-Links eintragen

Die Produktdaten liegen zentral in:

```text
src/data/products.ts
```

Jedes Produkt hat aktuell:

```ts
affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER'
```

Diesen Platzhalter ersetzt du später durch deinen echten Amazon-Partnerlink. Die Buttons sind bereits mit `rel="sponsored nofollow noopener"` markiert und zusätzlich sichtbar als Werbung/Affiliate-Link gekennzeichnet.

## Neue Produkte ergänzen

In `src/data/products.ts` ein weiteres Objekt in das `products`-Array einfügen. Ein Produkt braucht diese Felder:

```ts
{
  id: 'eindeutige-produkt-id',
  title: 'Produktname',
  category: 'kategorie-slug',
  shortDescription: 'Kurze Beschreibung',
  idealFor: 'Ideale Nutzungssituation',
  benefits: ['Vorteil 1', 'Vorteil 2'],
  pros: ['Pro 1', 'Pro 2'],
  cons: ['Hinweis 1', 'Hinweis 2'],
  affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER',
  buttonText: 'Produkt ansehen'
}
```

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

Die vorhandenen Seiten `Impressum` und `Datenschutz` sind bewusst nur Platzhalter.
