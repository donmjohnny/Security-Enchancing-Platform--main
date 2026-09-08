export const initialSummary = {
  critical: 3,
  high: 8,
  resolved: 124,
  total: 135,
  medium: 24,
  low: 42,
  vulnerableAssetsCount: 141
};

export const initialAlerts = [
  {
    id: "ALT-1049",
    title: "Exposed Credentials",
    description: "Sensitive credentials detected in source files.",
    asset: "react-scripts",
    assetType: "npm package",
    filePath: "src/config/aws-credentials.js:14",
    detectedTime: "10 min ago",
    timestamp: "2026-08-18T09:24:00Z",
    severity: "Critical",
    cve: "CWE-798",
    cvssScore: 9.4,
    status: "Open",
    actionLabel: "Investigate",
    remediation: "Revoke the exposed API credentials in AWS IAM console immediately. Rotate secrets and move them to an encrypted environment store (e.g. AWS Secrets Manager or .env with gitignore).",
    codeSnippet: `// VULNERABLE CODE (Line 14)
const AWS_SECRET_KEY = "AKIAIOSFODNN7EXAMPLE_SECRET_KEY_EXPOSED";
const AWS_REGION = "us-east-1";

// RECOMMENDED FIX
const AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_DEFAULT_REGION;`,
    category: "Source Code & Credentials"
  },
  {
    id: "ALT-1048",
    title: "Vulnerable Dependency",
    description: "Package contains known security vulnerabilities (Command Injection / Prototype Pollution).",
    asset: "lodash",
    assetType: "npm package",
    filePath: "package.json:28 (^4.17.15)",
    detectedTime: "32 min ago",
    timestamp: "2026-08-18T09:02:00Z",
    severity: "High",
    cve: "CVE-2021-23337",
    cvssScore: 8.1,
    status: "Open",
    actionLabel: "Fix Now",
    remediation: "Upgrade lodash to version 4.17.21 or later. Command injection via template function in versions prior to 4.17.21 allows arbitrary code execution.",
    codeSnippet: `// RUN IN TERMINAL
npm install lodash@^4.17.21 --save

// VERIFY IN PACKAGE.JSON
- "lodash": "^4.17.15"
+ "lodash": "^4.17.21"`,
    category: "Dependencies"
  },
  {
    id: "ALT-1047",
    title: "Unsafe Configuration",
    description: "Security configuration requires attention.",
    asset: "express",
    assetType: "framework config",
    filePath: "server/app.js:42",
    detectedTime: "1 hour ago",
    timestamp: "2026-08-18T08:34:00Z",
    severity: "High",
    cve: "CWE-16",
    cvssScore: 7.2,
    status: "Open",
    actionLabel: "Review",
    remediation: "Enable Helmet middleware to set secure HTTP headers (Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options) and disable X-Powered-By header.",
    codeSnippet: `// IN server/app.js
const helmet = require('helmet');
app.use(helmet());
app.disable('x-powered-by');`,
    category: "System Configuration"
  },
  {
    id: "ALT-1046",
    title: "Git Directory Exposure",
    description: "Publicly accessible Git metadata detected.",
    asset: "Source Repository",
    assetType: "repository",
    filePath: "public/.git/config",
    detectedTime: "2 hours ago",
    timestamp: "2026-08-18T07:34:00Z",
    severity: "Medium",
    cve: "CWE-538",
    cvssScore: 6.2,
    status: "Monitoring",
    actionLabel: "View",
    remediation: "Configure web server (Nginx/Apache/Cloudflare) to block HTTP access to hidden .git directories and dotfiles.",
    codeSnippet: `# Nginx config snippet:
location ~ /\\.git {
    deny all;
    return 404;
}`,
    category: "Source Code & Credentials"
  },
  {
    id: "ALT-1045",
    title: "Weak JWT Signature Algorithm",
    description: "JWT token signed with weak or deprecated algorithm (none/HS256 with short secret).",
    asset: "jsonwebtoken",
    assetType: "npm package",
    filePath: "server/middleware/auth.js:19",
    detectedTime: "3 hours ago",
    timestamp: "2026-08-18T06:34:00Z",
    severity: "Critical",
    cve: "CVE-2022-23529",
    cvssScore: 9.1,
    status: "Open",
    actionLabel: "Investigate",
    remediation: "Enforce RS256 with 2048-bit RSA keys or HS256 with minimum 256-bit entropy secret string. Disallow 'none' algorithm in verification options.",
    codeSnippet: `jwt.verify(token, publicKey, { algorithms: ['RS256'] });`,
    category: "Authentication"
  },
  {
    id: "ALT-1044",
    title: "SQL Injection in Search Query",
    description: "Unsanitized user parameters passed directly to SQL query constructor.",
    asset: "pg-pool",
    assetType: "database layer",
    filePath: "server/controllers/search.js:55",
    detectedTime: "4 hours ago",
    timestamp: "2026-08-18T05:34:00Z",
    severity: "Critical",
    cve: "CWE-89",
    cvssScore: 9.6,
    status: "Open",
    actionLabel: "Investigate",
    remediation: "Use parameterized queries ($1, $2) instead of string concatenation or template literals.",
    codeSnippet: `// FIXED QUERY
const query = 'SELECT * FROM users WHERE username = $1 AND role = $2';
const results = await db.query(query, [req.body.username, req.body.role]);`,
    category: "Source Code & Credentials"
  },
  {
    id: "ALT-1043",
    title: "Permissive CORS Policy",
    description: "Access-Control-Allow-Origin header set to wildcard '*' with credentials allowed.",
    asset: "cors",
    assetType: "middleware",
    filePath: "server/server.js:31",
    detectedTime: "5 hours ago",
    timestamp: "2026-08-18T04:34:00Z",
    severity: "High",
    cve: "CWE-942",
    cvssScore: 7.8,
    status: "Open",
    actionLabel: "Review",
    remediation: "Restrict Access-Control-Allow-Origin to trusted origins whitelist.",
    codeSnippet: `app.use(cors({
  origin: ['https://nexusteam.com', 'https://app.nexusteam.com'],
  credentials: true
}));`,
    category: "API Security"
  },
  {
    id: "ALT-1042",
    title: "Insecure Cookie Flags",
    description: "Session cookie missing 'HttpOnly', 'Secure', and 'SameSite=Strict' flags.",
    asset: "express-session",
    assetType: "session store",
    filePath: "server/session.js:18",
    detectedTime: "6 hours ago",
    timestamp: "2026-08-18T03:34:00Z",
    severity: "Medium",
    cve: "CWE-614",
    cvssScore: 5.4,
    status: "Open",
    actionLabel: "Fix Now",
    remediation: "Set cookie attributes: httpOnly: true, secure: true, sameSite: 'strict'.",
    codeSnippet: `cookie: {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 86400000
}`,
    category: "Authentication"
  },
  {
    id: "ALT-1041",
    title: "Open S3 Bucket Read Permissions",
    description: "Public read ACL enabled on user assets storage bucket.",
    asset: "aws-s3-bucket",
    assetType: "cloud infra",
    filePath: "terraform/s3.tf:12",
    detectedTime: "8 hours ago",
    timestamp: "2026-08-18T01:34:00Z",
    severity: "High",
    cve: "CWE-284",
    cvssScore: 8.1,
    status: "Open",
    actionLabel: "Review",
    remediation: "Enable S3 Block Public Access settings and restrict access through CloudFront Origin Access Control (OAC).",
    codeSnippet: `resource "aws_s3_bucket_public_access_block" "assets" {
  bucket = aws_s3_bucket.assets.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}`,
    category: "System Configuration"
  },
  {
    id: "ALT-1040",
    title: "Cross-Site Scripting (XSS) in Markdown Parser",
    description: "Unsanitized HTML rendered in comments component preview.",
    asset: "marked",
    assetType: "npm package",
    filePath: "src/components/MarkdownViewer.jsx:22",
    detectedTime: "12 hours ago",
    timestamp: "2026-08-17T21:34:00Z",
    severity: "Low",
    cve: "CVE-2023-41315",
    cvssScore: 4.8,
    status: "Open",
    actionLabel: "Review",
    remediation: "Sanitize output using DOMPurify before dangerouslySetInnerHTML.",
    codeSnippet: `import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }} />`,
    category: "Source Code & Credentials"
  },
  {
    id: "ALT-1039",
    title: "Prototype Pollution in qs",
    description: "Query string parser vulnerable to object prototype injection.",
    asset: "qs",
    assetType: "npm package",
    filePath: "package.json:45 (6.7.0)",
    detectedTime: "1 day ago",
    timestamp: "2026-08-17T09:34:00Z",
    severity: "Resolved",
    cve: "CVE-2022-24999",
    cvssScore: 7.5,
    status: "Resolved",
    actionLabel: "View",
    remediation: "Upgraded qs to version 6.11.0. Verified prototype pollution payload tests passing.",
    codeSnippet: `// PATCH APPLIED
npm install qs@^6.11.0 --save`,
    category: "Dependencies"
  },
  {
    id: "ALT-1038",
    title: "Missing Rate Limiting on Login Endpoint",
    description: "No rate limit configured for /api/v1/auth/login route.",
    asset: "express-rate-limit",
    assetType: "middleware",
    filePath: "server/routes/auth.js:14",
    detectedTime: "2 days ago",
    timestamp: "2026-08-16T14:34:00Z",
    severity: "Resolved",
    cve: "CWE-307",
    cvssScore: 5.3,
    status: "Resolved",
    actionLabel: "View",
    remediation: "Implemented rate limiter with max 5 failed attempts per 15 minutes per IP address.",
    codeSnippet: `const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
app.use('/api/v1/auth/login', loginLimiter);`,
    category: "API Security"
  }
];

export const securityChecksList = [
  {
    id: "chk-1",
    title: "Dependency Scan",
    description: "All monitored dependencies are secure",
    status: "Secure",
    lastRun: "12 min ago",
    itemsChecked: "1,420 packages"
  },
  {
    id: "chk-2",
    title: "Source Code Scan",
    description: "No critical vulnerabilities detected",
    status: "Secure",
    lastRun: "35 min ago",
    itemsChecked: "84,920 LOC"
  },
  {
    id: "chk-3",
    title: "Authentication",
    description: "Authentication controls are functioning normally",
    status: "Secure",
    lastRun: "1 hour ago",
    itemsChecked: "MFA & SSO policies"
  },
  {
    id: "chk-4",
    title: "API Security",
    description: "No suspicious API activity detected",
    status: "Secure",
    lastRun: "2 hours ago",
    itemsChecked: "18 endpoints"
  },
  {
    id: "chk-5",
    title: "File Integrity",
    description: "No unauthorized modifications detected",
    status: "Secure",
    lastRun: "3 hours ago",
    itemsChecked: "Core system files"
  },
  {
    id: "chk-6",
    title: "System Configuration",
    description: "Configuration is within recommended security standards",
    status: "Secure",
    lastRun: "4 hours ago",
    itemsChecked: "CIS Benchmarks v2.4"
  }
];

export const packagesList = [
  { name: "react-scripts", status: "Scanning", badgeType: "scanning" },
  { name: "lodash", status: "Completed", badgeType: "completed" },
  { name: "express", status: "Pending", badgeType: "pending" }
];

export const recentActivityList = [
  {
    id: "act-1",
    text: "Critical vulnerability detected in react-scripts",
    time: "10 min ago",
    type: "critical",
    dotColor: "rose"
  },
  {
    id: "act-2",
    text: "lodash dependency scan completed",
    time: "32 min ago",
    type: "info",
    dotColor: "purple"
  },
  {
    id: "act-3",
    text: "Security configuration verified",
    time: "1 hour ago",
    type: "success",
    dotColor: "emerald"
  },
  {
    id: "act-4",
    text: "Source code scan completed successfully",
    time: "2 hours ago",
    type: "neutral",
    dotColor: "purple"
  },
  {
    id: "act-5",
    text: "12 vulnerabilities marked as resolved",
    time: "3 hours ago",
    type: "neutral",
    dotColor: "black"
  },
  {
    id: "act-6",
    text: "Scan for apple.com has been completed",
    time: "3h Ago",
    type: "neutral",
    dotColor: "purple"
  },
  {
    id: "act-7",
    text: "Scan for dribbble.com/ nexusteam has been completed",
    time: "1 Day Ago",
    type: "neutral",
    dotColor: "purple"
  },
  {
    id: "act-8",
    text: "Permissions for user Alex updated",
    time: "30 Oct 2020",
    type: "success",
    dotColor: "emerald"
  },
  {
    id: "act-9",
    text: "Backup created for nexus.com",
    time: "30 Oct 2020",
    type: "neutral",
    dotColor: "black"
  }
];

/* ==========================================================================
   SECURITY SCAN REPORT DATASETS
   ========================================================================== */

export const scanReportMeta = {
  scanId: "SCAN-2026-0818-001",
  scanDate: "18 Aug 2026, 09:24 AM",
  scanDuration: "02m 43s",
  scanStatus: "Completed",
  organization: "nexusteam.com",
  targetEnvironment: "Production (us-east-1)"
};

export const scanScoreData = {
  score: 78,
  maxScore: 100,
  riskLevel: "Moderate Risk",
  scoreColor: "#f97316",
  description: "Security score calculated from vulnerabilities, dependencies, configuration, exposed assets, and scan results.",
  trend: "+6%",
  trendDirection: "up",
  trendComparison: "from previous scan"
};

export const scanSummaryCardsData = [
  {
    id: "assets-scanned",
    title: "Assets Scanned",
    value: "141",
    subtitle: "Websites, repositories and applications",
    iconName: "Globe",
    accentColor: "var(--primary-purple)"
  },
  {
    id: "files-scanned",
    title: "Files Scanned",
    value: "5,874",
    subtitle: "Source and configuration files",
    iconName: "FileCode",
    accentColor: "#3b82f6"
  },
  {
    id: "dependencies-scanned",
    title: "Dependencies Scanned",
    value: "38",
    subtitle: "Packages and libraries",
    iconName: "Package",
    accentColor: "#8b5cf6"
  },
  {
    id: "vulnerabilities-found",
    title: "Vulnerabilities Found",
    value: "35",
    subtitle: "Across all scanned assets",
    iconName: "ShieldAlert",
    accentColor: "var(--severity-critical)"
  },
  {
    id: "checks-passed",
    title: "Security Checks Passed",
    value: "5,839",
    subtitle: "Checks completed successfully",
    iconName: "CheckCircle2",
    accentColor: "var(--severity-resolved)"
  }
];

export const scanCoverageRows = [
  {
    id: "cov-source",
    title: "Source Code",
    icon: "FileCode",
    scannedCount: "5,874",
    scannedLabel: "Files scanned",
    status: "Completed",
    issuesCount: 12,
    details: "TypeScript, JavaScript, JSON, YAML files scanned for secrets, hardcoded credentials, and injection vectors."
  },
  {
    id: "cov-dependencies",
    title: "Dependencies",
    icon: "Package",
    scannedCount: "38",
    scannedLabel: "Packages scanned",
    status: "Completed",
    issuesCount: 15,
    details: "NPM direct and transitive dependencies analyzed against CVE and GitHub Advisory databases."
  },
  {
    id: "cov-config",
    title: "Configuration",
    icon: "Sliders",
    scannedCount: "24",
    scannedLabel: "Configuration files",
    status: "Completed",
    issuesCount: 4,
    details: "Dockerfiles, Kubernetes manifests, Helm charts, and Terraform infrastructure-as-code files evaluated."
  },
  {
    id: "cov-apis",
    title: "API Endpoints",
    icon: "Network",
    scannedCount: "86",
    scannedLabel: "Endpoints scanned",
    status: "Completed",
    issuesCount: 2,
    details: "OpenAPI/Swagger endpoints checked for authorization bypasses, rate limiting, and CORS headers."
  },
  {
    id: "cov-auth",
    title: "Authentication & Access",
    icon: "Lock",
    scannedCount: "42",
    scannedLabel: "Security checks",
    status: "Completed",
    issuesCount: 1,
    details: "JWT token validation, password hashing policies, session timeouts, and IAM role constraints verified."
  },
  {
    id: "cov-exposed",
    title: "Exposed Assets",
    icon: "Radio",
    scannedCount: "141",
    scannedLabel: "Assets scanned",
    status: "Completed",
    issuesCount: 1,
    details: "Public DNS records, subdomains, open S3 buckets, and Git repository metadata verified."
  }
];

export const reportVulnerabilityCounts = {
  critical: 3,
  high: 8,
  medium: 12,
  low: 12,
  total: 35,
  immediateAttention: 3
};

export const detailedScanResultsData = [
  {
    id: "res-1",
    scanType: "Dependency Scan",
    target: "react-scripts",
    itemsScanned: 12,
    issuesFound: 7,
    status: "Completed",
    statusType: "completed",
    completedTime: "09:25"
  },
  {
    id: "res-2",
    scanType: "Dependency Scan",
    target: "lodash",
    itemsScanned: 8,
    issuesFound: 4,
    status: "Completed",
    statusType: "completed",
    completedTime: "09:26"
  },
  {
    id: "res-3",
    scanType: "Source Code Scan",
    target: "Main Repository",
    itemsScanned: "5,874",
    issuesFound: 12,
    status: "Completed",
    statusType: "completed",
    completedTime: "09:27"
  },
  {
    id: "res-4",
    scanType: "Configuration Scan",
    target: "Production Config",
    itemsScanned: 24,
    issuesFound: 4,
    status: "Completed",
    statusType: "completed",
    completedTime: "09:28"
  },
  {
    id: "res-5",
    scanType: "API Security Scan",
    target: "REST APIs",
    itemsScanned: 86,
    issuesFound: 2,
    status: "Completed",
    statusType: "completed",
    completedTime: "09:29"
  },
  {
    id: "res-6",
    scanType: "Access Control Scan",
    target: "User Permissions",
    itemsScanned: 42,
    issuesFound: 1,
    status: "Completed",
    statusType: "completed",
    completedTime: "09:30"
  },
  {
    id: "res-7",
    scanType: "Container Security Scan",
    target: "Dockerfile & Base Images",
    itemsScanned: 6,
    issuesFound: 3,
    status: "Warning",
    statusType: "warning",
    completedTime: "09:30"
  },
  {
    id: "res-8",
    scanType: "Cloud IAM Policy",
    target: "AWS IAM Roles",
    itemsScanned: 18,
    issuesFound: 2,
    status: "Completed",
    statusType: "completed",
    completedTime: "09:31"
  }
];

export const topVulnerabilitiesReport = [
  {
    id: "ALT-1049",
    title: "Exposed Credentials",
    severity: "Critical",
    asset: "react-scripts",
    riskScore: 9.4,
    status: "Open",
    description: "Sensitive AWS secret access keys found unencrypted in configuration files.",
    cve: "CWE-798"
  },
  {
    id: "ALT-1048",
    title: "Vulnerable Dependency",
    severity: "High",
    asset: "lodash",
    riskScore: 8.1,
    status: "Open",
    description: "Package version vulnerable to prototype pollution and arbitrary template execution.",
    cve: "CVE-2021-23337"
  },
  {
    id: "ALT-1046",
    title: "Git Directory Exposure",
    severity: "Medium",
    asset: "Source Repository",
    riskScore: 6.2,
    status: "Monitoring",
    description: "Web server serves hidden .git metadata revealing commit history and internal paths.",
    cve: "CWE-538"
  }
];

export const passedChecksReport = [
  "No malware detected",
  "Authentication security verified",
  "No unauthorized file modifications",
  "API security checks passed",
  "Secure configuration detected",
  "No suspicious activity detected",
  "Dependency integrity verified"
];

export const remediationStatusData = {
  resolved: 18,
  inProgress: 7,
  open: 10,
  percentageResolved: 51,
  text: "51% of detected vulnerabilities have been resolved."
};

export const scanTimelineEvents = [
  { time: "09:24 AM", event: "Scan started", status: "info" },
  { time: "09:25 AM", event: "Dependency scan completed", status: "success" },
  { time: "09:27 AM", event: "Source code analysis completed", status: "success" },
  { time: "09:28 AM", event: "Configuration scan completed", status: "success" },
  { time: "09:29 AM", event: "API security scan completed", status: "success" },
  { time: "09:30 AM", event: "Vulnerability analysis completed", status: "warning" },
  { time: "09:31 AM", event: "Report generated", status: "complete" }
];

export const assessmentSummaryText = "The security scan analyzed 141 assets, 5,874 files, 38 dependencies, and 86 API endpoints. A total of 35 vulnerabilities were identified, including 3 critical and 8 high-severity issues. 5,839 security checks passed successfully.";
