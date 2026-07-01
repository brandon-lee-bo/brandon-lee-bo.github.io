# Repository Guidelines

## Project Shape

This is a Next.js static-export personal website. Source content lives in `content/`; generated static output lives in `out/` and should not be committed.

Use:

- `npm run build` to verify static export.
- `npm run deploy` only after the user approves publishing.
- Static local preview from `out/` when possible, because it matches GitHub Pages better than `next dev`.

## Content Rules

The main navigation is controlled by `content/config.toml`.

Top-level pages:

- `Publications`
- `CV`
- `Skill Group`
- `Blog`

Avoid reintroducing separate `Awards`, `Teaching`, or `Services` pages unless the user explicitly asks. Awards already appear in the CV.

## Skill Group Rules

Skill entries have two synchronized sources:

- Public website pages live under `content/skill/*.md`.
- Installable Codex skills live under `skills/<skill-name>/SKILL.md`.

When the user asks to add or update a skill, update both locations unless they explicitly ask for only one.

Website skill pages should use YAML frontmatter:

```yaml
---
name: exact-skill-name
description: One concise sentence explaining exactly when this skill should trigger.
title: Clear Skill Title
type: Research Protocol
category: Research
image: /skills/example.png
tags: tag-one, tag-two
---
```

Rules:

- `/skills/` is a collection page, not a single Markdown page.
- Every skill Markdown file becomes a card on `/skills/` and a detail page at `/skills/<slug>/`.
- The detail page H1/title should be the exact installable skill name, including hyphens.
- Use `category` to group cards. Current categories include `Research` and `Practical`.
- Keep public skill content generic. Do not include private project names, private paths, tokens, IP addresses, passwords, UUIDs, or unpublished data.
- If a skill originated from a private project, rewrite project-specific details into reusable templates or examples.
- The detail page should show a short introduction first, then the full skill instructions inside a compact bordered panel.
- The `Copy Skill` button should copy an installable official SKILL.md body, not website-only frontmatter fields.
- Prefer a relevant bitmap thumbnail for each skill. Put generated or curated images under `public/skills/` and reference them with `/skills/<file>.png`.
- If no image is available, the collection page will show an automatic graphic fallback.

Installable skill directories must follow the official Codex skill format:

```markdown
---
name: skill-name
description: Explain exactly when this skill should and should not trigger.
---

Skill instructions for Codex to follow.
```

Rules for installable skills:

- Folder name, `name`, website `title`, and detail page title should all match the exact skill name.
- Use lowercase letters, digits, and hyphens only for skill names.
- Keep YAML frontmatter to only `name` and `description`.
- Put only AI-usable operational instructions in `SKILL.md`.
- Do not put CSS, color markup, website presentation notes, subscription landing-page text, or human-only explanations in `SKILL.md`.
- Human-facing notes, such as subscription/vendor links, belong in `content/skill/*.md` or page copy, not in installable skill instructions unless the AI needs them to perform the task.
- Validate each installable skill with `/home/bohan/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/<skill-name>`.
- Smoke-test public installation with `/home/bohan/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py --url https://github.com/brandon-lee-bo/brandon-lee-bo.github.io/tree/source/skills/<skill-name> --dest /tmp/<clean-test-dir>`.

The Skill Group install guide lives in `content/skills.toml` and should stay at the bottom of the page. It should include:

- GitHub skill directory URL on the `source` branch.
- `$skill-installer install ...` command.
- A reminder to restart Codex after installing.
- `$skill-name ...` usage example.
- A short note that users can replace the directory name in the URL to install another skill.

For this machine, oh-my-codex may install into `$CODEX_HOME` while workflow discovery reads `~/.codex/skills`. If a newly installed `$skill-name` does not appear after restart, add a symlink from `~/.codex/skills/<skill-name>` to the installed skill directory and then restart Codex.

## Blog Rules

Blog entries live under `content/blog/*.md`.

Each blog entry should use YAML frontmatter:

```yaml
---
title: Post Title
description: Short preview text.
type: Blog Note
date: YYYY-MM-DD
tags: life, research
---
```

Rules:

- `/blog/` is a collection page.
- Each Markdown file becomes a card and a detail page at `/blog/<slug>/`.
- Blog posts may be more personal, but should still avoid secrets and private credentials.

## Image Rules

For project-bound generated images:

- Use raster assets when a card thumbnail benefits from a real visual.
- Copy final selected generated images into `public/skills/` or another appropriate `public/` subdirectory.
- Never reference assets directly from Codex's generated image cache.
- Do not overwrite an existing asset unless the user explicitly asks.

## Git and Deployment

Source branch is `source`.

Deployment branch is `main`, populated by `npm run deploy` from `out/`.

Workflow:

1. Make edits on `source`.
2. Run `npm run build`.
3. Give the user the local preview URL and summarize changes.
4. Commit and push only after the user approves.
5. Run `npm run deploy` only after approval to publish.

## Safety

- Never commit secrets, local tokens, private keys, API keys, IP addresses, or one-off credentials.
- Treat VPS/proxy configuration examples as sensitive. Use placeholders in public files.
- Do not run destructive git commands such as `reset --hard` unless the user explicitly asks.
