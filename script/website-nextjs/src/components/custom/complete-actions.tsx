import Button1 from '@/components/custom/button/button1'
import { PiArrowCircleRightBold } from 'react-icons/pi'
interface CompleteActionsProps {
  onButtonClick?: () => void
}

function CompleteActions({ onButtonClick }: CompleteActionsProps) {
  return (
    <div className="text-center space-y-6">
      {/* 回首頁按鈕 */}
      <Button1
        onClick={onButtonClick}
        type="button"
        className={`max-w-xs mx-auto px-6 py-3 gap-x-4 border-4 640:px-8 640:py-4`}
      >
        <p className="text-yile-950 web-text-bold-01 640:web-text-bold-02 1440:web-button-bold">
          查看詳情
        </p>
        <PiArrowCircleRightBold className="text-yile-950 text-2xl 640:text-4xl" />
      </Button1>
    </div>
  )
}

export default CompleteActions
