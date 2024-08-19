import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const getMonthAbbreviation = (month) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[month - 1] || "";
};

// eslint-disable-next-line react/prop-types
const SalesTrendsChart = ({ data, ...props }) => {
  return (
    <div {...props}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="4 4" vertical={false} /> */}
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => getMonthAbbreviation(value)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value) => [`$${value.toFixed(2)}`, "Sales"]}
            labelFormatter={(value) => getMonthAbbreviation(value)}
            contentStyle={{
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "20px",
              border: "#000",
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesTrendsChart;
