import { useEffect, useState } from "react";
import dustbin from "../assets/dustbin.png";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const handleDeleteOrder = async (orderId) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "DELETE",
        headers: token ? { Authorization: token } : {},
      });
      if (!res.ok) throw new Error("Failed to delete order");
      // Remove the deleted order from the state
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete order");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch("http://localhost:3000/orders", {
          headers: token ? { Authorization: token } : {},
        });
        if (res.status === 401) {
          setOrders([]);
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setOrders([]);
      } 
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white p-8 rounded shadow-sm text-center">
            <p className="text-lg font-medium text-gray-600">You have no orders yet.</p>
            <p className="text-sm text-gray-400 mt-2">Browse products and place an order to see it here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{new Date(order.date).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">₹{order.total}</p>
                    <p className="text-sm text-gray-500">{order.items?.length || 0} items</p>
                    <button onClick={() => handleDeleteOrder(order.id)}><img src={dustbin} alt="delete" className="w-6 h-6" /></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-4">
                    {order.items && order.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-4 border border-gray-100 p-3 rounded">
                        <img src={it.image || it.product?.image} alt={it.name || it.product?.name} className="w-20 h-20 object-contain rounded" />
                        <div className="flex-1">
                          <p className="font-semibold">{it.name || it.product?.name}</p>
                          <p className="text-sm text-gray-500">Qty: {it.quantity ?? it.qty ?? 1}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{(it.sellingprice || it.price || it.product?.sellingprice) ?? 0}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <aside className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-600">Order Summary</p>
                    <div className="mt-2 flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{order.total}</span>
                    </div>
                  </aside>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
