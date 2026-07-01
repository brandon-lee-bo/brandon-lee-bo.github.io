# Repository Guidelines

## Project Shape

This is a Next.js static-export personal website for Brandon/Bohan. The repo is checked out at `/home/bohan/person_page`.

Important paths:

- `content/` contains editable site content.
- `src/` contains the Next.js app and reusable components.
- `public/` contains committed static assets.
- `skills/` contains installable Codex skills.
- `out/` is generated static output and should not be committed to the `source` branch.

Use:

- `npm run build` to verify static export.
- Static local preview from `out/` when possible, because it matches GitHub Pages better than `next dev`.
- For interactive UI debugging, run a local static server against `out/` after `npm run build`.
- Do not use `next dev` as the final validation for GitHub Pages behavior.

## Content Rules

The main navigation is controlled by `content/config.toml`.

Top-level pages:

- `Publications`
- `CV`
- `Skill Group`
- `Blog`

Avoid reintroducing separate `Awards`, `Teaching`, or `Services` pages unless the user explicitly asks. Awards already appear in the CV.

Home/about wording matters. The About page should say "I am an undergraduate student" when referring to the user's current status.

CV content comes from the user's Overleaf CV source when requested. Preserve the visual/semantic effect of the CV rather than dumping raw LaTeX.

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

- GitHub skill directory URL on the `source` branch. The displayed directory should be the shared folder:
  `https://github.com/brandon-lee-bo/brandon-lee-bo.github.io/tree/source/skills`.
- `$skill-installer install ...` command.
- A reminder to restart Codex after installing.
- `$skill-name ...` usage example.
- A short note that users can replace the directory name in the URL to install another skill.

For this machine, oh-my-codex may install into `$CODEX_HOME` while workflow discovery reads `~/.codex/skills`. If a newly installed `$skill-name` does not appear after restart, add a symlink from `~/.codex/skills/<skill-name>` to the installed skill directory and then restart Codex.

Current installable skills:

- `arch-idea-reviewer`
- `deploy-private-proxy-vps`

Current URL pattern:

```bash
$skill-installer install https://github.com/brandon-lee-bo/brandon-lee-bo.github.io/tree/source/skills/<skill-name>
```

Known local symlink fix example:

```bash
ln -s /home/bohan/.codex-local/skills/arch-idea-reviewer /home/bohan/.codex/skills/arch-idea-reviewer
```

## Skill Page UI Rules

- Skill detail pages show human-friendly website copy, but the copy/download behavior must produce an official installable `SKILL.md`.
- The expanded skill panel may color `name:` and `description:` labels for readability.
- UI coloring must never be inserted into `skills/<skill-name>/SKILL.md`.
- Subheadings in rendered skill pages can be visually polished, but copied skill content must remain plain Markdown.
- Do not add "Available directories" to the install box. Use the shared GitHub skill directory URL and explain that users replace the directory name in the install command.

When adding a new skill:

1. Choose a lowercase hyphenated skill name.
2. Add `skills/<skill-name>/SKILL.md` with official frontmatter.
3. Add or update `content/skill/<descriptive-file>.md` with website metadata and public-facing content.
4. Make the website `title` exactly match the skill name.
5. Keep human-only vendor/subscription notes in the website content, not in installable `SKILL.md`.
6. Run `quick_validate.py`.
7. Smoke-test installation from the GitHub URL after pushing to `source`, or from the local tree before pushing if only validating file format.

## Publications Rules

Publications are defined in `content/publications.bib` and rendered by `src/components/publications/PublicationsList.tsx`.

For each publication:

- Keep the text/content on the left and the figure on the right for desktop layouts.
- Current preferred card ratio is left 60% / right 40%, implemented with `lg:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)]`.
- Use a single clear figure on the right. Avoid combining multiple figures into one preview if it makes the result hard to read.
- For FlexVector, use the single-column ablation figure from the paper source as `public/papers/flexvector-preview.png`.
- Right-side figures should be large enough to fill their area, but not cropped. Use `object-contain` unless the user explicitly asks for a cropped thumbnail.
- Prefer source paper figures or arXiv/source assets over generic stock images.
- If adding an external PDF link, store it as `pdfUrl` in `content/publications.bib`.
- Show a `PDF` button before `Abstract` and `BibTeX`.
- Exclude website-only fields such as `preview`, `description`, `code`, and `pdfUrl` from reconstructed BibTeX output.

Current FlexVector PDF link:

```text
https://arxiv.org/pdf/2604.10113
```

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
- Publication figures should live under `public/papers/`.
- For paper figures, keep enough resolution for retina screens but avoid huge files. Around 80-300 KB is usually enough for a card preview.
- If extracting from PDFs, render with PyMuPDF (`fitz`) or another deterministic local tool and visually inspect the result.

## UI Style Rules

- The site should feel like a clean academic personal page, not a marketing landing page.
- Keep cards compact and readable.
- Avoid adding Teaching or Services navigation pages unless explicitly requested.
- Avoid decorative clutter. Use assets only when they clarify the research, skill, or page content.
- On publication cards, prioritize scanning: title, authors, venue/year, short description, then action buttons.
- Buttons should remain short and consistent: `PDF`, `Abstract`, `BibTeX`, `Code`, `DOI`.
- Make sure mobile layouts stack cleanly and text does not overflow cards.

## Git and Deployment

Source branch is `source`.

Deployment branch is `main`, populated from `out/`.

Workflow:

1. Make edits on `source`.
2. Run `npm run build`.
3. Check relevant generated HTML in `out/` with targeted `grep` where useful.
4. If the user asked to push/publish, commit to `source`, push `source`, then publish `out/` to `main`.
5. If the user did not explicitly ask to push, summarize changes and ask before publishing unless the prior turn context clearly requested direct push.

Reliable publish workflow, used when `npm run deploy` is unreliable:

```bash
rm -rf /tmp/person_page_main_deploy
git fetch origin main:refs/remotes/origin/main
git worktree prune
git worktree add --detach /tmp/person_page_main_deploy origin/main
find /tmp/person_page_main_deploy -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -a out/. /tmp/person_page_main_deploy/
git -C /tmp/person_page_main_deploy add -A
git -C /tmp/person_page_main_deploy commit -m "Deploy site"
GIT_SSH_COMMAND='ssh -o BatchMode=yes -o ConnectTimeout=10' git -C /tmp/person_page_main_deploy push origin HEAD:main
git worktree remove /tmp/person_page_main_deploy --force
git worktree prune
```

Use batch SSH for pushes when normal SSH appears to hang:

```bash
GIT_SSH_COMMAND='ssh -o BatchMode=yes -o ConnectTimeout=10' git push origin source
```

Typical final report should include:

- What changed.
- What validation ran, especially `npm run build`.
- Source commit hash.
- Main/deploy commit hash if published.

## Safety

- Never commit secrets, local tokens, private keys, API keys, IP addresses, or one-off credentials.
- Treat VPS/proxy configuration examples as sensitive. Use placeholders in public files.
- Do not run destructive git commands such as `reset --hard` unless the user explicitly asks.
- Do not commit `out/` to `source`.
- Do not commit local Overleaf tokens, GitHub tokens, VPS credentials, raw `.codex` session data, or machine-specific generated caches.
