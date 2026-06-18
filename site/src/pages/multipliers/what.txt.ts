import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';

/** Plain-text (markdown) version of the "What Is a Multiplier?" page for LLMs. */
export const GET: APIRoute = async () => {
  const entry = await getEntry('sections', 'multipliers');

  const out = [
    `# ${entry!.data.title}`,
    '',
    (entry!.body ?? '').trim(),
    '',
  ].join('\n');

  return new Response(out, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
