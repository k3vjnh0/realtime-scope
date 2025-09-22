import React, { useEffect, useState } from 'react';
import { AlertTriangle, Thermometer, Droplets, Bug, CloudRain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AlertData {
  temperature: number;
  humidity: number;
  soil_moisture: number;
  pest_pressure: number;
  created_at: string;
}

interface AlertSystemProps {
  latestData: AlertData | null;
}

interface Alert {
  id: string;
  type: 'heat_stress' | 'frost_risk' | 'drought' | 'waterlogging' | 'fungal_risk' | 'pest_outbreak';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  icon: React.ElementType;
}

interface HistoryEntry {
  humidity: number;
  timestamp: string;
}

export function AlertSystem({ latestData }: AlertSystemProps) {
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([]);
  const [humidityHistory, setHumidityHistory] = useState<HistoryEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!latestData) return;

    // Update humidity history for fungal risk tracking
    const newEntry = {
      humidity: latestData.humidity,
      timestamp: latestData.created_at
    };
    
    setHumidityHistory(prev => {
      const updated = [...prev, newEntry];
      // Keep only last 6 hours of data (assuming data comes every hour)
      return updated.slice(-6);
    });

    checkThresholds(latestData);
  }, [latestData]);

  const checkThresholds = (data: AlertData) => {
    const newAlerts: Alert[] = [];

    // Temperature > 35 → Heat stress alert
    if (data.temperature > 35) {
      const alert: Alert = {
        id: `heat_stress_${Date.now()}`,
        type: 'heat_stress',
        message: `Heat stress detected! Temperature is ${data.temperature}°C (above 35°C threshold)`,
        severity: data.temperature > 40 ? 'critical' : 'high',
        timestamp: data.created_at,
        icon: Thermometer
      };
      newAlerts.push(alert);
    }

    // Temperature < 5 → Frost risk alert
    if (data.temperature < 5) {
      const alert: Alert = {
        id: `frost_risk_${Date.now()}`,
        type: 'frost_risk',
        message: `Frost risk detected! Temperature is ${data.temperature}°C (below 5°C threshold)`,
        severity: data.temperature < 0 ? 'critical' : 'high',
        timestamp: data.created_at,
        icon: Thermometer
      };
      newAlerts.push(alert);
    }

    // Soil Moisture < 20 → Drought alert
    if (data.soil_moisture < 20) {
      const alert: Alert = {
        id: `drought_${Date.now()}`,
        type: 'drought',
        message: `Drought conditions detected! Soil moisture is ${data.soil_moisture}% (below 20% threshold)`,
        severity: data.soil_moisture < 10 ? 'critical' : 'high',
        timestamp: data.created_at,
        icon: Droplets
      };
      newAlerts.push(alert);
    }

    // Soil Moisture > 80 → Waterlogging risk
    if (data.soil_moisture > 80) {
      const alert: Alert = {
        id: `waterlogging_${Date.now()}`,
        type: 'waterlogging',
        message: `Waterlogging risk detected! Soil moisture is ${data.soil_moisture}% (above 80% threshold)`,
        severity: data.soil_moisture > 90 ? 'critical' : 'medium',
        timestamp: data.created_at,
        icon: CloudRain
      };
      newAlerts.push(alert);
    }

    // Humidity > 85 for 6+ hours → Fungal risk
    if (data.humidity > 85) {
      const highHumidityPeriod = humidityHistory.filter(entry => entry.humidity > 85);
      if (highHumidityPeriod.length >= 6) {
        const alert: Alert = {
          id: `fungal_risk_${Date.now()}`,
          type: 'fungal_risk',
          message: `Fungal risk detected! Humidity has been above 85% for ${highHumidityPeriod.length} hours`,
          severity: 'medium',
          timestamp: data.created_at,
          icon: Droplets
        };
        newAlerts.push(alert);
      }
    }

    // Pest Pressure > 70 → Pest outbreak alert
    if (data.pest_pressure > 70) {
      const alert: Alert = {
        id: `pest_outbreak_${Date.now()}`,
        type: 'pest_outbreak',
        message: `Pest outbreak alert! Pest pressure is ${data.pest_pressure} (above 70 threshold)`,
        severity: data.pest_pressure > 85 ? 'critical' : 'high',
        timestamp: data.created_at,
        icon: Bug
      };
      newAlerts.push(alert);
    }

    // Show toast notifications for new alerts
    newAlerts.forEach(alert => {
      toast({
        title: `🚨 ${alert.type.replace('_', ' ').toUpperCase()}`,
        description: alert.message,
        variant: alert.severity === 'critical' ? 'destructive' : 'default',
      });
    });

    // Update active alerts (remove duplicates based on type)
    setActiveAlerts(prevAlerts => {
      const filteredPrev = prevAlerts.filter(prevAlert => 
        !newAlerts.some(newAlert => newAlert.type === prevAlert.type)
      );
      return [...filteredPrev, ...newAlerts];
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-dashboard-danger bg-dashboard-danger/10 border-dashboard-danger/20';
      case 'high': return 'text-dashboard-warning bg-dashboard-warning/10 border-dashboard-warning/20';
      case 'medium': return 'text-dashboard-accent bg-dashboard-accent/10 border-dashboard-accent/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const dismissAlert = (alertId: string) => {
    setActiveAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  if (activeAlerts.length === 0) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-3 w-3 rounded-full bg-dashboard-success"></div>
          <h3 className="text-lg font-semibold text-foreground">System Status</h3>
        </div>
        <p className="text-muted-foreground">All parameters within normal ranges. No active alerts.</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="h-5 w-5 text-dashboard-warning" />
        <h3 className="text-lg font-semibold text-foreground">Active Alerts ({activeAlerts.length})</h3>
      </div>
      
      <div className="space-y-3">
        {activeAlerts.map((alert) => {
          const IconComponent = alert.icon;
          return (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <IconComponent className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm">{alert.message}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="text-xs px-2 py-1 rounded hover:bg-background/20 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
