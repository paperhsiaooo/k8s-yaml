type Props = {
  children?: React.ReactNode
}

function ErrorFallback429({ children }: Props) {
  return (
    <div className="w-full px-4 py-12 640:px-8 1440:px-0">
      <div className="mx-auto max-w-375 rounded-3xl border border-white/10 bg-gradient-to-b from-[#FFF7ED] to-white/95 text-[#2B1505] shadow-[0_25px_60px_rgba(255,122,0,0.18)] backdrop-blur-md 640:max-w-[640px] 1440:max-w-[880px]">
        <div className="flex flex-col items-center px-6 py-10 640:px-12 640:py-14">
          <h2 className="mt-2 text-2xl font-semibold 640:text-3xl">請稍候再試</h2>
          <p className="mt-4 text-center text-sm text-[#5B3414] 640:text-base">
            系統偵測到大量請求，正在為你排隊處理。稍作休息或重整即可繼續瀏覽推薦商品。
          </p>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback429
