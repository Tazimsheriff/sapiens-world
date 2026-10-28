import type { SupabaseClient } from '@supabase/supabase-js'
import { mockContentById } from '../data/mockContent.ts'
import type { InteractiveContent, SearchResult } from '../types/content.ts'
import { interactives, rectCenterPx, zones } from '../game/world/layout.ts'
import { supabaseClient } from './supabaseClient.ts'

export interface ContentService {
  getById(id: string): Promise<InteractiveContent | null>
  search(query: string): Promise<SearchResult[]>
}

class MockContentService implements ContentService {
  private readonly supabase: SupabaseClient | null

  constructor(supabase: SupabaseClient | null) {
    this.supabase = supabase
  }

  async getById(id: string): Promise<InteractiveContent | null> {
    const content = mockContentById.get(id) ?? null
    if (this.supabase && content) {
      // A later phase replaces this return with a select on `interactive_content`.
      return content
    }
    return content
  }

  async search(query: string): Promise<SearchResult[]> {
    void this.supabase
    return searchWorld(query)
  }
}

function searchWorld(query: string): SearchResult[] {
  const needle = query.trim().toLowerCase()
  if (!needle) return []
  const results: SearchResult[] = []

  for (const zone of zones) {
    if (!zone.name.toLowerCase().includes(needle)) continue
    const center = rectCenterPx(zone.x, zone.y, zone.w, zone.h)
    results.push({ id: zone.id, title: zone.name, kind: 'zone', x: center.x, y: center.y })
  }

  for (const placement of interactives) {
    const content = mockContentById.get(placement.contentId)
    if (!content) continue
    const haystack = [content.title, content.description, ...(content.tags ?? [])].join(' ').toLowerCase()
    if (!haystack.includes(needle)) continue
    const center = rectCenterPx(placement.x, placement.y, placement.w, placement.h)
    results.push({
      id: placement.id,
      title: content.title,
      kind: 'object',
      x: center.x,
      y: center.y,
      contentId: placement.contentId,
    })
  }

  return results.slice(0, 8)
}

export function createContentService(): ContentService {
  return new MockContentService(supabaseClient)
}

export const contentService = createContentService()
