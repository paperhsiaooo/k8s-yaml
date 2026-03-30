import { MdOutlinePeopleAlt } from 'react-icons/md'

type Props = {
  label?: string
}

function NoBindingCard({ label = '目前尚未綁定任何帳號' }: Props) {
  return (
    <div className="rounded-full bg-white border-gray border-[1px] overflow-hidden">
      <div className="p-2.5 flex flex-row items-center gap-x-2.5 640:p-5 640:gap-x-5 1440:p-2.5">
        <div className="relative border-2 border-yile-300 bg-yile-50 rounded-full w-[70px] aspect-square 1440:w-[100px]">
          <MdOutlinePeopleAlt className="size-8 text-yile-950 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 1440:size-10" />
        </div>
        <p className="text-gray mob-button-small 1440:web-button-small">{label}</p>
      </div>
    </div>
  )
}

export default NoBindingCard
