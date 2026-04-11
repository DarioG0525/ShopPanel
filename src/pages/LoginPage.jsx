import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({ username: 'dario.gonzalez', password: 'DarioGonzalez2026!' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(form)
      const target = location.state?.from?.pathname || '/dashboard'
      navigate(target, { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <aside className="hidden lg:flex lg:flex-col lg:justify-between lg:px-10 lg:py-10">
        <div className="max-w-xl space-y-8">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-blue-100 text-3xl shadow-inner">
              🛍️
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-700">ShopPanel</p>
              <h1 className="text-3xl font-black tracking-tight text-slate-950">Panel de pedidos</h1>
            </div>
          </div>

          <div className="rounded-[2.25rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-8 text-white shadow-[0_25px_70px_rgba(15,23,42,0.18)]">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-200/80">Order Activity</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">Curated Collection</h2>
            <p className="mt-3 max-w-lg text-base leading-7 text-slate-200">
              Explora productos, registra pedidos y cambia su estado con una interfaz limpia, simple y responsive.
            </p>

            <div className="mt-8 grid max-w-lg gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] bg-white/10 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-slate-300">Login</p>
                <p className="mt-1 text-2xl font-black">DummyJSON</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-slate-300">UI</p>
                <p className="mt-1 text-2xl font-black">Tailwind</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-slate-300">Estado</p>
                <p className="mt-1 text-2xl font-black">Persistente</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.75rem] bg-white/80 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
              <p className="text-sm font-semibold text-slate-500">Responsive</p>
              <p className="mt-1 text-lg font-bold text-slate-950">Mobile y desktop</p>
            </div>
            <div className="rounded-[1.75rem] bg-white/80 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
              <p className="text-sm font-semibold text-slate-500">Flujo</p>
              <p className="mt-1 text-lg font-bold text-slate-950">Login → productos → pedidos</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-500">Proyecto de entrega Unidad II</p>
      </aside>

      <section className="flex items-center justify-center px-4 py-10 lg:px-8">
        <div className="w-full max-w-md">
          <div className="mb-6 flex flex-col items-center text-center lg:hidden">
            <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-blue-100 text-4xl shadow-inner">
              🛍️
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950">ShopPanel</h1>
            <p className="mt-2 text-2xl font-medium text-slate-600">Sign in</p>
          </div>

          <div className="hidden lg:mb-6 lg:block">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-700">Welcome back</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Sign in</h2>
            <p className="mt-2 text-slate-600">Entra con credenciales DummyJSON para probar el panel.</p>
          </div>

          <form className="space-y-5 rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.12)] backdrop-blur" onSubmit={handleSubmit}>
            <label className="block space-y-2 text-sm">
              <span className="text-lg font-medium text-slate-700">Email or Username</span>
              <input
                type="text"
                value={form.username}
                onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
                className="w-full rounded-[1.1rem] border-0 bg-indigo-50 px-4 py-4 text-base outline-none ring-1 ring-transparent placeholder:text-slate-400 focus:ring-blue-500"
                required
              />
            </label>

            <label className="block space-y-2 text-sm">
              <span className="flex items-center justify-between text-lg font-medium text-slate-700">
                <span>Password</span>
                <span className="text-sm font-semibold text-blue-700">Forgot password?</span>
              </span>
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                className="w-full rounded-[1.1rem] border-0 bg-indigo-50 px-4 py-4 text-base outline-none ring-1 ring-transparent placeholder:text-slate-400 focus:ring-blue-500"
                required
              />
            </label>

            {error ? (
              <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[1.25rem] bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-4 text-lg font-semibold text-white shadow-[0_12px_25px_rgba(37,99,235,0.28)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Ingresando...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Credenciales de prueba (Dario Gonzalez): <strong>dario.gonzalez</strong> / <strong>DarioGonzalez2026!</strong>
          </p>
        </div>
      </section>
    </div>
  )
}

export default LoginPage
