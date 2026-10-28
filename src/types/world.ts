export type ZoneId = 'plaza' | 'events' | 'lab' | 'hub' | 'quest'

export type TilePoint = {
  x: number
  y: number
}

export type SolidRect = {
  x: number
  y: number
  w: number
  h: number
}

export type DoorSide = 'north' | 'south' | 'east' | 'west'

export type ObjectKind = 'building' | 'poster' | 'sign' | 'landmark'

export type ZoneDef = {
  id: ZoneId
  name: string
  x: number
  y: number
  w: number
  h: number
  floor: number
  accent: string
}

export type InteractivePlacement = {
  id: string
  contentId: string
  kind: ObjectKind
  texture: string
  x: number
  y: number
  w: number
  h: number
  zoneId: ZoneId
  solid: boolean
  door?: DoorSide
  label?: string
  accent: string
}

export type DecorKind = 'tree' | 'bench' | 'shrub'

export type DecorPlacement = {
  id: string
  kind: DecorKind
  texture: string
  x: number
  y: number
  w: number
  h: number
  solid?: SolidRect
}

export type CharacterSpawn = {
  id: string
  variant: number
  zoneId: ZoneId
  waypoints: readonly TilePoint[]
  canSit: boolean
  canChat: boolean
  sitWaypoint: number
}
