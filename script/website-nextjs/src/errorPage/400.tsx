'use client'

type Props = {
  children?: React.ReactNode
}

function Error400({ children }: Props) {
  return (
    <div className="w-full px-4 py-12 640:px-8 1440:px-0">
      <div className="mx-auto max-w-375 rounded-3xl border border-white/10 bg-gradient-to-b from-[#FFF4EC] to-white text-[#2B1505] shadow-[0_25px_60px_rgba(232,128,80,0.18)] backdrop-blur-md 640:max-w-[640px] 1440:max-w-[880px]">
        <div className="flex flex-col items-center px-6 py-10 640:px-12 640:py-14">
          <h2 className="mt-2 text-2xl font-semibold 640:text-3xl">請求無效</h2>
          <p className="mt-4 text-center text-sm text-[#5B3414] 640:text-base">
            送出的資料格式有誤，或缺少必要資訊。請檢查欄位後重新送出，或回首頁繼續瀏覽。
          </p>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Error400
