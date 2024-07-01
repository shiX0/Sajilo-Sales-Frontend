import { useState, useEffect } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import NoProducts from "./noProduct";
import { ProductDialog } from "./productDialog";

import { Button } from "../ui/button";
import { getAllProductApi } from "@/api/api";

import DeleteDialog from "./deleteProduct";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    getAllProductApi({ page: currentPage })
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
      })
      .finally(() => setIsLoading(false));
  }, [currentPage]);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  // console.log(products);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleEdit = (productId) => {
    // Edit product logic goes here
    console.log(`Edit product with ID: ${productId}`);
  };

  if (products.length === 0 && currentPage === 1) {
    return <NoProducts />;
  }
  // else if (products.length === 0) {
  //   return <h1>NO Products</h1>;
  // }
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
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
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
            <ProductDialog
              onSubmit={(formData) =>
                console.log("New product data:", formData)
              }
            />
          </div>
          <div className="flex-row justify-center rounded-lg border border-dashed shadow-sm">
            {products.length > 0 ? (
              <Table className="m-3">
                <TableCaption>List of all Products</TableCaption>
                <TableHeader>
                  <TableRow>
                    {/* <TableHead>ID</TableHead> */}
                    <TableHead>Image URL</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    {/* <TableHead>Barcode</TableHead> */}
                    {/* <TableHead>Unit</TableHead> */}
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
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
                        <TableCell>
                          <img
                            src={baseUrl + product.imageUrl}
                            className="object-cover h-14 w-14"
                            alt="Product image"
                          />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        {/* <TableCell>{product.barcode}</TableCell> */}
                        {/* <TableCell>{product.unit}</TableCell> */}
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
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
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                              >
                                <DeleteDialog productId={product._id} />
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex items-center justify-center h-96">
                <h1 className="text-lg font-semibold md:text-2xl">
                  No products found in this page!
                </h1>
              </div>
            )}
            <div className="p-2">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={handlePrevPage} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>{currentPage}</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext onClick={handleNextPage} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProductTable;
