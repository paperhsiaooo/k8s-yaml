// 讀取靜態縣市資料（tsconfig 已設定 resolveJsonModule 與 paths）
import regionsData from '@/constants/regions.json'

// 定義資料型別，確保映射時有型別提示
type District = {
  id: number
  name: string
  zip_code?: string
}

type County = {
  id: number
  name: string
  code?: string
  districts: District[]
}

const regions = regionsData as County[]

/**
 * 取得所有縣市（僅回傳 id 與 name）
 */
export function getCounties(): Array<{ value: string; label: string }> {
  return regions.map(({ id, name }) => ({ value: `${id}`, label: name }))
}

/**
 * 依縣市 id 取得該縣市的所有區域（僅回傳 id 與 name）
 * @param countyId 縣市的 id
 * @returns 對應區域清單；若找不到縣市則回傳空陣列
 */
export function getDistrictsByCountyId(countyId: number): Array<{ value: string; label: string }> {
  const county = regions.find((c) => c.id === countyId)
  if (!county) return []
  return county.districts.map(({ id, name }) => ({ value: `${id}`, label: name }))
}

/**
 * 透過縣市 id 取得縣市名稱
 * @param countyId 縣市的 id
 * @returns 縣市名稱；若找不到則回傳 undefined
 */
export function getCountyNameById(countyId: number): string | undefined {
  if (!countyId) return '-'

  const county = regions.find((c) => c.id === countyId)
  return county?.name
}

/**
 * 透過區域 id 取得區域名稱
 * @param districtId 區域的 id
 * @returns 區域名稱；若找不到則回傳 undefined
 */
export function getDistrictNameById(districtId: number): string | undefined {
  if (!districtId) return '-'

  for (const county of regions) {
    const district = county.districts.find((d) => d.id === districtId)
    if (district) return district.name
  }
  return undefined
}

/**
 * 透過區域 id 取得完整的縣市與區域資訊
 * @param districtId 區域的 id
 * @returns 包含縣市與區域名稱的物件；若找不到則回傳 undefined
 */
export function getFullAddressByDistrictId(
  districtId: number
): { countyName: string; districtName: string } | undefined {
  for (const county of regions) {
    const district = county.districts.find((d) => d.id === districtId)
    if (district) {
      return {
        countyName: county.name,
        districtName: district.name,
      }
    }
  }
  return undefined
}
