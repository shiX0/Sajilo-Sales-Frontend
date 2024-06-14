import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NoProducts from "./noProduct";
import { ProductDialog } from "./productDialog";

import { Button } from "../ui/button";
import { getAllProductApi } from "@/api/api";

import DeleteDialog from "./deleteProduct";

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProductApi()
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("API response is not an array:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleEdit = (productId) => {
    // Edit product logic goes here
    console.log(`Edit product with ID: ${productId}`);
  };

  const handleDelete = (productId) => {};

  if (products.length === 0) {
    return <NoProducts />;
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
        <ProductDialog
          onSubmit={(formData) => console.log("New product data:", formData)}
        />
      </div>
      <div
        className="flex flex-1  justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <Table className="m-4">
          <TableCaption>List of all Products</TableCaption>
          <TableHeader>
            <TableRow>
              {/* <TableHead>ID</TableHead> */}
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              {/* <TableHead>Barcode</TableHead> */}
              {/* <TableHead>Unit</TableHead> */}
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              {/* <TableHead>Image URL</TableHead> */}
              {/* <TableHead>Brand</TableHead> */}
              {/* <TableHead>SKU</TableHead> */}
              {/* <TableHead>Tags</TableHead> */}
              {/* <TableHead>Created At</TableHead> */}
              {/* <TableHead>Updated At</TableHead> */}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(products) &&
              products.map((product) => (
                <TableRow key={product._id}>
                  {/* <TableCell>{product._id}</TableCell> */}
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  {/* <TableCell>{product.barcode}</TableCell> */}
                  {/* <TableCell>{product.unit}</TableCell> */}
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  {/* <TableCell>{product.imageUrl}</TableCell> */}
                  {/* <TableCell>{product.brand}</TableCell> */}
                  {/* <TableCell>{product.sku}</TableCell> */}
                  {/* <TableCell>{product.tags.join(", ")}</TableCell> */}
                  {/* <TableCell> */}
                  {/* {new Date(product.createdAt).toLocaleString()} */}
                  {/* </TableCell> */}
                  {/* <TableCell> */}
                  {/* {new Date(product.updatedAt).toLocaleString()} */}
                  {/* </TableCell> */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">Actions</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onSelect={() => handleEdit(product._id)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <DeleteDialog productId={product._id} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProductTable;
