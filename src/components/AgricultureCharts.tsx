import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NutrientChartProps {
  data: Array<{
    day: string;
    value: number;
  }>;
  title: string;
  color: string;
  unit: string;
}

export function NutrientChart({ title, data, color, unit }: NutrientChartProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))"
              }}
              formatter={(value) => [`${value}${unit}`, title]}
            />
            <Bar 
              dataKey="value" 
              fill={color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

interface StatusGaugeProps {
  title: string;
  value: number;
  maxValue: number;
  unit: string;
  color: string;
  status: "good" | "warning" | "danger";
}

export function StatusGauge({ title, value, maxValue, unit, color, status }: StatusGaugeProps) {
  const percentage = (value / maxValue) * 100;
  
  const statusColors = {
    good: "hsl(var(--dashboard-success))",
    warning: "hsl(var(--dashboard-warning))",
    danger: "hsl(var(--dashboard-danger))"
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-foreground">{value}{unit}</span>
          <div className={`h-3 w-3 rounded-full`} style={{ backgroundColor: statusColors[status] }} />
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: color
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 capitalize">{status} range</p>
      </CardContent>
    </Card>
  );
}