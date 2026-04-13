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
    <div className="min-h-screen flex items-center justify-center px-4 py-10 lg:px-8">
      <section className="w-full max-w-md">
        <div className="w-full max-w-md">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-blue-100 text-4xl shadow-inner">
              🛍️
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950">ShopPanel</h1>
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
              <span className="text-lg font-medium text-slate-700">Password</span>
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

          <p className="mt-6 text-center text-sm text-slate-500">Dario Gonzalez / DarioGonzalez2026!</p>
        </div>
      </section>
    </div>
  )
}

export default LoginPage
