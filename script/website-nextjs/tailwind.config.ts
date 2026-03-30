import type { Config } from 'tailwindcss'
import { lexicalSafelist } from './src/components/editor/scripts/lexical-safelist'

const lexicalRaw = lexicalSafelist.map((cls) => `<div class="${cls}"></div>`).join('\n')

export default {
  content: {
    files: ['./src/**/*.{ts,tsx,js,jsx,mdx}', { raw: lexicalRaw, extension: 'html' }],
  },
} satisfies Config
