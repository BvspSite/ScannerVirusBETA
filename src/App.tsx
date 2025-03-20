import React from 'react';
import { FileScanner } from './components/FileScanner';
import { URLChecker } from './components/URLChecker';
import { Shield } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Security Scanner By Pabril
          </h1>
          <p className="text-gray-600">
            Scan files and check URLs for potential security threats
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FileScanner />
          <URLChecker />
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Security Tips</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Always scan downloaded files before opening them</li>
            <li>• Be cautious of unexpected email attachments</li>
            <li>• Keep your operating system and antivirus software updated</li>
            <li>• Don't click on suspicious links or download from untrusted sources</li>
            <li>• Use strong, unique passwords for all your accounts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;