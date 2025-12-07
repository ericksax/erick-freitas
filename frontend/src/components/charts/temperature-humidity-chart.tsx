import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartLine } from "lucide-react";
import { ForecastHourly } from "@/features/weather/types/weather";

interface TemperatureHumidityChartProps {
  data: ForecastHourly[];
}

export function TemperatureHumidityChart({ data }: TemperatureHumidityChartProps) {
  const currentDate =  data[0].time.substring(0, 10);
  const filterByCurrentDate = data.filter(h => h.time.substring(0, 10) == currentDate)

  const formattedData = filterByCurrentDate.map((item) => ({
    ...item,
    time: new Date(item.time).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const ticks = formattedData.filter((_, index) => index % 4 === 0).map(item => item.time);

  return (
    <Card className="flex-1 w-full border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartLine className="w-4 h-6 text-gray-300"/>
          Gráfico de umidade e temperatura.
          </CardTitle>
        <CardDescription>
          Mostra temperatura e humidade no decorrer das horas do dia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={formattedData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis
              dataKey="time"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              ticks={ticks}
            />
            <YAxis
              yAxisId="temperature"
              stroke="#888888" // Red for temperature
              fontSize={12}
              tickLine={false}
              axisLine={false}
              orientation="left"
              tickFormatter={(value) => `${value}°C`}
            />
            <YAxis
              yAxisId="humidity"
              stroke="#888888" // Blue for humidity
              fontSize={12}
              tickLine={false}
              axisLine={false}
              orientation="right"
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1A1D23",
                border: "1px solid #333",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Area
              yAxisId="temperature"
              type="monotone"
              dataKey="temp" // Changed from temperature to temp
              stroke="#2fa86ab3"
              fill="#2fa86ab3"
              fillOpacity={0.3}
            />
            <Area
              yAxisId="humidity"
              type="monotone"
              dataKey="humidity"
              stroke="#44d6b49c"
              fill="#44d6b49c"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}
