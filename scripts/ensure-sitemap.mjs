import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const sitemapPath = path.join(distDir, 'sitemap.xml');
const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
const sitemapZeroPath = path.join(distDir, 'sitemap-0.xml');

function isXmlSitemap(content) {
  const trimmed = content.trimStart();
  return (
    trimmed.startsWith('<?xml') &&
    (trimmed.includes('<urlset') || trimmed.includes('<sitemapindex'))
  );
}

async function assertXml(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`Sitemap file missing: ${filePath}`);
  }

  const content = await readFile(filePath, 'utf8');
  if (!isXmlSitemap(content)) {
    throw new Error(`Sitemap file is not valid XML sitemap output: ${filePath}`);
  }

  return content;
}

if (!existsSync(sitemapPath) && existsSync(sitemapIndexPath)) {
  await copyFile(sitemapIndexPath, sitemapPath);
}

const sitemapContent = await assertXml(sitemapPath);

if (!existsSync(sitemapZeroPath) && sitemapContent.includes('<urlset')) {
  await writeFile(sitemapZeroPath, sitemapContent);
}

if (existsSync(sitemapZeroPath)) {
  await assertXml(sitemapZeroPath);
}

console.log('Sitemap files verified.');
