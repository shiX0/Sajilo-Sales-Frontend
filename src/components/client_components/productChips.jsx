const ProductChips = ({ product, quantity }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-zinc-900 w-full max-w-md">
      <img
        src={baseUrl + product.imageUrl}
        alt="image"
        className="w-20 h-16 rounded"
      />
      <div className="ml-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-blue-500">${product.price}</p>
      </div>
      <div className="ml-auto">
        <p className="text-gray-500">x{quantity}</p>
      </div>
    </div>
  );
};

export default ProductChips;
