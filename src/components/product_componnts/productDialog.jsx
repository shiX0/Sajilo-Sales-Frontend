import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { createProductApi } from "@/api/api";
import { useToast } from "../ui/use-toast";

export function ProductDialog() {
  const [imageUrl, setImageUrl] = useState("");
  const [imgfile, setImgFile] = useState(null);

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
    // Add more categories as needed
  ];
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
    setImageUrl(URL.createObjectURL(file));
    // console.log(file);
    // // Store the file object
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    const newErrors = {};
    for (const key in formData) {
      if (formData[key] === "") {
        newErrors[key] = `${key} is required`;
      }
    }
    setErrors(newErrors);

    // If there are no errors, proceed with submission
    if (Object.keys(newErrors).length === 0) {
      const formDataWithImage = new FormData();
      for (const key in formData) {
        formDataWithImage.append(key, formData[key]);
      }
      // Append image file data
      formDataWithImage.append("productImage", imgfile);

      console.log(formDataWithImage);
      // Call your API to create product
      createProductApi(formDataWithImage)
        .then((res) => {
          if (res.status === 201) {
            // Handle success
            toast({
              title: "Successful!",
              description: "Product Created Sucessfully",
            });
            window.location.reload(false);
          }
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            // description: error.message,
          });
          console.error("Error creating product:", error);
        });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3">Add/Edit Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add/Edit Product</DialogTitle>
          <DialogDescription>
            Fill out the product details below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <div className="flex-shrink-0">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <Label htmlFor="image">
              <img
                src={imageUrl || "https://via.placeholder.com/200"}
                alt="Product Image"
                className="w-48 h-48 object-cover cursor-pointer rounded-lg"
              />
              <Label>Preview Image</Label>
            </Label>
            {errors.image && (
              <p className="text-red-500 mt-2">{errors.image}</p>
            )}
          </div>
          <div className="grid gap-4 flex-grow">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="col-span-3"
              />
            </div>
            {errors.name && <div className="text-red-500">{errors.name}</div>}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="col-span-3 h-32 resize-none border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {errors.description && (
              <div className="text-red-500">{errors.description}</div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                name="category"
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                className="col-span-5"
                required
              >
                <SelectTrigger className="w-[400px]">
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
            </div>
            {errors.category && (
              <div className="text-red-500">{errors.category}</div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="barcode" className="text-right">
                Barcode
              </Label>
              <Input
                id="barcode"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                required
                className="col-span-3"
              />
            </div>
            {errors.barcode && (
              <div className="text-red-500">{errors.barcode}</div>
            )}
            {/* Add more fields from barcode here */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">
                Unit
              </Label>
              <Input
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
                className="col-span-3"
              />
            </div>
            {errors.unit && <p className="text-red-500">{errors.unit}</p>}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-24"
              />
              <Label className="text-right">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-24"
              />
            </div>
            {errors.stock && <p className="text-red-500">{errors.stock}</p>}
            {errors.quantity && (
              <div className="text-red-500 col-start-9 col-span-3">
                {errors.quantity}
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Brand
              </Label>
              <Input
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            {errors.brand && <p className="text-red-500">{errors.brand}</p>}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sku" className="text-right">
                SKU
              </Label>
              <Input
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            {errors.sku && <p className="text-red-500">{errors.sku}</p>}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">
                Tags
              </Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            {errors.tags && <p className="text-red-500">{errors.tags}</p>}
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
