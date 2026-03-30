export function formatWithCommas(input: number | string, fallback = ''): string {
  if (input === null || input === undefined) return fallback

  // 轉為字串並移除既有逗號
  const raw = String(input).trim().replace(/,/g, '')
  if (raw === '') return fallback

  // 無效數字時給 fallback
  if (isNaN(Number(raw))) return fallback

  const sign = raw.startsWith('-') ? '-' : ''
  const abs = sign ? raw.slice(1) : raw

  const [intPart, decPart] = abs.split('.')
  const intWithCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return decPart !== undefined && decPart !== ''
    ? `${sign}${intWithCommas}.${decPart}`
    : `${sign}${intWithCommas}`
}
