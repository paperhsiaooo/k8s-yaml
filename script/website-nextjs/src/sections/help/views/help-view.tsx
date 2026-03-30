import Card from '../components/card'
import WrapContainer from './wrap-container'

function HelpView() {
  const cardsData = [
    {
      title: '註冊綁定帳號',
      description: '手機門號快速註冊，點數隨你換',
    },
    {
      title: '收集發點',
      description: '玩包你發送點數，豪禮帶回家！',
    },
    {
      title: '實體好禮兌換',
      description: 'iPhone、熱門家電，通通換得到！',
    },
    {
      title: '電子票券兌換',
      description: '多家特約商店，好康拿不停！',
    },
    {
      title: '虛擬寶物兌換',
      description: '點數換虛寶，遊戲體驗再升級！',
    },
    {
      title: '追蹤訂單',
      description: '好禮送到家，即時掌握超便利！',
    },
    {
      title: '使用電子票券',
      description: '簡單掃碼結帳，優惠立即享！',
    },
    {
      title: '點數紀錄查詢',
      description: '點數明細隨時看，一查就明白！',
    },
  ]

  return (
    <div className="py-4 sm:py-6">
      <h1 className="text-4xl font-bold mb-4">常見問題</h1>
      <div className="grid grid-cols-2 mb-4 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {cardsData.map((card) => (
          <Card key={card.title} title={card.title} description={card.description} />
        ))}
      </div>
      <WrapContainer />
    </div>
  )
}

export default HelpView
