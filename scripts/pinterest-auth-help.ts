console.log(`
Pinterest API Setup für BabyReiseHelfer

1. Pinterest Business Account verwenden.
2. Pinterest Developer App erstellen.
3. OAuth Access Token mit diesen Scopes erzeugen:
   - pins:read
   - pins:write
   - boards:read
   - boards:write, falls Boards später automatisch erstellt werden sollen
4. Board-IDs in marketing/pinterest/boards.json oder direkt in pins.json eintragen.
5. GitHub Secret PINTEREST_ACCESS_TOKEN setzen.
6. GitHub Variable PINTEREST_TOKEN_SCOPES mit den sichtbaren Scopes setzen.
   Aktuell zum Beispiel: pins:read,boards:read,user_accounts:read,ads:read,catalogs:read
7. Board IDs nur lesen und synchronisieren:
   node scripts/pinterest-fetch-boards.ts
8. GitHub Variable ENABLE_PINTEREST_POSTING zunächst auf false lassen.
9. Dry-Run prüfen:
   node scripts/pinterest-post-dry-run.ts
10. Erst wenn pins:write freigeschaltet ist, PINTEREST_TOKEN_SCOPES um pins:write ergänzen und ENABLE_PINTEREST_POSTING=true setzen.

Es werden nie direkte Amazon-Affiliate-Links gepostet. Ziel-URLs müssen BabyReiseHelfer-Seiten sein.
`);
