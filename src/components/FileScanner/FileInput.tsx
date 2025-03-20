import React from 'react';

interface FileInputProps {
  onFileSelect: (file: File) => void;
}

export function FileInput({ onFileSelect }: FileInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select file to scan
      </label>
      <input
        type="file"
        onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        accept="*/*"
      />
    </div>
  );
}