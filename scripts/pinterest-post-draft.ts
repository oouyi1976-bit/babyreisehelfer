console.log(
  'Hinweis: scripts/pinterest-post-draft.ts ist veraltet. Nutze scripts/pinterest-post-dry-run.ts. Es wird nichts veröffentlicht.'
);

await import('./pinterest-post-dry-run.ts');
