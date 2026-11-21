# Claude skills for this repo

Claude Code loads these automatically in any session opened on this repo. Each folder is an unmodified copy of a third-party skill with its own licence file.

| Skill | Source | Commit | Licence | Use it for |
|---|---|---|---|---|
| `design-taste-frontend` | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | `f6b7657` | MIT | Building and polishing websites |
| `impeccable` | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | `b49177d` | Apache-2.0 | Design critique, audits, polish (`/impeccable`) |
| `diagram-design` | [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | `d74d8c2` | MIT | Diagrams and charts |
| `archify` | [tt-a1i/archify](https://github.com/tt-a1i/archify) | `8509a3d` | Apache-2.0 / MIT | Interactive architecture and workflow diagrams |
| `planning-with-files` | [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files) | `7673790` | MIT | Plans kept in task_plan.md for long tasks |
| `img2threejs` | [img2threejs/img2threejs](https://github.com/img2threejs/img2threejs) | `0c0c49b` | Apache-2.0 | Turning a photo (e.g. the car) into a 3D Three.js model |
| `distilly` | [titanwings/distilly](https://github.com/titanwings/distilly) | `0afc45c` | MIT | Owner / person profiles for agents |

## Hooks
- **design-taste-frontend** runs a quality check (`scripts/gate.mjs`, Node) when Claude finishes a turn while the skill is in use. It can take a few minutes.
- **planning-with-files** runs small shell hooks on each prompt and tool call while the skill is in use. They do nothing unless a `task_plan.md` or `.planning/` exists. Set `PLANNING_DISABLED=1` to turn them off.

## Updating
Re-copy the folder from the source repo and update the commit in the table.

## Not installed
From the same list: the apps (Expo, Chatwoot, OpenProject, AppFlowy, Cal.diy, Cap, OpenWhispr, VoiceStudio, open-seo, open-higgsfield, Paperclip, Cognee, MarkItDown) are full programs, not skills. alirezarezvani/claude-skills (~500 skills) and nexu-io/open-design (~560) are too large to add wholesale. Pick the few you want. VoltAgent/awesome-design-md is a collection of DESIGN.md files, not a skill.
