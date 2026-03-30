import { WithClassName } from '@/types/common'
import IconSync from '../icons/icon-sync'

type Props = WithClassName<{
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}>

function SyncButton({ variant = 'primary', onClick }: Props) {
  return (
    <button
      type="button"
      className="cursor-pointer duration-200 hover:opacity-60 active:opacity-60"
      onClick={onClick}
    >
      <IconSync className="size-5" variant={variant} />
    </button>
  )
}

export default SyncButton
