export interface DeepAnalysis {
  behaviorPatterns: string[];
  codeInjection: boolean;
  encryptedContent: boolean;
  knownMalwareStrings: string[];
  networkConnections: boolean;
  obfuscatedCode: boolean;
  systemModification: boolean;
}

export interface FileAnalysis {
  fileType: string;
  size: number;
  signature: boolean;
  structureValid: boolean;
  suspiciousPatterns: string[];
  malwareIndicators: string[];
  riskLevel: 'safe' | 'suspicious' | 'dangerous';
  details: string[];
  deepAnalysis: DeepAnalysis;
  threatDescription?: string;
  recommendations: string[];
}