import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface URLCheckResult {
  safe: boolean;
  risks: string[];
}

interface URLResultProps {
  result: URLCheckResult;
}

export function URLResult({ result }: URLResultProps) {
  return (
    <div className={`mt-4 p-4 rounded-md ${result.safe ? 'bg-green-50' : 'bg-red-50'}`}>
      <div className="flex items-center">
        {result.safe ? (
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
        )}
        <span className={result.safe ? 'text-green-700' : 'text-red-700'}>
          {result.safe ? 'URL appears safe' : 'URL may be dangerous'}
        </span>
      </div>
      {!result.safe && (
        <ul className="mt-2 list-disc list-inside text-red-600">
          {result.risks.map((risk, index) => (
            <li key={index}>{risk}</li>
          ))}
        </ul>
      )}
    </div>
  );
}