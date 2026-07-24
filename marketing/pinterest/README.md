# Pinterest Auto-Posting für BabyReiseHelfer

Dieses System bereitet Pinterest-Pins vor, erzeugt öffentliche Pin-Bilder und kann später geprüfte Pins über die offizielle Pinterest API posten. Standardmäßig ist echtes Posting deaktiviert.

## Private ChatGPT-Integration

Fuer das direkte Arbeiten in ChatGPT gibt es zusaetzlich den separaten MCP-Worker unter `../../apps/pinterest-mcp/`. Er nutzt die offizielle Pinterest API v5 direkt, Cloudflare D1 als dauerhafte Warteschlange und verlangt vor jeder Veroeffentlichung oder Planung eine ausdrueckliche Bestaetigung.

Die detaillierte Einrichtung steht in [../../apps/pinterest-mcp/README.md](../../apps/pinterest-mcp/README.md). Wichtig: Den neuen Worker-Cron nicht parallel zur GitHub-Actions-Automation fuer dieselben Inhalte aktivieren. Waehle vor echtem Posting genau einen Scheduler, damit keine doppelten Pins entstehen.

## Dateien

- `pins.json`: Pin-Daten mit Status, Board-ID, Bild-URL, Ziel-URL und Posting-Status
- `pins.md`: lesbare Arbeitsübersicht
- `boards.json`: Board-Namen, Beschreibungen, Keywords und später einzutragende `boardId`
- `boards.md`: lesbare Board-Übersicht
- `posted-log.json`: Protokoll erfolgreich veröffentlichter Pins
- `generated-images/`: Platzhalterordner; die öffentlich abrufbaren Bilder liegen unter `public/pinterest/generated-images/`
- `../../scripts/generate-pinterest-content.ts`: erzeugt/aktualisiert Pin-Daten
- `../../scripts/generate-pinterest-images.ts`: erzeugt 1000 x 1500 px Pin-Bilder
- `../../scripts/pinterest-fetch-boards.ts`: liest deine Pinterest-Boards mit `boards:read` und aktualisiert Board-IDs
- `../../scripts/pinterest-post-dry-run.ts`: prüft `ready`-Pins, postet aber nicht
- `../../scripts/pinterest-post-ready.ts`: postet nur bei `ENABLE_PINTEREST_POSTING=true`
- `../../scripts/pinterest-auth-help.ts`: kurze Terminal-Hilfe zum Setup

## Status-Workflow

1. Pins werden mit `status: "draft"` erstellt.
2. Bilder werden unter `public/pinterest/generated-images/` erzeugt.
3. Du prüfst Pin-Text, Bild, Board und Ziel-URL.
4. Gute Pins setzt du manuell in `pins.json` auf `status: "ready"`.
5. GitHub Actions postet täglich nur `ready`-Pins.
6. Nach erfolgreichem Posting wird der Pin auf `status: "posted"` gesetzt.
7. Fehlerhafte Pins werden auf `needs-fix` oder `error` gesetzt und nicht endlos erneut versucht.

Diese Status werden niemals automatisch gepostet: `draft`, `posted`, `needs-fix`, `error`.

## Pinterest API Setup

1. Pinterest Business Account erstellen oder vorhandenen Account auf Business umstellen.
2. Pinterest Developer App erstellen: https://developers.pinterest.com/
3. OAuth / Access Token erzeugen.
4. Aktueller Trial-Stand:
   - Wenn `pins:write` noch nicht sichtbar ist, nur Board-Sync nutzen.
   - Mit den aktuell sichtbaren Rechten `pins:read`, `boards:read`, `user_accounts:read`, `ads:read`, `catalogs:read` kann noch nicht gepostet werden.
   - Falls Pinterest im Trial-Zustand `401` mit `consumer type is not supported` meldet, ist die App noch nicht für diese API-Nutzung freigeschaltet. Bei `ENABLE_PINTEREST_POSTING=false` gibt der Workflow dann nur eine Warnung aus und überspringt den Board-Sync.
5. Benötigte Scopes für echtes Posting:
   - `pins:read`
   - `pins:write`
   - `boards:read`
   - `boards:write`, falls Boards später automatisch erstellt werden sollen
6. Board-IDs zuerst auslesen:

```bash
export PINTEREST_ACCESS_TOKEN="DEIN_TOKEN"
node scripts/pinterest-fetch-boards.ts
```

7. Board-IDs in `boards.json` oder direkt in `pins.json` prüfen.
8. In GitHub unter Repository Settings -> Secrets and variables -> Actions setzen:
   - Secret: `PINTEREST_ACCESS_TOKEN`
   - Variable: `ENABLE_PINTEREST_POSTING` zunächst `false`
   - Variable: `PINTEREST_MAX_PINS_PER_RUN` zunächst `1`
   - Variable: `PINTEREST_TOKEN_SCOPES` mit den sichtbaren Scopes, aktuell zum Beispiel `pins:read,boards:read,user_accounts:read,ads:read,catalogs:read`
   - Optional Variable: `PINTEREST_DEFAULT_BOARD_ID`
   - Optional Variable: `PUBLIC_SITE_URL` mit `https://babyreisehelfer.pages.dev`
9. Dry-Run lokal oder in GitHub Actions prüfen.
10. Erst wenn `pins:write` freigeschaltet ist, neuen Token erzeugen, `PINTEREST_TOKEN_SCOPES` um `pins:write` ergänzen und danach `ENABLE_PINTEREST_POSTING=true` setzen.

## Lokal testen

```bash
node scripts/generate-pinterest-content.ts
node scripts/generate-pinterest-images.ts
node scripts/pinterest-fetch-boards.ts
node scripts/pinterest-post-dry-run.ts
```

Echtes Posting lokal nur nach bewusstem Setzen der ENV-Werte:

```bash
export ENABLE_PINTEREST_POSTING=true
export PINTEREST_ACCESS_TOKEN="DEIN_TOKEN"
export PINTEREST_TOKEN_SCOPES="pins:read,pins:write,boards:read"
export PINTEREST_MAX_PINS_PER_RUN=1
node scripts/pinterest-post-ready.ts
```

## GitHub Actions

Der Workflow `.github/workflows/pinterest-autopost.yml` läuft einmal täglich. GitHub Actions nutzt UTC; der aktuelle Zeitplan ist morgens in Deutschland kommentiert. Der Workflow ist außerdem manuell über `workflow_dispatch` startbar.

Der Workflow macht:

1. Dependencies installieren
2. `npm run build`
3. Wenn `PINTEREST_ACCESS_TOKEN` vorhanden ist: Board-IDs mit `boards:read` synchronisieren, sofern Pinterest die App bereits freigeschaltet hat
4. Dry-Run
5. Nur bei `ENABLE_PINTEREST_POSTING=true` und `PINTEREST_TOKEN_SCOPES` enthält `pins:write`: echtes Posting
6. Nach erfolgreichem Posting `pins.json` und `posted-log.json` committen

Wenn Pinterest wegen ausstehendem Trial-Zugriff noch `401` / `consumer type is not supported` zurückgibt, schreibt der Workflow: `Pinterest API noch nicht freigeschaltet. Board-Sync übersprungen.` Solange `ENABLE_PINTEREST_POSTING=false` ist, blockiert das nicht den Build.

Wenn kein Token vorhanden ist oder `pins:write` fehlt und Posting aktiviert wurde, bricht der Job mit einer verständlichen Meldung ab. Mit deinem aktuellen begrenzten Token ist also nur Board-Sync zu erwarten, kein echtes Posting.

## Sicherheitsregeln

- Maximal 1 bis 3 Pins pro Tag posten.
- Standard ist 1 Pin pro Run.
- Keine Duplikate posten.
- Keine direkten Amazon-Affiliate-Links posten.
- Keine fremden Bilder, Logos, Amazon-Bilder, Preise, Sternebewertungen oder Rezensionen verwenden.
- Ziel-URLs müssen BabyReiseHelfer-Seiten sein.
- Tokens niemals ins Repository schreiben.
- `.env` nicht committen, nur `.env.example`.

## Offizielle Quellen

- Pinterest Scheduling: https://help.pinterest.com/en/business/article/schedule-pins
- Pinterest Business Account: https://help.pinterest.com/en/business/article/get-a-business-account
- Pinterest API v5: https://developers.pinterest.com/docs/api/v5/
- Pins erstellen per API: https://developers.pinterest.com/docs/api/v5/pins-create/
