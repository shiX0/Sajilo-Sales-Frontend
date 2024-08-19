import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { toast } from "@/components/ui/use-toast";

const CustomerInputDrawer = ({
  isOpen,
  onClose,
  onSave,
  initialCustomer = {},
}) => {
  const [customer, setCustomer] = useState(initialCustomer);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await onSave(customer);
      toast({
        title: "Customer Saved!",
        description: "The customer has been successfully saved.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error saving the customer. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {customer.id ? "Edit Customer" : "Add New Customer"}
          </DrawerTitle>
          <DrawerDescription>
            Fill in the customer details below.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={customer.name || ""}
              onChange={handleInputChange}
              placeholder="Enter customer name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={customer.email || ""}
              onChange={handleInputChange}
              placeholder="Enter customer email"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={customer.phone || ""}
              onChange={handleInputChange}
              placeholder="Enter customer phone"
            />
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleSave}>Save Customer</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomerInputDrawer;
