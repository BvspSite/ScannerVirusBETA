import { DeepAnalysis } from '../types';

export function detectEncryption(content: string): boolean {
  const entropyThreshold = 7.5;
  const entropy = calculateEntropy(content);
  return entropy > entropyThreshold;
}

export function detectObfuscation(content: string): boolean {
  const patterns = [
    /eval\s*\(/,
    /\\x[0-9a-f]{2}/i,
    /String\.fromCharCode/,
    /unescape\s*\(/
  ];
  return patterns.some(pattern => pattern.test(content));
}

export function detectCodeInjection(content: string): boolean {
  const patterns = [
    /shell_exec/,
    /eval\s*\(/,
    /exec\s*\(/,
    /system\s*\(/
  ];
  return patterns.some(pattern => pattern.test(content));
}

export function detectSystemModification(content: string): boolean {
  const patterns = [
    /RegCreateKey/,
    /CreateProcess/,
    /WriteProcessMemory/,
    /LoadLibrary/
  ];
  return patterns.some(pattern => pattern.test(content));
}

export function detectNetworkConnections(content: string): boolean {
  const patterns = [
    /http:\/\//,
    /https:\/\//,
    /socket\./,
    /wget\s/
  ];
  return patterns.some(pattern => pattern.test(content));
}

export function analyzeBehaviorPatterns(content: string): string[] {
  const patterns = [];
  
  if (/CreateRemoteThread/.test(content)) {
    patterns.push("Attempts to inject code into other processes");
  }
  if (/SetWindowsHookEx/.test(content)) {
    patterns.push("Keyboard/Mouse hooking detected");
  }
  if (/CreateService/.test(content)) {
    patterns.push("Attempts to create system services");
  }
  if (/StartServiceCtrlDispatcher/.test(content)) {
    patterns.push("Service control manipulation");
  }
  
  return patterns;
}

function calculateEntropy(str: string): number {
  const len = str.length;
  const frequencies = new Map();
  
  for (const char of str) {
    frequencies.set(char, (frequencies.get(char) || 0) + 1);
  }
  
  return Array.from(frequencies.values()).reduce((entropy, freq) => {
    const p = freq / len;
    return entropy - p * Math.log2(p);
  }, 0);
}