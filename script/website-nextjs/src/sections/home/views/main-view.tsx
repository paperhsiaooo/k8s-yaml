import { memo } from 'react'

function MainView() {
  return (
    <div className="relative w-full h-screen max-h-[900px] bg-gray-100">
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center gap-y-3">
          <p className="text-5xl">LOGO</p>
          <button className="bg-amber-500 px-10 py-2 rounded-3xl border-[4px] shadow-lg border-white">
            立即加入
          </button>
          <p>做任務｜拿發點｜換優惠券</p>
        </div>
      </div>
    </div>
  )
}

export default memo(MainView)
