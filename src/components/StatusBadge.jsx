const STATUS_STYLES = {
  pendiente: 'bg-orange-100 text-orange-700 border-orange-200',
  reservado: 'bg-blue-100 text-blue-700 border-blue-200',
  cancelado: 'bg-rose-100 text-rose-700 border-rose-200',
  reagendado: 'bg-emerald-100 text-emerald-700 border-emerald-200',
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[status] ?? 'bg-slate-100 text-slate-800 border-slate-300'}`}
    >
      {status}
    </span>
  )
}

export default StatusBadge
