function ProductDetailModal({ product, isLoading, onClose }) {
  if (!product && !isLoading) {
    return null
  }

  return (
    <div className="fixed inset-0 z-30 bg-slate-950/45 p-3 sm:p-4">
      <div className="mx-auto flex h-full w-full max-w-2xl items-center justify-center">
        <div className="max-h-[92vh] w-full overflow-auto rounded-[2rem] bg-white shadow-[0_25px_70px_rgba(15,23,42,0.2)]">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-700">Product Detail</p>
              <h2 className="text-lg font-bold text-slate-950">Detalle de producto</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            >
              Cerrar
            </button>
          </div>

          {isLoading ? (
            <p className="py-20 text-center text-slate-600">Cargando detalle...</p>
          ) : (
            <div className="space-y-5 p-5 sm:p-6">
              <div className="overflow-hidden rounded-[1.75rem] bg-slate-100 p-3 shadow-inner">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-72 w-full rounded-[1.5rem] object-cover"
                />
              </div>

              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                    {product.category}
                  </span>
                  <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">{product.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    ★ {product.rating ?? 4.8} · Stock {product.stock ?? 0}
                  </p>
                </div>

                <span className="rounded-[1.25rem] bg-blue-700 px-4 py-2 text-lg font-black text-white shadow-sm">
                  ${product.price}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Brand</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{product.brand ?? 'DummyJSON'}</p>
                </div>
                <div className="rounded-[1.5rem] bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Availability</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">Disponible para pedido</p>
                </div>
              </div>

              <p className="text-sm leading-7 text-slate-700">{product.description}</p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-[1.25rem] bg-slate-100 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Volver
                </button>
                <button
                  type="button"
                  className="rounded-[1.25rem] bg-blue-700 px-4 py-3 font-semibold text-white shadow-sm hover:bg-blue-800"
                >
                  Order Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal
