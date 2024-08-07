import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "./ui/label";
Label;

const CustomerCard = ({ customer }) => {
  const safeValue = (value) =>
    value !== null && value !== undefined ? value : "N/A";

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8">
            <div>
              <Label>Name</Label>
              <p>{safeValue(customer?.name)}</p>
            </div>
            <div>
              <Label>Email</Label>
              <p>{safeValue(customer?.email)}</p>
            </div>
            <div>
              <Label>Phone</Label>
              <p>{safeValue(customer?.phone)}</p>
            </div>
            <div>
              <Label>Address</Label>
              <p>{safeValue(customer?.address)}</p>
            </div>
            <div>
              <Label>Created At</Label>
              <p>{safeValue(customer?.createdAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerCard;
