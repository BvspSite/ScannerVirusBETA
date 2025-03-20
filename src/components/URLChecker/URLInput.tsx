import React from 'react';

interface URLInputProps {
  url: string;
  onChange: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isChecking: boolean;
}

export function URLInput({ url, onChange, onSubmit, isChecking }: URLInputProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter URL to check
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <button
        type="submit"
        disabled={isChecking}
        className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 disabled:opacity-50 transition-colors"
      >
        {isChecking ? 'Checking...' : 'Check URL'}
      </button>
    </form>
  );
}