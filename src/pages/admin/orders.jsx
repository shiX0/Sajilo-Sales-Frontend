import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"; // Ensure this is the correct import path
import { useEffect, useState } from "react";
import { orderApi } from "@/api/api";
import { ChevronLeft, ChevronRight, MoreHorizontal, Trash } from "lucide-react";

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      try {
        const response = await orderApi.getAll({ page: currentPage });
        setTotalInvoices(response.data.totalOrders);
        setTotalPage(response.data.totalPages);
        setInvoices(response.data.orders);
        if (response.data.orders.length > 0) {
          setSelectedInvoice(response.data.orders[0]);
        }
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, [currentPage]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await orderApi.getAnalytics();
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

  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      if (invoiceToDelete) {
        await orderApi.delete(invoiceToDelete._id);
        setInvoices(
          invoices.filter((invoice) => invoice._id !== invoiceToDelete._id)
        );
        setSelectedInvoice(invoices[0]);
      }
    } catch (error) {
      console.error("Failed to delete invoice:", error);
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
    }
  };

  const openDeleteDialog = (invoice) => {
    setInvoiceToDelete(invoice);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        isLoading..
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-20 items-center gap-6 border-b bg-background px-6 sm:static sm:h-auto sm:border-0 sm:bg-transparent">
        <h1 className="text-3xl p-5 font-bold">Invoice Dashboard</h1>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Total Sales</CardTitle>
                <CardDescription>All time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">
                  {`रु${analytics.totalSales}` ?? "N/A"}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Sales</CardTitle>
                <CardDescription>Per customer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">
                  {`रु${analytics.averageSales}` ?? "N/A"}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Recent invoices from your store</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow
                      key={invoice._id}
                      className="cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => handleInvoiceClick(invoice)}
                    >
                      <TableCell className="font-medium">
                        {invoice._id}
                      </TableCell>
                      <TableCell>
                        {invoice.customer
                          ? invoice.customer.name
                          : "Deleted customer"}
                      </TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        रु{invoice.total.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => openDeleteDialog(invoice)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex flex-row items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Showing {totalInvoices} of {totalInvoices} invoices on page
                {currentPage}-{totalPage}
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
                      disabled={currentPage >= totalPage}
                    >
                      <ChevronRight />
                      <span className="sr-only">Next Invoice</span>
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </div>
        {selectedInvoice && (
          <div>
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Invoice #{selectedInvoice._id}
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <div className="h-3 w-3" />
                      <span className="sr-only">Copy Invoice ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Date:{" "}
                    {new Date(selectedInvoice.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Export PDF</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Invoice Details</div>
                  <ul className="grid gap-3">
                    {selectedInvoice.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-muted-foreground">
                          {item.product?.name || item._id || "Unknown Item"} x{" "}
                          <span>{item.quantity}</span>
                        </span>
                        <span>
                          रु
                          {((item.product?.price || 0) * item.quantity).toFixed(
                            2
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>रु{selectedInvoice.total.toFixed(2)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>रु{selectedInvoice.tax.toFixed(2)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span>रु{selectedInvoice.discount.toFixed(2)}</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Total</span>
                      <span>
                        रु
                        {(
                          selectedInvoice.total +
                          selectedInvoice.tax -
                          selectedInvoice.discount
                        ).toFixed(2)}
                      </span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                {selectedInvoice.customer && (
                  <div className="grid gap-3">
                    <div className="font-semibold">Customer Information</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Customer</dt>
                        <dd>{selectedInvoice.customer.name}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Email</dt>
                        <dd>
                          <a href={`mailto:${selectedInvoice.customer.email}`}>
                            {selectedInvoice.customer.email}
                          </a>
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Phone</dt>
                        <dd>
                          <a href={`tel:${selectedInvoice.customer.phone}`}>
                            {selectedInvoice.customer.phone}
                          </a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                )}
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Payment Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1 text-muted-foreground">
                        <div className="h-4 w-4" />
                        {selectedInvoice.paymentMethod}
                      </dt>
                      <dd>full payment</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Updated{" "}
                  <time dateTime={selectedInvoice.updatedAt}>
                    {new Date(selectedInvoice.updatedAt).toLocaleString()}
                  </time>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>

      {/* AlertDialog for Delete Confirmation */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete the following invoice?</AlertDialogTitle>
            <AlertDialogDescription>
              Deleting an invoice will remove it from the server and you will
              not be able to retrieve its data later. Do you really want to
              delete this invoice?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
