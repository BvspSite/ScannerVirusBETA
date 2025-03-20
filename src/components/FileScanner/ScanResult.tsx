import React from 'react';
import { CheckCircle, AlertTriangle, FileWarning } from 'lucide-react';
import type { FileAnalysis } from '../../utils/fileAnalyzer';

interface ScanResultProps {
  analysis: FileAnalysis;
}

export function ScanResult({ analysis }: ScanResultProps) {
  const getStatusColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'safe': return {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-700'
      };
      case 'suspicious': return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-700'
      };
      default: return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-700'
      };
    }
  };

  const colors = getStatusColor(analysis.riskLevel);

  return (
    <div className={`mt-4 p-4 rounded-md ${colors.bg} ${colors.border} border`}>
      <div className="flex items-center mb-3">
        {analysis.riskLevel === 'safe' ? (
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
        ) : analysis.riskLevel === 'suspicious' ? (
          <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
        ) : (
          <FileWarning className="w-5 h-5 text-red-500 mr-2" />
        )}
        <span className={`font-medium ${colors.text}`}>
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
  );
}