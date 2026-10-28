import type {
  CharacterSpawn,
  DecorPlacement,
  InteractivePlacement,
  SolidRect,
  TilePoint,
  ZoneDef,
  ZoneId,
} from '../../types/world.ts'

export const TILE = 16
export const WORLD_COLS = 200
export const WORLD_ROWS = 150
export const worldPixelWidth = WORLD_COLS * TILE
export const worldPixelHeight = WORLD_ROWS * TILE

export const Tile = {
  grass: 0,
  grassDark: 1,
  flower: 2,
  path: 3,
  pathDark: 4,
  plaza: 5,
  plazaAlt: 6,
  events: 7,
  lab: 8,
  hub: 9,
  quest: 10,
} as const

export const TILE_COUNT = 11

export const zones = [
  {
    id: 'events',
    name: 'Meetups',
    x: 76,
    y: 15,
    w: 48,
    h: 36,
    floor: Tile.events,
    accent: '#2f8fbe',
  },
  {
    id: 'lab',
    name: 'CollegeSapien',
    x: 22,
    y: 57,
    w: 48,
    h: 36,
    floor: Tile.lab,
    accent: '#3f9a55',
  },
  {
    id: 'plaza',
    name: 'CodeSapiens',
    x: 76,
    y: 57,
    w: 48,
    h: 36,
    floor: Tile.plaza,
    accent: '#e0b000',
  },
  {
    id: 'hub',
    name: 'Community',
    x: 130,
    y: 57,
    w: 48,
    h: 36,
    floor: Tile.hub,
    accent: '#6d5cb5',
  },
  {
    id: 'quest',
    name: 'Engineer',
    x: 76,
    y: 99,
    w: 48,
    h: 36,
    floor: Tile.quest,
    accent: '#e08a00',
  },
] as const satisfies readonly ZoneDef[]

export const paths: readonly SolidRect[] = [
  { x: 70, y: 72, w: 6, h: 6 },
  { x: 124, y: 72, w: 6, h: 6 },
  { x: 97, y: 51, w: 6, h: 6 },
  { x: 97, y: 93, w: 6, h: 6 },
  { x: 76, y: 72, w: 48, h: 6 },
  { x: 97, y: 57, w: 6, h: 36 },
  { x: 97, y: 26, w: 6, h: 25 },
  { x: 97, y: 99, w: 6, h: 24 },
  { x: 36, y: 72, w: 34, h: 6 },
  { x: 130, y: 72, w: 32, h: 6 },
]

export const interactives = [
  {
    id: 'place-building-plaza',
    contentId: 'building-plaza',
    kind: 'building',
    texture: 'building-plaza',
    x: 79,
    y: 60,
    w: 10,
    h: 7,
    zoneId: 'plaza',
    solid: true,
    door: 'south',
    accent: '#e0b000',
  },
  {
    id: 'place-building-events',
    contentId: 'building-events',
    kind: 'building',
    texture: 'building-events',
    x: 94,
    y: 17,
    w: 12,
    h: 7,
    zoneId: 'events',
    solid: true,
    door: 'south',
    accent: '#2f8fbe',
  },
  {
    id: 'place-building-meetup-jan',
    contentId: 'building-meetup-jan',
    kind: 'building',
    texture: 'building-meetup-jan',
    x: 78,
    y: 26,
    w: 6,
    h: 5,
    zoneId: 'events',
    solid: true,
    door: 'south',
    label: 'JAN',
    accent: '#7ec8ea',
  },
  {
    id: 'place-building-meetup-feb',
    contentId: 'building-meetup-feb',
    kind: 'building',
    texture: 'building-meetup-feb',
    x: 78,
    y: 34,
    w: 6,
    h: 5,
    zoneId: 'events',
    solid: true,
    door: 'south',
    label: 'FEB',
    accent: '#3f9a55',
  },
  {
    id: 'place-building-meetup-mar',
    contentId: 'building-meetup-mar',
    kind: 'building',
    texture: 'building-meetup-mar',
    x: 78,
    y: 43,
    w: 6,
    h: 5,
    zoneId: 'events',
    solid: true,
    door: 'south',
    label: 'MAR',
    accent: '#6d5cb5',
  },
  {
    id: 'place-building-meetup-apr',
    contentId: 'building-meetup-apr',
    kind: 'building',
    texture: 'building-meetup-apr',
    x: 117,
    y: 26,
    w: 6,
    h: 5,
    zoneId: 'events',
    solid: true,
    door: 'south',
    label: 'APR',
    accent: '#e08a00',
  },
  {
    id: 'place-building-meetup-may',
    contentId: 'building-meetup-may',
    kind: 'building',
    texture: 'building-meetup-may',
    x: 117,
    y: 34,
    w: 6,
    h: 5,
    zoneId: 'events',
    solid: true,
    door: 'south',
    label: 'MAY',
    accent: '#e23d6b',
  },
  {
    id: 'place-building-meetup-jun',
    contentId: 'building-meetup-jun',
    kind: 'building',
    texture: 'building-meetup-jun',
    x: 117,
    y: 43,
    w: 6,
    h: 5,
    zoneId: 'events',
    solid: true,
    door: 'south',
    label: 'JUN',
    accent: '#e0b000',
  },
  {
    id: 'place-building-lab',
    contentId: 'building-lab',
    kind: 'building',
    texture: 'building-lab',
    x: 25,
    y: 63,
    w: 10,
    h: 8,
    zoneId: 'lab',
    solid: true,
    door: 'east',
    accent: '#3f9a55',
  },
  {
    id: 'place-building-hub',
    contentId: 'building-hub',
    kind: 'building',
    texture: 'building-hub',
    x: 162,
    y: 63,
    w: 12,
    h: 8,
    zoneId: 'hub',
    solid: true,
    door: 'west',
    accent: '#6d5cb5',
  },
  {
    id: 'place-building-quest',
    contentId: 'building-quest',
    kind: 'building',
    texture: 'building-quest',
    x: 92,
    y: 123,
    w: 12,
    h: 8,
    zoneId: 'quest',
    solid: true,
    door: 'north',
    accent: '#e08a00',
  },
  {
    id: 'place-fountain',
    contentId: 'fountain-plaza',
    kind: 'landmark',
    texture: 'fountain',
    x: 98,
    y: 73,
    w: 4,
    h: 4,
    zoneId: 'plaza',
    solid: true,
    accent: '#3d7ea6',
  },
  {
    id: 'place-monkey',
    contentId: 'monkey-mascot',
    kind: 'landmark',
    texture: 'monkey',
    x: 92,
    y: 74,
    w: 4,
    h: 4,
    zoneId: 'plaza',
    solid: true,
    accent: '#0a0a0a',
  },
  {
    id: 'place-class101',
    contentId: 'class-101',
    kind: 'building',
    texture: 'building-class101',
    x: 92,
    y: 60,
    w: 6,
    h: 4,
    zoneId: 'plaza',
    solid: true,
    door: 'south',
    label: 'CLASS101',
    accent: '#e0b000',
  },
  {
    id: 'place-freshers',
    contentId: 'meetup-freshers',
    kind: 'building',
    texture: 'building-freshers',
    x: 80,
    y: 17,
    w: 6,
    h: 5,
    zoneId: 'events',
    solid: true,
    door: 'south',
    label: 'FRESHERS',
    accent: '#2f8fbe',
  },
  {
    id: 'place-agenda',
    contentId: 'meetup-agenda',
    kind: 'building',
    texture: 'building-agenda',
    x: 108,
    y: 17,
    w: 6,
    h: 5,
    zoneId: 'events',
    solid: true,
    door: 'south',
    label: 'AGENDA',
    accent: '#7ec8ea',
  },
  {
    id: 'place-cookie',
    contentId: 'gooei-dough',
    kind: 'building',
    texture: 'building-cookie',
    x: 87,
    y: 17,
    w: 6,
    h: 5,
    zoneId: 'events',
    solid: true,
    door: 'south',
    label: 'COOKIE',
    accent: '#e08a00',
  },
  {
    id: 'place-learn',
    contentId: 'peer-learning',
    kind: 'building',
    texture: 'building-learn',
    x: 50,
    y: 70,
    w: 5,
    h: 4,
    zoneId: 'lab',
    solid: true,
    door: 'south',
    label: 'LEARN',
    accent: '#3f9a55',
  },
  {
    id: 'place-mentor',
    contentId: 'mentorship',
    kind: 'building',
    texture: 'building-mentor',
    x: 57,
    y: 70,
    w: 5,
    h: 4,
    zoneId: 'lab',
    solid: true,
    door: 'south',
    label: 'MENTOR',
    accent: '#3f9a55',
  },
  {
    id: 'place-workshop',
    contentId: 'workshops',
    kind: 'building',
    texture: 'building-workshop',
    x: 50,
    y: 76,
    w: 7,
    h: 3,
    zoneId: 'lab',
    solid: true,
    door: 'south',
    label: 'WORKSHOP',
    accent: '#2a6b38',
  },
  {
    id: 'place-connect',
    contentId: 'student-community',
    kind: 'building',
    texture: 'building-connect',
    x: 146,
    y: 70,
    w: 6,
    h: 4,
    zoneId: 'hub',
    solid: true,
    door: 'south',
    label: 'CONNECT',
    accent: '#6d5cb5',
  },
  {
    id: 'place-socials',
    contentId: 'ai-speaks',
    kind: 'building',
    texture: 'building-socials',
    x: 146,
    y: 76,
    w: 6,
    h: 3,
    zoneId: 'hub',
    solid: true,
    door: 'south',
    label: 'SOCIALS',
    accent: '#6d5cb5',
  },
  {
    id: 'place-sponsor',
    contentId: 'cookie-sponsor',
    kind: 'building',
    texture: 'building-sponsor',
    x: 146,
    y: 80,
    w: 6,
    h: 3,
    zoneId: 'hub',
    solid: true,
    door: 'south',
    label: 'SPONSOR',
    accent: '#e08a00',
  },
  {
    id: 'place-code',
    contentId: 'codesapiens-origin',
    kind: 'building',
    texture: 'building-code',
    x: 78,
    y: 124,
    w: 6,
    h: 5,
    zoneId: 'quest',
    solid: true,
    door: 'south',
    label: 'CODE',
    accent: '#e0b000',
  },
  {
    id: 'place-campus-app',
    contentId: 'campus-app',
    kind: 'building',
    texture: 'building-campus-app',
    x: 108,
    y: 124,
    w: 5,
    h: 5,
    zoneId: 'quest',
    solid: true,
    door: 'south',
    label: 'BUILD',
    accent: '#e08a00',
  },
  {
    id: 'place-real-projects',
    contentId: 'real-projects',
    kind: 'building',
    texture: 'building-projects',
    x: 114,
    y: 124,
    w: 8,
    h: 5,
    zoneId: 'quest',
    solid: true,
    door: 'south',
    label: 'PROJECTS',
    accent: '#e08a00',
  },
  {
    id: 'place-qr',
    contentId: 'qr-desk',
    kind: 'building',
    texture: 'building-qr',
    x: 116,
    y: 17,
    w: 6,
    h: 5,
    zoneId: 'events',
    solid: true,
    door: 'south',
    label: 'QR',
    accent: '#2f8fbe',
  },
  {
    id: 'place-welcome',
    contentId: 'welcome-desk',
    kind: 'building',
    texture: 'building-welcome',
    x: 114,
    y: 58,
    w: 8,
    h: 4,
    zoneId: 'plaza',
    solid: true,
    door: 'south',
    label: 'WELCOME',
    accent: '#e0b000',
  },
  {
    id: 'place-alumni',
    contentId: 'alumni-yard',
    kind: 'building',
    texture: 'building-alumni',
    x: 84,
    y: 90,
    w: 6,
    h: 3,
    zoneId: 'plaza',
    solid: true,
    door: 'south',
    label: 'ALUMNI',
    accent: '#e08a00',
  },
  {
    id: 'place-members',
    contentId: 'members-yard',
    kind: 'building',
    texture: 'building-members',
    x: 104,
    y: 90,
    w: 7,
    h: 3,
    zoneId: 'plaza',
    solid: true,
    door: 'south',
    label: 'MEMBERS',
    accent: '#e0b000',
  },
  {
    id: 'place-notes',
    contentId: 'notes-stall',
    kind: 'building',
    texture: 'building-notes',
    x: 26,
    y: 58,
    w: 5,
    h: 3,
    zoneId: 'lab',
    solid: true,
    door: 'south',
    label: 'NOTES',
    accent: '#3f9a55',
  },
  {
    id: 'place-gpa',
    contentId: 'gpa-stall',
    kind: 'building',
    texture: 'building-gpa',
    x: 33,
    y: 58,
    w: 4,
    h: 3,
    zoneId: 'lab',
    solid: true,
    door: 'south',
    label: 'GPA',
    accent: '#3f9a55',
  },
  {
    id: 'place-attend',
    contentId: 'attend-stall',
    kind: 'building',
    texture: 'building-attend',
    x: 48,
    y: 89,
    w: 6,
    h: 3,
    zoneId: 'lab',
    solid: true,
    door: 'south',
    label: 'ATTEND',
    accent: '#2a6b38',
  },
  {
    id: 'place-colleges',
    contentId: 'colleges-stall',
    kind: 'building',
    texture: 'building-colleges',
    x: 130,
    y: 70,
    w: 6,
    h: 4,
    zoneId: 'hub',
    solid: true,
    door: 'south',
    label: 'COLLEGES',
    accent: '#6d5cb5',
  },
  {
    id: 'place-events-booth',
    contentId: 'events-booth',
    kind: 'building',
    texture: 'building-events-booth',
    x: 164,
    y: 58,
    w: 6,
    h: 3,
    zoneId: 'hub',
    solid: true,
    door: 'south',
    label: 'EVENTS',
    accent: '#6d5cb5',
  },
  {
    id: 'place-network',
    contentId: 'network-yard',
    kind: 'building',
    texture: 'building-network',
    x: 160,
    y: 89,
    w: 6,
    h: 3,
    zoneId: 'hub',
    solid: true,
    door: 'south',
    label: 'NETWORK',
    accent: '#e08a00',
  },
  {
    id: 'place-github',
    contentId: 'github-stall',
    kind: 'building',
    texture: 'building-github',
    x: 86,
    y: 99,
    w: 6,
    h: 4,
    zoneId: 'quest',
    solid: true,
    door: 'south',
    label: 'GITHUB',
    accent: '#e0b000',
  },
  {
    id: 'place-issues',
    contentId: 'issues-stall',
    kind: 'building',
    texture: 'building-issues',
    x: 100,
    y: 99,
    w: 6,
    h: 4,
    zoneId: 'quest',
    solid: true,
    door: 'south',
    label: 'ISSUES',
    accent: '#e08a00',
  },
  {
    id: 'place-help',
    contentId: 'help-stall',
    kind: 'building',
    texture: 'building-help',
    x: 112,
    y: 99,
    w: 5,
    h: 4,
    zoneId: 'quest',
    solid: true,
    door: 'south',
    label: 'HELP',
    accent: '#e08a00',
  },
  {
    id: 'place-mit',
    contentId: 'mit-stall',
    kind: 'building',
    texture: 'building-mit',
    x: 94,
    y: 132,
    w: 4,
    h: 3,
    zoneId: 'quest',
    solid: true,
    door: 'north',
    label: 'MIT',
    accent: '#e0b000',
  },
  {
    id: 'place-sign-plaza',
    contentId: 'sign-plaza',
    kind: 'sign',
    texture: 'sign-plaza',
    x: 108,
    y: 60,
    w: 3,
    h: 2,
    zoneId: 'plaza',
    solid: true,
    label: 'HOME',
    accent: '#e0b000',
  },
  {
    id: 'place-sign-events',
    contentId: 'sign-events',
    kind: 'sign',
    texture: 'sign-events',
    x: 104,
    y: 30,
    w: 3,
    h: 2,
    zoneId: 'events',
    solid: true,
    label: 'MEETUP',
    accent: '#2f8fbe',
  },
  {
    id: 'place-sign-lab',
    contentId: 'sign-lab',
    kind: 'sign',
    texture: 'sign-lab',
    x: 48,
    y: 66,
    w: 3,
    h: 2,
    zoneId: 'lab',
    solid: true,
    label: 'STUDY',
    accent: '#3f9a55',
  },
  {
    id: 'place-sign-hub',
    contentId: 'sign-hub',
    kind: 'sign',
    texture: 'sign-hub',
    x: 146,
    y: 66,
    w: 3,
    h: 2,
    zoneId: 'hub',
    solid: true,
    label: 'CREW',
    accent: '#6d5cb5',
  },
  {
    id: 'place-sign-quest',
    contentId: 'sign-quest',
    kind: 'sign',
    texture: 'sign-quest',
    x: 80,
    y: 104,
    w: 3,
    h: 2,
    zoneId: 'quest',
    solid: true,
    label: 'BUILD',
    accent: '#e08a00',
  },
  {
    id: 'place-poster-plaza',
    contentId: 'poster-plaza',
    kind: 'poster',
    texture: 'poster-plaza',
    x: 112,
    y: 62,
    w: 1,
    h: 2,
    zoneId: 'plaza',
    solid: true,
    accent: '#e0b000',
  },
  {
    id: 'place-poster-lab',
    contentId: 'poster-lab',
    kind: 'poster',
    texture: 'poster-lab',
    x: 40,
    y: 60,
    w: 1,
    h: 2,
    zoneId: 'lab',
    solid: true,
    accent: '#3f9a55',
  },
  {
    id: 'place-poster-hub',
    contentId: 'poster-hub',
    kind: 'poster',
    texture: 'poster-hub',
    x: 148,
    y: 60,
    w: 1,
    h: 2,
    zoneId: 'hub',
    solid: true,
    accent: '#6d5cb5',
  },
  {
    id: 'place-poster-quest-help',
    contentId: 'poster-quest-help',
    kind: 'poster',
    texture: 'poster-quest-help',
    x: 114,
    y: 112,
    w: 1,
    h: 2,
    zoneId: 'quest',
    solid: true,
    accent: '#e08a00',
  },
  {
    id: 'place-poster-quest-walk',
    contentId: 'poster-quest-walk',
    kind: 'poster',
    texture: 'poster-quest-walk',
    x: 82,
    y: 114,
    w: 1,
    h: 2,
    zoneId: 'quest',
    solid: true,
    accent: '#e08a00',
  },
] as const satisfies readonly InteractivePlacement[]

const fixedDecor = [
  { id: 'bench-plaza-w', kind: 'bench', texture: 'bench', x: 84, y: 80, w: 2, h: 1, solid: { x: 84, y: 80, w: 2, h: 1 } },
  { id: 'bench-plaza-e', kind: 'bench', texture: 'bench', x: 118, y: 86, w: 2, h: 1, solid: { x: 118, y: 86, w: 2, h: 1 } },
  { id: 'bench-events-w', kind: 'bench', texture: 'bench', x: 88, y: 38, w: 2, h: 1, solid: { x: 88, y: 38, w: 2, h: 1 } },
  { id: 'bench-events-e', kind: 'bench', texture: 'bench', x: 112, y: 40, w: 2, h: 1, solid: { x: 112, y: 40, w: 2, h: 1 } },
  { id: 'bench-lab-s', kind: 'bench', texture: 'bench', x: 50, y: 80, w: 2, h: 1, solid: { x: 50, y: 80, w: 2, h: 1 } },
  { id: 'bench-lab-n', kind: 'bench', texture: 'bench', x: 58, y: 60, w: 2, h: 1, solid: { x: 58, y: 60, w: 2, h: 1 } },
  { id: 'bench-hub-s', kind: 'bench', texture: 'bench', x: 136, y: 80, w: 2, h: 1, solid: { x: 136, y: 80, w: 2, h: 1 } },
  { id: 'bench-hub-n', kind: 'bench', texture: 'bench', x: 150, y: 60, w: 2, h: 1, solid: { x: 150, y: 60, w: 2, h: 1 } },
  { id: 'bench-quest-w', kind: 'bench', texture: 'bench', x: 80, y: 112, w: 2, h: 1, solid: { x: 80, y: 112, w: 2, h: 1 } },
  { id: 'bench-quest-e', kind: 'bench', texture: 'bench', x: 108, y: 120, w: 2, h: 1, solid: { x: 108, y: 120, w: 2, h: 1 } },
  { id: 'shrub-plaza-a', kind: 'shrub', texture: 'shrub', x: 82, y: 78, w: 1, h: 1 },
  { id: 'shrub-plaza-b', kind: 'shrub', texture: 'shrub', x: 118, y: 70, w: 1, h: 1 },
  { id: 'shrub-events', kind: 'shrub', texture: 'shrub', x: 110, y: 46, w: 1, h: 1 },
  { id: 'shrub-lab', kind: 'shrub', texture: 'shrub', x: 66, y: 60, w: 1, h: 1 },
  { id: 'shrub-hub', kind: 'shrub', texture: 'shrub', x: 134, y: 60, w: 1, h: 1 },
  { id: 'shrub-quest', kind: 'shrub', texture: 'shrub', x: 118, y: 104, w: 1, h: 1 },
  { id: 'shrub-plaza-c', kind: 'shrub', texture: 'shrub', x: 76, y: 88, w: 1, h: 1 },
  { id: 'shrub-plaza-d', kind: 'shrub', texture: 'shrub', x: 122, y: 64, w: 1, h: 1 },
  { id: 'shrub-events-b', kind: 'shrub', texture: 'shrub', x: 122, y: 49, w: 1, h: 1 },
  { id: 'shrub-lab-b', kind: 'shrub', texture: 'shrub', x: 22, y: 88, w: 1, h: 1 },
  { id: 'shrub-hub-b', kind: 'shrub', texture: 'shrub', x: 132, y: 88, w: 1, h: 1 },
  { id: 'shrub-quest-b', kind: 'shrub', texture: 'shrub', x: 120, y: 130, w: 1, h: 1 },
] as const satisfies readonly DecorPlacement[]

export const characterSpawns = [
  {
    id: 'plaza-ada',
    variant: 0,
    zoneId: 'plaza',
    canSit: false,
    canChat: true,
    sitWaypoint: 0,
    waypoints: [
      { x: 90, y: 84 },
      { x: 114, y: 84 },
      { x: 116, y: 70 },
      { x: 108, y: 68 },
      { x: 90, y: 70 },
    ],
  },
  {
    id: 'plaza-nia',
    variant: 1,
    zoneId: 'plaza',
    canSit: true,
    canChat: false,
    sitWaypoint: 1,
    waypoints: [
      { x: 100, y: 88 },
      { x: 116, y: 88 },
      { x: 116, y: 80 },
      { x: 100, y: 80 },
    ],
  },
  {
    id: 'events-omar',
    variant: 2,
    zoneId: 'events',
    canSit: false,
    canChat: false,
    sitWaypoint: 0,
    waypoints: [
      { x: 86, y: 44 },
      { x: 110, y: 44 },
      { x: 110, y: 32 },
      { x: 86, y: 32 },
    ],
  },
  {
    id: 'events-jules',
    variant: 3,
    zoneId: 'events',
    canSit: false,
    canChat: true,
    sitWaypoint: 0,
    waypoints: [
      { x: 90, y: 48 },
      { x: 116, y: 48 },
      { x: 116, y: 36 },
      { x: 90, y: 36 },
    ],
  },
  {
    id: 'lab-priya',
    variant: 4,
    zoneId: 'lab',
    canSit: false,
    canChat: false,
    sitWaypoint: 0,
    waypoints: [
      { x: 44, y: 84 },
      { x: 64, y: 84 },
      { x: 64, y: 64 },
      { x: 44, y: 64 },
    ],
  },
  {
    id: 'lab-leo',
    variant: 0,
    zoneId: 'lab',
    canSit: true,
    canChat: false,
    sitWaypoint: 1,
    waypoints: [
      { x: 46, y: 86 },
      { x: 66, y: 86 },
      { x: 66, y: 62 },
      { x: 46, y: 62 },
    ],
  },
  {
    id: 'hub-mina',
    variant: 1,
    zoneId: 'hub',
    canSit: false,
    canChat: false,
    sitWaypoint: 0,
    waypoints: [
      { x: 138, y: 84 },
      { x: 156, y: 84 },
      { x: 156, y: 64 },
      { x: 138, y: 64 },
    ],
  },
  {
    id: 'hub-hana',
    variant: 2,
    zoneId: 'hub',
    canSit: false,
    canChat: true,
    sitWaypoint: 0,
    waypoints: [
      { x: 142, y: 86 },
      { x: 158, y: 86 },
      { x: 158, y: 62 },
      { x: 142, y: 62 },
    ],
  },
  {
    id: 'quest-theo',
    variant: 3,
    zoneId: 'quest',
    canSit: false,
    canChat: false,
    sitWaypoint: 0,
    waypoints: [
      { x: 86, y: 108 },
      { x: 112, y: 108 },
      { x: 112, y: 118 },
      { x: 86, y: 118 },
    ],
  },
  {
    id: 'quest-chris',
    variant: 4,
    zoneId: 'quest',
    canSit: true,
    canChat: false,
    sitWaypoint: 2,
    waypoints: [
      { x: 90, y: 104 },
      { x: 116, y: 104 },
      { x: 116, y: 116 },
      { x: 90, y: 116 },
    ],
  },
  {
    id: 'plaza-ravi',
    variant: 2,
    zoneId: 'plaza',
    canSit: false,
    canChat: true,
    sitWaypoint: 0,
    waypoints: [
      { x: 78, y: 74 },
      { x: 78, y: 86 },
      { x: 81, y: 86 },
      { x: 81, y: 74 },
    ],
  },
  {
    id: 'plaza-sara',
    variant: 3,
    zoneId: 'plaza',
    canSit: false,
    canChat: false,
    sitWaypoint: 0,
    waypoints: [
      { x: 120, y: 66 },
      { x: 122, y: 66 },
      { x: 122, y: 78 },
      { x: 120, y: 78 },
    ],
  },
  {
    id: 'events-maya',
    variant: 4,
    zoneId: 'events',
    canSit: false,
    canChat: true,
    sitWaypoint: 0,
    waypoints: [
      { x: 96, y: 24 },
      { x: 106, y: 24 },
      { x: 106, y: 25 },
      { x: 96, y: 25 },
    ],
  },
  {
    id: 'events-dev',
    variant: 1,
    zoneId: 'events',
    canSit: false,
    canChat: false,
    sitWaypoint: 0,
    waypoints: [
      { x: 88, y: 49 },
      { x: 100, y: 49 },
      { x: 100, y: 50 },
      { x: 88, y: 50 },
    ],
  },
  {
    id: 'lab-anu',
    variant: 2,
    zoneId: 'lab',
    canSit: false,
    canChat: true,
    sitWaypoint: 0,
    waypoints: [
      { x: 23, y: 66 },
      { x: 23, y: 78 },
      { x: 24, y: 78 },
      { x: 24, y: 66 },
    ],
  },
  {
    id: 'lab-vikram',
    variant: 4,
    zoneId: 'lab',
    canSit: false,
    canChat: false,
    sitWaypoint: 0,
    waypoints: [
      { x: 68, y: 72 },
      { x: 68, y: 82 },
      { x: 69, y: 82 },
      { x: 69, y: 72 },
    ],
  },
  {
    id: 'hub-kira',
    variant: 0,
    zoneId: 'hub',
    canSit: false,
    canChat: true,
    sitWaypoint: 0,
    waypoints: [
      { x: 176, y: 66 },
      { x: 176, y: 80 },
      { x: 177, y: 80 },
      { x: 177, y: 66 },
    ],
  },
  {
    id: 'hub-neil',
    variant: 3,
    zoneId: 'hub',
    canSit: false,
    canChat: false,
    sitWaypoint: 0,
    waypoints: [
      { x: 132, y: 90 },
      { x: 144, y: 90 },
      { x: 144, y: 91 },
      { x: 132, y: 91 },
    ],
  },
  {
    id: 'quest-ira',
    variant: 1,
    zoneId: 'quest',
    canSit: false,
    canChat: true,
    sitWaypoint: 0,
    waypoints: [
      { x: 94, y: 106 },
      { x: 108, y: 106 },
      { x: 108, y: 107 },
      { x: 94, y: 107 },
    ],
  },
  {
    id: 'quest-sam',
    variant: 2,
    zoneId: 'quest',
    canSit: false,
    canChat: false,
    sitWaypoint: 0,
    waypoints: [
      { x: 76, y: 126 },
      { x: 76, y: 130 },
      { x: 77, y: 130 },
      { x: 77, y: 126 },
    ],
  },
] as const satisfies readonly CharacterSpawn[]

export function hash(x: number, y: number): number {
  let n = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263)
  n = Math.imul(n ^ (n >>> 13), 1274126177)
  return (n ^ (n >>> 16)) >>> 0
}

export function rectCenterPx(x: number, y: number, w: number, h: number): { x: number; y: number } {
  return { x: (x + w / 2) * TILE, y: (y + h / 2) * TILE }
}

export function tileCenterPx(tx: number, ty: number): { x: number; y: number } {
  return { x: (tx + 0.5) * TILE, y: (ty + 0.5) * TILE }
}

export function zoneById(id: ZoneId): ZoneDef | undefined {
  return zones.find((zone) => zone.id === id)
}

export function zoneAtPixel(x: number, y: number): ZoneDef | null {
  const tx = Math.floor(x / TILE)
  const ty = Math.floor(y / TILE)
  return zones.find((zone) => tx >= zone.x && tx < zone.x + zone.w && ty >= zone.y && ty < zone.y + zone.h) ?? null
}

let decorCache: readonly DecorPlacement[] | null = null

export function getDecor(): readonly DecorPlacement[] {
  decorCache ??= [...fixedDecor, ...buildGrassTrees()]
  return decorCache
}

export function allSolids(): SolidRect[] {
  const solids: SolidRect[] = []
  for (const item of interactives) {
    if (item.solid) solids.push({ x: item.x, y: item.y, w: item.w, h: item.h })
  }
  for (const item of getDecor()) {
    if (item.solid) solids.push(item.solid)
  }
  return solids
}

function overlaps(
  x: number,
  y: number,
  w: number,
  h: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number,
  pad: number,
): boolean {
  return x < rx + rw + pad && x + w > rx - pad && y < ry + rh + pad && y + h > ry - pad
}

function buildGrassTrees(): DecorPlacement[] {
  const trees: DecorPlacement[] = []
  const occupied = new Set<string>()
  let count = 0
  for (let y = 0; y < WORLD_ROWS - 3; y += 1) {
    for (let x = 0; x < WORLD_COLS - 2; x += 1) {
      if (hash(x, y) % 89 !== 0) continue
      if (footprintBlocked(x, y, 2, 3)) continue
      let crowded = false
      for (let ty = y; ty < y + 3 && !crowded; ty += 1) {
        for (let tx = x; tx < x + 2; tx += 1) {
          if (occupied.has(`${tx},${ty}`)) crowded = true
        }
      }
      if (crowded) continue
      for (let ty = y; ty < y + 3; ty += 1) {
        for (let tx = x; tx < x + 2; tx += 1) occupied.add(`${tx},${ty}`)
      }
      trees.push({
        id: `tree-${count}`,
        kind: 'tree',
        texture: 'tree',
        x,
        y,
        w: 2,
        h: 3,
        solid: { x, y: y + 2, w: 2, h: 1 },
      })
      count += 1
    }
  }
  return trees
}

function footprintBlocked(x: number, y: number, w: number, h: number): boolean {
  for (const zone of zones) {
    if (overlaps(x, y, w, h, zone.x, zone.y, zone.w, zone.h, 0)) return true
  }
  for (const path of paths) {
    if (overlaps(x, y, w, h, path.x, path.y, path.w, path.h, 1)) return true
  }
  return false
}

const BODY_RADIUS = 0.34

function blockedAt(px: number, py: number, solids: readonly SolidRect[]): boolean {
  return solids.some(
    (solid) =>
      px > solid.x - BODY_RADIUS &&
      px < solid.x + solid.w + BODY_RADIUS &&
      py > solid.y - BODY_RADIUS &&
      py < solid.y + solid.h + BODY_RADIUS,
  )
}

function segmentBlocked(from: TilePoint, to: TilePoint, solids: readonly SolidRect[]): boolean {
  const start = { x: from.x + 0.5, y: from.y + 0.5 }
  const end = { x: to.x + 0.5, y: to.y + 0.5 }
  const distance = Math.hypot(end.x - start.x, end.y - start.y)
  const steps = Math.max(1, Math.ceil(distance * 4))
  for (let step = 0; step <= steps; step += 1) {
    const t = step / steps
    const x = start.x + (end.x - start.x) * t
    const y = start.y + (end.y - start.y) * t
    if (blockedAt(x, y, solids)) return true
  }
  return false
}

export function validateLayout(): void {
  const solids = allSolids()
  const seenContent = new Set<string>()
  for (const placement of interactives) {
    if (seenContent.has(placement.contentId)) {
      throw new Error(`Duplicate content id ${placement.contentId}`)
    }
    seenContent.add(placement.contentId)
    const zone = zoneById(placement.zoneId)
    if (!zone) throw new Error(`Unknown zone ${placement.zoneId}`)
    if (
      placement.x < zone.x ||
      placement.y < zone.y ||
      placement.x + placement.w > zone.x + zone.w ||
      placement.y + placement.h > zone.y + zone.h
    ) {
      throw new Error(`${placement.id} sits outside ${zone.name}`)
    }
  }

  for (const spawn of characterSpawns) {
    const zone = zoneById(spawn.zoneId)
    if (!zone) throw new Error(`Unknown zone ${spawn.zoneId}`)
    if (spawn.waypoints.length < 2) throw new Error(`${spawn.id} needs two waypoints`)
    if (spawn.variant < 0 || spawn.variant > 4) throw new Error(`${spawn.id} has a bad variant`)
    if (spawn.sitWaypoint < 0 || spawn.sitWaypoint >= spawn.waypoints.length) {
      throw new Error(`${spawn.id} sit waypoint is out of range`)
    }
    for (const point of spawn.waypoints) {
      if (point.x < zone.x || point.x >= zone.x + zone.w || point.y < zone.y || point.y >= zone.y + zone.h) {
        throw new Error(`${spawn.id} waypoint ${point.x},${point.y} is outside ${zone.name}`)
      }
      if (blockedAt(point.x + 0.5, point.y + 0.5, solids)) {
        throw new Error(`${spawn.id} waypoint ${point.x},${point.y} is inside a solid`)
      }
    }
    for (let index = 0; index < spawn.waypoints.length; index += 1) {
      const from = spawn.waypoints[index]
      const to = spawn.waypoints[(index + 1) % spawn.waypoints.length]
      if (!from || !to) continue
      if (segmentBlocked(from, to, solids)) {
        throw new Error(`${spawn.id} path ${from.x},${from.y} -> ${to.x},${to.y} crosses a solid`)
      }
    }
  }
}
