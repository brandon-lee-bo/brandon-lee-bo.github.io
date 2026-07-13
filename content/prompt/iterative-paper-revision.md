---
title: iterative-paper-revision
description: Iteratively revise a paper section by tightening its logic, removing experimental repetition, and applying reviewer-style scoring until it reaches a publication-ready standard.
type: Prompt Template
category: Academic Writing
tags: paper-revision, experiments, technical-writing, reviewer-simulation, iteration
---

# iterative-paper-revision

## Role and Objective

Act as a rigorous research-paper editor and an exacting reviewer. Revise `[TARGET_SCOPE]`, including all experimental sections, to a publication-ready standard. Use `[REFERENCE_SECTIONS]` as the local style reference, especially for argument structure, precision, pacing, and technical tone.

The revision must solve these problems together:

- remove repetition within the experiments and between the method and experiment sections;
- make the relationship between Sections 3 and 4 and the experiments explicit and easy to follow;
- strengthen paragraph-to-paragraph and sentence-to-sentence logic;
- turn weak or generic takeaways into specific, evidence-backed conclusions;
- make the experimental narrative compelling without overstating the evidence;
- preserve technical accuracy, notation, citations, labels, and reported results.

## Inputs

Before editing, identify or ask for the following when they are not available in the repository:

- `[TARGET_SCOPE]`: the sections to revise, normally Section 3 onward;
- `[REFERENCE_SECTIONS]`: the polished earlier sections whose style should be continued;
- `[ADVISOR_FEEDBACK]`: concrete revision comments and priorities;
- `[XXX]`: the target venue or reviewer profile used only for the review rubric;
- `[PUSH_POLICY]`: whether to commit and push after validation.

Read the repository instructions, paper source, figures, tables, appendices, and relevant comments before rewriting. Inspect the full paper context rather than editing isolated paragraphs.

## Non-Negotiable Constraints

- Do not invent measurements, baselines, ablations, citations, mechanisms, or causal explanations.
- Do not silently change numerical results, mathematical meaning, LaTeX commands, cross-references, citation keys, labels, or terminology.
- If a stronger claim needs evidence that does not exist, narrow the claim or mark the missing evidence as a concrete TODO.
- Preserve the paper's established terminology and notation unless inconsistency is itself a problem; if terminology changes, apply it consistently throughout the target scope.
- Prefer precise technical language over promotional adjectives. Let the experimental evidence create the highlight.

## Revision Workflow

### 1. Build an Argument-to-Evidence Map

Before rewriting, map each mechanism or design choice in Sections 3 and 4 to:

1. the claim it supports;
2. the experimental question needed to validate that claim;
3. the figure, table, ablation, or analysis that provides the evidence;
4. the conclusion the evidence actually permits.

Use this map to expose missing validation, duplicated validation, unsupported explanations, and experiments that are not connected to a design claim.

### 2. Diagnose Repetition in the Experiments

Mark repeated material by function rather than by matching words. Look for repeated:

- setup, datasets, metrics, baselines, and implementation details;
- descriptions of the same trend or numerical result;
- explanations already established in the method sections;
- generic statements that the proposal is effective;
- takeaways that merely restate the preceding result.

Centralize shared setup once. Give each experimental subsection one distinct question. When several figures answer the same question, synthesize them into one argument instead of narrating every bar or curve separately. Use cross-references when prior text already established a fact.

### 3. Reconstruct the Section-Level Narrative

Organize the target scope as a cumulative argument:

1. Sections 3 and 4 define the problem decomposition, mechanism, and expected effect.
2. The experiment introduction converts those claims into explicit evaluation questions.
3. Each subsection answers one evaluation question with the minimum necessary setup, decisive evidence, interpretation, and implication.
4. Later experiments deepen the argument through ablation, sensitivity, overhead, robustness, or comparison instead of repeating the main result.
5. The final takeaway states what has been established, why it matters, and under what conditions it holds.

Add transitions that explain why the next paragraph or subsection is necessary. Do not use transitions as decoration; each one must expose a logical dependency, contrast, consequence, or change of evaluation scope.

### 4. Rewrite at Paragraph and Sentence Level

For each paragraph, enforce this structure where appropriate:

- **Claim:** begin with the point the paragraph establishes;
- **Evidence or mechanism:** provide the technical support;
- **Reasoning:** explain why the evidence supports the claim;
- **Transition:** connect the conclusion to the next step of the argument.

Remove throat-clearing, vague intensifiers, duplicated topic sentences, and sentences that report a result without interpreting it. Keep adjacent sentences logically linked: each sentence should refine, justify, contrast with, or follow from the previous one.

Follow the style of `[REFERENCE_SECTIONS]` at the level of structure and tone. Do not copy distinctive wording. Preserve a concise, confident, technically grounded voice.

### 5. Make the Experiments Memorable

The experimental section should foreground a small number of defensible insights rather than a long sequence of observations. For each key result:

- state the evaluation question before presenting evidence;
- emphasize the comparison that best tests the corresponding design claim;
- distinguish observation from causal interpretation;
- explain unexpected or non-monotonic behavior when the evidence supports it;
- connect ablations to individual components introduced in Sections 3 and 4;
- discuss trade-offs, boundaries, or failure cases when relevant;
- end with a takeaway that adds meaning rather than repeats numbers.

A strong takeaway should answer: what was learned, what mechanism explains it, why it matters to the paper's central claim, and what limitation qualifies it.

## Reviewer-Guided Iteration

After each complete rewrite, review the result from the perspective of a skeptical `[XXX]` reviewer. Score each dimension from 1 to 10 and justify every score with specific textual evidence:

- technical clarity and precision;
- logical coherence within and across sections;
- alignment between Sections 3 and 4 and the experiments;
- experimental organization and absence of repetition;
- strength and defensibility of takeaways;
- overall persuasiveness and publication readiness.

List all major concerns and the three highest-impact revisions. Then revise the paper, inspect the new version, and score it again. Continue until every dimension scores at least 9/10 and no major concern remains. If missing evidence prevents that standard, do not fabricate a solution: clearly report the evidence gap, make the strongest defensible textual revision, and leave an actionable TODO.

Do not stop after critique. Apply the revisions directly to the paper source in each iteration.

## Validation and Delivery

Before finishing:

1. reread the complete target scope continuously to check narrative flow;
2. compare every quantitative statement against the original source, figures, and tables;
3. verify citations, references, labels, equations, notation, and section numbering;
4. compile the paper or run the repository's documented validation command;
5. inspect the diff for accidental changes and confirm that only intended files are included;
6. summarize the structural changes, the repetition removed, the strongest revised takeaways, the final reviewer scores, and any unresolved evidence gaps.

If `[PUSH_POLICY]` authorizes pushing, commit only the intended revision files with a concise message and push the current working branch after all validation succeeds. Never include credentials, generated caches, or unrelated local changes.
