# Private ChatGPT Pinterest App

Dieser Ordner enthält die private MCP-App fuer BabyReiseHelfer. Sie verbindet ChatGPT direkt mit der offiziellen Pinterest API v5. Es werden weder Metricool noch Buffer noch Browser-Automatisierung eingesetzt.

Die App ist bewusst **tool-only**: ChatGPT kann Boards lesen, Pins erst als Vorschau prüfen, nach ausdruecklicher Bestaetigung veröffentlichen oder in eine D1-Warteschlange einplanen. Es gibt kein Widget, keine API-Schluessel im Client und keine automatische Veroeffentlichung ohne Bestaetigung.

## Tools

| Tool | Zweck | Aktion |
| --- | --- | --- |
| `pinterest_list_boards` | Oeffentliche Boards samt ID anzeigen | Lesen |
| `pinterest_create_pin` | Einen Pin sofort veroeffentlichen | Erst Vorschau, dann Bestaetigung |
| `pinterest_schedule_pin` | Einen Pin in die Warteschlange einplanen | Erst Vorschau, dann Bestaetigung |
| `pinterest_list_scheduled_pins` | Warteschlange und Status anzeigen | Lesen |
| `pinterest_update_scheduled_pin` | Einen noch geplanten Pin aendern | Erst Vorschau, dann Bestaetigung |
| `pinterest_delete_scheduled_pin` | Einen noch geplanten Pin entfernen | Erst Vorschau, dann Bestaetigung |

Alle Pins muessen auf eine interne HTTPS-Seite von `babyreisehelfer.pages.dev` zeigen. Direkte Amazon-Affiliate-Links werden technisch abgelehnt. Bild-URLs muessen oeffentlich erreichbar sein und von `babyreisehelfer.pages.dev` stammen; empfohlen sind Pin-Bilder mit 1000 x 1500 Pixeln.

## Sicherheit und Posting-Sperre

- `ENABLE_PINTEREST_POSTING=false` ist der sichere Standard. Dann koennen Pins geplant, aber nie an Pinterest gesendet werden.
- Fuer echte Veroeffentlichungen muessen **beides** gelten: `ENABLE_PINTEREST_POSTING=true` und `PINTEREST_GRANTED_SCOPES` enthaelt `pins:write`.
- Schreibaktionen erstellen zuerst einen 15-minuetigen Bestaetigungstoken. Erst der zweite Tool-Aufruf nach ausdruecklicher Zustimmung fuehrt die Aktion aus.
- Bei Fehlern wird ein geplanter Pin einmalig auf `failed` gesetzt. Es gibt keine Endloswiederholung.
- Pinterest-Tokens werden serverseitig AES-GCM-verschluesselt in D1 gespeichert. Sie werden weder im Tool-Ergebnis noch im Widget noch in Git ausgegeben.
- Der MCP-Endpunkt ist nicht anonym: Er stellt geschuetzte Ressourcen-Metadaten, OAuth-2.1-Metadaten, DCR, PKCE (`S256`) und kurzlebige Zugriffstokens bereit. ChatGPT muss sich daher beim ersten Tool-Aufruf verbinden, bevor es auf `/mcp` zugreifen kann.
- Diese App ist fuer den privaten Einsatz via ChatGPT Developer Mode gedacht, nicht fuer das oeffentliche App-Verzeichnis.

## Pinterest OAuth einrichten

Die vorhandene Pinterest Developer App **BabyReiseHelfer** wird weiterverwendet. Eine neue App ist nicht notwendig.

1. Lege zuerst die Cloudflare-D1-Datenbank an und deploye den Worker wie unten beschrieben.
2. Hinterlege im Pinterest Developer Dashboard als Redirect-URL exakt:
   `https://DEIN-WORKER.workers.dev/oauth/pinterest/callback`
3. Setze die Worker-Secrets. Keine Werte in Dateien, GitHub Actions-Logs oder ChatGPT-Nachrichten schreiben.
4. Oeffne danach im Browser:
   `https://DEIN-WORKER.workers.dev/oauth/pinterest/start`
5. Melde dich bei Pinterest an und akzeptiere nur die benoetigten Berechtigungen.

Angeforderte Pinterest-Scopes sind `boards:read`, `pins:read`, `pins:write` und `user_accounts:read`. `boards:write` wird nicht angefordert, weil die App keine Boards erstellt. Solange Pinterest `pins:write` nicht freigeschaltet hat, setzt du `PINTEREST_GRANTED_SCOPES=boards:read,pins:read,user_accounts:read`; die App bleibt im sicheren Planungsmodus.

Die davon getrennte private MCP-Verbindung nutzt die internen Zugriffsbereiche `pinterest.read` und `pinterest.write`. ChatGPT registriert sich dafuer dynamisch und startet einen OAuth-2.1-Code-Flow mit PKCE. Die Worker-URLs werden automatisch unter `/.well-known/oauth-protected-resource` und `/.well-known/oauth-authorization-server` bereitgestellt. Es ist kein statischer API-Key in ChatGPT erforderlich.

## Cloudflare einrichten

In `wrangler.jsonc` muss nach dem Anlegen der D1-Datenbank die Platzhalter-ID ersetzt werden:

```bash
cd apps/pinterest-mcp
npx wrangler login
npx wrangler d1 create babyreisehelfer-pinterest
# Die ausgegebene database_id in wrangler.jsonc eintragen.
npx wrangler d1 migrations apply babyreisehelfer-pinterest --remote
npm run deploy
```

Secrets einzeln setzen:

```bash
npx wrangler secret put PINTEREST_APP_ID
npx wrangler secret put PINTEREST_APP_SECRET
npx wrangler secret put PINTEREST_REDIRECT_URI
npx wrangler secret put PINTEREST_TOKEN_ENCRYPTION_KEY
```

Fuer den Verschluesselungsschluessel lokal einen neuen Wert erzeugen und **nur** beim Secret-Prompt einfügen:

```bash
openssl rand -base64 32
```

`PINTEREST_ACCESS_TOKEN` und `PINTEREST_REFRESH_TOKEN` sind nur als zeitlich begrenzter Bootstrap vorgesehen. Der bevorzugte Weg ist der OAuth-Start-Endpunkt; dort gespeicherte Tokens werden verschluesselt in D1 aktualisiert. Wenn du sie dennoch einmalig zum Umzug bestehender Konfiguration nutzt, setze sie ebenfalls ausschliesslich als Cloudflare-Secrets und entferne sie nach erfolgreichem OAuth-Connect.

Nach einer Pinterest-Freigabe `pins:write` in `wrangler.jsonc` bei `PINTEREST_GRANTED_SCOPES` ergaenzen, den Worker erneut deployen und erst dann `ENABLE_PINTEREST_POSTING` kontrolliert auf `true` stellen. Die Tages- und Cron-Limits bleiben standardmaessig bei einem Pin.

## Lokal testen

```bash
cd apps/pinterest-mcp
cp .dev.vars.example .dev.vars
# Lokale .dev.vars nur bei Bedarf mit eigenen Geheimnissen fuellen; niemals committen.
npm run typecheck
npm test
npm run dev
```

Lokale Migration:

```bash
npm run d1:local
```

Die Tests pruefen die Link- und Bildvalidierung sowie die Posting-Sperre. Sie rufen weder Pinterest auf noch erzeugen sie Pins.

## Mit ChatGPT verbinden

1. Worker mit einer festen HTTPS-URL deployen.
2. In ChatGPT **Settings -> Security and login -> Developer mode** einschalten.
3. Danach unter **Settings -> Plugins** die private App per MCP-Endpoint hinzufuegen:
   `https://DEIN-WORKER.workers.dev/mcp`
4. Starte in einem neuen Chat: `Liste meine Pinterest-Boards auf.` ChatGPT fuehrt dich beim ersten Aufruf durch die private OAuth-Verbindung und leitet fuer die Pinterest-Berechtigung zu Pinterest weiter.
5. Danach beispielsweise: `Plane einen Pinterest-Pin fuer https://babyreisehelfer.pages.dev/ratgeber/10-tipps-reisen-mit-baby/ fuer morgen 09:30 Europe/Berlin.`
6. ChatGPT zeigt die vollstaendige Vorschau. Erst nach deiner klaren Bestaetigung wird der Pin in D1 gespeichert oder, bei einer sofortigen Veroeffentlichung, an Pinterest uebermittelt.

Wenn Pinterest weiterhin `consumer type is not supported` meldet oder der Trial-Zugriff aussteht, ist das keine erfolgreiche Verbindung. Die Tool-Antworten und der Cron bleiben dann im sicheren Blockiermodus; du musst die Freigabe im Pinterest Developer Dashboard beziehungsweise beim Pinterest Support abwarten.

## Cron und Speicherung

Der Worker-Cron laeuft alle fuenf Minuten. Er veroeffentlicht hoechstens einen faelligen Pin pro Lauf und pro UTC-Tag, standardmaessig also maximal einen Pin taeglich. Die dauerhaften Daten liegen in Cloudflare D1:

- verschluesselte Pinterest-Tokens
- einmalige Bestaetigungstoken
- geplante, veroeffentlichte, fehlgeschlagene und abgebrochene Pins
- Veroeffentlichungsversuche ohne geheime Tokenwerte

Eine Anpassung auf zwei oder drei Pins pro Tag ist erst sinnvoll, wenn die ersten manuellen Tests stabil sind. Aendere dann `PINTEREST_MAX_PINS_PER_DAY` bewusst und ohne Massenposting.

## Keine Widget-CSP erforderlich

Die App nutzt absichtlich kein React-Widget. Alle Pinterest-Aufrufe erfolgen serverseitig im Worker. Deshalb gibt es keine Browser-Verbindung zu Pinterest und keine Widget-CSP-Whitelist fuer Pinterest-Domains. Die OAuth-Erfolgsseite liefert eine sehr restriktive Content-Security-Policy aus.

## Offizielle Referenzen

- [OpenAI Apps SDK: MCP-Server bauen](https://developers.openai.com/apps-sdk/build/mcp-server)
- [OpenAI Apps SDK: Tools planen](https://developers.openai.com/apps-sdk/plan/tools)
- [OpenAI Apps SDK: mit ChatGPT verbinden](https://developers.openai.com/apps-sdk/deploy/connect-chatgpt)
- [Pinterest: Authentifizierung und Autorisierung](https://developers.pinterest.com/docs/getting-started/set-up-authentication-and-authorization/)
- [Pinterest: Boards und Pins erstellen](https://developers.pinterest.com/docs/work-with-organic-content-and-users/create-boards-and-pins/)
