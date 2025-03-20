import React, { useState } from 'react';
import { Shield, AlertTriangle, Loader } from 'lucide-react';
import { analyzeFile, type FileAnalysis } from '../../utils/fileAnalyzer';
import { FileInput } from './FileInput';
import { ScanResult } from './ScanResult';

export function FileScanner() {
  const [scanning, setScanning] = useState(false);
  const [analysis, setAnalysis] = useState<FileAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileScan = async (file: File) => {
    try {
      setScanning(true);
      setError(null);
      setAnalysis(null);
      
      const result = await analyzeFile(file);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during scanning');
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-center mb-4">
        <Shield className="w-10 h-10 text-blue-500" />
      </div>
      
      <h2 className="text-xl font-bold text-center mb-4">File Security Scanner</h2>
      
      <FileInput onFileSelect={handleFileScan} />

      {scanning && (
        <div className="text-center py-4">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-500" />
          <div className="text-gray-600">Scanning file...</div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-md border border-red-200">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {analysis && <ScanResult analysis={analysis} />}
    </div>
  );
}