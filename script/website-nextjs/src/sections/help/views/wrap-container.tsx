import { memo } from 'react'
import QAAccordion from '../components/qa-accordion'
import { QA_DATA } from '../constants/qa-data'

function WrapContainer() {
  return (
    <div className="flex flex-col gap-10">
      <QAAccordion items={QA_DATA} />
    </div>
  )
}

export default memo(WrapContainer)
