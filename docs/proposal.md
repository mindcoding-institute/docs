# Mind Coding — A Proposal for Working with AI

*Status: proposal, open for revision. This document is meant to be argued with, refined, or set aside — not signed and shelved.*

---

## Summary

**Mind coding is the discipline of directing AI to build well-designed systems.** Its central claim is modest: the developer's understanding — not the model — is where good design comes from, and AI is most useful when it extends that understanding rather than replaces it.

This document proposes a name, a creed, and a working vocabulary for a way of building software that many developers already practise without a shared word for it. It is not a tool, a framework, or a method. It is the philosophy under which tools, frameworks, and methods are chosen and used.

The proposal has three parts:

1. **The creed** — *Intent. Leverage. Judgment.* — the three pillars that must all be present for the work to count as mind coding.
2. **The tenets** — small, testable beliefs under each pillar that make the idea concrete in everyday work.
3. **The umbrella** — a frame that subsumes existing good practices (spec-driven development, agentic coding, harness engineering, test-first) as *mind-multipliers*, and a path to make the discipline teachable.

Everything below is provisional. Some of it may not survive contact with practice; the open questions at the end mark where we are least sure.

---

## Motivation

AI can now generate large amounts of plausible code quickly. That has produced a real and visible split in how people work with it.

On one side is the failure mode of letting the model think *for* you — prompting until something runs, shipping output nobody on the team understands, and treating review as an afterthought. It is fast, and it accumulates systems no one can answer for.

On the other side is a quieter practice: developers who use AI heavily but stay in charge of the design — who form the mental model first, reach for leverage deliberately, and ship only what they can vouch for. This practice works. It just has no name, which makes it hard to teach, hard to defend in a team, and easy to lose to the faster, looser default.

Naming the discipline is the point of this proposal. A name lets a senior developer point at the craft they already practise, lets a junior developer be shown a path into it, and lets a team adopt it as shared ground rather than leaving good practice to individual habit.

We are explicitly **not** framing this in opposition to "vibe coding" or any other style. A movement defined by what it is against gets stuck. Mind coding stands on its own meaning.

---

## The creed

> **Intent. Leverage. Judgment.**

These three words are the irreducible core. They are not a process — there is no order, no first step. They are three pillars of the same discipline, each of which must be present for mind coding to be happening at all. A mind coder is recognizable by all three being present.

- **Intent** — you hold the design before the machine moves. The mental model is yours. The shape of the system is yours. The *why* is yours.
- **Leverage** — you reach further than your hands can. Skills, tools, agents, harnesses, and codified expertise extend what one developer can deliver, without diluting what they design.
- **Judgment** — you decide what ships. Reading, reviewing, and evaluating output is not the cleanup at the end; it is the act through which design returns to the world as code.

The rest of this document expands each pillar and the beliefs that follow from it.

---

## The three pillars

Under each pillar we collect *tenets* — small, testable beliefs that make the idea concrete in everyday work. Each is meant to be something you can quietly ask of yourself in the moment: *am I holding to this right now?* They are provisional, and some may not survive practice.

### Intent — you hold the design before the machine moves

Intent is where design begins. It holds that the shape of a system — its purpose, its structure, its edges — lives in the developer's mind before any instruction is given to a machine. The failure mode Intent guards against is *prompting to think*: using the model as a substitute for forming your own model. That produces output you cannot evaluate, because you never decided what "correct" was.

**Tenets:**

- **Intent precedes prompt.** The prompt is not where the work starts — it is where an already-formed intention gets handed to the machine. Form the mental model first: the *why*, the boundaries, the data model, the failure modes. When intent comes first, the prompt becomes a precise act of direction rather than a hopeful request, and the quality of what returns is bounded by the clarity you brought to it.
- **You decide the how.** Architecture, naming, boundaries, the choice of approach — these are the developer's call, never silently delegated. A model can surface options and argue trade-offs; deciding among them is the human's job. A mind coder can always answer *"why is it built this way?"* with a reason they own.

### Leverage — you reach further than your hands can

Leverage is how a single developer reaches beyond the limits of their own hands. Skills, tools, agents, and codified expertise extend what one person can deliver — without diluting what they design. The distinction that matters is between **amplification and abdication**. The same tool — an agent, a generator, a harness — can extend an engaged mind or replace an absent one, depending on whether the developer stays in the loop. Leverage is only leverage when judgment is still driving.

**Tenets:**

- **Amplify, don't outsource.** The test of good leverage is simple: does it amplify a mind that is engaged, or stand in for one that has checked out? A force multiplier makes a capable soldier more effective; it does nothing for an absent one. Mind-multipliers work the same way — worthless, or worse, applied without judgment behind them.
- **Skills compound.** Every session that ends with a lesson left only in your head is a session you will partly repeat. Capturing what works — as a skill, a checklist, a harness, a convention — means the next session starts further along. A single good prompt helps once; a codified skill helps every time, for everyone who has it. *Earned delegation* lives here: as a skill proves reliable, more of a task can be handed to it with confidence.

### Judgment — you decide what ships

Judgment is the act through which design returns to the world as code. Reading, reviewing, and evaluating output is not the cleanup at the end — it is the work itself. Judgment is also what keeps speed honest. It is easy to generate more than you can answer for; the discipline is to ship only what you understand well enough to vouch for.

**Tenets:**

- **You answer for the code.** *"The model wrote it"* is not a defence. When code ships, the developer who shipped it answers for it — its correctness, its reliability, its consequences. Authorship by a machine changes nothing about accountability. This reframes review from a chore into the central act: a mind coder ships only what they can own.
- **Evaluate or don't ship.** Judgment has a hard gate: understanding. You cannot evaluate what you do not understand, and you must not ship what you cannot evaluate. This is not a demand to understand every line of every dependency — it is a demand to understand what you are putting your name on. When understanding is missing, the honest move is to stop: read more, test more, narrow the change, or ask for a verifier — not to ship and hope.

---

## The umbrella

Mind coding is an umbrella, not a method. It is not an alternative to the practices that already work — it is the frame under which they are chosen and used well. Many established practices express the discipline when done with cognitive engagement:

- **Spec-driven development** sharpens *intent*.
- **Skill libraries, agent harnesses, and codified expertise** multiply *leverage*.
- **Test-first development, oracle-driven verification, and review checklists** scale *judgment*.

We call these **mind-multipliers** — methodologies and artifacts that amplify a developer's cognitive output, the way a force multiplier amplifies a soldier's effective force. The umbrella is generative: new mind-multipliers can be proposed, cataloged, and tagged by which pillar they amplify. The philosophy provides the criteria; practitioners provide the multipliers.

The same practice done without engagement is not a mind-multiplier — it is the abdication Leverage warns against. A multiplier amplifies a mind that is present. It does nothing for one that has checked out.

---

## What this opens up

If the idea holds, naming the discipline makes it **teachable, defensible, and shared**.

- **Teachable.** A junior developer can be given a *skillforest* — branching skill paths to grow into a mind coder by design rather than by accident — instead of being left to absorb good practice by osmosis or not at all.
- **Defensible.** A senior developer gets a name for the craft they have been practising without one, and a vocabulary to argue for it when speed-at-all-costs is the easier sell.
- **Shared.** A team can adopt the creed as common ground, treat the tenets as working agreements, and choose its mind-multipliers deliberately rather than leaving good practice to individual habit.

The aim is not faster typing. It is better systems — built by developers who understand what they are shipping and why. That is an aspiration to test, not a result to claim.

---

## Adopting the proposal

This is what trying mind coding looks like in practice, for an individual or a team:

1. **Adopt the creed as a check, not a checklist.** Before a change ships, the three pillars give three questions: *Did I hold the design (intent)? Did my tools amplify rather than replace me (leverage)? Can I answer for what ships (judgment)?* If any answer is no, that is the signal to stop and fix the gap.
2. **Use the tenets as in-the-moment tests.** Each tenet is phrased so you can ask it of yourself line by line. They are diagnostics, not slogans.
3. **Codify what works as mind-multipliers.** When a practice, prompt pattern, harness, or checklist proves itself, capture it so the next session — and the next person — starts further along. Tag it by the pillar it amplifies.
4. **Grow people through skillforests.** Give juniors a deliberate path into the discipline rather than hoping they pick it up.

None of this requires new tooling. It is a stance toward the tooling you already use.

---

## Open questions

These are unresolved and are exactly where the proposal most needs pressure-testing:

- **Defining a mind-multiplier.** How sharply should the term be defined to keep the umbrella disciplined as the catalog grows? A short, two-line admission test is one option.
- **Structuring skillforests.** Are they organized by domain, by pillar, by seniority, or some combination? The shape is undecided.
- **Format.** Should the philosophy be a manifesto (declarative, signed) or a living document (iterative, versioned)? This proposal currently leans toward the latter.
- **Earned delegation.** The principle that AI takes on more decisions as it demonstrates reliable results is currently folded into *Skills compound* — every codified skill being a unit of earned delegation. Whether it deserves to stand on its own is worth revisiting once mind-multipliers are cataloged.

---

## An invitation

This document describes an intent clearly enough that other people can engage with it — and to find out whether it holds up. If you build with AI and care about the craft, you are in the audience. Argue with the creed, break the tenets against real work, propose a mind-multiplier, or tell us where the frame is wrong. That engagement is how the proposal earns the right to become a discipline.
