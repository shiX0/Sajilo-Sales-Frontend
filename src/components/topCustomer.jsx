import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users2Icon } from "lucide-react";

const TopCustomer = ({ data }) => {
  console.log(data);
  return (
    <div className="col-span-2">
      {data[0].name == "N/A" ? (
        <Card className="pb-5 pt-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Top customers by sales
            </CardTitle>
            <Users2Icon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p>N/A</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="pb-5 pt-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Top customers by sales
            </CardTitle>
            <Users2Icon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="grid gap-5">
            {data.map((customer, index) => (
              <div key={index} className="flex items-center gap-8">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={"../assets/logo.svg"} alt={customer.name} />
                  <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {customer.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {customer.email}
                  </p>
                </div>
                <div className="ml-auto font-medium">{`रु${customer.totalSpent.toFixed(
                  2
                )}`}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TopCustomer;
