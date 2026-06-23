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
6. GitHub Variable ENABLE_PINTEREST_POSTING zunächst auf false lassen.
7. Dry-Run prüfen:
   node scripts/pinterest-post-dry-run.ts
8. Erst danach ENABLE_PINTEREST_POSTING=true setzen.

Es werden nie direkte Amazon-Affiliate-Links gepostet. Ziel-URLs müssen BabyReiseHelfer-Seiten sein.
`);
