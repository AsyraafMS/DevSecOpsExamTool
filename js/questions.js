// DevSecOps Foundation question bank
// Covers the public DSOF syllabus areas. Questions are original and written
// for study purposes; they are not copied from any real exam.
// Each question:
//   { id, category, difficulty, question, choices[], answer (index), explanation }

window.QUESTION_BANK = [
  // ───────────────────────────────────────────── Principles & Concepts
  {
    id: 1,
    category: "Principles & Concepts",
    difficulty: "easy",
    question: "What is the primary objective of DevSecOps?",
    choices: [
      "Replace the security team with developers",
      "Integrate security as a shared responsibility throughout the entire software lifecycle",
      "Move all security activities to the end of the release cycle",
      "Outsource compliance to an external auditor"
    ],
    answer: 1,
    explanation: "DevSecOps embeds security as a shared responsibility across development, operations, and security teams across the full lifecycle — not a final gate, not a single team's job."
  },
  {
    id: 2,
    category: "Principles & Concepts",
    difficulty: "easy",
    question: "What does 'shift left' mean in DevSecOps?",
    choices: [
      "Move deployments to a left-side data center",
      "Perform security activities earlier in the software development lifecycle",
      "Hand off security entirely to developers",
      "Reduce the number of security gates"
    ],
    answer: 1,
    explanation: "Shift left means addressing security earlier — during design, coding, and build — where defects are cheaper and faster to fix than in production."
  },
  {
    id: 3,
    category: "Principles & Concepts",
    difficulty: "medium",
    question: "Which statement best describes the 'Three Ways' that underpin DevOps and DevSecOps thinking?",
    choices: [
      "Plan, Build, Run",
      "Flow, Feedback, and Continual Learning & Experimentation",
      "People, Process, Technology",
      "Confidentiality, Integrity, Availability"
    ],
    answer: 1,
    explanation: "Gene Kim's Three Ways are Flow (left-to-right work), Feedback (right-to-left amplification), and a culture of Continual Learning and Experimentation."
  },
  {
    id: 4,
    category: "Principles & Concepts",
    difficulty: "easy",
    question: "Which trio defines the classic CIA triad of information security?",
    choices: [
      "Compliance, Integrity, Authorization",
      "Confidentiality, Integrity, Availability",
      "Control, Identity, Audit",
      "Confidentiality, Identity, Accountability"
    ],
    answer: 1,
    explanation: "CIA stands for Confidentiality, Integrity, and Availability — the foundational properties protected by an information security program."
  },
  {
    id: 5,
    category: "Principles & Concepts",
    difficulty: "medium",
    question: "Which security principle states that a user or process should have only the access strictly required to perform its function?",
    choices: [
      "Defense in depth",
      "Separation of duties",
      "Least privilege",
      "Zero trust"
    ],
    answer: 2,
    explanation: "Least privilege limits access rights to the minimum needed. It reduces blast radius if an account is compromised."
  },
  {
    id: 6,
    category: "Principles & Concepts",
    difficulty: "medium",
    question: "What does 'defense in depth' refer to?",
    choices: [
      "Using a single very strong control at the perimeter",
      "Running multiple antivirus products on the same host",
      "Layering multiple, overlapping controls so failure of one does not lead to compromise",
      "Encrypting only the most sensitive data"
    ],
    answer: 2,
    explanation: "Defense in depth layers complementary controls (network, host, application, data, identity) so a single failure doesn't equal a breach."
  },
  {
    id: 7,
    category: "Principles & Concepts",
    difficulty: "medium",
    question: "In DevSecOps, what is meant by 'security as code'?",
    choices: [
      "Writing security policies in plain English documents",
      "Codifying security policies, tests, and configurations in version-controlled, executable artifacts",
      "Hard-coding credentials into application source",
      "Storing all secrets in the application repository"
    ],
    answer: 1,
    explanation: "Security as code expresses controls (policies, scans, configurations) as code that's versioned, reviewed, and executed automatically — just like application or infrastructure code."
  },
  {
    id: 8,
    category: "Principles & Concepts",
    difficulty: "hard",
    question: "Which statement best contrasts traditional security with DevSecOps?",
    choices: [
      "Traditional security relies on manual gates near release; DevSecOps automates and distributes controls throughout the pipeline",
      "DevSecOps removes the need for compliance",
      "Traditional security uses MFA; DevSecOps does not",
      "DevSecOps performs all testing only in production"
    ],
    answer: 0,
    explanation: "Traditional security tends to be a late, manual gate. DevSecOps distributes automated controls across the lifecycle so security keeps pace with delivery."
  },
  {
    id: 9,
    category: "Principles & Concepts",
    difficulty: "easy",
    question: "What is 'rugged software'?",
    choices: [
      "Software that runs only on hardened hardware",
      "Software designed and built to withstand and recover from adversarial conditions",
      "Software shipped without testing",
      "Legacy software past end-of-life"
    ],
    answer: 1,
    explanation: "The Rugged movement focuses on producing software that is resilient, survivable, and trustworthy under hostile conditions — a cultural precursor to DevSecOps."
  },
  {
    id: 10,
    category: "Principles & Concepts",
    difficulty: "medium",
    question: "Which value does 'security as an enabler' express in DevSecOps culture?",
    choices: [
      "Security blocks releases until risk is zero",
      "Security helps teams ship safely and faster by providing guardrails, automation, and feedback",
      "Security only intervenes after an incident",
      "Security must approve every line of code manually"
    ],
    answer: 1,
    explanation: "Mature DevSecOps teams treat security as an enabler that provides paved paths, guardrails, and rapid feedback so delivery remains both fast and safe."
  },

  // ───────────────────────────────────────────── Culture & Collaboration
  {
    id: 11,
    category: "Culture & Collaboration",
    difficulty: "easy",
    question: "Which cultural shift is most critical for DevSecOps success?",
    choices: [
      "Centralizing all security decisions in a single team",
      "Breaking down silos between Dev, Sec, and Ops with shared goals",
      "Eliminating security training",
      "Replacing humans with automation entirely"
    ],
    answer: 1,
    explanation: "DevSecOps requires shared ownership; cross-functional collaboration replaces handoffs and blame between Dev, Sec, and Ops."
  },
  {
    id: 12,
    category: "Culture & Collaboration",
    difficulty: "medium",
    question: "What is a 'security champion' inside an engineering team?",
    choices: [
      "An external auditor",
      "A developer who advocates for and helps implement secure practices within their team",
      "A penetration tester paid per finding",
      "The CISO's personal assistant"
    ],
    answer: 1,
    explanation: "Security champions are embedded developers who serve as the security point of contact for their team, scaling the central security function."
  },
  {
    id: 13,
    category: "Culture & Collaboration",
    difficulty: "medium",
    question: "Why are blameless post-incident reviews preferred?",
    choices: [
      "They make incidents disappear from records",
      "They focus on systemic improvement instead of punishing individuals, encouraging honest learning",
      "They allow leadership to assign blame more efficiently",
      "They are required by GDPR"
    ],
    answer: 1,
    explanation: "Blameless reviews surface root causes and encourage transparency. People share information freely when the goal is learning, not punishment."
  },
  {
    id: 14,
    category: "Culture & Collaboration",
    difficulty: "easy",
    question: "Which practice spreads security knowledge across teams over time?",
    choices: [
      "Hiding incidents from engineers",
      "Continuous training, brown-bags, and pairing with security champions",
      "Annual one-hour mandatory videos only",
      "Restricting access to security tooling"
    ],
    answer: 1,
    explanation: "Continuous, contextual learning — short sessions, pairing, and champions — produces durable security skills better than rare, generic training."
  },
  {
    id: 15,
    category: "Culture & Collaboration",
    difficulty: "medium",
    question: "What is a common anti-pattern when introducing DevSecOps?",
    choices: [
      "Adding noisy, blocking scanners that flood developers with false positives",
      "Treating security as code",
      "Pairing developers with security engineers",
      "Defining security SLOs"
    ],
    answer: 0,
    explanation: "Drowning teams in false positives erodes trust in security tooling. Tuning, prioritization, and developer-friendly output are essential."
  },
  {
    id: 16,
    category: "Culture & Collaboration",
    difficulty: "easy",
    question: "What is the value of a 'paved road' (or 'golden path') in DevSecOps?",
    choices: [
      "It is the fastest way to bypass security",
      "A pre-vetted, easy-to-use platform pattern that is secure by default",
      "A direct route to production with no controls",
      "A privileged manual deployment process"
    ],
    answer: 1,
    explanation: "A paved road makes the secure path the easy path: templates, libraries, and platforms that bake in approved controls."
  },
  {
    id: 17,
    category: "Culture & Collaboration",
    difficulty: "medium",
    question: "Which metric most directly reflects collaborative DevSecOps maturity?",
    choices: [
      "Number of vulnerabilities open at any time",
      "Mean time to remediate (MTTR) security findings",
      "Number of policies written",
      "Lines of code per release"
    ],
    answer: 1,
    explanation: "MTTR for findings reflects whether teams can detect, prioritize, and fix issues together quickly — a strong indicator of joint capability."
  },
  {
    id: 18,
    category: "Culture & Collaboration",
    difficulty: "hard",
    question: "Which approach best aligns security objectives with delivery objectives?",
    choices: [
      "Letting security set unilateral release gates",
      "Defining shared service-level objectives (SLOs) and error budgets that include security signals",
      "Tracking security and delivery on entirely separate dashboards",
      "Counting tickets resolved per sprint by each team independently"
    ],
    answer: 1,
    explanation: "Shared SLOs and error budgets covering security signals (e.g., critical vuln age) tie reliability and security into one product conversation."
  },

  // ───────────────────────────────────────────── Controls & Compliance
  {
    id: 19,
    category: "Controls & Compliance",
    difficulty: "easy",
    question: "Which type of control aims to stop an incident from occurring?",
    choices: [
      "Detective",
      "Corrective",
      "Preventive",
      "Compensating"
    ],
    answer: 2,
    explanation: "Preventive controls (e.g., MFA, input validation) try to stop incidents before they occur. Detective controls find incidents; corrective controls remediate them."
  },
  {
    id: 20,
    category: "Controls & Compliance",
    difficulty: "easy",
    question: "A SIEM that alerts on anomalous logins is primarily what kind of control?",
    choices: [
      "Preventive",
      "Detective",
      "Deterrent",
      "Recovery"
    ],
    answer: 1,
    explanation: "SIEM alerting identifies events as they happen — that is detective in nature."
  },
  {
    id: 21,
    category: "Controls & Compliance",
    difficulty: "medium",
    question: "What does 'compliance as code' enable?",
    choices: [
      "Replacing auditors with chatbots",
      "Encoding regulatory and policy requirements as automated, testable rules in pipelines",
      "Performing audits only annually",
      "Storing compliance evidence on paper"
    ],
    answer: 1,
    explanation: "Compliance as code expresses requirements as machine-checkable rules (e.g., OPA, Sentinel) so evidence is generated continuously and automatically."
  },
  {
    id: 22,
    category: "Controls & Compliance",
    difficulty: "medium",
    question: "Which framework is most associated with US federal cybersecurity risk management?",
    choices: [
      "NIST Cybersecurity Framework (CSF)",
      "PCI DSS",
      "HIPAA",
      "ISO 27018"
    ],
    answer: 0,
    explanation: "The NIST CSF provides Identify, Protect, Detect, Respond, and Recover functions and is widely used for organizing cyber risk management."
  },
  {
    id: 23,
    category: "Controls & Compliance",
    difficulty: "medium",
    question: "Which standard defines requirements for an information security management system (ISMS)?",
    choices: [
      "ISO/IEC 27001",
      "ISO 9001",
      "NIST 800-53",
      "PCI DSS"
    ],
    answer: 0,
    explanation: "ISO/IEC 27001 specifies requirements for establishing, implementing, maintaining, and improving an ISMS."
  },
  {
    id: 24,
    category: "Controls & Compliance",
    difficulty: "hard",
    question: "Which best describes a 'compensating control'?",
    choices: [
      "A control that runs in parallel for redundancy",
      "An alternative control implemented when the primary control is impractical, providing equivalent protection",
      "A control that compensates the security team",
      "A control mandated only after an incident"
    ],
    answer: 1,
    explanation: "Compensating controls provide an equivalent level of risk reduction when an explicit requirement cannot be met directly."
  },
  {
    id: 25,
    category: "Controls & Compliance",
    difficulty: "medium",
    question: "What does 'continuous compliance' rely on most heavily?",
    choices: [
      "Quarterly manual checklists",
      "Automated, evidence-producing controls embedded in pipelines and runtime",
      "Yearly external audits only",
      "Self-attestation interviews"
    ],
    answer: 1,
    explanation: "Continuous compliance depends on automated controls that produce evidence as a byproduct of normal operations, replacing point-in-time checks."
  },
  {
    id: 26,
    category: "Controls & Compliance",
    difficulty: "easy",
    question: "What is 'separation of duties' designed to prevent?",
    choices: [
      "Cross-training",
      "A single individual having end-to-end control over a sensitive process, enabling fraud or error",
      "Code reviews",
      "Pair programming"
    ],
    answer: 1,
    explanation: "Separation of duties splits sensitive workflows so that no one individual can both perform and approve a critical action without oversight."
  },

  // ───────────────────────────────────────────── Risk & Threat Modeling
  {
    id: 27,
    category: "Risk & Threat Modeling",
    difficulty: "easy",
    question: "Which formula best summarizes information security risk in DevSecOps practice?",
    choices: [
      "Risk = Threat × Asset",
      "Risk ≈ Likelihood × Impact (given a threat exploiting a vulnerability against an asset)",
      "Risk = Vulnerabilities found",
      "Risk = Number of incidents"
    ],
    answer: 1,
    explanation: "Risk is broadly the product of likelihood and impact, factoring threats and vulnerabilities affecting an asset."
  },
  {
    id: 28,
    category: "Risk & Threat Modeling",
    difficulty: "medium",
    question: "What does the STRIDE model categorize?",
    choices: [
      "Compliance regimes",
      "Threat types: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege",
      "Risk treatment options",
      "Encryption algorithms"
    ],
    answer: 1,
    explanation: "STRIDE is a Microsoft-originated threat taxonomy used in threat modeling to systematically reason about classes of threats per component or data flow."
  },
  {
    id: 29,
    category: "Risk & Threat Modeling",
    difficulty: "medium",
    question: "Which artifact most commonly anchors a threat-modeling session?",
    choices: [
      "A burndown chart",
      "A data flow diagram (DFD) of the system, with trust boundaries",
      "A SAST report",
      "A penetration test invoice"
    ],
    answer: 1,
    explanation: "DFDs with trust boundaries make it possible to walk through where data crosses boundaries and apply STRIDE or similar to each interaction."
  },
  {
    id: 30,
    category: "Risk & Threat Modeling",
    difficulty: "medium",
    question: "What is the standard set of risk treatment options?",
    choices: [
      "Fix, ignore, redirect",
      "Accept, mitigate (reduce), transfer, avoid",
      "Encrypt, log, monitor",
      "Patch, scan, audit"
    ],
    answer: 1,
    explanation: "Risk responses are typically Accept, Mitigate, Transfer, or Avoid. The choice depends on cost, feasibility, and risk appetite."
  },
  {
    id: 31,
    category: "Risk & Threat Modeling",
    difficulty: "easy",
    question: "What is the difference between a vulnerability and a threat?",
    choices: [
      "They are the same thing",
      "A vulnerability is a weakness; a threat is an actor or event with the potential to exploit it",
      "A vulnerability requires a CVE; a threat does not",
      "Threats are theoretical; vulnerabilities are confirmed exploits"
    ],
    answer: 1,
    explanation: "Vulnerabilities are weaknesses (technical, process, or human). Threats are the agents or events that could exploit them."
  },
  {
    id: 32,
    category: "Risk & Threat Modeling",
    difficulty: "hard",
    question: "Which approach scales threat modeling in a high-velocity DevSecOps environment?",
    choices: [
      "A single annual workshop with the security team",
      "Lightweight, iterative threat modeling per change, supported by templates and security champions",
      "Outsourcing all threat modeling to a vendor",
      "Replacing threat modeling with SAST"
    ],
    answer: 1,
    explanation: "Continuous, lightweight threat modeling — done per change with reusable templates — keeps pace with iterative delivery, unlike infrequent heavyweight sessions."
  },
  {
    id: 33,
    category: "Risk & Threat Modeling",
    difficulty: "medium",
    question: "What does 'attack surface' refer to?",
    choices: [
      "The total number of employees",
      "The set of points where an unauthorized user could try to enter or extract data from a system",
      "The cost of a breach",
      "The number of running containers"
    ],
    answer: 1,
    explanation: "Attack surface is the sum of exposure points (interfaces, endpoints, dependencies, identities). Reducing it is a foundational hardening strategy."
  },
  {
    id: 34,
    category: "Risk & Threat Modeling",
    difficulty: "medium",
    question: "Which list is widely used to reason about the most critical web application risks?",
    choices: [
      "OWASP Top 10",
      "NIST 800-171",
      "ISO 31000",
      "CVE List"
    ],
    answer: 0,
    explanation: "The OWASP Top 10 is a community-driven list of the most critical web application security risks, used widely for awareness and program design."
  },

  // ───────────────────────────────────────────── Security Testing Tools
  {
    id: 35,
    category: "Security Testing Tools",
    difficulty: "easy",
    question: "What does SAST stand for and analyze?",
    choices: [
      "Static Application Security Testing — analyzes source/binary without executing it",
      "System Application Security Testing — analyzes running production",
      "Standard API Security Testing — fuzzes APIs",
      "Secure Audit Static Tool — manual review only"
    ],
    answer: 0,
    explanation: "SAST inspects source code, bytecode, or binaries statically to find issues like injection, weak crypto usage, and tainted data flows."
  },
  {
    id: 36,
    category: "Security Testing Tools",
    difficulty: "easy",
    question: "DAST is best described as:",
    choices: [
      "Reading source code line by line",
      "Probing a running application from the outside, similar to an attacker",
      "Scanning open-source dependencies",
      "Reviewing infrastructure code"
    ],
    answer: 1,
    explanation: "DAST (Dynamic Application Security Testing) interacts with the running application to find runtime issues such as injection or auth flaws."
  },
  {
    id: 37,
    category: "Security Testing Tools",
    difficulty: "medium",
    question: "What does SCA (Software Composition Analysis) primarily focus on?",
    choices: [
      "Custom application logic",
      "Open-source and third-party dependencies and their known vulnerabilities and licenses",
      "Network traffic analysis",
      "Hardware vulnerabilities"
    ],
    answer: 1,
    explanation: "SCA inventories third-party components, identifies known CVEs (e.g., via NVD/OSV), and flags license compliance risks."
  },
  {
    id: 38,
    category: "Security Testing Tools",
    difficulty: "medium",
    question: "What distinguishes IAST from SAST and DAST?",
    choices: [
      "It only runs in production",
      "It instruments the application during runtime testing, combining code-level visibility with live execution context",
      "It is a manual technique",
      "It only scans containers"
    ],
    answer: 1,
    explanation: "IAST (Interactive AST) uses agents inside the running app during functional/automated tests to correlate runtime behavior with source-level data."
  },
  {
    id: 39,
    category: "Security Testing Tools",
    difficulty: "medium",
    question: "RASP differs from a WAF in that it:",
    choices: [
      "Runs at the network perimeter",
      "Operates inside the application runtime, with internal context to detect/block attacks at execution time",
      "Only logs events",
      "Replaces SAST"
    ],
    answer: 1,
    explanation: "RASP (Runtime Application Self-Protection) instruments the app/runtime, leveraging context (e.g., DB query origin) to act on threats. WAFs operate from outside the app."
  },
  {
    id: 40,
    category: "Security Testing Tools",
    difficulty: "easy",
    question: "Fuzz testing aims to:",
    choices: [
      "Statically analyze source code",
      "Generate malformed or unexpected inputs to find crashes and security defects",
      "Scan licenses",
      "Validate compliance reports"
    ],
    answer: 1,
    explanation: "Fuzzing repeatedly feeds randomized or mutated inputs to surface memory, parsing, and logic flaws not found by typical tests."
  },
  {
    id: 41,
    category: "Security Testing Tools",
    difficulty: "medium",
    question: "Which tool category checks Terraform, CloudFormation, or Kubernetes manifests for misconfigurations?",
    choices: [
      "DAST",
      "SCA",
      "IaC scanning / policy-as-code (e.g., Checkov, tfsec, OPA)",
      "RASP"
    ],
    answer: 2,
    explanation: "IaC scanners and policy engines validate infrastructure-as-code against secure configuration baselines before resources are created."
  },
  {
    id: 42,
    category: "Security Testing Tools",
    difficulty: "medium",
    question: "An SBOM (Software Bill of Materials) is primarily used to:",
    choices: [
      "Track financial billing for software",
      "Inventory the components of a software product so vulnerabilities and licenses can be managed",
      "Replace SAST",
      "Encrypt artifacts"
    ],
    answer: 1,
    explanation: "An SBOM enumerates components (with versions and metadata) to enable rapid impact analysis when new vulnerabilities (e.g., Log4Shell) emerge."
  },
  {
    id: 43,
    category: "Security Testing Tools",
    difficulty: "hard",
    question: "Why are reachability analysis or runtime context valuable when triaging SCA findings?",
    choices: [
      "They make findings more numerous",
      "They reduce noise by indicating whether a vulnerable function is actually invoked or exposed",
      "They are required by GDPR",
      "They replace patching"
    ],
    answer: 1,
    explanation: "Many vulnerable dependencies are not actually reachable. Reachability/runtime context helps prioritize the few findings that truly matter."
  },
  {
    id: 44,
    category: "Security Testing Tools",
    difficulty: "easy",
    question: "Penetration testing is typically:",
    choices: [
      "An automated scan run on every commit",
      "An authorized, simulated attack — usually by humans — to evaluate exploitability of weaknesses",
      "A code review",
      "A compliance interview"
    ],
    answer: 1,
    explanation: "Pen tests emulate adversaries to validate real-world exploitability, complementing automated scanning and code review."
  },
  {
    id: 45,
    category: "Security Testing Tools",
    difficulty: "medium",
    question: "Which is the best response to a high volume of false positives from a scanner?",
    choices: [
      "Disable the scanner",
      "Tune rules, suppress with justification, and prioritize by exploitability and business impact",
      "Send all findings to developers immediately",
      "Convert all findings into release blockers"
    ],
    answer: 1,
    explanation: "Tuning, justified suppressions, and prioritization preserve developer trust and ensure attention goes to true, exploitable risk."
  },
  {
    id: 46,
    category: "Security Testing Tools",
    difficulty: "medium",
    question: "Which statement about SAST is MOST accurate?",
    choices: [
      "It can detect issues only after deployment",
      "It can find certain bug classes early but may produce false positives and miss runtime/logic flaws",
      "It is a substitute for DAST",
      "It requires a running production environment"
    ],
    answer: 1,
    explanation: "SAST excels at code-level patterns and tainted flows but cannot fully model runtime behavior, so it complements DAST/IAST and review."
  },

  // ───────────────────────────────────────────── CI/CD Pipeline Security
  {
    id: 47,
    category: "CI/CD Pipeline Security",
    difficulty: "easy",
    question: "Which is the most appropriate place to perform SAST in a typical pipeline?",
    choices: [
      "After production deployment only",
      "On code commits and pull requests, plus periodic full scans",
      "Once per quarter",
      "Only at incident response time"
    ],
    answer: 1,
    explanation: "Running SAST on commit/PR provides fast feedback to developers, with deeper scheduled scans catching cross-module issues."
  },
  {
    id: 48,
    category: "CI/CD Pipeline Security",
    difficulty: "medium",
    question: "Why is signing build artifacts important in DevSecOps pipelines?",
    choices: [
      "It prevents all bugs",
      "It enables verifying integrity and provenance of artifacts before deployment",
      "It reduces build times",
      "It removes the need for SAST"
    ],
    answer: 1,
    explanation: "Signing (e.g., Sigstore/cosign) lets downstream consumers verify that an artifact came from the expected build and hasn't been tampered with."
  },
  {
    id: 49,
    category: "CI/CD Pipeline Security",
    difficulty: "medium",
    question: "Which framework provides a graded approach to supply-chain integrity for build pipelines?",
    choices: [
      "SLSA (Supply-chain Levels for Software Artifacts)",
      "OWASP ZAP",
      "MITRE ATT&CK",
      "STRIDE"
    ],
    answer: 0,
    explanation: "SLSA defines progressively stronger requirements (build provenance, isolation, hermeticity) to harden the software supply chain."
  },
  {
    id: 50,
    category: "CI/CD Pipeline Security",
    difficulty: "hard",
    question: "Which practice MOST reduces risk from a compromised CI runner?",
    choices: [
      "Using long-lived static credentials shared across runners",
      "Ephemeral, isolated runners with short-lived, scoped credentials and signed provenance",
      "Disabling build logs",
      "Allowing all repositories to deploy to production"
    ],
    answer: 1,
    explanation: "Short-lived, ephemeral, isolated runners with narrowly scoped credentials drastically limit blast radius if a runner is compromised."
  },
  {
    id: 51,
    category: "CI/CD Pipeline Security",
    difficulty: "easy",
    question: "Where is SCA typically run in a CI pipeline?",
    choices: [
      "Only after release",
      "On dependency manifests and lock files during builds, with periodic scheduled scans",
      "Only on production servers",
      "Once a year by audit"
    ],
    answer: 1,
    explanation: "SCA in CI inspects manifests/lockfiles (and SBOMs) on each build, supplemented by scheduled rescans as new CVEs are disclosed."
  },
  {
    id: 52,
    category: "CI/CD Pipeline Security",
    difficulty: "medium",
    question: "What is a 'break-glass' procedure in deployment pipelines?",
    choices: [
      "A method to skip backups",
      "A pre-approved emergency override path with elevated logging and review for urgent situations",
      "A way to disable all controls forever",
      "A regular deployment shortcut"
    ],
    answer: 1,
    explanation: "Break-glass paths allow exceptional, urgent action while ensuring strong logging and post-hoc review so they're not abused."
  },
  {
    id: 53,
    category: "CI/CD Pipeline Security",
    difficulty: "medium",
    question: "Pipeline-as-code stored next to application code primarily improves:",
    choices: [
      "The size of repos",
      "Auditability, reviewability, and reproducibility of build/deploy steps",
      "Compile time",
      "Branch count"
    ],
    answer: 1,
    explanation: "Versioned pipeline definitions support code review, history, and reproducibility — and let pipeline changes go through the same gates as code."
  },
  {
    id: 54,
    category: "CI/CD Pipeline Security",
    difficulty: "medium",
    question: "When integrating DAST into a pipeline, which environment is typically targeted?",
    choices: [
      "Developer laptops",
      "An ephemeral or staging environment that mirrors production characteristics",
      "Customer-facing production with real traffic",
      "The CI runner itself"
    ],
    answer: 1,
    explanation: "DAST typically runs against a deployed instance in a staging-like environment to safely exercise endpoints with attack inputs."
  },
  {
    id: 55,
    category: "CI/CD Pipeline Security",
    difficulty: "hard",
    question: "Which is a best practice for dependency pinning in builds?",
    choices: [
      "Always use the 'latest' tag for both base images and packages",
      "Pin to specific versions or content digests, with automated update PRs",
      "Disable lockfiles",
      "Recompile binaries from random commits"
    ],
    answer: 1,
    explanation: "Pinning by version or digest (with automated, reviewed updates) yields reproducible, auditable builds and safer dependency upgrades."
  },
  {
    id: 56,
    category: "CI/CD Pipeline Security",
    difficulty: "medium",
    question: "What is the security risk of using the 'latest' tag for container images in production?",
    choices: [
      "It always uses smaller images",
      "It is non-deterministic — the same tag can refer to different content over time, breaking reproducibility and auditability",
      "It encrypts the image",
      "It speeds up builds"
    ],
    answer: 1,
    explanation: "'latest' is mutable; reproducible, verifiable deployments require immutable references such as a digest or pinned version."
  },

  // ───────────────────────────────────────────── Secrets & Cryptography
  {
    id: 57,
    category: "Secrets & Cryptography",
    difficulty: "easy",
    question: "Which is the WORST place to store production credentials?",
    choices: [
      "A purpose-built secret manager",
      "Hard-coded in source code committed to version control",
      "A KMS-backed key store",
      "A short-lived, machine-issued token"
    ],
    answer: 1,
    explanation: "Hard-coded secrets in repos are easy to leak (history, forks, logs). Secrets belong in dedicated managers with rotation and access control."
  },
  {
    id: 58,
    category: "Secrets & Cryptography",
    difficulty: "medium",
    question: "Which property does a key management service (KMS) primarily provide?",
    choices: [
      "Free encryption with no governance",
      "Centralized creation, rotation, audit, and access control of cryptographic keys",
      "Replacement for IAM",
      "TLS termination only"
    ],
    answer: 1,
    explanation: "A KMS centralizes key lifecycle and access — generation, rotation, separation of duties, and audit trails — strengthening crypto governance."
  },
  {
    id: 59,
    category: "Secrets & Cryptography",
    difficulty: "easy",
    question: "Why prefer short-lived tokens over long-lived API keys for service-to-service auth?",
    choices: [
      "They take more space to store",
      "They limit the window of misuse if leaked and encourage automation of issuance",
      "They are harder to rotate",
      "They eliminate the need for authentication"
    ],
    answer: 1,
    explanation: "Short-lived, automatically issued credentials reduce exposure risk and remove operational pressure to keep static secrets indefinitely."
  },
  {
    id: 60,
    category: "Secrets & Cryptography",
    difficulty: "medium",
    question: "Which best describes 'encryption in transit'?",
    choices: [
      "Encrypting data only when stored on disk",
      "Protecting data as it moves over networks (e.g., TLS)",
      "Hashing passwords",
      "Encrypting backups"
    ],
    answer: 1,
    explanation: "Encryption in transit (TLS/mTLS) protects data on the wire from sniffing or tampering, complementing at-rest encryption."
  },
  {
    id: 61,
    category: "Secrets & Cryptography",
    difficulty: "medium",
    question: "Hashing differs from encryption in that hashing is:",
    choices: [
      "Always reversible",
      "A one-way function used for integrity and password storage (with salting)",
      "A type of compression",
      "Only used for symmetric keys"
    ],
    answer: 1,
    explanation: "Hashes are one-way. For passwords, a slow, salted hash (bcrypt/argon2) is used so leaks don't trivially expose plaintext."
  },
  {
    id: 62,
    category: "Secrets & Cryptography",
    difficulty: "hard",
    question: "Which approach helps detect committed secrets early in the SDLC?",
    choices: [
      "Quarterly manual reviews of all repos",
      "Pre-commit hooks plus pipeline-level secret scanners on every commit and PR",
      "Disabling logging in CI",
      "Sharing secrets over chat"
    ],
    answer: 1,
    explanation: "Pre-commit and pipeline secret scanners catch leaks before merge. Discovered secrets must be revoked, rotated, and history-cleansed quickly."
  },

  // ───────────────────────────────────────────── Container & Cloud Security
  {
    id: 63,
    category: "Container & Cloud Security",
    difficulty: "easy",
    question: "Which is the best base image practice for containers?",
    choices: [
      "Use the largest available distribution image",
      "Use minimal, well-maintained base images and pin by digest",
      "Build from random images on the internet",
      "Use the same image for build and runtime, including build tools"
    ],
    answer: 1,
    explanation: "Minimal images (e.g., distroless/alpine when appropriate) reduce attack surface; pinning by digest ensures reproducibility and integrity."
  },
  {
    id: 64,
    category: "Container & Cloud Security",
    difficulty: "medium",
    question: "Running a container as 'root' increases risk because:",
    choices: [
      "It enables faster startup",
      "It expands the impact of a container escape or in-container compromise on the host",
      "It is required for networking",
      "It lowers performance"
    ],
    answer: 1,
    explanation: "Non-root containers, with dropped capabilities and read-only filesystems where possible, limit damage if a process is compromised."
  },
  {
    id: 65,
    category: "Container & Cloud Security",
    difficulty: "medium",
    question: "In Kubernetes, what does a 'Pod Security' policy/standard primarily control?",
    choices: [
      "DNS settings",
      "Constraints on workloads such as privileges, host access, capabilities, and volume types",
      "Cluster autoscaling",
      "Image build process"
    ],
    answer: 1,
    explanation: "Pod-level security policies (PSS, OPA/Gatekeeper, Kyverno) restrict dangerous workload settings like privileged mode, hostPath, and capabilities."
  },
  {
    id: 66,
    category: "Container & Cloud Security",
    difficulty: "medium",
    question: "Which model best describes 'shared responsibility' in public cloud?",
    choices: [
      "The provider is responsible for everything",
      "The customer is responsible for everything",
      "Provider secures the cloud (infrastructure); customer secures what they put in the cloud (data, identities, configs)",
      "Responsibility is randomly assigned"
    ],
    answer: 2,
    explanation: "Shared responsibility splits accountability: the provider runs the underlying infrastructure; the customer is responsible for data, identity, and configuration in their tenancy."
  },
  {
    id: 67,
    category: "Container & Cloud Security",
    difficulty: "hard",
    question: "Which is a core principle of zero-trust networking?",
    choices: [
      "Trust internal traffic implicitly",
      "Never trust, always verify — authenticate and authorize every request based on identity, device, and context",
      "Use only network segmentation",
      "Replace IAM with VPNs"
    ],
    answer: 1,
    explanation: "Zero trust treats network location as no proof of trust. Each request must be continuously authenticated, authorized, and validated against policy."
  },
  {
    id: 68,
    category: "Container & Cloud Security",
    difficulty: "easy",
    question: "Which is the strongest reason to scan container images in the registry, not just at build time?",
    choices: [
      "To replace runtime monitoring",
      "Because new vulnerabilities are disclosed continuously and previously-built images may now be vulnerable",
      "Because builds are slow",
      "Because base images never change"
    ],
    answer: 1,
    explanation: "Vulnerability data evolves. Continuous registry scanning surfaces newly-known issues in stored images that were 'clean' when built."
  },
  {
    id: 69,
    category: "Container & Cloud Security",
    difficulty: "medium",
    question: "What is a key benefit of immutable infrastructure?",
    choices: [
      "Servers are patched in place by hand",
      "Deployments produce known artifacts; changes happen by replacing instances, simplifying audit and rollback",
      "It removes the need for monitoring",
      "It is required by GDPR"
    ],
    answer: 1,
    explanation: "Immutable infra reduces drift and makes deployments predictable and reversible — important for both reliability and security."
  },
  {
    id: 70,
    category: "Container & Cloud Security",
    difficulty: "medium",
    question: "Which best mitigates a misconfigured public S3 bucket exposing sensitive data?",
    choices: [
      "Hope no one finds it",
      "Default-deny policies, automated configuration scanning (CSPM/IaC), and least-privilege bucket policies enforced by default",
      "Manually checking the AWS console weekly",
      "Using a longer bucket name"
    ],
    answer: 1,
    explanation: "Secure defaults plus automated CSPM/IaC checks and least-privilege policies prevent and detect dangerous misconfigurations consistently."
  },

  // ───────────────────────────────────────────── Monitoring & Incident Response
  {
    id: 71,
    category: "Monitoring & Incident Response",
    difficulty: "easy",
    question: "What is the primary purpose of a SIEM?",
    choices: [
      "Patching servers",
      "Aggregating, correlating, and analyzing security-relevant logs and events to enable detection and response",
      "Compiling code",
      "Encrypting databases"
    ],
    answer: 1,
    explanation: "SIEMs centralize and correlate logs/events from many sources so analysts can detect, investigate, and respond to incidents."
  },
  {
    id: 72,
    category: "Monitoring & Incident Response",
    difficulty: "medium",
    question: "Why are runbooks valuable in incident response?",
    choices: [
      "They eliminate the need for on-call",
      "They provide tested, repeatable steps that reduce time-to-mitigate and minimize human error during incidents",
      "They replace post-incident reviews",
      "They are required by ISO 9001"
    ],
    answer: 1,
    explanation: "Runbooks (or playbooks) make response consistent and faster; pairing them with automation (SOAR) reduces toil and dwell time."
  },
  {
    id: 73,
    category: "Monitoring & Incident Response",
    difficulty: "medium",
    question: "Which metric measures the time from when an incident begins to when it is detected?",
    choices: [
      "MTTR — Mean Time To Respond",
      "MTTD — Mean Time To Detect",
      "MTBF — Mean Time Between Failures",
      "TTL — Time To Live"
    ],
    answer: 1,
    explanation: "MTTD captures detection latency. Reducing MTTD limits attacker dwell time and overall impact."
  },
  {
    id: 74,
    category: "Monitoring & Incident Response",
    difficulty: "medium",
    question: "Which framework helps map adversary tactics, techniques, and procedures (TTPs) for detection engineering?",
    choices: [
      "MITRE ATT&CK",
      "OWASP Top 10",
      "ISO 27001",
      "ITIL"
    ],
    answer: 0,
    explanation: "MITRE ATT&CK catalogs real-world adversary behaviors, supporting detection coverage analysis and threat-informed defense."
  },
  {
    id: 75,
    category: "Monitoring & Incident Response",
    difficulty: "hard",
    question: "Which approach BEST supports continuous improvement after security incidents?",
    choices: [
      "Closing tickets without analysis",
      "Conducting blameless post-incident reviews, capturing systemic factors, and tracking improvement actions to completion",
      "Public shaming of operators involved",
      "Restricting information about the incident from engineers"
    ],
    answer: 1,
    explanation: "Blameless reviews uncover systemic causes; converting findings into tracked improvements is what actually changes outcomes over time."
  },
  {
    id: 76,
    category: "Monitoring & Incident Response",
    difficulty: "easy",
    question: "Which logging practice is most important for forensic investigations?",
    choices: [
      "Logs that can be edited by anyone",
      "Centralized, time-synchronized, tamper-evident logs with appropriate retention and access controls",
      "Logs stored only on the affected host",
      "Verbose logs that include full payloads with secrets"
    ],
    answer: 1,
    explanation: "Forensic-quality logs are centralized, time-synced, integrity-protected, and retained appropriately, while avoiding sensitive data in logs."
  },

  // ───────────────────────────────────────────── Identity & Access Management
  {
    id: 77,
    category: "Identity & Access Management",
    difficulty: "easy",
    question: "MFA improves account security primarily because:",
    choices: [
      "It eliminates the need for passwords",
      "It requires multiple independent factors, so a stolen password alone is usually insufficient",
      "It encrypts the password",
      "It reduces login latency"
    ],
    answer: 1,
    explanation: "Multi-factor auth combines factors (something you know/have/are), so compromise of one factor is usually not enough to gain access."
  },
  {
    id: 78,
    category: "Identity & Access Management",
    difficulty: "medium",
    question: "Which approach is most aligned with zero standing privileges?",
    choices: [
      "Long-lived admin accounts shared across the team",
      "Just-in-time, time-bound, audited elevation of privileges only when needed",
      "Permanent root SSH keys",
      "Disabling MFA for admins"
    ],
    answer: 1,
    explanation: "JIT/just-enough-access elevates privileges briefly, with approval and logging, instead of granting permanent admin rights."
  },
  {
    id: 79,
    category: "Identity & Access Management",
    difficulty: "medium",
    question: "Which is the strongest argument for federating identities via SSO instead of local accounts?",
    choices: [
      "Users prefer fewer logins",
      "Centralized identity, MFA enforcement, lifecycle management (joiner/mover/leaver), and consistent audit",
      "It eliminates phishing",
      "It removes the need for IAM"
    ],
    answer: 1,
    explanation: "Federated SSO centralizes authentication policy, MFA, and offboarding — more secure and operable than scattered local accounts."
  },
  {
    id: 80,
    category: "Identity & Access Management",
    difficulty: "hard",
    question: "Which is the best way to grant a CI pipeline access to cloud resources?",
    choices: [
      "Long-lived static API keys committed in CI variables",
      "Workload identity / OIDC federation issuing short-lived, scoped credentials at run time",
      "Sharing the developer's personal credentials",
      "Disabling cloud IAM for the pipeline"
    ],
    answer: 1,
    explanation: "OIDC-based workload identity issues short-lived, narrowly-scoped credentials per run, eliminating long-lived static secrets in CI."
  },

  // ───────────────────────────────────────────── Principles & Concepts (more)
  {
    id: 81,
    category: "Principles & Concepts",
    difficulty: "easy",
    question: "Which statement best describes 'security debt'?",
    choices: [
      "Money owed to security vendors",
      "The accumulated cost of deferred security work that increases risk and future remediation effort",
      "A line item on the CISO's budget",
      "Open-source license fees"
    ],
    answer: 1,
    explanation: "Security debt is analogous to technical debt: deferred fixes, unaddressed findings, and outdated controls that compound risk over time."
  },
  {
    id: 82,
    category: "Principles & Concepts",
    difficulty: "medium",
    question: "What does 'fail securely' mean as a design principle?",
    choices: [
      "Systems should never fail",
      "When components fail, they should default to a safe state that does not grant unintended access",
      "Errors should be hidden from users",
      "Failures should automatically trigger production deploys"
    ],
    answer: 1,
    explanation: "Fail-securely means error and exception paths should not silently widen access; defaults should deny rather than allow."
  },
  {
    id: 83,
    category: "Principles & Concepts",
    difficulty: "medium",
    question: "Which DevSecOps principle is reflected by 'secure defaults'?",
    choices: [
      "All features should be disabled forever",
      "Out-of-the-box configurations should be the safest reasonable choice, requiring users to opt out, not opt in",
      "Security must be configured manually for every install",
      "Defaults should match the loosest historical setting"
    ],
    answer: 1,
    explanation: "Secure-by-default means the path of least resistance is also the safe path; users explicitly choose to relax controls if needed."
  },
  {
    id: 84,
    category: "Principles & Concepts",
    difficulty: "easy",
    question: "What is 'shift right' in the context of DevSecOps?",
    choices: [
      "Moving developers off-shore",
      "Adding observability, runtime protection, and feedback loops in production to complement shift-left",
      "Pushing all testing to QA only",
      "A deprecated alternative to shift-left"
    ],
    answer: 1,
    explanation: "Shift-right complements shift-left by using runtime telemetry, chaos and security experiments, and production feedback to inform earlier stages."
  },
  {
    id: 85,
    category: "Principles & Concepts",
    difficulty: "medium",
    question: "Which is the best summary of 'continuous everything' in DevSecOps?",
    choices: [
      "Continuous integration only",
      "Continuous integration, delivery, testing, monitoring, and security throughout the lifecycle",
      "Continuous meetings",
      "Continuous deployment without testing"
    ],
    answer: 1,
    explanation: "DevSecOps applies 'continuous' practices across the lifecycle — integration, delivery, testing, monitoring, and security — not just to deployments."
  },
  {
    id: 86,
    category: "Principles & Concepts",
    difficulty: "hard",
    question: "Which best contrasts 'security theater' with effective security?",
    choices: [
      "Security theater measurably reduces risk; effective security is symbolic",
      "Security theater is visible activity that provides little real risk reduction; effective security demonstrably reduces risk",
      "They are the same thing",
      "Security theater is the new term for DevSecOps"
    ],
    answer: 1,
    explanation: "Security theater looks reassuring but doesn't reduce risk. Effective security ties activities to measurable risk outcomes."
  },

  // ───────────────────────────────────────────── Culture & Collaboration (more)
  {
    id: 87,
    category: "Culture & Collaboration",
    difficulty: "easy",
    question: "Which is the strongest indicator of a healthy DevSecOps culture?",
    choices: [
      "Security tickets are kept secret from developers",
      "Engineers proactively raise security concerns and propose fixes without fear",
      "All security work is done by the CISO personally",
      "Vulnerabilities are discussed only after audits"
    ],
    answer: 1,
    explanation: "Psychological safety — engineers raising concerns and proposing fixes openly — is a hallmark of high-performing security cultures."
  },
  {
    id: 88,
    category: "Culture & Collaboration",
    difficulty: "medium",
    question: "Which approach scales scarce security expertise across many product teams?",
    choices: [
      "Centralizing every decision in the security team",
      "An embedded/champion model where central security enables and trains team-level champions",
      "Outsourcing all security work",
      "Removing the security team entirely"
    ],
    answer: 1,
    explanation: "A federated model with embedded champions multiplies central security's reach without becoming a bottleneck."
  },
  {
    id: 89,
    category: "Culture & Collaboration",
    difficulty: "medium",
    question: "Why is it valuable for the security team to publish a service catalog (paved roads, libraries, templates)?",
    choices: [
      "It locks teams into one vendor",
      "It makes the secure path easy and discoverable, reducing the chance teams roll their own insecure alternatives",
      "It hides controls from auditors",
      "It eliminates the need for code review"
    ],
    answer: 1,
    explanation: "A discoverable, supported set of secure building blocks reduces friction and the temptation to bypass controls."
  },
  {
    id: 90,
    category: "Culture & Collaboration",
    difficulty: "hard",
    question: "Which DORA-style metric most directly correlates with high-performing DevSecOps teams?",
    choices: [
      "Lines of code per developer",
      "Lead time for changes, deployment frequency, change failure rate, and time to restore service",
      "Number of meetings per week",
      "Number of security tickets ever created"
    ],
    answer: 1,
    explanation: "DORA's four key metrics measure delivery and stability — high performers excel on all four, including change failure rate which security work directly affects."
  },

  // ───────────────────────────────────────────── Controls & Compliance (more)
  {
    id: 91,
    category: "Controls & Compliance",
    difficulty: "easy",
    question: "Which standard is specifically about payment card data protection?",
    choices: [
      "HIPAA",
      "PCI DSS",
      "ISO 9001",
      "GDPR"
    ],
    answer: 1,
    explanation: "PCI DSS (Payment Card Industry Data Security Standard) defines security requirements for organizations that store, process, or transmit cardholder data."
  },
  {
    id: 92,
    category: "Controls & Compliance",
    difficulty: "easy",
    question: "Which regulation primarily addresses the privacy of EU residents' personal data?",
    choices: [
      "GDPR",
      "SOX",
      "PCI DSS",
      "FedRAMP"
    ],
    answer: 0,
    explanation: "GDPR (General Data Protection Regulation) governs personal data of individuals in the EU and EEA, with global reach for organizations processing such data."
  },
  {
    id: 93,
    category: "Controls & Compliance",
    difficulty: "medium",
    question: "Which control category is a code review primarily?",
    choices: [
      "Detective",
      "Preventive",
      "Recovery",
      "Physical"
    ],
    answer: 1,
    explanation: "Code review aims to prevent defects (including security defects) from reaching later stages — it is preventive, with detective characteristics for issues already in the diff."
  },
  {
    id: 94,
    category: "Controls & Compliance",
    difficulty: "medium",
    question: "What is the primary purpose of an audit trail?",
    choices: [
      "Prevent users from logging in",
      "Provide a tamper-evident record of who did what, when, supporting accountability and investigation",
      "Replace MFA",
      "Speed up databases"
    ],
    answer: 1,
    explanation: "Audit trails support accountability, forensic investigation, and compliance evidence by recording actions and identities reliably."
  },
  {
    id: 95,
    category: "Controls & Compliance",
    difficulty: "hard",
    question: "Which best describes the difference between a policy, a standard, and a procedure?",
    choices: [
      "They are interchangeable terms",
      "Policy states intent and high-level rules; standards define specific mandatory requirements; procedures define step-by-step how to comply",
      "Procedure comes first, then policy",
      "Standards are optional; procedures are not"
    ],
    answer: 1,
    explanation: "Policies set direction and intent; standards specify what must be done; procedures describe how it is done in practice."
  },
  {
    id: 96,
    category: "Controls & Compliance",
    difficulty: "medium",
    question: "Which is the most efficient way to gather evidence for compliance audits in a DevSecOps environment?",
    choices: [
      "Email screenshots once per quarter",
      "Automatically generate evidence as a byproduct of pipeline runs and runtime controls",
      "Disable all logs to simplify the audit",
      "Have developers manually fill in forms after each commit"
    ],
    answer: 1,
    explanation: "Automated evidence generation (signed pipeline logs, scan reports, policy decisions) is more reliable, complete, and lower-cost than manual collection."
  },

  // ───────────────────────────────────────────── Risk & Threat Modeling (more)
  {
    id: 97,
    category: "Risk & Threat Modeling",
    difficulty: "easy",
    question: "What is a 'trust boundary' in a threat model?",
    choices: [
      "A physical fence around a data center",
      "A point at which the level of trust changes between components or actors, and where authentication/authorization must be enforced",
      "A friendship between developers and ops",
      "A budget approval line"
    ],
    answer: 1,
    explanation: "Trust boundaries delineate where the system must validate identity, integrity, or input — for example, between the public internet and an internal service."
  },
  {
    id: 98,
    category: "Risk & Threat Modeling",
    difficulty: "medium",
    question: "Which approach is associated with the LINDDUN methodology?",
    choices: [
      "Web vulnerability scanning",
      "Privacy-focused threat modeling (Linkability, Identifiability, Non-repudiation, Detectability, Disclosure of information, Unawareness, Non-compliance)",
      "Container image scanning",
      "Hardware threat modeling"
    ],
    answer: 1,
    explanation: "LINDDUN is a privacy-oriented threat modeling methodology, complementing security-focused frameworks like STRIDE."
  },
  {
    id: 99,
    category: "Risk & Threat Modeling",
    difficulty: "medium",
    question: "Which represents 'inherent risk' versus 'residual risk'?",
    choices: [
      "Inherent risk is what's left after controls; residual risk is before controls",
      "Inherent risk is the risk before applying controls; residual risk is what remains after controls",
      "They mean the same thing",
      "Both refer to risk acceptance"
    ],
    answer: 1,
    explanation: "Inherent risk is exposure absent controls. After controls are applied, residual risk is what the organization decides to accept, transfer, or further mitigate."
  },
  {
    id: 100,
    category: "Risk & Threat Modeling",
    difficulty: "hard",
    question: "Why is asset valuation important in risk assessment?",
    choices: [
      "It determines the salary of analysts",
      "It calibrates impact estimates so risk treatment is proportional to what's actually at stake",
      "It is required by every law",
      "It removes the need for threat modeling"
    ],
    answer: 1,
    explanation: "Without asset valuation (data sensitivity, business criticality), impact estimates are guesses and risk treatment cannot be prioritized rationally."
  },
  {
    id: 101,
    category: "Risk & Threat Modeling",
    difficulty: "medium",
    question: "Which is a typical output of a threat-modeling session?",
    choices: [
      "A penetration test report",
      "A list of identified threats and corresponding mitigations or accepted risks, tied to design elements",
      "A signed contract",
      "A SIEM dashboard"
    ],
    answer: 1,
    explanation: "Threat modeling outputs include identified threats, proposed mitigations, and decisions, often linked to the DFD or design artifacts."
  },

  // ───────────────────────────────────────────── Security Testing Tools (more)
  {
    id: 102,
    category: "Security Testing Tools",
    difficulty: "easy",
    question: "What does CVE stand for?",
    choices: [
      "Centralized Vulnerability Engine",
      "Common Vulnerabilities and Exposures",
      "Critical Vulnerability Estimate",
      "Cyber Vulnerability Evaluation"
    ],
    answer: 1,
    explanation: "CVE is a catalog of publicly disclosed cybersecurity vulnerabilities, with each entry assigned a unique identifier."
  },
  {
    id: 103,
    category: "Security Testing Tools",
    difficulty: "easy",
    question: "What does CVSS measure?",
    choices: [
      "The age of a vulnerability",
      "A standardized severity score for a vulnerability based on exploitability and impact characteristics",
      "Whether a CVE is patched",
      "Compliance posture"
    ],
    answer: 1,
    explanation: "CVSS (Common Vulnerability Scoring System) provides a numeric severity score (0–10) using base, temporal, and environmental metrics."
  },
  {
    id: 104,
    category: "Security Testing Tools",
    difficulty: "medium",
    question: "What additional context does EPSS provide compared to CVSS alone?",
    choices: [
      "A purely theoretical exploit difficulty",
      "An empirical probability that a vulnerability will be exploited in the wild in the near term",
      "License information",
      "The vendor's preferred fix order"
    ],
    answer: 1,
    explanation: "EPSS (Exploit Prediction Scoring System) estimates the probability of exploitation in the wild, helping prioritize beyond raw severity."
  },
  {
    id: 105,
    category: "Security Testing Tools",
    difficulty: "medium",
    question: "Which scanning approach is best suited for finding misconfigurations in cloud accounts (e.g., public buckets, weak IAM)?",
    choices: [
      "SAST",
      "Cloud Security Posture Management (CSPM)",
      "Fuzzing",
      "RASP"
    ],
    answer: 1,
    explanation: "CSPM tools evaluate cloud account configurations against secure baselines and flag drift or risky settings."
  },
  {
    id: 106,
    category: "Security Testing Tools",
    difficulty: "medium",
    question: "Which technique helps reduce SAST false positives via developer-friendly outputs?",
    choices: [
      "Disabling all rules",
      "Tuning rules, suppressing with justification, prioritizing by data-flow reachability and severity, and integrating into PRs",
      "Hiding findings from developers",
      "Running scans only annually"
    ],
    answer: 1,
    explanation: "Effective SAST programs tune rules, justify suppressions, prioritize confirmed risk, and present findings inline where developers work."
  },
  {
    id: 107,
    category: "Security Testing Tools",
    difficulty: "hard",
    question: "Why is semantic / dataflow analysis valuable in modern SAST?",
    choices: [
      "It only matches text patterns",
      "It tracks tainted data through code paths, finding issues like injection that simple pattern matching misses",
      "It speeds up compilation",
      "It replaces compilers"
    ],
    answer: 1,
    explanation: "Modern SAST tracks how user-controlled data flows through code to sinks, surfacing real injection and tainted-data bugs that grep-style scanners miss."
  },
  {
    id: 108,
    category: "Security Testing Tools",
    difficulty: "easy",
    question: "What is a key benefit of running secret scanners on git history, not just current files?",
    choices: [
      "They check spelling",
      "Secrets committed in past commits remain exposed even after deletion in HEAD; history scans surface them for revocation",
      "They reduce repository size",
      "They replace code review"
    ],
    answer: 1,
    explanation: "Removing a secret from HEAD does not remove it from history. Secret scans across history catch leaks that still need rotation/revocation."
  },
  {
    id: 109,
    category: "Security Testing Tools",
    difficulty: "medium",
    question: "Which combination provides the most balanced application security testing coverage?",
    choices: [
      "SAST only",
      "DAST only",
      "SAST + DAST + SCA + secrets scanning, complemented by manual review and threat modeling",
      "Penetration testing only, once a year"
    ],
    answer: 2,
    explanation: "No single technique catches everything. A combination — code, runtime, dependencies, secrets, plus human review and modeling — gives complementary coverage."
  },
  {
    id: 110,
    category: "Security Testing Tools",
    difficulty: "medium",
    question: "What is the role of a baseline scan vs. a full scan in DAST?",
    choices: [
      "Baselines scan everything; full scans only check headers",
      "Baseline scans are fast and safe for every PR; full scans are deeper, longer, and run periodically or pre-release",
      "They are the same thing",
      "Baseline scans require production access"
    ],
    answer: 1,
    explanation: "Baseline DAST gives quick feedback on each change; full scans dig deeper and are typically scheduled or run before significant releases."
  },

  // ───────────────────────────────────────────── CI/CD Pipeline Security (more)
  {
    id: 111,
    category: "CI/CD Pipeline Security",
    difficulty: "easy",
    question: "Which is a basic best practice for protecting CI pipeline secrets?",
    choices: [
      "Print all secrets to build logs for debugging",
      "Inject secrets via the CI's secret manager and ensure logs are masked",
      "Email secrets to the team daily",
      "Commit them to a private repo"
    ],
    answer: 1,
    explanation: "Use the CI's first-class secret store, mask values in logs, and avoid environment variable leakage to subprocesses where possible."
  },
  {
    id: 112,
    category: "CI/CD Pipeline Security",
    difficulty: "medium",
    question: "Which is a strong control to prevent unauthorized changes to production deployments?",
    choices: [
      "Letting any engineer push directly to prod",
      "Requiring code review, signed commits, protected branches, and policy-gated promotion to production",
      "Disabling logs in CI",
      "Granting all repos admin access"
    ],
    answer: 1,
    explanation: "Layered controls — code review, signed commits, protected branches, and gated promotion — provide defense in depth around production deploys."
  },
  {
    id: 113,
    category: "CI/CD Pipeline Security",
    difficulty: "medium",
    question: "Provenance attestations (e.g., in-toto / SLSA) are useful because they:",
    choices: [
      "Make builds slower",
      "Provide verifiable evidence of how an artifact was built and from what source, enabling downstream policy decisions",
      "Replace SAST",
      "Encrypt source code"
    ],
    answer: 1,
    explanation: "Provenance attestations let consumers verify that an artifact came from an expected source and build process, foundational for supply-chain integrity."
  },
  {
    id: 114,
    category: "CI/CD Pipeline Security",
    difficulty: "hard",
    question: "Which control most directly mitigates a malicious dependency typosquat?",
    choices: [
      "Allowlists or curated internal package mirrors plus dependency review on additions",
      "Faster builds",
      "Public package indexes only",
      "Disabling lockfiles"
    ],
    answer: 0,
    explanation: "Curated mirrors/allowlists, combined with mandatory review of new dependencies, prevent accidental installs of typosquatted or malicious packages."
  },
  {
    id: 115,
    category: "CI/CD Pipeline Security",
    difficulty: "medium",
    question: "Why prefer immutable artifact storage (write-once registries with retention) for build outputs?",
    choices: [
      "They are cheaper",
      "Immutability prevents tampering after build and supports reproducible deploys, rollbacks, and forensic investigations",
      "They speed up CI",
      "They eliminate the need for IAM"
    ],
    answer: 1,
    explanation: "Immutable artifact storage protects integrity post-build and underpins reproducible, auditable deployments."
  },
  {
    id: 116,
    category: "CI/CD Pipeline Security",
    difficulty: "medium",
    question: "Which is the safer way to grant a pipeline access to deploy to a cloud account?",
    choices: [
      "A long-lived admin role assumed by all pipelines",
      "A least-privilege role assumed via short-lived OIDC tokens, scoped per pipeline and environment",
      "Using a developer's personal credentials",
      "Bypassing IAM with a static admin key"
    ],
    answer: 1,
    explanation: "Per-pipeline, least-privilege roles assumed via short-lived OIDC tokens limit blast radius and remove standing static credentials."
  },

  // ───────────────────────────────────────────── Secrets & Cryptography (more)
  {
    id: 117,
    category: "Secrets & Cryptography",
    difficulty: "easy",
    question: "Which password storage practice is recommended?",
    choices: [
      "Plain text in the database",
      "Reversible encryption with a shared key",
      "Salted hashes using a slow, memory-hard algorithm such as Argon2 or bcrypt",
      "MD5"
    ],
    answer: 2,
    explanation: "Slow, salted, memory-hard hashing (Argon2id, bcrypt, scrypt) is recommended; fast hashes like MD5/SHA-1 are unsuitable for password storage."
  },
  {
    id: 118,
    category: "Secrets & Cryptography",
    difficulty: "medium",
    question: "What is the primary risk of using ECB mode for symmetric encryption?",
    choices: [
      "It is too slow",
      "Identical plaintext blocks produce identical ciphertext blocks, leaking patterns in the data",
      "It only supports short keys",
      "It requires TLS"
    ],
    answer: 1,
    explanation: "ECB mode does not hide structure between identical blocks. Authenticated modes such as GCM are preferred for confidentiality and integrity."
  },
  {
    id: 119,
    category: "Secrets & Cryptography",
    difficulty: "medium",
    question: "What is an authenticated encryption mode such as AES-GCM intended to provide?",
    choices: [
      "Confidentiality only",
      "Confidentiality and integrity/authenticity of the ciphertext in one primitive",
      "Hashing only",
      "Compression"
    ],
    answer: 1,
    explanation: "AEAD modes (AES-GCM, ChaCha20-Poly1305) protect both confidentiality and integrity, preventing undetected ciphertext tampering."
  },
  {
    id: 120,
    category: "Secrets & Cryptography",
    difficulty: "hard",
    question: "Why is key rotation important even for unbroken algorithms?",
    choices: [
      "It makes encryption faster",
      "It limits the volume of data exposed if a key is later compromised, and supports recovery from undetected leaks",
      "It is required by every regulator",
      "It changes the algorithm"
    ],
    answer: 1,
    explanation: "Periodic rotation reduces the impact of an undetected key compromise and bounds the data protected by any single key version."
  },
  {
    id: 121,
    category: "Secrets & Cryptography",
    difficulty: "easy",
    question: "Which is the best approach when a secret is accidentally committed to a public repository?",
    choices: [
      "Force-push to remove it from history and assume the leak never happened",
      "Immediately revoke/rotate the secret, then remediate history; assume it has been seen",
      "Delete the file in the next commit only",
      "Ignore it if no one comments on it"
    ],
    answer: 1,
    explanation: "Treat any committed secret as compromised. Revoke and rotate first, then clean history; deleting the file alone leaves the secret in git history."
  },
  {
    id: 122,
    category: "Secrets & Cryptography",
    difficulty: "medium",
    question: "What is the role of a hardware security module (HSM)?",
    choices: [
      "A backup tape system",
      "A tamper-resistant device that securely generates, stores, and uses cryptographic keys",
      "A vendor-specific MFA token only",
      "A SIEM appliance"
    ],
    answer: 1,
    explanation: "HSMs provide hardware-backed key generation, storage, and operations, often for high-value keys (CA roots, payment HSMs, KMS backends)."
  },

  // ───────────────────────────────────────────── Container & Cloud Security (more)
  {
    id: 123,
    category: "Container & Cloud Security",
    difficulty: "easy",
    question: "Why is the Docker socket dangerous to mount inside a container?",
    choices: [
      "It exposes a port",
      "Access to the Docker daemon socket effectively grants root on the host",
      "It increases image size",
      "It breaks DNS"
    ],
    answer: 1,
    explanation: "A process with the Docker socket can launch privileged containers and escape isolation, equating to root on the host."
  },
  {
    id: 124,
    category: "Container & Cloud Security",
    difficulty: "medium",
    question: "Which Kubernetes object is most commonly used to enforce least privilege for workloads talking to other workloads?",
    choices: [
      "Service",
      "NetworkPolicy",
      "ConfigMap",
      "Job"
    ],
    answer: 1,
    explanation: "NetworkPolicies restrict pod-to-pod and pod-to-external traffic so only intended communication is allowed at L3/L4."
  },
  {
    id: 125,
    category: "Container & Cloud Security",
    difficulty: "medium",
    question: "Which Kubernetes resource lets you store small pieces of sensitive data and reference them in pods?",
    choices: [
      "Secret",
      "ConfigMap",
      "Service",
      "PodDisruptionBudget"
    ],
    answer: 0,
    explanation: "Kubernetes Secrets store sensitive values for use by pods. They should be encrypted at rest (e.g., via KMS) and protected by RBAC."
  },
  {
    id: 126,
    category: "Container & Cloud Security",
    difficulty: "hard",
    question: "Which combination most strongly hardens a Kubernetes cluster against compromised pods?",
    choices: [
      "Privileged pods, no NetworkPolicies, cluster-admin to all",
      "Pod Security Standards (restricted), default-deny NetworkPolicies, RBAC least privilege, image signing/admission, runtime monitoring",
      "Disabling RBAC for simplicity",
      "Running every workload as root"
    ],
    answer: 1,
    explanation: "Layered controls — workload constraints, network segmentation, RBAC, admission policies, and runtime monitoring — collectively limit blast radius."
  },
  {
    id: 127,
    category: "Container & Cloud Security",
    difficulty: "medium",
    question: "Why is a multi-stage Dockerfile preferred for production images?",
    choices: [
      "It looks fancier",
      "It separates build tooling from runtime, producing a smaller, more minimal final image with less attack surface",
      "It is required by Kubernetes",
      "It speeds up YAML parsing"
    ],
    answer: 1,
    explanation: "Multi-stage builds keep compilers, dev dependencies, and intermediate files out of the final image, reducing size and exposure."
  },
  {
    id: 128,
    category: "Container & Cloud Security",
    difficulty: "medium",
    question: "Which IAM practice is most aligned with least privilege in cloud accounts?",
    choices: [
      "Granting *:* (full admin) to all roles",
      "Granting only the actions and resources required for the specific task, scoped by resource ARN/path and condition keys",
      "Disabling IAM",
      "Using long-lived shared accounts for everyone"
    ],
    answer: 1,
    explanation: "Tight, action- and resource-scoped policies (with conditions where useful) reduce the impact of compromised credentials."
  },

  // ───────────────────────────────────────────── Monitoring & Incident Response (more)
  {
    id: 129,
    category: "Monitoring & Incident Response",
    difficulty: "easy",
    question: "What is the typical first step of incident response after detection?",
    choices: [
      "Public disclosure",
      "Triage and containment to limit the spread and impact of the incident",
      "Rebuild every server",
      "Disable all monitoring"
    ],
    answer: 1,
    explanation: "After detection, responders triage severity and contain the incident before eradication, recovery, and lessons learned."
  },
  {
    id: 130,
    category: "Monitoring & Incident Response",
    difficulty: "medium",
    question: "Which best characterizes a SOAR platform's role?",
    choices: [
      "Replacing all human analysts",
      "Orchestrating and automating response workflows across security tools, reducing toil and accelerating response",
      "Generating CVEs",
      "Issuing TLS certificates"
    ],
    answer: 1,
    explanation: "SOAR (Security Orchestration, Automation and Response) automates repetitive response steps and integrates tools so analysts focus on judgment, not toil."
  },
  {
    id: 131,
    category: "Monitoring & Incident Response",
    difficulty: "medium",
    question: "Which approach reduces alert fatigue?",
    choices: [
      "Sending every event as a high-priority alert",
      "Tuning detections, suppressing known-benign noise, and routing by severity with clear runbooks",
      "Disabling all monitoring",
      "Adding more analysts to read raw logs manually"
    ],
    answer: 1,
    explanation: "Curating alert quality — tuning, suppression, severity routing, runbook context — preserves analyst attention for what matters."
  },
  {
    id: 132,
    category: "Monitoring & Incident Response",
    difficulty: "hard",
    question: "Which best characterizes a 'detection-as-code' practice?",
    choices: [
      "Detections written by hand once and never changed",
      "Detection logic is version-controlled, peer-reviewed, tested, and deployed via CI/CD like application code",
      "Detections live only in the SIEM UI",
      "Detection development is owned by an outside vendor"
    ],
    answer: 1,
    explanation: "Detection-as-code applies engineering discipline (version control, review, tests, CI) to detection rules, improving quality and pace of change."
  },
  {
    id: 133,
    category: "Monitoring & Incident Response",
    difficulty: "easy",
    question: "Which retention practice supports both investigation and cost control?",
    choices: [
      "Keeping every log forever in hot storage",
      "Tiered retention: hot for active analysis, warm/cold for older data, with policies aligned to legal and investigative needs",
      "Deleting all logs after one day",
      "Storing logs only on the originating host"
    ],
    answer: 1,
    explanation: "Tiered retention balances cost, performance, and the need to look back during investigations or audits."
  },

  // ───────────────────────────────────────────── Identity & Access Management (more)
  {
    id: 134,
    category: "Identity & Access Management",
    difficulty: "easy",
    question: "What does RBAC stand for and define?",
    choices: [
      "Role-Based Access Control — permissions are assigned to roles and users get permissions through their roles",
      "Random Bit Access Control",
      "Rule-Based Audit Compliance",
      "Resource Block Access Configuration"
    ],
    answer: 0,
    explanation: "RBAC structures permissions around roles, simplifying administration and supporting separation of duties."
  },
  {
    id: 135,
    category: "Identity & Access Management",
    difficulty: "medium",
    question: "When is ABAC preferable to RBAC?",
    choices: [
      "When you have only one user",
      "When access decisions need to consider multiple attributes (user, resource, environment, action) beyond static role membership",
      "When you have no policy at all",
      "When you want to disable IAM"
    ],
    answer: 1,
    explanation: "ABAC (Attribute-Based Access Control) supports context-rich, fine-grained decisions; RBAC is simpler but less expressive at scale."
  },
  {
    id: 136,
    category: "Identity & Access Management",
    difficulty: "medium",
    question: "Why is OAuth 2.0 not, by itself, an authentication protocol?",
    choices: [
      "OAuth 2.0 is a delegated authorization framework; OpenID Connect builds authentication on top of it",
      "OAuth 2.0 stores passwords",
      "OAuth 2.0 is for VPNs",
      "OAuth 2.0 is deprecated"
    ],
    answer: 0,
    explanation: "OAuth 2.0 enables delegated access (authorization). OpenID Connect (OIDC) layers identity/authentication semantics on top of it."
  },
  {
    id: 137,
    category: "Identity & Access Management",
    difficulty: "hard",
    question: "Which approach BEST manages 'joiner-mover-leaver' lifecycle for accounts?",
    choices: [
      "Manual ticketing for every change, with no central source",
      "An identity provider authoritative for accounts, automated provisioning/deprovisioning via SCIM, periodic access reviews",
      "Letting users delete their own accounts when they leave",
      "Creating accounts ad hoc with no audit"
    ],
    answer: 1,
    explanation: "An authoritative IdP plus automated provisioning (SCIM) and periodic reviews ensures consistent, timely lifecycle management — especially for offboarding."
  },
  {
    id: 138,
    category: "Identity & Access Management",
    difficulty: "medium",
    question: "Which factor type does a hardware security key (e.g., FIDO2) most strongly resist?",
    choices: [
      "Lost laptops",
      "Phishing-based credential theft, due to origin-bound public-key authentication",
      "Network outages",
      "Backup failures"
    ],
    answer: 1,
    explanation: "FIDO2 / WebAuthn binds credentials to the legitimate origin and uses public-key cryptography, making them strongly phishing-resistant."
  },
  {
    id: 139,
    category: "Identity & Access Management",
    difficulty: "easy",
    question: "What is a primary risk of shared accounts?",
    choices: [
      "They are too expensive",
      "Lack of attribution — actions cannot be reliably tied to a specific individual, undermining accountability and investigations",
      "They are too fast",
      "They prevent backups"
    ],
    answer: 1,
    explanation: "Shared accounts erode accountability and make incident attribution and access reviews difficult. Use individual accounts plus role assumption instead."
  },

  // ───────────────────────────────────────────── Application Security (new category)
  {
    id: 140,
    category: "Application Security",
    difficulty: "easy",
    question: "Which OWASP Top 10 category covers SQL injection and similar untrusted input flowing into interpreters?",
    choices: [
      "Injection",
      "Cryptographic Failures",
      "Security Logging and Monitoring Failures",
      "Server-Side Request Forgery"
    ],
    answer: 0,
    explanation: "Injection covers SQL, NoSQL, OS, and other interpreter-level injection where untrusted input is mixed with command/query syntax."
  },
  {
    id: 141,
    category: "Application Security",
    difficulty: "easy",
    question: "Which is the strongest mitigation for SQL injection?",
    choices: [
      "Concatenating sanitized strings",
      "Using parameterized queries / prepared statements with proper bind variables",
      "Hiding error messages",
      "Renaming database tables"
    ],
    answer: 1,
    explanation: "Parameterized queries separate code from data so user input cannot alter SQL structure, eliminating most injection vectors when used consistently."
  },
  {
    id: 142,
    category: "Application Security",
    difficulty: "medium",
    question: "Which control most reliably mitigates reflected XSS?",
    choices: [
      "Input length limits only",
      "Context-aware output encoding/escaping when rendering, plus a strict Content Security Policy",
      "Disabling JavaScript on the server",
      "Renaming HTML elements"
    ],
    answer: 1,
    explanation: "Output encoding by context (HTML, attribute, JS, URL) and a tight CSP reduce both the introduction and impact of XSS."
  },
  {
    id: 143,
    category: "Application Security",
    difficulty: "medium",
    question: "Which best mitigates Cross-Site Request Forgery (CSRF) on state-changing endpoints?",
    choices: [
      "Returning HTTP 200 quickly",
      "Same-site cookies plus anti-CSRF tokens (or other origin-bound checks) for state-changing requests",
      "Disabling cookies entirely",
      "Logging all requests only"
    ],
    answer: 1,
    explanation: "Modern CSRF defense pairs SameSite cookies with origin/anti-CSRF token checks on state-changing endpoints."
  },
  {
    id: 144,
    category: "Application Security",
    difficulty: "medium",
    question: "Which best describes Insecure Direct Object References (IDOR)?",
    choices: [
      "A failure of the database engine",
      "An authorization flaw where the application exposes an object reference (e.g., an ID) without verifying the user is authorized for that object",
      "A type of XSS",
      "A misconfigured WAF"
    ],
    answer: 1,
    explanation: "IDOR happens when the app trusts client-supplied object identifiers without verifying the requester's authorization for that object."
  },
  {
    id: 145,
    category: "Application Security",
    difficulty: "medium",
    question: "Which mitigation most directly addresses Server-Side Request Forgery (SSRF)?",
    choices: [
      "Blocking client JavaScript",
      "Strict allowlists for outbound destinations from server-side fetchers and rejecting requests to internal/cloud-metadata addresses",
      "Increasing TLS key length",
      "Disabling logs"
    ],
    answer: 1,
    explanation: "SSRF is mitigated by limiting where server-side fetches can go (allowlists, network segmentation, blocking link-local/metadata) and validating user-supplied URLs."
  },
  {
    id: 146,
    category: "Application Security",
    difficulty: "hard",
    question: "Which is the most effective long-term mitigation against deserialization vulnerabilities?",
    choices: [
      "Trusting all serialized data",
      "Avoiding native deserialization of untrusted data — use safer formats (e.g., JSON with schema validation) and integrity-protected payloads",
      "Renaming class files",
      "Adding more comments to code"
    ],
    answer: 1,
    explanation: "Native (e.g., Java/Python pickle) deserialization of untrusted input is dangerous; prefer safe formats with schemas and signed/MACed payloads."
  },
  {
    id: 147,
    category: "Application Security",
    difficulty: "easy",
    question: "Why is input validation alone insufficient to prevent injection attacks?",
    choices: [
      "It is always wrong",
      "Validation cannot reliably anticipate every interpreter context; combine it with context-correct encoding/parameterization at the sink",
      "It slows the application",
      "Browsers ignore it"
    ],
    answer: 1,
    explanation: "Defense-in-depth requires both input validation and proper output handling/parameterization at every sink to prevent injection reliably."
  },
  {
    id: 148,
    category: "Application Security",
    difficulty: "medium",
    question: "Which header most directly mitigates a class of XSS by restricting allowed script sources?",
    choices: [
      "X-Frame-Options",
      "Content-Security-Policy",
      "Cache-Control",
      "Set-Cookie"
    ],
    answer: 1,
    explanation: "CSP restricts which sources the browser will load scripts (and other resources) from, reducing XSS impact even when injection occurs."
  },
  {
    id: 149,
    category: "Application Security",
    difficulty: "medium",
    question: "Which best protects against broken authentication weaknesses?",
    choices: [
      "Storing passwords in cleartext for ease of recovery",
      "Strong password policy + MFA + session management with short-lived tokens, anti-automation, and account lockout/throttling on abuse",
      "Allowing any password length",
      "Disabling MFA for admins"
    ],
    answer: 1,
    explanation: "Authentication needs layered defenses — credential strength, MFA, robust session handling, and abuse protections — not a single control."
  },
  {
    id: 150,
    category: "Application Security",
    difficulty: "hard",
    question: "Which describes 'security misconfiguration' in OWASP Top 10?",
    choices: [
      "A category of cryptographic weaknesses only",
      "Insecure default settings, incomplete or ad-hoc configurations, open cloud storage, verbose errors, or missing hardening across the stack",
      "A type of SQL injection",
      "A bug in OpenSSL specifically"
    ],
    answer: 1,
    explanation: "Security misconfiguration spans defaults, missing hardening, exposed admin interfaces, verbose errors, and similar config weaknesses across the stack."
  },

  // ───────────────────────────────────────────── DevOps & Automation
  {
    id: 151,
    category: "DevOps & Automation",
    difficulty: "easy",
    question: "What is the core idea of Infrastructure as Code (IaC)?",
    choices: [
      "Manually clicking through cloud consoles is fastest",
      "Provisioning and managing infrastructure through declarative or imperative code, version-controlled and reviewable",
      "Letting each engineer SSH and tweak servers",
      "Using only physical hardware"
    ],
    answer: 1,
    explanation: "IaC treats infrastructure like software — versioned, reviewed, and reproducible — enabling automation and policy enforcement."
  },
  {
    id: 152,
    category: "DevOps & Automation",
    difficulty: "easy",
    question: "What does 'idempotent' mean for an automation script?",
    choices: [
      "It runs differently every time",
      "Running it multiple times produces the same end state without unintended side effects",
      "It cannot be rerun",
      "It only runs in production"
    ],
    answer: 1,
    explanation: "Idempotent automations safely converge to the same state, so reruns are predictable — essential for reliable infra automation."
  },
  {
    id: 153,
    category: "DevOps & Automation",
    difficulty: "medium",
    question: "Which statement best contrasts continuous delivery and continuous deployment?",
    choices: [
      "They are identical",
      "Continuous delivery means every change is releasable; continuous deployment means every change is automatically released to production",
      "Continuous deployment skips testing",
      "Continuous delivery requires no automation"
    ],
    answer: 1,
    explanation: "CDelivery keeps changes always release-ready; CDeployment automatically pushes them to production after passing pipeline checks."
  },
  {
    id: 154,
    category: "DevOps & Automation",
    difficulty: "medium",
    question: "What does GitOps emphasize?",
    choices: [
      "Manual server configuration",
      "Git as the single source of truth for declarative infrastructure and application state, with automated reconciliation",
      "Disabling version control",
      "Pushing changes directly to runtime via SSH"
    ],
    answer: 1,
    explanation: "GitOps uses Git as the source of truth and a controller continuously reconciles runtime state to match what's declared in Git."
  },
  {
    id: 155,
    category: "DevOps & Automation",
    difficulty: "medium",
    question: "Which is a key security benefit of GitOps?",
    choices: [
      "Removes the need for IAM",
      "Every change to runtime is reviewable, auditable, and revertible via Git history",
      "Allows arbitrary out-of-band changes",
      "Disables monitoring"
    ],
    answer: 1,
    explanation: "GitOps yields strong auditability and reversibility — every state change is a Git commit, reviewable and revertible."
  },
  {
    id: 156,
    category: "DevOps & Automation",
    difficulty: "hard",
    question: "Which combination most reliably enables safe progressive delivery?",
    choices: [
      "Big-bang releases on Fridays",
      "Feature flags, canary or blue/green deployments, automated rollback on signal regression, and clear ownership of guardrail SLOs",
      "Disabling monitoring during deploys",
      "Manual deployment via shared admin accounts"
    ],
    answer: 1,
    explanation: "Progressive delivery combines flags, canary/blue-green, and automated rollback against guardrail SLOs to release safely and quickly."
  },
  {
    id: 157,
    category: "DevOps & Automation",
    difficulty: "easy",
    question: "Which testing pyramid layer should typically have the most tests?",
    choices: [
      "End-to-end UI tests",
      "Unit tests",
      "Manual tests",
      "Performance tests only"
    ],
    answer: 1,
    explanation: "The pyramid favors many fast unit tests, fewer integration tests, and the smallest layer of slower end-to-end tests."
  },

  // ───────────────────────────────────────────── Software Supply Chain
  {
    id: 158,
    category: "Software Supply Chain",
    difficulty: "easy",
    question: "What is the most concise definition of a software supply chain attack?",
    choices: [
      "An attack on physical shipping",
      "An attack that compromises software via its dependencies, build, or distribution channels rather than directly attacking the target",
      "A user phishing campaign",
      "A DDoS attack"
    ],
    answer: 1,
    explanation: "Supply-chain attacks compromise upstream components, build pipelines, or update channels to deliver malicious code to many downstream consumers."
  },
  {
    id: 159,
    category: "Software Supply Chain",
    difficulty: "medium",
    question: "Which is a primary purpose of an SBOM in supply-chain risk management?",
    choices: [
      "To track licensing fees only",
      "To enable rapid identification of components affected by a newly disclosed vulnerability",
      "To replace SAST",
      "To bypass code review"
    ],
    answer: 1,
    explanation: "An SBOM enables rapid impact analysis when a new CVE drops — what products contain the affected component and at what versions?"
  },
  {
    id: 160,
    category: "Software Supply Chain",
    difficulty: "medium",
    question: "What does 'reproducible build' mean?",
    choices: [
      "A build that can run only on the original CI",
      "Given the same source and inputs, anyone can produce a bit-for-bit identical artifact, enabling independent verification",
      "A build that auto-runs every minute",
      "A build with no dependencies"
    ],
    answer: 1,
    explanation: "Reproducible builds let independent parties verify that a published artifact really was built from the claimed source — a strong supply-chain control."
  },
  {
    id: 161,
    category: "Software Supply Chain",
    difficulty: "hard",
    question: "Which combination most strongly defends the build pipeline against tampering?",
    choices: [
      "Hermetic builds, ephemeral runners, signed provenance attestations, and policy-gated promotion verifying signatures and provenance",
      "A single shared admin account on a long-lived runner",
      "Disabling logs to prevent leakage",
      "Letting any user push directly to production"
    ],
    answer: 0,
    explanation: "Hermetic, ephemeral builds with signed provenance and policy-gated consumption (verifying signatures + provenance) collectively raise the bar against tampering."
  },
  {
    id: 162,
    category: "Software Supply Chain",
    difficulty: "medium",
    question: "Why is verifying signatures of consumed artifacts important even if you trust the registry?",
    choices: [
      "It is required by GDPR",
      "Registries can be compromised or misconfigured; signature verification provides cryptographic assurance of origin and integrity independent of transport trust",
      "It speeds up builds",
      "It changes the artifact"
    ],
    answer: 1,
    explanation: "Verifying signatures (with trusted keys/identity) defends against compromised or misconfigured registries and pulls cryptographic guarantees end-to-end."
  },

  // ───────────────────────────────────────────── Data Protection & Privacy
  {
    id: 163,
    category: "Data Protection & Privacy",
    difficulty: "easy",
    question: "Which best describes data classification?",
    choices: [
      "Sorting files alphabetically",
      "Categorizing data by sensitivity (e.g., public, internal, confidential, restricted) so appropriate controls can be applied",
      "Storing all data in one bucket",
      "Encrypting only the largest files"
    ],
    answer: 1,
    explanation: "Classification drives proportional controls — encryption, access, retention — based on the sensitivity of the data."
  },
  {
    id: 164,
    category: "Data Protection & Privacy",
    difficulty: "medium",
    question: "Which technique replaces sensitive values with non-sensitive surrogates that preserve format and referential integrity for testing?",
    choices: [
      "Hashing",
      "Tokenization",
      "Zip compression",
      "Base64 encoding"
    ],
    answer: 1,
    explanation: "Tokenization swaps sensitive values for surrogate tokens, often format-preserving, retaining utility while removing sensitive content from systems that don't need it."
  },
  {
    id: 165,
    category: "Data Protection & Privacy",
    difficulty: "medium",
    question: "What is 'data minimization'?",
    choices: [
      "Compressing data on disk",
      "Collecting and retaining only the personal data required for the stated purpose, and no more",
      "Deleting all logs",
      "Anonymizing all internal data"
    ],
    answer: 1,
    explanation: "Data minimization is a privacy principle: do not collect or keep personal data beyond what is necessary for the legitimate purpose."
  },
  {
    id: 166,
    category: "Data Protection & Privacy",
    difficulty: "medium",
    question: "Why is true anonymization difficult?",
    choices: [
      "It requires custom encryption",
      "Combining several quasi-identifiers can re-identify individuals; achieving privacy guarantees often requires techniques like k-anonymity or differential privacy",
      "Browsers prevent it",
      "It only works on numeric data"
    ],
    answer: 1,
    explanation: "Removing direct identifiers is rarely sufficient. Re-identification via auxiliary data drives the use of formal privacy techniques and risk assessment."
  },
  {
    id: 167,
    category: "Data Protection & Privacy",
    difficulty: "hard",
    question: "Which principle is most aligned with 'privacy by design'?",
    choices: [
      "Privacy is added during a final review",
      "Privacy considerations are embedded throughout the design and lifecycle, with proactive, default protections",
      "Privacy is the user's responsibility only",
      "Privacy applies only to marketing data"
    ],
    answer: 1,
    explanation: "Privacy by design treats privacy as a default and design property, not a late patch — covering data, defaults, and lifecycle decisions."
  },
  {
    id: 168,
    category: "Data Protection & Privacy",
    difficulty: "easy",
    question: "Why should production data not be copied directly into developer environments?",
    choices: [
      "It looks unprofessional",
      "Production data may contain sensitive personal or regulated data; use minimized, masked, or synthetic data instead",
      "It would compress poorly",
      "Developers prefer empty databases"
    ],
    answer: 1,
    explanation: "Developer environments rarely match production controls. Use masked, tokenized, or synthetic datasets to avoid exposing real personal/regulated data."
  }
];
