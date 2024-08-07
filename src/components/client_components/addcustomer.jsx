import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddCustomers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;
    if (!name) {
      setErrors((prev) => ({ ...prev, name: true }));
      hasErrors = true;
    } else {
      setErrors((prev) => ({ ...prev, name: false }));
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: true }));
      hasErrors = true;
    } else {
      setErrors((prev) => ({ ...prev, email: false }));
    }
    if (!phone) {
      setErrors((prev) => ({ ...prev, phone: true }));
      hasErrors = true;
    } else {
      setErrors((prev) => ({ ...prev, phone: false }));
    }
    if (!address) {
      setErrors((prev) => ({ ...prev, address: true }));
      hasErrors = true;
    } else {
      setErrors((prev) => ({ ...prev, address: false }));
    }
    if (!hasErrors) {
      const customerData = {
        name,
        email,
        phone,
        address,
      };
      console.log(customerData);
    }
  };
  return (
    <div className="container mx-auto max-w-md py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add Customer</h1>
        <p className="text-muted-foreground">
          Enter the customer details below to add a new customer.
        </p>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">Name is required.</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">Email is required.</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">Phone is required.</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="123 Main St, Anytown USA"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">Address is required.</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Save Customer</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
