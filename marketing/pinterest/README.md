# Pinterest-Drafts

Diese Dateien sind nur Vorlagen. Sie veröffentlichen nichts automatisch.

## Dateien

- `pins.json`: strukturierte Pinterest-Pin-Ideen für die vorhandenen Ratgeber
- `pins.md`: lesbare Arbeitsfassung für manuelle Planung und Canva

## Sicherer Workflow

1. Pin-Idee aus `pins.json` oder `pins.md` auswählen.
2. Bild in Canva oder einem anderen Tool manuell erstellen.
3. Prüfen: keine Amazon-Bilder, keine Preise, keine Sternebewertungen, keine Markenlogos.
4. Ziel-URL auf die passende BabyReiseHelfer-Ratgeberseite setzen.
5. Pin manuell veröffentlichen oder später über eine freigegebene API-Automation posten.

## Spätere Pinterest-API-Nutzung

Pinterest bietet eine offizielle API für Pins und Boards. Vor Automatisierung bitte die aktuellen Pinterest Developer Docs und Plattformregeln prüfen:

- https://developers.pinterest.com/docs/api/v5/
- https://developers.pinterest.com/docs/api/v5/pins-create/

Keine Tokens oder Passwörter ins Repository schreiben. Nutze ausschließlich Environment Variables:

```bash
export PINTEREST_ACCESS_TOKEN="..."
export PINTEREST_BOARD_ID="..."
export ENABLE_PINTEREST_POSTING="false"
```

Das vorbereitete Script `scripts/pinterest-post-draft.ts` zeigt standardmäßig nur an, welche Pins gepostet würden. Echtes Posting ist nur möglich, wenn `ENABLE_PINTEREST_POSTING=true` gesetzt ist und alle Pflichtwerte vorhanden sind.

