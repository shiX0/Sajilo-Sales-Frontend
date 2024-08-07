import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Calendar,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash,
  UserRound,
} from "lucide-react";
import { customerApi } from "../../api/api";
import CustomerInputDrawer from "@/components/customInputDrawer";
import CustomerCard from "@/components/customCustomerCard";
import { useToast } from "@/components/ui/use-toast";

const Customer = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("create"); // 'create' or 'edit'

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchCustomers = async (currentPage) => {
    try {
      const response = await customerApi.getAll({ page: currentPage });
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  const fetchAnalytics = async () => {
    try {
      const response = await customerApi.getAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleDelete = async () => {
    if (!selectedCustomer) return;
    setIsLoading(true);
    try {
      await customerApi.delete(selectedCustomer._id);
      await fetchCustomers();
      setSelectedCustomer(null);
      setIsDeleteDialogOpen(false);
      toast({
        title: "Customer Deleted",
        description: "The Customer has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to delete the product. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSelectedCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!selectedCustomer) return;
    try {
      if (drawerMode === "create") {
        await customerApi.create(selectedCustomer);
        toast({
          title: "Customer Created!",
          description: "The Customer has been successfully created.",
        });
      } else {
        await customerApi.update(selectedCustomer._id, selectedCustomer);
        toast({
          title: "Customer Updated!",
          description: "The Customer has been successfully Updated.",
        });
      }
      await fetchCustomers();
      setIsDrawerOpen(false);
      setSelectedCustomer(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to do that operation. Please try again.",
      });
      console.error(
        `Error ${drawerMode === "create" ? "creating" : "updating"} customer:`,
        error
      );
    }
  };

  const handleAddCustomer = () => {
    setSelectedCustomer({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setDrawerMode("create");
    setIsDrawerOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer({ ...customer });
    setDrawerMode("edit");
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold font-serif">
              Customer Dashboard
            </h1>
          </div>
          <Button onClick={handleAddCustomer}>Add Customer</Button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 p-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total customers
            </CardTitle>
            <UserRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalCustomers}</div>
            {/* <p className="text-xs text-muted-foreground">
              +180.1% from last month
              </p> */}
            <p className="text-xs text-muted-foreground">customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              customers this month
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {`+ ${analytics.newCustomersThisMonth}`}
            </div>
            <p className="text-xs text-muted-foreground">customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Days Since Creation
            </CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.averageDaysSinceCreation}
            </div>
            <p className="text-xs text-muted-foreground">
              days since last customer created
            </p>
          </CardContent>
        </Card>
        {/* Add more cards for statistics if needed */}
        <div className="col-span-1 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
            </CardHeader>
            <CardContent>
              {customers.length <= 0 ? (
                <h1 className="p-5">No Customers</h1>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow
                        key={customer._id}
                        className={
                          selectedCustomer?._id === customer._id
                            ? "bg-muted"
                            : "hover:bg-muted"
                        }
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.address}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => handleEditCustomer(customer)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => setSelectedCustomer(customer)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete the following customer?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Deleting a customer will remove them from
                                    the servers and you will not be able to
                                    retrieve their data later. Do you really
                                    want to delete this customer?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDelete}
                                    disabled={isLoading}
                                  >
                                    {isLoading ? "Deleting..." : "Delete"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              <CardFooter className="flex flex-row items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Showing {customers.length} customers on page
                  {currentPage}
                </div>
                <Pagination className="ml-auto mr-0 w-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft />
                        <span className="sr-only">Previous Invoice</span>
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={handleNextPage}
                        disabled={customers == 0}
                      >
                        <ChevronRight />
                        <span className="sr-only">Next Invoice</span>
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1">
          <CustomerCard
            customer={selectedCustomer ? selectedCustomer : customers[0]}
          />
        </div>
      </div>

      {selectedCustomer && (
        <CustomerInputDrawer
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
            setSelectedCustomer(null);
          }}
          customer={selectedCustomer}
          onInputChange={handleInputChange}
          onSave={handleSave}
          title={drawerMode === "create" ? "Add New Customer" : "Edit Customer"}
          description={
            drawerMode === "create"
              ? "Enter details for the new customer."
              : "Update customer information."
          }
        />
      )}
    </div>
  );
};

export default Customer;
