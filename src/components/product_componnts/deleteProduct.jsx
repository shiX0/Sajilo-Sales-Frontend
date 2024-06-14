import React, { useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { deleteProductByIdApi } from "@/api/api";

const DeleteDialog = ({ productId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const handleDelete = () => {
    setIsLoading(true);
    deleteProductByIdApi(productId)
      .then(() => {
        toast({
          title: "Product Deleted",
          description: "The product has been successfully deleted.",
        });
        // window.location.reload(false);
        // Redirect or update the UI after successful deletion
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Failed to delete the product. Please try again.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>Delete</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete the following product?</AlertDialogTitle>
          <AlertDialogDescription>
            Deleting a product will remove it from the servers and you will not
            be able to retrieve it later. Do you really want to delete this
            product?
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
  );
};

export default DeleteDialog;
