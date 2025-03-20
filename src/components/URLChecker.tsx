  import React, { useState } from 'react';
  import { Globe, AlertCircle, CheckCircle } from 'lucide-react';

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

        <form onSubmit={checkURL}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter URL to check
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={checking}
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 disabled:opacity-50 transition-colors"
          >
            {checking ? 'Checking...' : 'Check URL'}
          </button>
        </form>

        {result && (
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
        )}
      </div>
    );
  }