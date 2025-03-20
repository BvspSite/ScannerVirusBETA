import { DeepAnalysis, FileAnalysis } from './types';
import {
  detectEncryption,
  detectObfuscation,
  detectCodeInjection,
  detectSystemModification,
  detectNetworkConnections,
  analyzeBehaviorPatterns
} from './analyzers/contentAnalyzer';
import { detectKnownMalwareStrings } from './analyzers/malwareAnalyzer';

export type { FileAnalysis, DeepAnalysis };

export async function analyzeFile(file: File): Promise<FileAnalysis> {
  const analysis: FileAnalysis = {
    fileType: file.type || 'application/octet-stream',
    size: file.size,
    signature: true,
    structureValid: true,
    suspiciousPatterns: [],
    malwareIndicators: [],
    riskLevel: 'safe',
    details: [],
    deepAnalysis: {
      behaviorPatterns: [],
      codeInjection: false,
      encryptedContent: false,
      knownMalwareStrings: [],
      networkConnections: false,
      obfuscatedCode: false,
      systemModification: false
    },
    recommendations: []
  };

  try {
    // Deep file analysis
    await performDeepAnalysis(file, analysis);
    
    // Determine risk level and generate detailed report
    analysis.riskLevel = calculateRiskLevel(analysis);
    analysis.details = generateAnalysisDetails(analysis);
    analysis.threatDescription = generateThreatDescription(analysis);
    analysis.recommendations = generateRecommendations(analysis);

    return analysis;
  } catch (error) {
    console.error('Error analyzing file:', error);
    throw new Error('Failed to analyze file');
  }
}

async function performDeepAnalysis(file: File, analysis: FileAnalysis) {
  const buffer = await file.arrayBuffer();
  const content = new Uint8Array(buffer);
  const textDecoder = new TextDecoder();
  const fileContent = textDecoder.decode(content);

  // Check for encrypted or obfuscated content
  analysis.deepAnalysis.encryptedContent = detectEncryption(fileContent);
  analysis.deepAnalysis.obfuscatedCode = detectObfuscation(fileContent);

  // Check for code injection patterns
  analysis.deepAnalysis.codeInjection = detectCodeInjection(fileContent);

  // Check for system modification attempts
  analysis.deepAnalysis.systemModification = detectSystemModification(fileContent);

  // Check for suspicious network connections
  analysis.deepAnalysis.networkConnections = detectNetworkConnections(fileContent);

  // Analyze behavior patterns
  analysis.deepAnalysis.behaviorPatterns = analyzeBehaviorPatterns(fileContent);

  // Check for known malware strings
  analysis.deepAnalysis.knownMalwareStrings = detectKnownMalwareStrings(fileContent);
}

function calculateRiskLevel(analysis: FileAnalysis): 'safe' | 'suspicious' | 'dangerous' {
  const { deepAnalysis } = analysis;
  
  // Dangerous if known malware or multiple high-risk behaviors
  if (deepAnalysis.knownMalwareStrings.length > 0 || 
      (deepAnalysis.codeInjection && deepAnalysis.systemModification)) {
    return 'dangerous';
  }
  
  // Suspicious if any concerning behaviors
  if (deepAnalysis.behaviorPatterns.length > 0 ||
      deepAnalysis.obfuscatedCode ||
      deepAnalysis.encryptedContent ||
      deepAnalysis.networkConnections) {
    return 'suspicious';
  }
  
  return 'safe';
}

function generateAnalysisDetails(analysis: FileAnalysis): string[] {
  const details: string[] = [];
  const { deepAnalysis } = analysis;
  
  details.push(`📁 File Type: ${analysis.fileType || 'Unknown'}`);
  details.push(`📏 Size: ${formatFileSize(analysis.size)}`);
  
  if (deepAnalysis.encryptedContent) {
    details.push("🔒 File contains encrypted content");
  }
  
  if (deepAnalysis.obfuscatedCode) {
    details.push("🔍 Obfuscated code detected");
  }
  
  if (deepAnalysis.codeInjection) {
    details.push("⚠️ Code injection patterns found");
  }
  
  if (deepAnalysis.systemModification) {
    details.push("⚙️ Attempts to modify system detected");
  }
  
  if (deepAnalysis.networkConnections) {
    details.push("🌐 Suspicious network connections found");
  }
  
  deepAnalysis.behaviorPatterns.forEach(pattern => {
    details.push(`🚨 ${pattern}`);
  });
  
  deepAnalysis.knownMalwareStrings.forEach(pattern => {
    details.push(`⛔ ${pattern}`);
  });
  
  return details;
}

function generateThreatDescription(analysis: FileAnalysis): string {
  const { deepAnalysis } = analysis;
  
  if (analysis.riskLevel === 'dangerous') {
    return `This file exhibits characteristics of malware. It contains ${
      deepAnalysis.knownMalwareStrings.length
    } known malicious patterns${
      deepAnalysis.behaviorPatterns.length > 0 
        ? ` and shows suspicious behavior including ${deepAnalysis.behaviorPatterns.join(', ')}`
        : ''
    }.`;
  }
  
  if (analysis.riskLevel === 'suspicious') {
    return `This file contains suspicious elements that require attention. ${
      deepAnalysis.obfuscatedCode ? 'The code is obfuscated, which may hide malicious intent. ' : ''
    }${
      deepAnalysis.encryptedContent ? 'Encrypted content detected, which may conceal harmful code. ' : ''
    }${
      deepAnalysis.networkConnections ? 'Suspicious network activity detected. ' : ''
    }`;
  }
  
  return 'No immediate threats detected in this file. However, always exercise caution with unknown files.';
}

function generateRecommendations(analysis: FileAnalysis): string[] {
  const recommendations: string[] = [];
  
  if (analysis.riskLevel === 'dangerous') {
    recommendations.push(
      "❌ Do not open or execute this file",
      "🗑️ Delete the file immediately",
      "🔍 Scan your system with an updated antivirus",
      "📝 Check system logs for suspicious activity",
      "🔒 Consider changing passwords if the file was executed"
    );
  } else if (analysis.riskLevel === 'suspicious') {
    recommendations.push(
      "⚠️ Exercise caution with this file",
      "🔒 Run in a sandboxed environment if needed",
      "🔍 Submit to additional virus scanning",
      "📤 Verify the file source",
      "💾 Back up important data before proceeding"
    );
  } else {
    recommendations.push(
      "✅ File appears safe but verify the source",
      "🔄 Keep your antivirus updated",
      "📝 Maintain regular system backups",
      "🔍 Monitor for unexpected behavior"
    );
  }
  
  return recommendations;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' bytes';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}