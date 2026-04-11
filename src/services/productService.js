const BASE_URL = 'https://dummyjson.com'

export async function fetchProducts(search = '') {
  const url = search
    ? `${BASE_URL}/products/search?q=${encodeURIComponent(search)}`
    : `${BASE_URL}/products`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('No se pudieron consultar los productos.')
  }

  const data = await response.json()
  return data.products ?? []
}

export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`)
  if (!response.ok) {
    throw new Error('No se pudo consultar el detalle del producto.')
  }

  return response.json()
}
