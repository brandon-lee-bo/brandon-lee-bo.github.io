---
title: iterative-paper-revision
description: Iteratively revise a paper section by tightening its logic, removing experimental repetition, and applying reviewer-style scoring until it reaches a publication-ready standard.
type: Prompt Template
category: Academic Writing
tags: paper-revision, experiments, technical-writing, reviewer-simulation, iteration
---

# iterative-paper-revision

Revise Section 3 and all subsequent sections, including the experiments, to a publication-ready standard while following the writing style of Sections 1 and 2. Tighten the logic between sentences, paragraphs, and sections; make the connection between the proposed mechanisms and their corresponding experiments explicit; remove repetition by centralizing shared setup and giving each experimental subsection one distinct question; and rewrite each takeaway to explain what the evidence establishes, why it matters, and what limitation applies. Preserve all technical facts, numbers, citations, notation, and LaTeX structure, and never invent evidence. After each rewrite, review the result as a skeptical `[XXX]` reviewer, score technical clarity, logical coherence, method-experiment alignment, experimental organization, takeaway strength, and overall persuasiveness from 1 to 10, then apply the highest-impact revisions and repeat until every score is at least 9 with no major concern remaining. Finally, compile the paper, inspect the diff, and, if authorized, commit and push only the intended changes.
