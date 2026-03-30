'use client'

import Error400 from './400'
import Error401 from './401'
import Error403 from './403'
import Error404 from './404'
import Error429 from './429'
import Error500 from './500'
import Error502 from './502'

type Props = {
  httpStatus: number
}

function ErrorPageRoot({ httpStatus }: Props) {
  const renderPage = () => {
    if (httpStatus === 400) {
      return <Error400 />
    } else if (httpStatus === 401) {
      return <Error401 />
    } else if (httpStatus === 403) {
      return <Error403 />
    } else if (httpStatus === 404) {
      return <Error404 />
    } else if (httpStatus === 429) {
      return <Error429 />
    } else if (httpStatus === 500) {
      return <Error500 />
    } else if (httpStatus === 502) {
      return <Error502 />
    }

    // 未知狀態統一視為 500，確保使用者體驗一致
    return <Error500 />
  }

  return <div className="wrapper">{renderPage()}</div>
}

export default ErrorPageRoot
