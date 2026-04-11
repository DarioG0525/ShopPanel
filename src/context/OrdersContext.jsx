import { createContext, useContext, useState } from 'react'
import { loadOrdersFromStorage, saveOrdersToStorage } from '../utils/storage.js'

const OrdersContext = createContext(null)

const INITIAL_STATUS = 'pendiente'

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(loadOrdersFromStorage)

  function addOrder(product) {
    const alreadyAdded = orders.some((order) => order.productId === product.id)
    if (alreadyAdded) {
      return false
    }

    const newOrder = {
      id: `${Date.now()}-${product.id}`,
      productId: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
      status: INITIAL_STATUS,
      createdAt: new Date().toISOString(),
    }

    const updatedOrders = [newOrder, ...orders]
    setOrders(updatedOrders)
    saveOrdersToStorage(updatedOrders)
    return true
  }

  function updateOrderStatus(orderId, status) {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status } : order,
    )

    setOrders(updatedOrders)
    saveOrdersToStorage(updatedOrders)
  }

  const value = { orders, addOrder, updateOrderStatus }

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) {
    throw new Error('useOrders debe usarse dentro de OrdersProvider.')
  }

  return context
}
