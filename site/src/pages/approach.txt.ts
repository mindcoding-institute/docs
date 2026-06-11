import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';

/** Plain-text (markdown) version of the Approach page for LLMs. */
export const GET: APIRoute = async () => {
  const intro = await getEntry('sections', 'approach');
  const detail = await getEntry('sections', 'approach-detail');
  const pillars = (await getCollection('pillars')).sort(
    (a, b) => a.data.order - b.data.order
  );

  const out = [
    `# ${intro!.data.title}`,
    '',
    (intro!.body ?? '').trim(),
    '',
    ...pillars.map((p) => `- ${p.data.name}: ${p.data.summary}`),
    '',
    (detail!.body ?? '').trim(),
    '',
  ].join('\n');

  return new Response(out, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
