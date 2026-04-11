import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function sidebarNavClass({ isActive }) {
  return `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
    isActive
      ? 'bg-blue-100 text-blue-700 shadow-sm ring-1 ring-blue-100'
      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
  }`
}

function tabClass({ isActive }) {
  return `flex flex-1 flex-col items-center gap-1 rounded-[1.2rem] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition ${
    isActive
      ? 'bg-blue-50 text-blue-700 shadow-sm'
      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'
  }`
}

function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen lg:flex">
      <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-80 lg:flex-col lg:border-r lg:border-white/70 lg:bg-white/80 lg:px-5 lg:py-6 lg:backdrop-blur-xl">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-xl text-white shadow-sm">
            🛍️
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-950">ShopPanel</h1>
            <p className="text-sm text-slate-500">{user?.firstName} {user?.lastName}</p>
          </div>
        </div>

        <div className="mt-6 rounded-[1.75rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-5 text-white shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-200/80">Order Activity</p>
          <h2 className="mt-3 text-2xl font-black tracking-tight">Panel de usuario</h2>
          <p className="mt-2 text-sm leading-6 text-slate-200">
            Gestiona productos, pedidos y estados desde una interfaz simple y limpia.
          </p>
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-2 px-1">
          <NavLink to="/dashboard" className={sidebarNavClass}>
            <span>⌂</span>
            <span>Inicio</span>
          </NavLink>
          <NavLink to="/products" className={sidebarNavClass}>
            <span>⌕</span>
            <span>Catalogo</span>
          </NavLink>
          <NavLink to="/orders" className={sidebarNavClass}>
            <span>☰</span>
            <span>Pedidos</span>
          </NavLink>
        </nav>

        <div className="mt-auto space-y-3 px-1">
          <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Sesion activa</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {user?.username}
            </p>
            <p className="text-sm text-slate-500">Sesion persistida con localStorage</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Cerrar sesion
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col pb-24 lg:pb-0">
        <header className="sticky top-0 z-20 border-b border-white/70 bg-white/75 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-blue-100 text-lg shadow-sm">
                {user?.image ? (
                  <img src={user.image} alt={user?.firstName ?? 'Usuario'} className="h-full w-full object-cover" />
                ) : (
                  '🛍️'
                )}
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-950">ShopPanel</h1>
                <p className="text-xs text-slate-500">Hola, {user?.firstName}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/products')}
              className="rounded-2xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              🛒
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>

        <nav className="fixed inset-x-3 bottom-3 z-30 mx-auto flex max-w-md items-stretch gap-1 rounded-[1.5rem] border border-slate-200 bg-white/95 p-2 shadow-[0_20px_40px_rgba(15,23,42,0.12)] backdrop-blur lg:hidden">
          <NavLink to="/dashboard" className={tabClass}>
            <span>⌂</span>
            <span>Inicio</span>
          </NavLink>
          <NavLink to="/products" className={tabClass}>
            <span>⌕</span>
            <span>Catalogo</span>
          </NavLink>
          <NavLink to="/orders" className={tabClass}>
            <span>☰</span>
            <span>Pedidos</span>
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default AppLayout
