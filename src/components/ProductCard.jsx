import dustbin from "../assets/dustbin.png";

const ProductCard = ({ product, onAddToCart, deleteProduct }) => {
    const isLoggedin = sessionStorage.getItem("isLoggedIn");
    const role = sessionStorage.getItem("role");

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-56 bg-gray-50 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="max-h-52 max-w-full object-contain px-4" />
                <span className="absolute top-3 left-3 bg-rose-800 text-white text-xs px-2 py-1 rounded">{product.category}</span>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1 truncate">{product.description || ""}</p>

                <div className="mt-3 flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold text-black">₹{product.sellingprice}</p>
                        <p className="text-sm line-through text-rose-400">₹{product.originalprice}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onAddToCart(product)}
                            className="bg-rose-800 text-white px-3 py-2 rounded-md font-medium hover:bg-rose-700 transition"
                        >
                            Add
                        </button>

                        {isLoggedin && role === "admin" && (
                            <button onClick={() => deleteProduct(product.id)} className="p-2 rounded-md hover:bg-gray-100">
                                <img src={dustbin} alt="delete" className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

