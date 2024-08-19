import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import {
  XAxis,
  YAxis,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "@/components/ui/chart";
import {
  BadgeIndianRupee,
  BarChartHorizontalBig,
  LineChartIcon,
  Package,
  User,
} from "lucide-react";
import { getMetrics } from "@/api/api";
import { data } from "autoprefixer";
import SalesTrendsChart from "../../components/graphs/lineChart";
import TopCustomer from "@/components/topCustomer";

const Home = () => {
  const [totalRevenue, setTotalRevenue] = useState();
  const [newCustomers, setNewCustomers] = useState();
  const [averageOrderValue, setAverageOrderValue] = useState();
  const [salesByCategory, setsalesByCategory] = useState([]);
  const [salesTrends, setsalesTrends] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [topProducts, settopProducts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await getMetrics();
        console.log(response.data);
        setTotalRevenue(response.data.totalRevenue);
        setNewCustomers(response.data.newCustomers);
        setAverageOrderValue(response.data.averageOrderValue);
        setsalesByCategory(response.data.salesByCategory);
        setsalesTrends(response.data.salesTrends);
        setTopCustomers(response.data.topCustomers);
        settopProducts(response.data.topProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching metrics:", error);
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);
  console.log(salesTrends);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-0">
      <main className="flex min-h-screen flex-1 flex-col gap-4 p-4 pb-0  md:gap-8 md:pt-0 md:p-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 pb-0 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <BadgeIndianRupee className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">रु{totalRevenue}</div>
              <p className="text-xs text-muted-foreground">+ from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                New Customers
              </CardTitle>
              <User className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newCustomers}</div>
              <p className="text-xs text-muted-foreground">+ from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Average Order Value
              </CardTitle>
              <BadgeIndianRupee className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">रु{averageOrderValue}</div>
              <p className="text-xs text-muted-foreground">all time</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Sales by Category
              </CardTitle>
              <BarChartHorizontalBig className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <BarcharthorizontalChart data={salesByCategory} className="" />
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Top Products
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Units Sold</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.unitsSold}</TableCell>
                      <TableCell>रु{product.revenue}</TableCell>
                    </TableRow>
                  ))}
                  <TableFooter></TableFooter>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Sales Trends
              </CardTitle>
              <LineChartIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <SalesTrendsChart data={salesTrends} className="aspect-[9/4]" />
            </CardContent>
          </Card>
          <TopCustomer data={topCustomers} />
        </div>
      </main>
    </div>
  );
};

function BarcharthorizontalChart({ data, ...props }) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Unit",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="min-h-[200px] max-h-[350px]"
      >
        <BarChart
          accessibilityLayer
          data={data}
          layout="vertical"
          margin={{
            left: 20,
          }}
        >
          <XAxis type="number" dataKey="value" hide />
          <YAxis
            dataKey="category"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="value" fill="var(--color-desktop)" radius={5} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default Home;
