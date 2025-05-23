import { ProductDialog } from "@/components/product_componnts/productDialog";

const noProduct = () => {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>

          <ProductDialog
            onSubmit={(formData) => console.log("New product data:", formData)}
          />
        </div>
      </div>
    </>
  );
};

export default noProduct;
