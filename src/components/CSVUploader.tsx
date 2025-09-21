import React, { useState } from 'react';
import Papa from 'papaparse';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CSVData {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
  label: string;
  soil_moisture: number;
  soil_type: string;
  sunlight_exposure: number;
  wind_speed: number;
  co2_concentration: number;
  organic_matter: number;
  irrigation_frequency: number;
  crop_density: number;
  pest_pressure: number;
  fertilizer_usage: number;
  growth_stage: string;
  urban_area_proximity: number;
  water_source_type: string;
  frost_risk: number;
  water_usage_efficiency: number;
}

interface CSVUploaderProps {
  onDataUpload: (data: CSVData[]) => void;
}

export function CSVUploader({ onDataUpload }: CSVUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string>('');
  const [recordCount, setRecordCount] = useState<number>(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFileName(file.name);
    setUploadStatus('idle');

    Papa.parse(file, {
      complete: (results) => {
        try {
          const parsedData = results.data as any[];
          // Remove header row and filter out empty rows
          const dataRows = parsedData.slice(1).filter(row => 
            row && Object.values(row).some(value => value !== '' && value !== null && value !== undefined)
          );

          const processedData: CSVData[] = dataRows.map((row: any) => ({
            N: parseFloat(row[0]) || 0,
            P: parseFloat(row[1]) || 0,
            K: parseFloat(row[2]) || 0,
            temperature: parseFloat(row[3]) || 0,
            humidity: parseFloat(row[4]) || 0,
            ph: parseFloat(row[5]) || 0,
            rainfall: parseFloat(row[6]) || 0,
            label: row[7] || '',
            soil_moisture: parseFloat(row[8]) || 0,
            soil_type: row[9] || '',
            sunlight_exposure: parseFloat(row[10]) || 0,
            wind_speed: parseFloat(row[11]) || 0,
            co2_concentration: parseFloat(row[12]) || 0,
            organic_matter: parseFloat(row[13]) || 0,
            irrigation_frequency: parseFloat(row[14]) || 0,
            crop_density: parseFloat(row[15]) || 0,
            pest_pressure: parseFloat(row[16]) || 0,
            fertilizer_usage: parseFloat(row[17]) || 0,
            growth_stage: row[18] || '',
            urban_area_proximity: parseFloat(row[19]) || 0,
            water_source_type: row[20] || '',
            frost_risk: parseFloat(row[21]) || 0,
            water_usage_efficiency: parseFloat(row[22]) || 0,
          }));

          setRecordCount(processedData.length);
          setUploadStatus('success');
          onDataUpload(processedData);
        } catch (error) {
          console.error('Error processing CSV:', error);
          setUploadStatus('error');
        } finally {
          setIsUploading(false);
        }
      },
      header: false,
      skipEmptyLines: true,
      error: (error) => {
        console.error('Error parsing CSV:', error);
        setUploadStatus('error');
        setIsUploading(false);
      }
    });
  };

  return (
    <Card className="glass-card mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Upload className="h-5 w-5" />
          Upload Agricultural Data (CSV)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
            {isUploading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                Processing...
              </div>
            )}
          </div>

          {uploadStatus === 'success' && (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div className="text-sm">
                <span className="font-medium text-green-700 dark:text-green-400">Success!</span>
                <span className="text-green-600 dark:text-green-300 ml-2">
                  Uploaded {recordCount} records from {fileName}
                </span>
              </div>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <div className="text-sm">
                <span className="font-medium text-red-700 dark:text-red-400">Error!</span>
                <span className="text-red-600 dark:text-red-300 ml-2">
                  Failed to process the CSV file. Please check the format.
                </span>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            <p><strong>Expected CSV columns:</strong></p>
            <p>N, P, K, temperature, humidity, ph, rainfall, label, soil_moisture, soil_type, sunlight_exposure, wind_speed, co2_concentration, organic_matter, irrigation_frequency, crop_density, pest_pressure, fertilizer_usage, growth_stage, urban_area_proximity, water_source_type, frost_risk, water_usage_efficiency</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}