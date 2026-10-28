# Sapiens World

A browser world explorer for the CodeSapiens student community. Visitors pan across a pixel-art map, watch a small cast walk between waypoints, and open writeups for Home, Meetups, CollegeSapien, Community, and Engineer. The chrome follows the cream, yellow, and hard-shadow look of [codesapiens.in](https://codesapiens.in). The pictures themselves are still original placeholders drawn at startup.

The pictures are drawn in the browser at startup. They are original placeholders, not imported art, and they are not based on Floor796 or any other copyrighted world.

## Requirements

- Node.js 22 or newer
- npm

## Setup

```bash
npm install
```

Copy the environment template if you want the Supabase client to construct. Phase 1 still serves mock content either way.

```bash
copy .env.example .env
```

On macOS or Linux, use `cp .env.example .env`.

`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are public client values. Leave them empty to skip client setup. Do not put a service-role key in either variable.

## Development

```bash
npm run dev
```

Open the URL Vite prints, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

`npm run build` typechecks with `tsc -b` and writes the static site to `dist`.

## Deploy

The app is a static Vite site. On Vercel, import the project with the Vite preset and leave the output directory as `dist`. Optional environment variables belong in the Vercel project settings, using the same names as `.env.example`.

`vercel.json` sends unknown paths to `index.html` and leaves `/assets/` alone.

## Controls

- Drag to pan. Mouse wheel or trackpad scroll zooms in steps of 0.5, from 1× to 4×.
- Arrow keys or WASD pan when a text field is not focused.
- Pinch to zoom on a touch screen. The + and − buttons zoom as well.
- Click a building, sign, poster, or the fountain to open its writeup. Click empty ground to close it.
- Search matches zone names and place titles. The minimap and the zone buttons move the camera.

## Project map

- `src/game` holds Phaser: boot, textures, the world scene, camera, characters, and interactive objects.
- `src/ui` is the React shell. It talks to the game only through `src/game/bridge.ts`.
- `src/game/world/layout.ts` places zones and objects. `src/data/mockContent.ts` holds the writeups. The same content id can later point at a Supabase row without moving the building.
- `src/services/contentService.ts` is the read API. `src/services/supabaseClient.ts` documents the future `interactive_content` table and returns a client only when both env vars are set.

## Assets

All tiles, buildings, trees, and characters are generated at runtime in `src/game/assets/generateTextures.ts`. No third-party sprite sheets are bundled. Character animation frames are registered from that generated sheet, so a later spritesheet can replace the generator without changing movement code.

## Next step

Point `ContentService` at a real `interactive_content` table for the Events Hall and Quest Board, and keep object positions in the world layout.
