import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ForecastHourly } from "../current-day-card";

interface HumidityChartProps {
  data: ForecastHourly[];
}

export function 
HumidityChart({ data }: HumidityChartProps) {
  const formattedData = data.map((item) => ({
    ...item,
    time: new Date(item.time).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
        <XAxis
          dataKey="time"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1A1D23",
            border: "1px solid #333",
          }}
          labelStyle={{ color: "#fff" }}
        />
        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#60A5FA"
          strokeWidth={2}
          dot={{ r: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
