// scripts/lexical-safelist.ts
import { editorTheme } from '../themes/editor-theme'

const flatten = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.flatMap(flatten)
    : typeof value === 'object' && value !== null
    ? Object.values(value).flatMap(flatten)
    : typeof value === 'string'
    ? value.split(/\s+/).filter(Boolean)
    : []

export const lexicalSafelist = Array.from(new Set(flatten(editorTheme)))
