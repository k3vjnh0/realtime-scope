import React from 'react';
import { Upload, Send } from "lucide-react";
import { CSVUploader } from "@/components/CSVUploader";
import { DataSender } from "@/components/DataSender";

export default function DataInput() {
  const handleDataUpload = (data: any[]) => {
    // Data upload logic is handled within the CSVUploader component
    console.log('Data uploaded:', data.length, 'records');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Data Input</h1>
        <p className="text-muted-foreground">Upload CSV files or send data manually to the system</p>
      </div>

      {/* CSV Upload Section */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Upload className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">CSV File Upload</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Upload agricultural data from CSV files to analyze environmental conditions and crop metrics.
        </p>
        <CSVUploader onDataUpload={handleDataUpload} />
      </div>

      {/* Manual Data Sender Section */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Send className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Manual Data Entry</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Send individual data points directly to the database for real-time monitoring.
        </p>
        <DataSender />
      </div>
    </div>
  );
}