import dustbin from "../assets/dustbin.png";

const CartItem = ({ index, item, cart, setCart }) => {
    const increaseQuantity = () => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        setCart(updatedCart);
    };
    const decreaseQuantity = () => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
            setCart(updatedCart);
        }
    };
    const handleRemove = () => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4 border border-gray-100">
            <img src={item.image} alt={item.name} className="w-28 h-28 object-contain rounded-md" />

            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold text-lg">{item.name}</p>
                        <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold">₹{item.sellingprice}</p>
                        <p className="text-sm line-through text-red-400">₹{item.originalprice}</p>
                    </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <button onClick={decreaseQuantity} className="px-3 py-1 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">-</button>
                        <div className="px-3 py-1 border rounded-md">{item.quantity}</div>
                        <button onClick={increaseQuantity} className="px-3 py-1 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">+</button>
                    </div>

                    <div className="flex items-center gap-4">
                        <p className="font-semibold">Subtotal: <span className="text-rose-800">₹{item.sellingprice * item.quantity}</span></p>
                        <button onClick={handleRemove} className="p-2 rounded-md hover:bg-gray-100">
                            <img src={dustbin} alt="delete" className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;