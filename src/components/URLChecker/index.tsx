import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { URLInput } from './URLInput';
import { URLResult } from './URLResult';

interface URLCheckResult {
  safe: boolean;
  risks: string[];
}

export function URLChecker() {
  const [url, setUrl] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<URLCheckResult | null>(null);

  const checkURL = (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setResult(null);

    // Simulate URL check
    setTimeout(() => {
      const isSafe = !url.includes('malware') && !url.includes('virus');
      setResult({
        safe: isSafe,
        risks: isSafe ? [] : ['Suspicious domain', 'Known malware host']
      });
      setChecking(false);
    }, 1500);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-center mb-4">
        <Globe className="w-10 h-10 text-purple-500" />
      </div>

      <h2 className="text-xl font-bold text-center mb-4">URL Safety Checker</h2>

      <URLInput
        url={url}
        onChange={setUrl}
        onSubmit={checkURL}
        isChecking={checking}
      />

      {result && <URLResult result={result} />}
    </div>
  );
}