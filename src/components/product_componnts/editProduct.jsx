import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { updateProductApi } from "@/api/api";

export function EditProductDrawer({ product }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    barcode: "",
    unit: "",
    price: 0,
    quantity: 0,
    brand: "",
    sku: "",
    tags: "",
  });
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [imgFile, setImgFile] = useState(null);

  const { toast } = useToast();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (product) {
      setFormData(product);
      setImageUrl(baseUrl + product.imageUrl || "");
    }
  }, [product, baseUrl]);

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
    "Beauty",
    "Sports & Outdoors",
    "Toys & Games",
    "Automotive",
    "Grocery",
    "Health & Personal Care",
    "Baby",
    "Office Products",
    "Pet Supplies",
    "Industrial & Scientific",
    "Handmade",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    for (const key in formData) {
      if (formData[key] === "") {
        newErrors[key] = `${key} is required`;
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const formDataWithImage = new FormData();
      for (const key in formData) {
        formDataWithImage.append(key, formData[key]);
      }
      if (imgFile) {
        formDataWithImage.append("productImage", imgFile);
      }

      updateProductApi(product._id, formDataWithImage)
        .then(() => {
          toast({
            title: "Success!",
            description: "Product updated successfully",
          });
          // Close the drawer after successful save
          document.querySelector('[data-state="open"]').click();
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to update product",
          });
          console.error("Error updating product:", error);
        });
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Product</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Product</DrawerTitle>
          <DrawerDescription>
            Make changes to your product here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Label htmlFor="image" className="cursor-pointer">
                <img
                  src={imageUrl || "https://via.placeholder.com/200"}
                  alt="Product Image"
                  className="w-48 h-48 object-cover rounded-lg mb-2"
                />
                <span>Update Image</span>
              </Label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="barcode">Barcode</Label>
                <Input
                  id="barcode"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleChange}
                  required
                />
                {errors.barcode && (
                  <p className="text-red-500">{errors.barcode}</p>
                )}
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              {errors.description && (
                <p className="text-red-500">{errors.description}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="category">Category</Label>
                <Select
                  name="category"
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-500">{errors.category}</p>
                )}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                />
                {errors.unit && <p className="text-red-500">{errors.unit}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
                {errors.price && <p className="text-red-500">{errors.price}</p>}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
                {errors.quantity && (
                  <p className="text-red-500">{errors.quantity}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
              // Close the drawer after successful save
              document.querySelector('[data-state="open"]').click();
            }}
          >
            Save changes
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
