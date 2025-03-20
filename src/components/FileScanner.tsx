import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, FileWarning, Loader } from 'lucide-react';
import { analyzeFile, type FileAnalysis } from '../utils/fileAnalyzer';

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
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select file to scan
        </label>
        <input
          type="file"
          onChange={(e) => e.target.files?.[0] && handleFileScan(e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          accept="*/*"
        />
      </div>

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

      {analysis && (
        <div className={`mt-4 p-4 rounded-md ${
          analysis.riskLevel === 'safe' ? 'bg-green-50 border-green-200' :
          analysis.riskLevel === 'suspicious' ? 'bg-yellow-50 border-yellow-200' :
          'bg-red-50 border-red-200'
        } border`}>
          <div className="flex items-center mb-3">
            {analysis.riskLevel === 'safe' ? (
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            ) : analysis.riskLevel === 'suspicious' ? (
              <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
            ) : (
              <FileWarning className="w-5 h-5 text-red-500 mr-2" />
            )}
            <span className={`font-medium ${
              analysis.riskLevel === 'safe' ? 'text-green-700' :
              analysis.riskLevel === 'suspicious' ? 'text-yellow-700' :
              'text-red-700'
            }`}>
              {analysis.riskLevel.charAt(0).toUpperCase() + analysis.riskLevel.slice(1)}
            </span>
          </div>

          {analysis.threatDescription && (
            <div className="mb-3">
              <h3 className="font-medium mb-1">Analysis Result:</h3>
              <p className="text-gray-700 text-sm">{analysis.threatDescription}</p>
            </div>
          )}

          <div className="space-y-2">
            {analysis.details.map((detail, index) => (
              <div key={index} className="text-sm text-gray-700 bg-white bg-opacity-50 p-2 rounded">
                {detail}
              </div>
            ))}
          </div>

          {analysis.recommendations.length > 0 && (
            <div className="mt-3">
              <h4 className="font-medium mb-2">Recommendations:</h4>
              <ul className="space-y-1">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-center">
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}