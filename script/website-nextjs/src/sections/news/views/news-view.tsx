import NewsCard from '../components/card'

function NewsView() {
  const newsData = [
    {
      newId: '1',
      title: '點數超級送！即刻下載包你發，立享 100 點見面禮～',
      date: 1757288241000,
      category: '營運',
      imgUrl: 'https://picsum.photos/500/300',
    },
    {
      newId: '2',
      title: '點數超級送！即刻下載包你發，立享 100 點見面禮～',
      date: 1757288241000,
      category: '營運',
      imgUrl: 'https://picsum.photos/500/300',
    },
    {
      newId: '3',
      title: '點數超級送！即刻下載包你發，立享 100 點見面禮～',
      date: 1757288241000,
      category: '營運',
      imgUrl: 'https://picsum.photos/500/300',
    },
    {
      newId: '4',
      title: '點數超級送！即刻下載包你發，立享 100 點見面禮～',
      date: 1757288241000,
      category: '營運',
      imgUrl: 'https://picsum.photos/500/300',
    },
  ]

  return (
    <div className="py-4 sm:py-6">
      <h1 className="text-4xl font-bold mb-4">最新消息</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4">
        {newsData.map((news) => (
          <NewsCard key={news.newId} {...news} />
        ))}
      </div>
      <div>Pagination</div>
    </div>
  )
}

export default NewsView
