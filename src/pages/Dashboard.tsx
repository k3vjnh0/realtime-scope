import { Thermometer, Droplets, Wind, Zap, Activity, Wifi } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { SensorChart } from "@/components/SensorChart";
import { temperatureData, humidityData, co2Data } from "@/data/mockData";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">IoT Dashboard</h1>
        <p className="text-muted-foreground">Real-time monitoring and data visualization</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Temperature"
          value="24.5°C"
          change="+2.1% from yesterday"
          changeType="positive"
          icon={Thermometer}
        />
        <MetricCard
          title="Humidity"
          value="67.2%"
          change="-1.5% from yesterday"
          changeType="negative"
          icon={Droplets}
        />
        <MetricCard
          title="CO2 Level"
          value="402 ppm"
          change="Normal range"
          changeType="neutral"
          icon={Wind}
        />
        <MetricCard
          title="Energy Usage"
          value="1.2 kWh"
          change="-5.3% from yesterday"
          changeType="positive"
          icon={Zap}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SensorChart
          title="Temperature (24h)"
          data={temperatureData}
          color="hsl(var(--primary))"
          unit="°C"
        />
        <SensorChart
          title="Humidity (24h)"
          data={humidityData}
          color="hsl(var(--dashboard-accent))"
          unit="%"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <SensorChart
          title="CO2 Levels (24h)"
          data={co2Data}
          color="hsl(var(--dashboard-warning))"
          unit=" ppm"
        />
      </div>

      {/* Device Status */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4 text-foreground">Device Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Sensor A1", status: "online", signal: 98 },
            { name: "Sensor B2", status: "online", signal: 87 },
            { name: "Sensor C1", status: "offline", signal: 0 },
            { name: "Energy Meter", status: "online", signal: 92 },
            { name: "Weather Station", status: "warning", signal: 45 },
            { name: "Soil Monitor", status: "online", signal: 89 }
          ].map((device, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${
                  device.status === 'online' ? 'bg-dashboard-success' :
                  device.status === 'warning' ? 'bg-dashboard-warning' :
                  'bg-dashboard-danger'
                }`} />
                <div>
                  <p className="font-medium text-foreground">{device.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{device.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{device.signal}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}