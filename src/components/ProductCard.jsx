function ProductCard({ product, onViewDetail, onSelect }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
      <div className="relative overflow-hidden rounded-t-[1.75rem] bg-slate-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-56 w-full object-cover transition duration-300 hover:scale-[1.03] sm:h-60"
        />
        <span className="absolute left-3 top-3 rounded-full bg-blue-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
          New arrival
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
          ★ {product.rating ?? 4.8}
        </span>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <div>
          <h3 className="line-clamp-1 text-xl font-bold text-slate-950">{product.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">{product.description}</p>
        </div>

        <div className="flex items-end justify-between gap-3">
          <p className="text-2xl font-black tracking-tight text-blue-700">${product.price}</p>
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => onViewDetail(product.id)}
              className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Ver detalle
            </button>
            <button
              type="button"
              onClick={() => onSelect(product)}
              className="rounded-2xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
