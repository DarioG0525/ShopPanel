import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useOrders } from '../context/OrdersContext.jsx'

function DashboardPage() {
  const { user } = useAuth()
  const { orders } = useOrders()

  const pending = orders.filter((item) => item.status === 'pendiente').length
  const active = orders.filter((item) => item.status === 'reservado').length
  const canceled = orders.filter((item) => item.status === 'cancelado').length
  const rescheduled = orders.filter((item) => item.status === 'reagendado').length

  return (
    <section className="space-y-5 lg:space-y-6">
      <div className="grid gap-5 xl:grid-cols-[1.35fr_.9fr]">
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-6 text-white shadow-[0_20px_50px_rgba(15,23,42,0.18)] sm:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-blue-200/80">Order Activity</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Panel principal</h2>
          <p className="mt-2 max-w-xl text-base leading-7 text-slate-200">
            {user?.firstName}, aqui revisas tus productos, registras pedidos y cambias su estado sin complicarte.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-slate-300">Total</p>
              <p className="mt-1 text-3xl font-bold">{orders.length}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-slate-300">Pendientes</p>
              <p className="mt-1 text-3xl font-bold text-amber-300">{pending}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-slate-300">Reservados</p>
              <p className="mt-1 text-3xl font-bold text-sky-300">{active}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-slate-300">Reagendados</p>
              <p className="mt-1 text-3xl font-bold text-emerald-300">{rescheduled}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">Resumen rapido</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-600">Pedidos activos</span>
                <span className="text-xl font-black text-slate-950">{orders.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-600">Cancelados</span>
                <span className="text-xl font-black text-rose-600">{canceled}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-600">Pendientes</span>
                <span className="text-xl font-black text-amber-600">{pending}</span>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">Perfil</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-blue-100 text-2xl">
                👤
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-950">{user?.firstName} {user?.lastName}</h3>
                <p className="text-sm text-slate-500">{user?.username}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              La sesion permanece guardada en localStorage para simular persistencia real.
            </p>
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
          <p className="mt-2 text-sm text-slate-600">Busca, revisa el detalle y agrega a pedidos.</p>
        </Link>

        <Link
          to="/orders"
          className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="text-sm font-medium text-emerald-600">Pedidos</p>
          <h3 className="mt-1 text-xl font-bold text-slate-900">Gestionar estados</h3>
          <p className="mt-2 text-sm text-slate-600">Reserva, cancela o reagenda desde un solo lugar.</p>
        </Link>

        <div className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:col-span-2 xl:col-span-1">
          <p className="text-sm font-medium text-slate-500">Estado general</p>
          <p className="mt-2 text-4xl font-black text-blue-700">{active}</p>
          <p className="mt-2 text-sm text-slate-600">Pedidos reservados listos para seguimiento.</p>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
