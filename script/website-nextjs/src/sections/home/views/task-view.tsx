import { paths } from '@/routes/path'
import TaskCard from '../components/task-card'
import Link from 'next/link'
import { LuCircleArrowRight } from 'react-icons/lu'

function TaskView() {
  return (
    <section className="relative w-full min-h-screen bg-yile-300">
      <div className="max-w-[1538px] mx-auto py-12 md:py-24 px-6 md:px-10 space-y-6 md:space-y-11">
        {/* 標題 */}
        <h2 className="text-2xl md:text-6xl font-bold text-center">輕鬆獲得發點</h2>

        {/* 任務 Card 列表*/}
        <div className="flex flex-col gap-10 md:flex-row pb-10">
          <TaskCard.Container link={paths.tasks.root} className="w-full md:w-[470px]">
            <TaskCard.Content
              imageUrl={'https://picsum.photos/300/300'}
              title={'下載指定遊戲並達到十級以上即可獲得發點'}
              description={
                '等級達到十級以上即可獲得發點的簡述等級達到十級以上即可獲得發點的簡述等級達到十級...'
              }
              point={6000}
            />
          </TaskCard.Container>
          <TaskCard.Container link={paths.tasks.root} className="w-full md:w-[470px]">
            <TaskCard.Content
              imageUrl={'https://picsum.photos/300/300'}
              title={'下載指定遊戲並達到十級以上即可獲得發點'}
              description={
                '等級達到十級以上即可獲得發點的簡述等級達到十級以上即可獲得發點的簡述等級達到十級...'
              }
              point={6000}
            />
          </TaskCard.Container>
          <TaskCard.Container link={paths.tasks.root} className="w-full md:w-[470px]">
            <TaskCard.Content
              imageUrl={'https://picsum.photos/300/300'}
              title={'下載指定遊戲並達到十級以上即可獲得發點'}
              description={
                '等級達到十級以上即可獲得發點的簡述等級達到十級以上即可獲得發點的簡述等級達到十級...'
              }
              point={6000}
            />
          </TaskCard.Container>
        </div>

        {/* 更多任務 Button */}
        <div className="flex justify-center">
          <Link
            href={paths.tasks.root}
            className="inline-block w-[360px] md:w-[360px] h-20 md:h-[95px] border-[3px] border-yile-100 rounded-full bg-amber-100 overflow-hidden"
          >
            <div className="h-full px-8 md:px-[50px] flex justify-between items-center bg-gradient-03">
              <p className="text-2xl md:web-button-bold text-yile-950">更多任務</p>
              <LuCircleArrowRight className="text-3xl md:text-4xl text-yile-950" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TaskView
