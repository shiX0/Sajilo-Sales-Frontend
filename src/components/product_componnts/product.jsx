import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductByIdApi } from "@/api/api";
import { useToast } from "../ui/use-toast";
import { EditProductDrawer } from "./editProduct";
import DeleteDialog from "./deleteProduct";

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Initialize with null
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await getProductByIdApi(id); // Await the API call
      setProduct(response.data); // Assuming the API returns data in `response.data`
      toast({
        title: "Successful!",
        description: "Product Loaded Successfully",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: e.message || "Failed to load the product.",
      });
      console.error(e);
    }
  };

  const handleBack = () => {
    navigate("/products");
  };

  if (!product) {
    return <div>Loading...</div>; // Handle loading state
  }
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <div className="bg-background">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img
              src={baseUrl + product.imageUrl || "/placeholder.svg"} // Use product image
              alt="Product Image"
              width={600}
              height={600}
              className="w-full max-w-md rounded-lg shadow-lg"
              style={{ aspectRatio: "600/600", objectFit: "cover" }}
            />
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {product.name}
              </h1>
              <p className="mt-3 text-muted-foreground">
                {product.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-medium text-foreground">
                  Category
                </h2>
                <p className="text-muted-foreground">{product.category}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium text-foreground">Barcode</h2>
                <p className="text-muted-foreground">{product.barcode}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium text-foreground">Unit</h2>
                <p className="text-muted-foreground">{product.unit}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium text-foreground">Price</h2>
                <p className="text-muted-foreground">
                  ${product.price?.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-medium text-foreground">
                  Quantity
                </h2>
                <p className="text-muted-foreground">
                  {product.quantity} in stock
                </p>
              </div>
              <div>
                <h2 className="text-lg font-medium text-foreground">Brand</h2>
                <p className="text-muted-foreground">{product.brand}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium text-foreground">SKU</h2>
                <p className="text-muted-foreground">{product.sku}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium text-foreground">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags?.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <EditProductDrawer product={product} />
              <Button variant="destructive">
                <DeleteDialog productId={product._id} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
