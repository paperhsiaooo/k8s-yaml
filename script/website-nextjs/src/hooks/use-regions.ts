import { getCounties, getDistrictsByCountyId } from '@/utils/regions'

type Props = {
  customCity?: string
}

function useRegions({ customCity = '' }: Props) {
  const counties = getCounties()
  const districts = customCity ? getDistrictsByCountyId(Number(customCity)) : []

  return {
    counties,
    districts,
  }
}

export default useRegions
