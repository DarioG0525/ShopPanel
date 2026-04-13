import { useMemo, useState } from 'react'
import OrderItem from '../components/OrderItem.jsx'
import { useOrders } from '../context/OrdersContext.jsx'

function OrdersPage() {
  const { orders, updateOrderStatus } = useOrders()
  const [filter, setFilter] = useState('todos')

  const filteredOrders = useMemo(() => {
    if (filter === 'todos') {
      return orders
    }

    return orders.filter((order) => order.status === filter)
  }, [orders, filter])

  const summary = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((order) => order.status === 'pendiente').length,
      reserved: orders.filter((order) => order.status === 'reservado').length,
      canceled: orders.filter((order) => order.status === 'cancelado').length,
    }),
    [orders],
  )

  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_300px] xl:items-start">
      <div className="space-y-5">
        <header className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Pedidos</h2>
        </header>

        <div className="flex flex-col gap-3 rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:flex-row sm:items-center">
          <select
            id="filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-[1rem] border-0 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 outline-none ring-1 ring-slate-200"
          >
            <option value="todos">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="reservado">Reservado</option>
            <option value="cancelado">Cancelado</option>
            <option value="reagendado">Reagendado</option>
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <article className="rounded-[1.75rem] bg-white p-6 text-center text-slate-600 shadow-sm ring-1 ring-slate-100">
            Aun no tienes pedidos para este filtro.
          </article>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <OrderItem
                key={order.id}
                order={order}
                onChangeStatus={updateOrderStatus}
              />
            ))}
          </div>
        )}
      </div>

      <aside className="space-y-4 xl:sticky xl:top-24">
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-600">Total</span>
              <span className="text-xl font-black text-slate-950">{summary.total}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-600">Pendientes</span>
              <span className="text-xl font-black text-amber-600">{summary.pending}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-600">Reservados</span>
              <span className="text-xl font-black text-sky-600">{summary.reserved}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-600">Cancelados</span>
              <span className="text-xl font-black text-rose-600">{summary.canceled}</span>
            </div>
          </div>
        </div>
      </aside>
    </section>
  )
}

export default OrdersPage
