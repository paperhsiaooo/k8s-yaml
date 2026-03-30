type Props = {
  note: string
}

function DeliveryNote({ note }: Props) {
  return <div className="rounded-xl p-6 bg-gray-100 text-sm text-gray-600">{note}</div>
}

export default DeliveryNote
