import ProductCard from "./ProductCard";

const ProductList = ({ products, onAddToCart, deleteProduct }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <div className="flex items-center justify-between mt-10 mb-6">
                <h1 className="text-3xl font-bold">Products</h1>
                <p className="text-sm text-gray-500">Showing {products.length} products</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id ?? product._id}
                        product={product}
                        onAddToCart={onAddToCart}
                        deleteProduct={deleteProduct}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
