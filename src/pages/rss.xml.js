import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const entries = await getCollection('pages');
  const items = entries
    .filter((e) => e.data.slug !== 'index' && e.data.slug !== 'home')
    .sort((a, b) => a.data.slug.localeCompare(b.data.slug))
    .map((entry) => ({
      title: entry.data.title,
      description: entry.data.description ?? '',
      link: `/${entry.data.slug}/`,
    }));

  return rss({
    title: 'OconEco',
    description: 'OconEco — pages and working notes',
    site: context.site,
    items,
  });
}
