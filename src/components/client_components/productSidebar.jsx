import React, { useState } from "react";

const PosSystem = () => {
  const [products, setProducts] = useState([
    {
      name: 'Pet food "Liven" - Junior dog version',
      price: 25.98,
      quantity: 1,
    },
    {
      name: 'Pet Accessories "Liven" - Bone dog version',
      price: 38.65,
      quantity: 4,
    },
    {
      name: 'Pet food "Liven" - Adult dog version (can)',
      price: 64.76,
      quantity: 2,
    },
  ]);

  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const discount = 5.0;
  const salesTax = 2.25;
  const total = subtotal - discount + salesTax;

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4">Current Order</h2>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center">
            <img
              src="path/to/product-image.jpg"
              alt={product.name}
              className="w-16 h-16 rounded-md mr-4"
            />
            <div className="flex-1">
              <p className="font-medium">{product.name}</p>
              <p className="text-blue-600">${product.price.toFixed(2)}</p>
            </div>
            <p className="ml-4">x{product.quantity}</p>
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
  );
};

export default PosSystem;
