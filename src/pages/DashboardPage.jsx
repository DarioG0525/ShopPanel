import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useOrders } from '../context/OrdersContext.jsx'

function DashboardPage() {
  const { user } = useAuth()
  const { orders } = useOrders()

  const pending = orders.filter((item) => item.status === 'pendiente').length
  const active = orders.filter((item) => item.status === 'reservado').length
  const rescheduled = orders.filter((item) => item.status === 'reagendado').length

  return (
    <section className="space-y-5 lg:space-y-6">
      <div className="grid gap-5">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Panel principal</h2>
          <p className="mt-2 text-sm text-slate-500">{user?.firstName} {user?.lastName}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Total</p>
              <p className="mt-1 text-3xl font-bold text-slate-950">{orders.length}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Pendientes</p>
              <p className="mt-1 text-3xl font-bold text-amber-600">{pending}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Reservados</p>
              <p className="mt-1 text-3xl font-bold text-sky-600">{active}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Reagendados</p>
              <p className="mt-1 text-3xl font-bold text-emerald-600">{rescheduled}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <Link
          to="/products"
          className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="text-sm font-medium text-blue-700">Catalogo</p>
          <h3 className="mt-1 text-xl font-bold text-slate-900">Explorar productos</h3>
        </Link>

        <Link
          to="/orders"
          className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="text-sm font-medium text-emerald-600">Pedidos</p>
          <h3 className="mt-1 text-xl font-bold text-slate-900">Gestionar estados</h3>
        </Link>

        <div className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:col-span-2 xl:col-span-1">
          <p className="text-sm font-medium text-slate-500">Reservados</p>
          <p className="mt-2 text-4xl font-black text-blue-700">{active}</p>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
