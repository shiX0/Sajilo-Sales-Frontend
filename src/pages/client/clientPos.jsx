import ProductCard from "@/components/client_components/productCard";
import { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import { getAllProductApi } from "@/api/api";
import ProductChips from "@/components/client_components/productChips";
import { useOrder } from "@/context/context";
import { useNavigate } from "react-router-dom";

const ClientPos = () => {
  const [products, setProducts] = useState([]);
  const { orderProducts, setOrderProducts } = useOrder();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigator = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getAllProductApi({ page: currentPage, limit: 8 })
      .then((res) => {
        if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error("API response is not an array:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
        setCurrentPage(currentPage - 1);
      })
      .finally(() => setIsLoading(false));
  }, [currentPage]);
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const addToOrder = (product) => {
    setOrderProducts((prevOrder) => {
      const existingProduct = prevOrder.find((p) => p._id === product._id);
      if (existingProduct) {
        return prevOrder.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevOrder, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromOrder = (_id) => {
    setOrderProducts((prevOrder) =>
      prevOrder.filter((product) => product._id !== _id)
    );
  };

  const subtotal = orderProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const discount = 5.0;
  const salesTax = 2.25;
  const total = subtotal - discount + salesTax;

  return (
    <div className="flex">
      <div>
        <div className="p-10">
          <h1 className="text-3xl font-bold text-primary"> All Products</h1>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-screen w-screen">
            <div
              className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 p-5">
            {products.map((product) => (
              <div onClick={() => addToOrder(product)} key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
        <div className="flex float-end pr-10">
          <div className="inline-flex">
            <button
              onClick={handlePrevPage}
              className="bg-gray-200 hover:bg-gray-400 font-bold py-2 px-4 rounded-l dark:bg-zinc-700 dark:hover:bg-zinc-300"
            >
              Prev
            </button>
            <button
              onClick={handleNextPage}
              className="bg-gray-200 hover:bg-gray-400 font-bold py-2 px-4 rounded-r dark:bg-zinc-700 dark:hover:bg-zinc-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="flex h-screen" id="receipt-content">
        <div className=" p-4 bg-gray-50 rounded-lg shadow-lg w-96 dark:bg-black flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-4">Current Order</h2>
          <div className="space-y-4 overflow-y-auto flex-grow mb-4">
            {orderProducts && orderProducts.length > 0 ? (
              orderProducts.map((product) => (
                <div key={product._id} className="flex items-center">
                  <ProductChips product={product} quantity={product.quantity} />
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => removeFromOrder(product._id)}
                  >
                    <Trash size={20} />
                  </button>
                </div>
              ))
            ) : (
              <h1>Add some products</h1>
            )}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount sales</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total sales tax</span>
              <span>${salesTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700"
            onClick={() => navigator("/checkout")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientPos;
