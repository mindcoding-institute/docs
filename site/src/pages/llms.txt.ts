import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/** Root llms.txt index — an LLM-friendly map of the site (llmstxt.org). */
export const GET: APIRoute = async () => {
  const pillars = (await getCollection('pillars')).sort(
    (a, b) => a.data.order - b.data.order
  );

  const out = [
    '# Mind Coding Institute',
    '',
    "> Mind coding is a proposed name for a way of working with AI: the developer's understanding is the source of design, and AI is the instrument that extends it. Intent. Leverage. Judgment.",
    '',
    'A proposal, not a settled doctrine. https://mindcoding.institute',
    '',
    '## Pages',
    '',
    '- [The Approach](/approach.txt): the proposal — creed, pillars, and intent.',
    ...pillars.map(
      (p) => `- [${p.data.name}](/pillars/${p.id}.txt): ${p.data.summary}`
    ),
    '- [What Is a Multiplier?](/multipliers/what.txt): the core unit of Mind Coding — a reusable artifact, practice, or method that raises what one mind can build, across six layers.',
    '',
  ].join('\n');

  return new Response(out, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
