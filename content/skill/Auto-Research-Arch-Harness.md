---
title: Auto Research Arch Harness
description: A days-to-weeks research harness for computer architecture idea discovery, skeptical reviewer simulation, and iterative experiment planning.
type: Research Protocol
category: Research
image: /skills/auto-research-arch-harness.png
tags: computer-architecture, cpu, idea-discovery, reviewer-simulation, literature-review, experiment-design, multi-agent, anti-loop
---

# Auto Research Arch Harness

This harness is a long-horizon research protocol for computer architecture. Its primary job is to find the right research direction: search the strongest prior work, identify a real bottleneck, generate ideas with a clear highlight, and judge those ideas before implementation effort is spent.

It is not an executable script. It is a prompt-level operating protocol for days-to-weeks research work. The process is allowed to continue across many iterations until the evidence supports a direction, forces a pivot, or reaches explicit stop conditions.

Typical target areas include:

- CPU microarchitecture
- cache, prefetching, TLB, branch prediction, and memory systems
- multicore interference and shared-resource management
- hardware-software co-design
- compiler or binary hints for architecture mechanisms
- LLM-assisted architecture research, when the LLM has a defensible role

## 1. Core Principle

Architecture research must connect mechanism to measurable performance.

Do not accept claims such as:

- "This pattern is bad, so suppressing it must help."
- "LLMs understand code, so LLM hints must help."
- "Online learning adapts, so it solves the problem."
- "The state space is large, so semantic hints must reduce overhead."

Each claim must become:

1. a concrete mechanism;
2. a measurable metric;
3. a baseline comparison;
4. a falsification test;
5. a hardware-cost story.

## 2. Project Anchor

Before starting an iteration, define or read a project endpoint file.

Recommended endpoint fields:

- current research question;
- target architecture setting;
- strongest local evidence;
- known weak evidence;
- baseline policy or system;
- current simulator or artifact;
- success metrics;
- stop criteria;
- excluded directions.

The endpoint should separate:

- what the data currently supports;
- what the data does not yet support;
- what would be needed to justify the next experiment.

This prevents the agent from converting a weak correlation into a premature design proposal.

## 3. Required Research Questions

Every long research run must answer these questions explicitly.

The main purpose is idea discovery under evidence constraints:

- read many related papers;
- close-read the most relevant papers;
- extract concrete mechanisms rather than broad summaries;
- generate candidate ideas;
- require a clear highlight for each idea: new mechanism, new problem framing, better evaluation target, or credible cross-domain method transfer;
- reject weak ideas quickly;
- iterate with reviewer-style scoring.

### Q1. What problem do existing architecture papers actually solve?

For each relevant paper, extract:

- problem statement;
- baseline policy;
- target level: front-end, cache, prefetcher, replacement, admission, memory scheduler, coherence, runtime, compiler, or cross-layer;
- state variables;
- action space;
- feedback or reward;
- hardware structures and overhead;
- multicore handling;
- reported metrics;
- limitations.

### Q2. What is the dominant remaining bottleneck in this setting?

Candidate bottlenecks may include:

- cache pollution or admission harm;
- incorrect replacement priority;
- prefetcher timeliness, accuracy, or bandwidth pressure;
- cross-core eviction or obstruction;
- branch/TLB/memory scheduling pathologies;
- baseline learning blind spots;
- low remaining headroom because the baseline is already strong;
- wrong workload or configuration choice.

Do not choose a bottleneck because it is easy to instrument. Choose it only if it aligns with performance, fairness, tail latency, energy, bandwidth, or another project-approved metric.

### Q3. Where can an LLM help?

LLM value must be compared against non-LLM alternatives:

- PC counters;
- signatures;
- offline profiling;
- compiler/static heuristics;
- lightweight bandit or reinforcement learning;
- rules derived from existing architecture papers.

Possible LLM roles:

- semantic clustering for sparse or cold PCs;
- cold-start prior;
- phase-change or co-runner-change prior;
- state-space compression for a lightweight runtime controller;
- long-context assembly/source/IR reasoning;
- label generation for code classes such as stream-like, reuse-like, pointer-like, irregular, pressure-sensitive, or cache-sensitive.

Each LLM role must define:

- input granularity;
- output label;
- oracle or proxy label source;
- runtime consumer;
- counter-only baseline;
- failure mode.

### Q4. What runtime mechanism consumes the idea?

Possible consumers:

- fixed rule gate;
- adaptive counter gate;
- lightweight bandit;
- semantic class x pressure-bin table;
- baseline-policy prior or factor modulation;
- prefetcher throttling;
- replacement/admission adjustment;
- compiler or binary hint interface.

For each consumer, specify:

- state;
- action;
- reward;
- update interval;
- overhead;
- interaction with the baseline policy;
- why it is not just a weaker version of an existing paper.

### Q5. What would make the idea fail?

Every candidate must include its strongest objections:

- a runtime counter-only baseline already works;
- an existing policy already handles the case internally;
- the metric does not align with performance;
- the oracle/action changes feedback and invalidates conclusions;
- the hint is unstable across input, phase, or core count;
- hardware overhead is larger than the benefit;
- evaluation is workload/configuration tuned;
- the idea is a feature combination rather than a mechanism.

### Q6. Is there a better direction than the initial idea?

The harness must search for better alternatives. It is allowed to recommend a pivot if the evidence supports it.

Examples:

- runtime-only learning first, then LLM only if state space or cold-start is a bottleneck;
- baseline-internal prior rather than external gating;
- control at the producer side rather than the consumer side;
- obstruction-aware multicore reward without semantic hints;
- compiler or static binary hints without an LLM;
- workload/configuration correction if the current setup has low headroom.

## 4. Literature Workflow

Use a staged workflow:

1. Define scope and search strings.
2. Multi-query search across synonyms and mechanism names.
3. Triage and deduplicate.
4. Mechanism extraction.
5. Citation/reference expansion for seminal papers.
6. Evidence synthesis and idea generation.
7. Reviewer-style critique and iteration.

Use three reading depths.

### Depth A: triage

For adjacent papers.

Output:

- one-paragraph summary;
- relevance score from 1 to 5;
- reason to keep or drop.

### Depth B: mechanism extraction

For relevant papers.

Output:

- state/action/reward or policy mechanism;
- hardware overhead;
- metric table;
- key experimental setup;
- relation to the current endpoint.

### Depth C: critical close read

For core papers.

Output:

- exact algorithm summary;
- assumptions;
- what would break in the current setting;
- what baseline it forces comparison against;
- concrete experimental implications.

Venue rule:

- Use the four major computer architecture venues as the primary literature base: ISCA, MICRO, HPCA, and ASPLOS.
- Adjacent architecture/systems venues, arXiv papers, workshop papers, company reports, and technical blogs may be used as supporting context.
- When spawning subagents, assign at least one AI-method subagent to search NeurIPS, ICML, ICLR, and closely related AI venues for fine-tuned LLMs, algorithms, reinforcement learning methods, representation learning, or agentic workflows that could be adapted to architecture mechanisms.
- Any non-primary source must be marked as supporting evidence unless no primary counterpart exists.

Citation and evidence rule:

- Every non-obvious claim in the final report must point to a paper, technical report, or local artifact.
- Do not batch citation checking at the end. Verify sources during extraction.
- For each high-value paper, record at least one exact mechanism detail and one limitation.

## 5. State Files

Use persistent state so the work can run for days or weeks.

Recommended state root:

`docs/Skills-Research/state/{task_name}/`

Recommended output root:

`docs/Skills-Research/auto-research-output/{task_name}/`

Required state files:

- `task_spec.md`
  - objective;
  - scope;
  - excluded directions;
  - success criteria;
  - stop criteria.
- `progress.json`
  - iteration;
  - total_papers_read;
  - total_findings;
  - total_candidate_ideas;
  - stale_count;
  - status.
- `papers.jsonl`
  - title;
  - venue/year;
  - source type;
  - local path or URL;
  - reading depth;
  - relevance score;
  - status.
- `findings.jsonl`
  - atomic finding;
  - source paper or local artifact;
  - confidence;
  - implication.
- `ideas.jsonl`
  - mechanism;
  - optional LLM role;
  - runtime role;
  - experiment plan;
  - rubric scores.
- `directions_tried.json`
  - attempted directions;
  - reason kept/rejected/deferred.
- `reviewer_scores.jsonl`
  - reviewer persona;
  - score;
  - critique;
  - required experiments.
- `iteration_log.jsonl`
  - per-iteration decisions.

Log line format:

```json
{"ts":"...", "source":"...", "level":"info|warn|error|decision", "event":"...", "detail":"..."}
```

## 6. Iteration Definition

One iteration is not a chat turn. One iteration must contain:

1. literature expansion from ISCA, MICRO, HPCA, ASPLOS, plus targeted AI-method venues when relevant;
2. mechanism extraction from the most relevant papers;
3. at least two candidate ideas or one explicit reason no viable idea exists;
4. four-reviewer scoring;
5. a minimum experiment plan for the strongest idea;
6. a decision: continue, pivot, or produce the final report.

The theme is information gathering and idea judgment. Do not run heavy experiments unless the user explicitly asks. However, every surviving idea must specify what experiments would be needed to support it.

## 7. Four-Reviewer Gate

Score each idea from 1 to 10 using four reviewer personas modeled after top architecture review expectations: novelty, significance, soundness, evaluation strength, clear relation to prior work, and reproducibility.

| Reviewer | Rejects when | Accepts when |
| --- | --- | --- |
| Novelty and direction reviewer | The idea is incremental, already solved, or lacks a clear highlight. | The paper search shows a real gap and the idea has a memorable contribution. |
| Architecture mechanism reviewer | The mechanism is vague, too software-only, too expensive, or not tied to a measurable bottleneck. | State, action, hardware/runtime integration, overhead, and multicore behavior are concrete. |
| Methodology and experiment reviewer | Baselines are weak, metrics are proxy-only, workloads are cherry-picked, or no falsification test exists. | The plan has strong baselines, ablations, target metrics, reproducibility notes, and cheap falsification tests. |
| Skeptical prior-art reviewer | A simpler counter-only, rule-only, runtime-only, or known architecture policy likely works. | The idea explains why simpler alternatives fail or where the new ingredient is necessary. |

Each reviewer must output:

- score from 1 to 10;
- strongest accept argument;
- strongest reject argument;
- missing experiment or missing paper;
- one action that would raise the score.

Decision rule:

- output a final direction only if every reviewer score is >= 8, no blocking missing baseline remains, and the strongest idea has a concrete experiment plan;
- continue iterating if any reviewer score is 6-7 and the next action is clear;
- pivot or reject if any reviewer score is <= 5 after one revision cycle;
- never output a final report just because the conversation is long. Assume token budget is sufficient unless the user says otherwise.

## 8. Reviewer Simulation

Run the four personas from the Four-Reviewer Gate after each major synthesis.

Reviewer iteration rule:

- After each major synthesis, run a reviewer pass before finalizing.
- Any idea below the Four-Reviewer Gate must be revised, downgraded, or rejected.
- Any idea rejected by the skeptical prior-art reviewer must add a simpler baseline before it can proceed.

## 9. Anti-Loop Rules

The agent must not keep tuning within a failing frame.

Stall conditions:

- no new mechanism evidence in an iteration;
- repeated threshold sweeps after metric-to-performance alignment is weak;
- an action improves a proxy but hurts the target metric;
- an oracle is invalidated by key/address/core/timing mismatch;
- the proposed ingredient cannot be separated from a simpler baseline;
- the proposed story cannot explain local artifacts.

When `stale_count >= 2`:

- pivot structurally, not tactically.

Allowed structural pivots:

- consumer-side control -> producer-side control;
- PC-level hint -> semantic cluster;
- fixed gate -> lightweight bandit;
- single-core -> multicore only if the question is explicitly multicore;
- action experiment -> attribution refinement;
- LLM-assisted method -> runtime-only first;
- mechanism proposal -> workload/configuration audit.

Forbidden loop:

- keep changing thresholds after the target metric fails to align with performance.

## 10. Multi-Agent Roles

Do not spawn agents until the task spec is approved.

Recommended roles:

1. Baseline and prior-work specialist
   - identifies the strongest existing mechanisms and required baselines.
2. Domain mechanism specialist
   - extracts architecture mechanisms from relevant papers.
3. AI-method and semantic-hint specialist
   - searches top AI venues for transferable methods such as fine-tuned LLMs, reinforcement learning, representation learning, or agentic workflows.
   - evaluates whether learning, semantic labels, or LLM assistance is necessary for the architecture mechanism.
4. Local artifact auditor
   - reads project reports, logs, scripts, and CSVs only.
5. Skeptical reviewer
   - scores combined ideas as architecture reviewers would.

Each agent must output:

- 5 verifiable findings;
- 3 candidate mechanisms;
- 3 reasons each mechanism may fail;
- 2 cheapest falsification tests;
- 1 final recommendation.

The main agent must synthesize, not merely concatenate, subagent outputs. Contradictions must be resolved explicitly.

## 11. Final Report Template

Default final report paths:

- `docs/Skills-Research/auto-research-output/{task_name}/report.html`
- `docs/Skills-Research/auto-research-output/{task_name}/report.md`
- optional summary copy under `docs/reports/`

Required sections:

1. Executive decision
   - recommended direction;
   - rejected directions;
   - confidence level.
2. Current endpoint constraints
   - what the data supports;
   - what the data does not support.
3. Paper mechanism map
   - paper/problem/state/action/reward/metric/limitation.
4. Candidate mechanism ranking
   - rubric scores and rationale.
5. Necessity analysis
   - why not a simpler baseline;
   - why the proposed ingredient matters;
   - where it enters the system.
6. Runtime controller or mechanism options
   - fixed rule;
   - adaptive controller;
   - baseline-policy internal prior;
   - producer-side or consumer-side control.
7. Reviewer simulation
   - scores and rejection reasons.
8. Experiment roadmap
   - cheapest falsification test;
   - minimum oracle;
   - runtime approximation;
   - final implementation target.
9. Risks and kill criteria
   - conditions to pivot or stop.
10. Reference package
   - list of high-value references;
   - mark source type: primary paper, adjacent academic paper, technical report/blog, or local artifact.

The report must end with exactly one of:

- `continue_with_current_direction`
- `continue_with_runtime_only_first`
- `pivot_to_baseline_internal_mechanism`
- `pivot_to_producer_side_control`
- `stop_due_to_low_headroom`

Do not emit the final report until the Four-Reviewer Gate passes. If it does not pass, emit only an iteration update with the next search targets, missing baselines, and the reason the current idea is not ready.

## 12. Execution Rule

Before starting a long research task, the main agent must present:

- proposed agent roles;
- candidate paper/search list;
- expected state files;
- final report outline;
- stop conditions.

The user must approve before subagents are spawned.
