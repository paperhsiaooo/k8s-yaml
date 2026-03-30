import { memo } from 'react'

function NewsView() {
  return (
    <div className="relative w-full h-screen max-h-[900px]">
      <div className="flex justify-center items-center h-full">
        <h2 className="text-4xl font-bold">最新消息</h2>
      </div>
    </div>
  )
}

export default memo(NewsView)
