import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export function MetricCard({ title, value, change, changeType, icon: Icon }: MetricCardProps) {
  const changeColor = {
    positive: "text-dashboard-success",
    negative: "text-dashboard-danger", 
    neutral: "text-muted-foreground"
  }[changeType];

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className={`text-xs ${changeColor} mt-1`}>
          {change}
        </p>
      </CardContent>
    </Card>
  );
}