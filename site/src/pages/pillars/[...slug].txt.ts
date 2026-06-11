import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

export const getStaticPaths = (async () => {
  const pillars = await getCollection('pillars');
  return pillars.map((pillar) => ({
    params: { slug: pillar.id },
    props: { pillar },
  }));
}) satisfies GetStaticPaths;

/** Plain-text (markdown) version of a pillar page for LLMs. */
export const GET: APIRoute = ({ props }) => {
  const { pillar } = props as { pillar: CollectionEntry<'pillars'> };
  const { name, summary, tenets, resources } = pillar.data;

  const out = [
    `# ${name}`,
    '',
    `> ${summary}`,
    '',
    (pillar.body ?? '').trim(),
    '',
    '## Tenets',
    '',
    ...tenets.flatMap((t) => [`### ${t.title}`, '', t.details, '']),
    '## Resources',
    '',
    resources.length
      ? resources
          .map((r) => `- ${r.label}${r.url ? ` — ${r.url}` : ''}`)
          .join('\n')
      : 'Coming soon.',
    '',
  ].join('\n');

  return new Response(out, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
