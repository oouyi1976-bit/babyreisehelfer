import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { categories } from '../data/categories';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site ?? new URL('https://babyreisehelfer.pages.dev')).toString().replace(/\/$/, '');
  const articles = await getCollection('ratgeber');
  const paths = [
    '/',
    '/produkte/',
    '/impressum/',
    '/datenschutz/',
    '/produkt-links-eintragen/',
    ...categories.map((category) => `/${category.slug}/`),
    ...articles.map((article) => `/ratgeber/${article.id}/`)
  ];

  const urls = paths
    .map((path) => {
      return [
        '  <url>',
        `    <loc>${baseUrl}${path}</loc>`,
        '    <changefreq>weekly</changefreq>',
        '  </url>'
      ].join('\n');
    })
    .join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
