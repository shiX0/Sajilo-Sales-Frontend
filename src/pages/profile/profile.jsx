import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/navbar";

const userDetails = {
  _id: "6658857baa4c3aba62c0a7cd",
  firstName: "Shishir",
  lastName: "Sharma",
  address: "Anamnager",
  email: "mymail@gmail.com",
  password: "$2b$10$Y5.OlZwTqaV.5fhC8Ln9IeU340CI0vhtcZy5v/XN7lLK8BvQoIxuG",
  __v: 0,
};

const storeName = "Big Mart";

const AdminProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen py-6 flex flex-col sm:py-12">
        <div className="py-3 sm:max-w-xl sm:mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-10">
                <div className="relative items-center justify-center mb-6 w-32 h-32">
                  <Avatar>
                    <AvatarImage
                      className="w-full h-full"
                      // src="https://via.placeholder.com/128"
                      alt="Profile Picture"
                    />
                    <AvatarFallback>
                      {userDetails.firstName.charAt(0)}
                      {userDetails.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="mb-6 mt-5">
                  <h3 className="text-lg font-medium">
                    {userDetails.firstName} {userDetails.lastName}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {userDetails.address}
                  </p>
                  <p className="text-sm text-slate-600">{userDetails.email}</p>
                </div>
              </div>
              <div className="mb-10">
                <h1>Store Information</h1>
                <p className="text-sm text-slate-600">Dank Store</p>
                <p className="text-sm text-slate-600">Anamnagar</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Admin Information</h3>
                <CardDescription>
                  You have administrative privileges to manage the store's
                  operations, including inventory, orders, and user accounts.
                </CardDescription>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="default">Update Account</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminProfilePage;
