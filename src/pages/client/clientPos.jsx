import ProductCard from "@/components/client_components/productCard";
import { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import { getAllProductApi } from "@/api/api";
import ProductChips from "@/components/client_components/productChips";

const ClientPos = () => {
  const [products, setProducts] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const removeFromOrder = (id) => {
    setOrderProducts((prevOrder) =>
      prevOrder.filter((product) => product._id !== id)
    );
  };

  const subtotal = orderProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const discount = 5.0;
  const salesTax = 2.25;
  const total = subtotal - discount + salesTax;

  const printReceipt = () => {
    // Create the receipt content
    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Dank Store Receipt</title>
        <style>
          body { font-family: 'Courier New', monospace; max-width: 300px; margin: auto; padding: 20px; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 10px; }
          .header h1 { margin: 0; font-size: 24px; }
          .header p { margin: 5px 0; }
          .info, .items, .totals { border-bottom: 1px dashed #000; padding-bottom: 10px; margin-bottom: 10px; }
          .item { display: flex; justify-content: space-between; margin-bottom: 5px; }
          .totals { text-align: right; }
          .footer { text-align: center; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>DANK STORE</h1>
          <p>123 Dank Street, Dankville, DN 12345</p>
          <p>Tel: (123) 456-7890</p>
        </div>
        
        <div class="info">
          <p>Date: ${new Date().toLocaleString()}</p>
          <p>Receipt #: ${Math.floor(Math.random() * 10000)}</p>
        </div>
  
        <div class="items">
          ${orderProducts
            .map(
              (product) => `
            <div class="item">
              <span>${product.name} x${product.quantity}</span>
              <span>$${(product.price * product.quantity).toFixed(2)}</span>
            </div>
          `
            )
            .join("")}
        </div>
  
        <div class="totals">
          <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
          <p><strong>Discount:</strong> -$${discount.toFixed(2)}</p>
          <p><strong>Sales Tax:</strong> $${salesTax.toFixed(2)}</p>
          <p style="font-size: 1.2em;"><strong>Total:</strong> $${total.toFixed(
            2
          )}</p>
        </div>
  
        <div class="footer">
          <p>Thank you for shopping at Dank Store!</p>
          <p>Please come again</p>
        </div>
      </body>
      </html>
    `;

    // Create a hidden iframe
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // Write the receipt content to the iframe
    iframe.contentDocument.write(receiptContent);
    iframe.contentDocument.close();

    // Print the iframe content
    iframe.contentWindow.print();

    // Remove the iframe after printing
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 100);
  };

  return (
    <div className="flex">
      <div>
        <div className="p-10">
          <h1 className="text-3xl"> All Products</h1>
        </div>
        <div className="grid grid-cols-4 gap-4 p-5">
          {products.map((product) => (
            <div onClick={() => addToOrder(product)} key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
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
        <div className="p-4 bg-gray-50 rounded-lg shadow-lg w-96 dark:bg-black flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-4">Current Order</h2>
          <div className="space-y-4 overflow-y-auto flex-grow mb-4">
            {orderProducts.map((product) => (
              <div key={product._id} className="flex items-center">
                <ProductChips product={product} quantity={product.quantity} />
                <button
                  className="ml-2 text-red-500"
                  onClick={() => removeFromOrder(product._id)}
                >
                  <Trash size={20} />
                </button>
              </div>
            ))}
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
            onClick={printReceipt}
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientPos;
