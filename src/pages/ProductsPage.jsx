import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import ProductDetailModal from '../components/ProductDetailModal.jsx'
import { useOrders } from '../context/OrdersContext.jsx'
import { fetchProductById, fetchProducts } from '../services/productService.js'

function ProductsPage() {
  const { addOrder, orders } = useOrders()

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loadingDetail, setLoadingDetail] = useState(false)

  useEffect(() => {
    loadProducts('')
  }, [])

  const stats = useMemo(
    () => ({
      total: products.length,
      selected: orders.length,
      pending: orders.filter((item) => item.status === 'pendiente').length,
    }),
    [orders, products.length],
  )

  async function loadProducts(term) {
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const items = await fetchProducts(term)
      setProducts(items)
      if (items.length === 0) {
        setMessage('No se encontraron productos para esa busqueda.')
      }
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch(event) {
    event.preventDefault()
    await loadProducts(search.trim())
  }

  async function handleViewDetail(productId) {
    setLoadingDetail(true)
    setSelectedProduct({})

    try {
      const product = await fetchProductById(productId)
      setSelectedProduct(product)
    } catch {
      setSelectedProduct(null)
      setMessage('No se pudo abrir el detalle del producto.')
    } finally {
      setLoadingDetail(false)
    }
  }

  function handleSelect(product) {
    const added = addOrder(product)
    setMessage(
      added
        ? `Producto "${product.title}" agregado a pedidos.`
        : `El producto "${product.title}" ya estaba seleccionado.`,
    )
  }

  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_300px] xl:items-start">
      <div className="space-y-5">
        <header className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Productos</h2>
        </header>

        <form onSubmit={handleSearch} className="flex flex-col gap-2 sm:flex-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-[1.2rem] border-0 bg-white px-4 py-3 text-sm outline-none ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500"
            placeholder="Search products, brands, or category"
          />
          <button
            type="submit"
            className="rounded-[1.2rem] bg-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-800"
          >
            Buscar
          </button>
        </form>

        {message ? <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">{message}</p> : null}

        {error ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

        {loading ? (
          <p className="py-12 text-center text-slate-600">Cargando productos...</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={handleViewDetail}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </div>

      <aside className="space-y-4 xl:sticky xl:top-24">
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-600">Productos</span>
              <span className="text-xl font-black text-slate-950">{stats.total}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-600">Pedidos</span>
              <span className="text-xl font-black text-blue-700">{stats.selected}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-600">Pendientes</span>
              <span className="text-xl font-black text-amber-600">{stats.pending}</span>
            </div>
          </div>
        </div>
      </aside>

      <ProductDetailModal
        product={selectedProduct}
        isLoading={loadingDetail}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  )
}

export default ProductsPage
