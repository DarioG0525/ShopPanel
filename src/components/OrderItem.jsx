import StatusBadge from './StatusBadge.jsx'

const STATUSES = ['pendiente', 'reservado', 'cancelado', 'reagendado']

function OrderItem({ order, onChangeStatus }) {
  return (
    <article className="grid gap-4 rounded-[1.75rem] bg-white p-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)] ring-1 ring-slate-100 sm:grid-cols-[96px_1fr_auto] sm:items-center">
      <img
        src={order.thumbnail}
        alt={order.title}
        className="h-24 w-24 rounded-[1.25rem] object-cover"
      />

      <div className="space-y-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-950">{order.title}</h3>
            <p className="text-sm text-slate-500">Pedido reciente · Cantidad {order.quantity}</p>
          </div>
          <p className="text-xl font-black text-blue-700">${order.price}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="space-y-2 sm:min-w-44">
        <select
          value={order.status}
          onChange={(event) => onChangeStatus(order.id, event.target.value)}
          className="w-full rounded-[1rem] border-0 bg-blue-100 px-4 py-3 text-sm font-semibold text-slate-700 ring-1 ring-blue-100 outline-none"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </article>
  )
}

export default OrderItem
