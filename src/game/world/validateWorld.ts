import { mockContentById } from '../../data/mockContent.ts'
import { interactives, validateLayout } from './layout.ts'

export function validateWorld(): void {
  validateLayout()
  for (const placement of interactives) {
    if (!mockContentById.has(placement.contentId)) {
      throw new Error(`Placement ${placement.id} points at missing content ${placement.contentId}`)
    }
  }
}
