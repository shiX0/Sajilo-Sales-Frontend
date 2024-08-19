import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Check, Minus, Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { customerApi, orderApi } from "@/api/api";
import { useOrder } from "@/context/context.jsx";
import { useNavigate } from "react-router-dom";

const ClientCheckout = () => {
  const { toast } = useToast();
  const { orderProducts, setOrderProducts } = useOrder();
  const [customer, setCustomer] = useState(null);
  const [customerSearch, setCustomerSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [discount, setDiscount] = useState(false);
  const [tax, setTax] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigator = useNavigate();
  const handleProductQuantityChange = (productId, newQuantity) => {
    setOrderProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, quantity: Math.max(1, newQuantity) }
          : product
      )
    );
  };

  const handleCustomerSearch = async (e) => {
    const searchItem = e.target.value;
    setCustomerSearch(searchItem);
    if (searchItem) {
      try {
        const results = await customerApi.search({ name: searchItem });
        setSearchResults(results.data || []); // Ensure there's a default value
      } catch (error) {
        console.error(error); // Log the error for debugging
        toast({
          variant: "destructive",
          title: "Search failed.",
          description: "Failed to fetch customer data. Please try again.",
        });
      }
    }
  };

  const handleCustomerSelect = (customer) => {
    setCustomer(customer);
  };
  const printReceipt = (orderProducts, subtotal, discount, salesTax, total) => {
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

  const handleCheckout = async () => {
    if (!customer) {
      toast({
        variant: "destructive",
        title: "No customer selected",
        description: "Please select or add a customer before checking out.",
      });
      return;
    }

    if (!paymentMethod) {
      toast({
        variant: "destructive",
        title: "No payment method selected",
        description: "Please select a payment method before checking out.",
      });
      return;
    }

    const orderData = {
      customer: customer._id,
      items: orderProducts.map((product) => ({
        product: product._id,
        quantity: product.quantity,
      })),
      total: total,
      discount: discountAmount,
      tax: taxAmount,
      paymentMethod: paymentMethod,
    };

    try {
      const response = await orderApi.create(orderData);
      if (response.data && response.data._id) {
        toast({
          title: "Order Placed Successfully",
          description: `Order ID: ${response.data._id}`,
        });
        // Reset the order state or navigate to a new page
        setOrderProducts([]);
        navigator("/client/dashboard/");
        // You might want to navigate to a new page or order confirmation screen here
      } else {
        throw new Error("Invalid order response");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Checkout Failed",
        description:
          "There was an error processing your order. Please try again.",
      });
    }
  };

  const handleAddCustomer = async () => {
    if (newCustomer.name && newCustomer.email && newCustomer.phone) {
      try {
        const savedCustomer = await customerApi.create(newCustomer);
        if (
          savedCustomer.data &&
          savedCustomer.data.name &&
          savedCustomer.data.email
        ) {
          setCustomer(savedCustomer.data);
          toast({
            title: "Customer Created!",
            description: "The customer has been successfully created.",
          });
        } else {
          throw new Error("Invalid customer data");
        }
      } catch (error) {
        console.error(error); // Log the error for debugging
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Failed to create the customer. Please try again.",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please fill out all required fields.",
      });
    }
  };

  const subtotal = orderProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const discountAmount = discount ? subtotal * 0.1 : 0;
  const taxAmount = tax ? subtotal * 0.08 : 0;
  const total = subtotal - discountAmount + taxAmount;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  if (orderProducts <= 0) {
    return navigator("/client/dashboard");
  }
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
      </header>
      <main className="flex-1 grid grid-cols-2 gap-8 p-8">
        <div className="bg-background rounded-lg shadow-lg p-6 row-span-2">
          <h2 className="text-lg font-bold mb-4">Products</h2>
          <div className="grid gap-4">
            {orderProducts.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={baseUrl + product.imageUrl} // Use product image URL
                    alt={product.name}
                    width={64}
                    height={64}
                    className="rounded-md"
                    style={{ aspectRatio: "64/64", objectFit: "cover" }}
                  />
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-muted-foreground">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleProductQuantityChange(
                        product._id,
                        product.quantity - 1
                      )
                    }
                    disabled={product.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span>{product.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleProductQuantityChange(
                        product._id,
                        product.quantity + 1
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-background rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-bold mb-4">Customer</h2>
          <div className="grid gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for customer"
                value={customerSearch}
                onChange={handleCustomerSearch}
                className="pl-8 w-full"
              />
            </div>
            <div className="grid gap-2">
              {searchResults.map((c) => (
                <Button
                  key={c.id}
                  variant={customer?._id === c._id ? "" : "ghost"}
                  onClick={() => handleCustomerSelect(c)}
                  className="justify-between items-center p-5"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/placeholder-user.jpg" alt={c.name} />
                      <AvatarFallback>
                        {c.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{c.name}</h3>
                      <p className="text-muted-foreground">
                        {c.email} | {c.phone}
                      </p>
                    </div>
                  </div>
                  {customer?._id === c._id && <Check className="h-4 w-4" />}
                </Button>
              ))}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Add New Customer</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                  <DialogDescription>
                    Fill in the details to add a new customer.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Customer Name"
                    value={newCustomer.name}
                    onChange={(e) =>
                      setNewCustomer({ ...newCustomer, name: e.target.value })
                    }
                  />
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Customer Email"
                    value={newCustomer.email}
                    onChange={(e) =>
                      setNewCustomer({ ...newCustomer, email: e.target.value })
                    }
                  />
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Customer Phone"
                    value={newCustomer.phone}
                    onChange={(e) =>
                      setNewCustomer({ ...newCustomer, phone: e.target.value })
                    }
                  />
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Customer Address"
                    value={newCustomer.address}
                    onChange={(e) =>
                      setNewCustomer({
                        ...newCustomer,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={handleAddCustomer}>
                    Add Customer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="bg-background rounded-lg shadow-lg p-4 mt-8">
          <h2 className="text-lg font-bold mb-4">Payment</h2>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select
                id="payment-method"
                value={paymentMethod}
                onValueChange={setPaymentMethod}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Debit Card">Debit Card</SelectItem>
                  <SelectItem value="Mobile Payment">Mobile Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                variant={discount ? "primary" : "outline"}
                onClick={() => setDiscount(!discount)}
              >
                10% Discount
              </Button>
              <Button
                variant={tax ? "primary" : "outline"}
                onClick={() => setTax(!tax)}
              >
                8% Tax
              </Button>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discount && (
              <div className="flex justify-between text-lg text-green-600">
                <span>Discount:</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            {tax && (
              <div className="flex justify-between text-lg text-red-500">
                <span>Tax:</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Button
                size="lg"
                onClick={() =>
                  printReceipt(
                    orderProducts,
                    subtotal,
                    discountAmount,
                    taxAmount,
                    total
                  )
                }
              >
                Print Order
              </Button>
              <Button size="lg" onClick={handleCheckout}>
                Finish Checkout
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-muted p-6 flex justify-between items-center">
        <div>
          {customer ? (
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-medium">{customer.name}</h3>
                <p className="text-muted-foreground">
                  {customer.email} | {customer.phone}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No customer selected</p>
          )}
        </div>
        <div className="text-right">
          <h3 className="font-bold text-2xl">Total: ${total.toFixed(2)}</h3>
        </div>
      </footer>
    </div>
  );
};

export default ClientCheckout;
