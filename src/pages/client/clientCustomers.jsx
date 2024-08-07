import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Edit, Trash, UserRound } from "lucide-react";

export const ClientCustomers = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "555-1234",
      address: "123 Main St, Anytown USA",
      createdAt: "2023-04-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "555-5678",
      address: "456 Oak Rd, Somewhere City",
      createdAt: "2023-06-01",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "555-9012",
      address: "789 Elm St, Othertown",
      createdAt: "2023-08-20",
    },
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDelete = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
    setSelectedCustomer(null);
  };
  const handleEdit = (id, updatedCustomer) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === id ? { ...customer, ...updatedCustomer } : customer
      )
    );
    setSelectedCustomer(updatedCustomer);
  };
  const handleAddCustomer = () => {
    const newCustomer = {
      id: customers.length + 1,
      name: "New Customer",
      email: "",
      phone: "",
      address: "",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setCustomers([...customers, newCustomer]);
    setSelectedCustomer(newCustomer);
    setIsDrawerOpen(true);
  };
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Customer Dashboard</h1>
          </div>
          <Button onClick={handleAddCustomer}>Add Customer</Button>
        </div>
      </header>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <Card className="px-4 py-2 bg-primary-foreground/10 rounded-md">
          <div className="flex items-center gap-2">
            <UserRound className="h-5 w-5" />
            <span className="font-medium">
              Total Customers: {customers.length}
            </span>
          </div>
        </Card>
        <div className="col-span-1 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead> Total Customers</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow
                      key={customer.id}
                      className={
                        selectedCustomer?.id === customer.id
                          ? "bg-muted"
                          : "hover:bg-muted"
                      }
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsDrawerOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(customer.id);
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={selectedCustomer.name}
                    onChange={(e) =>
                      handleEdit(selectedCustomer.id, {
                        ...selectedCustomer,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={selectedCustomer.email}
                    onChange={(e) =>
                      handleEdit(selectedCustomer.id, {
                        ...selectedCustomer,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={selectedCustomer.phone}
                    onChange={(e) =>
                      handleEdit(selectedCustomer.id, {
                        ...selectedCustomer,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input
                    value={selectedCustomer.address}
                    onChange={(e) =>
                      handleEdit(selectedCustomer.id, {
                        ...selectedCustomer,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Created At</Label>
                  <Input value={selectedCustomer.createdAt} disabled />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* <footer className="bg-muted text-muted-foreground py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div>Total Customers: {customers.length}</div>
        </div>
      </footer> */}
      <div className="m-10">
        <Drawer
          className="mt-14"
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          position="right"
          size="md"
        >
          <DrawerContent>
            <div className="mx-10">
              <DrawerHeader>
                <DrawerTitle>Edit Customer</DrawerTitle>
                <DrawerDescription>
                  Update the customer details here.
                </DrawerDescription>
              </DrawerHeader>
              <div>
                <div className="grid gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={selectedCustomer.name}
                      onChange={(e) =>
                        handleEdit(selectedCustomer.id, {
                          ...selectedCustomer,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={selectedCustomer.email}
                      onChange={(e) =>
                        handleEdit(selectedCustomer.id, {
                          ...selectedCustomer,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input
                      value={selectedCustomer.address}
                      onChange={(e) =>
                        handleEdit(selectedCustomer.id, {
                          ...selectedCustomer,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Created At</Label>
                    <Input value={selectedCustomer.createdAt} disabled />
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleEdit(selectedCustomer.id, selectedCustomer);
                    setIsDrawerOpen(false);
                  }}
                >
                  Save
                </Button>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
