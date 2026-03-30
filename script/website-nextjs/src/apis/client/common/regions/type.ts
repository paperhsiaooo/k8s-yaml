import { z } from 'zod'

export const RegionsPrefix = 'regions'

// ----------------------------------------------------------------------

export const RegionsCountiesResSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  })
)

export type RegionsCountiesResType = z.infer<typeof RegionsCountiesResSchema>

// ----------------------------------------------------------------------

export const RegionsDistrictsResSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  })
)

export type RegionsDistrictsResType = z.infer<typeof RegionsDistrictsResSchema>

// ----------------------------------------------------------------------
