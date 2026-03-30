import Image from 'next/image'
import { ArticleSchema } from '@/components/structured-data'

type Props = {
  newId: string
}

function NewView({ newId }: Props) {
  console.log('newId: ', newId)

  // TODO: 這裡需要根據實際的 API 來獲取文章資料
  // 目前使用模擬資料
  const articleData = {
    headline: '【包你發 × 三大電信】超強跨界合作！儲值滿額送好禮！電信支付加碼優惠最高10%！',
    description:
      '包你發與三大電信攜手合作，推出超強優惠活動！儲值滿額即可獲得豐富好禮，電信支付加碼優惠最高10%！',
    image: 'https://picsum.photos/1065/599',
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: 'Pointory 編輯部',
    publisher: 'Pointory 包鑽商城',
  }

  return (
    <>
      {/* 文章結構化資料 */}
      <ArticleSchema
        headline={articleData.headline}
        description={articleData.description}
        image={articleData.image}
        datePublished={articleData.datePublished}
        dateModified={articleData.dateModified}
        author={articleData.author}
        publisher={articleData.publisher}
      />

      <div className="bg-yile-100">
        <div className="max-w-[1515px] mx-auto px-6 xl:px-10 py-10 flex flex-col gap-y-14 xl:gap-y-36">
          <h1 className="text-xl font-bold xl:text-h1 text-black-1">
            【包你發 × 三大電信】超強跨界合作！儲值滿額送好禮！電信支付加碼優惠最高10%！
          </h1>

          <div className="rounded-tl-[30px] rounded-tr-[30px] rounded-bl-[15px] rounded-br-[15px] xl:rounded-tl-[60px] xl:rounded-tr-[60px] xl:rounded-bl-[30px] xl:rounded-br-[30px] bg-white">
            <div className="relative px-6 xl:px-32 pb-10 xl:pb-16 pt-32 xl:pt-[500px] space-y-5">
              <div className="absolute left-1/2 -translate-x-1/2 -top-10 xl:-top-32 p-1 xl:p-2 bg-white rounded-[33px] border-2 xl:border-4 border-yile-300 w-[230px] xl:w-[1065px]">
                <div className="relative w-full aspect-[1065/599] rounded-[25px] overflow-hidden">
                  <Image
                    src={'https://picsum.photos/1065/599'}
                    alt="new"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col xl:flex-row gap-2 justify-center">
                <span className="bg-green-2 px-5 py-1.5 rounded-full text-white inline-block text-center">
                  2025/1/20（一）12:30~2025/2/28（五）23:59
                </span>
                <span className="bg-blue-600 px-5 py-1.5 rounded-full text-white inline-block text-center">
                  活動
                </span>
              </div>
              <p>
                活動期間內至e-PLAY特約門市購買MyCard《包你發娛樂城》專屬卡1000點，2025/2/28(五)23:59前成功儲值至遊戲帳號，即可獲得加碼道具卡乙張。
                  專屬卡內容物： 　1.包你發點數1040點 　2.道具卡乙張
                　道具卡：隨機贈送【金龍爆喜】、【變臉金鑽版】一般廳3~5星道具卡(遊戲獎勵卡/威力卡/威力卡+)
                1張。   ★注意★ 請務必告知門市人員要購買《包你發娛樂城
                專屬卡1000點》，否則會買到一般的MyCard點數喔！  
                ※備註： 　1.限量商品，售完為止(不限儲值次數) 　2.專屬卡售出不退 　3.虛寶兌換期限2025/3/1(六)23:59
                  e-PLAY門市：https://www.e-play.com.tw/eMap 這裡也能買:
                燦坤、全國電子、順發、美聯社、三井等e-PLAY特約門市 ※ 小北百貨、墊腳石、家樂福
                (量販/超市) 無販售此專屬卡
                <br />
                活動期間內至e-PLAY特約門市購買MyCard《包你發娛樂城》專屬卡1000點，2025/2/28(五)23:59前成功儲值至遊戲帳號，即可獲得加碼道具卡乙張。
                  專屬卡內容物： 　1.包你發點數1040點 　2.道具卡乙張
                　道具卡：隨機贈送【金龍爆喜】、【變臉金鑽版】一般廳3~5星道具卡(遊戲獎勵卡/威力卡/威力卡+)
                1張。   ★注意★ 請務必告知門市人員要購買《包你發娛樂城
                專屬卡1000點》，否則會買到一般的MyCard點數喔！  
                ※備註： 　1.限量商品，售完為止(不限儲值次數) 　2.專屬卡售出不退 　3.虛寶兌換期限2025/3/1(六)23:59
                  e-PLAY門市：https://www.e-play.com.tw/eMap 這裡也能買:
                燦坤、全國電子、順發、美聯社、三井等e-PLAY特約門市 ※ 小北百貨、墊腳石、家樂福
                (量販/超市) 無販售此專屬卡
                <br />
                活動期間內至e-PLAY特約門市購買MyCard《包你發娛樂城》專屬卡1000點，2025/2/28(五)23:59前成功儲值至遊戲帳號，即可獲得加碼道具卡乙張。
                  專屬卡內容物： 　1.包你發點數1040點 　2.道具卡乙張
                　道具卡：隨機贈送【金龍爆喜】、【變臉金鑽版】一般廳3~5星道具卡(遊戲獎勵卡/威力卡/威力卡+)
                1張。   ★注意★ 請務必告知門市人員要購買《包你發娛樂城
                專屬卡1000點》，否則會買到一般的MyCard點數喔！  
                ※備註： 　1.限量商品，售完為止(不限儲值次數) 　2.專屬卡售出不退 　3.虛寶兌換期限2025/3/1(六)23:59
                  e-PLAY門市：https://www.e-play.com.tw/eMap 這裡也能買:
                燦坤、全國電子、順發、美聯社、三井等e-PLAY特約門市 ※ 小北百貨、墊腳石、家樂福
                (量販/超市) 無販售此專屬卡
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewView
