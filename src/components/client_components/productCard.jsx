/* eslint-disable react/prop-types */
const ProductCard = ({ product }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return (
    <div className="max-w-sm h-full max-h-md rounded-lg overflow-hidden shadow-lg p-4 bg-white dark:bg-zinc-900">
      <img
        className="w-full h-48 object-cover rounded"
        src={baseUrl + product.imageUrl}
        alt={product.name}
      />
      <div className="px-6 py-4 ">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base line-clamp-2 max-h-15">
          {product.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="text-lg font-semibold text-blue-500">
          ${product.price}
        </span>
        <span className="text-sm text-gray-600"> / {product.unit}</span>
      </div>
    </div>
  );
};

export default ProductCard;
