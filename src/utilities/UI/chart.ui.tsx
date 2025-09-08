import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LabelList,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { TextUIComponent } from "./texts.ui";
import type { LineChartProps, BarChartProps, PieChartProps } from "../types.declarationts";

export function LineChartUIComponent({ data, lines, xKey, height }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height || 300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: -40, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />

        <XAxis dataKey={xKey} />
        <YAxis axisLine={false} tickLine={false} tick={false} />
        <Tooltip />

        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color}
            strokeWidth={2}
            dot={false}
            name={line.name || line.dataKey}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}


export function PieChartUIComponent({ data, height = 200 }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
          innerRadius={50}
          paddingAngle={3}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}

          <LabelList
            dataKey="label"
            position="outside"
            content={(props) => {
              const { x, y, value } = props as any;
              if (!value) return null;

              return (
                <foreignObject x={x!} y={y!} width={100} height={30}>
                  <TextUIComponent
                    type="p"
                    text={value}
                    className="text-[10px] text-gray-700"
                  />
                </foreignObject>
              );
            }}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}



export function BarChartUIComponent({ data, height = 100, style }: BarChartProps) {
  return (
    <div style={{ width: "100%", height, ...style }}>
      <ResponsiveContainer>
        <BarChart
          data={[{ name: "bar", value: data.value }]} 
          layout="vertical"
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" hide />
          <Bar dataKey="value" fill={data.color} radius={[2, 2, 2, 2]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}