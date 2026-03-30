'use client'

type Props = {
  children?: React.ReactNode
}

function Error502({ children }: Props) {
  return (
    <div className="w-full px-4 py-12 640:px-8 1440:px-0">
      <div className="mx-auto max-w-375 rounded-3xl border border-white/10 bg-gradient-to-b from-[#FFF1EB] to-white text-[#2B1505] shadow-[0_25px_60px_rgba(243,104,0,0.15)] backdrop-blur-md 640:max-w-[640px] 1440:max-w-[880px]">
        <div className="flex flex-col items-center px-6 py-10 640:px-12 640:py-14">
          <h2 className="mt-2 text-2xl font-semibold 640:text-3xl">服務暫時離線</h2>
          <p className="mt-4 text-center text-sm text-[#5B3414] 640:text-base">
            我們正在為你修復伺服器。可以先返回首頁或稍待片刻再試一次，如需協助請聯繫客服。
          </p>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Error502
