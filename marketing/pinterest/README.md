# Pinterest-System für BabyReiseHelfer

Diese Dateien sind eine sichere erste Automationsbasis. Sie erzeugen und verwalten Pin-Drafts, veröffentlichen aber nichts automatisch.

## Dateien

- `pins.json`: strukturierte Pin-Drafts mit Status, Ziel-URL, Board, Texten, Keywords und Bildprompt
- `pins.md`: gut lesbare Arbeitsübersicht für manuelle Planung und Canva
- `boards.md`: sinnvolle Pinterest-Board-Ideen für die BabyReiseHelfer-Nische
- `30-day-plan.md`: ein manueller 30-Tage-Plan mit einem Pin pro Tag
- `../../scripts/generate-pinterest-content.ts`: erzeugt die Pin-Daten aus lokalen Vorlagen und vorhandenen Artikeln
- `../../scripts/pinterest-post-dry-run.ts`: zeigt geprüfte Pins mit `status: "ready"` an, postet aber nie

## Manueller Workflow

1. Pin in `pins.md` oder `pins.json` auswählen.
2. Bild in Canva oder einem ähnlichen Tool erstellen.
3. Prüfen: keine Amazon-Bilder, keine Preise, keine Sternebewertungen, keine Logos, keine Wasserzeichen.
4. Ziel-URL prüfen: Sie soll auf BabyReiseHelfer zeigen, nicht direkt auf Amazon.
5. Pin im Pinterest-Business-Konto manuell einplanen.
6. Nach Veröffentlichung den Status in `pins.json` optional auf `scheduled` oder `published` ändern.

## Pinterest Business und Scheduling

Nutze ein Pinterest-Business-Konto, damit du Zugriff auf Analytics, Profilfunktionen und die nativen Planungsfunktionen hast. Laut Pinterest-Hilfe können Standard-Pins im Business-Konto aktuell bis zu 30 Tage im Voraus geplant werden; außerdem nennt Pinterest ein Limit von bis zu 10 zukünftig geplanten Pins und weist darauf hin, dass das Bild/Video nach dem Planen nicht mehr geändert werden kann.

Planungsempfehlung für BabyReiseHelfer:

- Lieber regelmäßig wenige gute Pins einplanen als viele ähnliche Pins auf einmal.
- Jeden Pin vorab visuell prüfen, besonders Overlay-Text und mobile Lesbarkeit.
- Ähnliche Themen auf verschiedene Boards verteilen, aber nicht denselben Link spamartig wiederholen.
- Bei medizinischen Themen wie Reiseapotheke vorsichtig formulieren und keine Heilversprechen machen.

## Warum nicht direkt Amazon-Affiliate-Links posten?

Pinterest soll primär Besucher auf BabyReiseHelfer-Ratgeber, Packlisten und Kategorien führen. Das ist sauberer für Nutzer, besser für Vertrauen und vermeidet Affiliate-Spam. Amazon-Affiliate-Links bleiben zentral auf der Website gepflegt, inklusive Affiliate-Hinweis, Produktkontext und rechtlichen Informationen.

## Spätere API-Automatisierung

Pinterest bietet eine offizielle API für Pins und Boards. Vor echter Automatisierung müssen die aktuellen Developer-Dokumente, App-Freigaben, Scopes und Plattformregeln geprüft werden.

Mögliche Environment Variables:

```bash
export PINTEREST_ACCESS_TOKEN="..."
export PINTEREST_BOARD_ID="..."
export ENABLE_PINTEREST_POSTING="false"
```

Wichtig:

- Keine Tokens oder Passwörter ins Repository schreiben.
- `ENABLE_PINTEREST_POSTING` bleibt standardmäßig `false`.
- Das aktuelle Script `pinterest-post-dry-run.ts` veröffentlicht bewusst nichts, auch wenn `ENABLE_PINTEREST_POSTING=true` gesetzt wäre.
- Vor echter API-Veröffentlichung braucht es ein separates, geprüftes Posting-Script mit Pinterest-App, gültigem Access Token und geeigneten Scopes.

## Nützliche offizielle Quellen

- Pinterest Scheduling: https://help.pinterest.com/en/business/article/schedule-pins
- Pinterest Business Account: https://help.pinterest.com/en/business/article/get-a-business-account
- Pinterest API v5: https://developers.pinterest.com/docs/api/v5/
- Pins erstellen per API: https://developers.pinterest.com/docs/api/v5/pins-create/
