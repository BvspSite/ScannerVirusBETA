export const maliciousPatterns = {
  executable: {
    patterns: [
      { signature: "4D5A", description: "DOS MZ executable" },
      { signature: "7F454C46", description: "ELF executable (Linux)" },
      { signature: "CAFEBABE", description: "Java class file" }
    ],
    suspiciousStrings: [
      "CreateRemoteThread",
      "WriteProcessMemory",
      "SetWindowsHookEx",
      "GetAsyncKeyState",
      "WriteProcessMemory"
    ]
  },
  document: {
    patterns: [
      { signature: "D0CF11E0", description: "MS Office document" },
      { signature: "504B0304", description: "ZIP/DOCX/XLSX" }
    ],
    suspiciousStrings: [
      "AutoOpen",
      "AutoExec",
      "AutoClose",
      "javascript:",
      "VBScript:",
      "Shell(",
      "ActiveXObject"
    ]
  },
  script: {
    patterns: [
      { signature: "3C736372", description: "HTML script tag" },
      { signature: "696D706F", description: "Python import" }
    ],
    suspiciousStrings: [
      "eval(",
      "base64_decode",
      "shell_exec",
      "gzinflate",
      "document.write("
    ]
  },
  // Tambahan pattern untuk deteksi yang lebih akurat
  network: {
    patterns: [
      { signature: "474554", description: "HTTP GET request" },
      { signature: "504F5354", description: "HTTP POST request" }
    ],
    suspiciousStrings: [
      "wget ",
      "curl ",
      "nc ",
      "netcat",
      "reverse shell"
    ]
  },
  crypto: {
    patterns: [
      { signature: "8365", description: "Possible ransomware marker" }
    ],
    suspiciousStrings: [
      "encrypt",
      "decrypt",
      "ransom",
      "bitcoin",
      "monero"
    ]
  }
};