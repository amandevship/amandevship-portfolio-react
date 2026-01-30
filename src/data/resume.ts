import { ResumeData } from '../types/resume';

export const resumeData: ResumeData = {
  name: "Aman Sharma",
  location: "Gurgaon, Haryana, India",
  email: "amandevship@gmail.com",
  phone: "8475962723",
  linkedIn: "https://www.linkedin.com/in/aman-sharma-5475901ba/",
  title: "Senior Software Engineer",
  totalExperience: "6+ years",
  professionalSummary: "Senior Software Engineer with 6+ years of experience building and scaling React Native (iOS/Android) applications using JavaScript (ES6+), React Hooks, and Redux/Redux Thunk across e-commerce, OTT, logistics, and lead-management products. Advanced hands-on ownership of App Store/Play Store releases (signing, certificates/provisioning, metadata, hotfixes) and production reliability, including Crashlytics/ANR triage, Firebase Analytics, and Firebase Push Notifications. Strong focus on performance optimization, production debugging, and engineering excellence through Jest testing, CI pipelines, and mentoring/code reviews.",
  workExperience: [
    {
      role: "Senior Software Engineer",
      company: "TO THE NEW",
      period: "Aug 2024 – Dec 2025",
      location: "Noida, UP, India",
      achievements: [
        "React Native cross-platform apps (iOS/Android) with JavaScript, React Hooks, Redux/Redux Thunk",
        "Production support & release operations (App Store/Play Store, signing, certs, provisioning, hotfix, incident response, OTA rollout)",
        "Performance optimization + production debugging using Crashlytics crash/ANR triage",
        "Mentoring + code reviews",
        "REST & third-party APIs (payments, social login, analytics), stakeholder collaboration",
        "Git + agile tools (Asana/Jira)"
      ]
    },
    {
      role: "Software Development Engineer II",
      company: "CarDekho Group",
      period: "Mar 2022 – Apr 2024",
      location: "Gurugram, Haryana, India",
      achievements: [
        "React Native apps using Hooks, HOC, Context API, Render Props",
        "Offline/local storage: Realm, SQLite (project dependent)",
        "Firebase integration",
        "Unit testing (Jest, coverage targets) + integration testing (API mocking/E2E where applicable)",
        "CI pipelines (Bitbucket Pipelines/GitHub Actions/Jenkins)",
        "Automated build/release workflows (Fastlane/Bitrise/Codemagic)",
        "Agile execution using Jira; performance optimization & defect resolution"
      ]
    },
    {
      role: "React Native Developer",
      company: "New Media Guru India Pvt Ltd. (NMG Technologies)",
      period: "Nov 2020 – Mar 2022",
      location: "Gurugram, Haryana, India",
      achievements: [
        "React Native with Hooks, Redux/Redux Thunk",
        "UI/UX + REST API integrations",
        "Social login (Google/Facebook/Apple) + analytics tools",
        "Debugging + issue resolution; Git + Jira; iterative client feedback"
      ]
    },
    {
      role: "Software Engineer",
      company: "Affle (India) Ltd",
      period: "Apr 2019 – Oct 2020",
      location: "Gurugram, Haryana, India",
      achievements: [
        "React Native features iOS/Android (JavaScript + React)",
        "UI/UX + REST + third-party integrations",
        "Performance optimization, bug fixing, validating test cases before QA",
        "Stakeholder requirement gathering"
      ]
    }
  ],
  skills: [
    {
      category: "Mobile & Frontend",
      skills: ["React Native (iOS & Android)", "JavaScript (ES6+)", "React", "React Hooks", "Redux", "Redux Thunk", "State management", "GraphQL"]
    },
    {
      category: "Performance & Reliability",
      skills: ["Performance optimization (React Native)", "Production debugging", "Crashlytics (crash/ANR monitoring & triage)", "Firebase Analytics", "Push Notifications", "OTA updates planning & rollout (CodePush/other)"]
    },
    {
      category: "Release & DevOps",
      skills: ["App Store/Play Store submission & metadata", "Certificates/provisioning/signing", "Hotfix releases & incident response", "CI pipelines (Bitbucket Pipelines/GitHub Actions/Jenkins)", "Automated mobile builds/releases (Fastlane/Bitrise/Codemagic)"]
    },
    {
      category: "Testing & Database",
      skills: ["Unit testing (Jest) + coverage targets", "Integration testing (API mocking, E2E where applicable)", "Realm", "SQLite"]
    },
    {
      category: "Tools & Leadership",
      skills: ["Git", "Bitbucket", "Jira", "Asana", "Zoho", "Mentoring", "Code reviews"]
    }
  ],
  projects: [
    {
      title: "Aramex",
      description: "Logistics and shipment tracking mobile app (Android & iOS) for courier booking, shipment tracking, and delivery management.",
      platform: "Android & iOS",
      techStack: ["React Native", "JavaScript", "TypeScript", "Redux", "Redux Thunk"],
      appStoreUrl: "https://apps.apple.com/in/app/tata-play-live-tv-dth-pack/id385090000"
    },
    {
      title: "Tata Play",
      description: "OTT platform mobile application (Android & iOS) developed with React Native and Redux/Redux Thunk, focused on building and maintaining core app functionality across both platforms.",
      platform: "Android & iOS",
      techStack: ["React Native", "JavaScript", "TypeScript", "Redux", "Redux Thunk"],
      appStoreUrl: "https://apps.apple.com/in/app/tata-play-live-tv-dth-pack/id385090000"
    },
    {
      title: "DaMENSCH",
      description: "Men's innerwear e-commerce mobile app (Android & iOS). UI/UX, REST API, third-party integrations, business logic, bug fixes; observability via Crashlytics & Analytics; Asana.",
      platform: "Android & iOS",
      techStack: ["React Native", "JS", "React", "Hooks", "Redux", "Thunk", "Firebase", "REST", "Crashlytics", "Analytics", "Asana"],
      appStoreUrl: "https://apps.apple.com/in/app/damensch/id1663216493"
    },
    {
      title: "OTO SFA",
      description: "Loan leads & insurance for used cars in SEA (Android & iOS). Realm storage, REST/third-party APIs, Firebase, Jest, Jira. Tech includes HOC, Context API, Render Props.",
      platform: "Android & iOS",
      techStack: ["React Native", "HOC", "Context API", "Render Props", "Realm", "REST", "Firebase", "Jest", "Jira"],
      appStoreUrl: "https://apps.apple.com/in/app/oto-sfa/id1489698573"
    },
    {
      title: "OTO Dealer",
      description: "Dealer management SEA (Android & iOS). UI/UX, business logic, REST/third-party APIs, performance optimization, Jest.",
      platform: "Android & iOS",
      techStack: ["React Native", "REST", "Jest", "Performance Optimization"],
      appStoreUrl: "https://apps.apple.com/in/app/oto-dealer/id1489698884"
    },
    {
      title: "LMS APP",
      description: "Lead management for new car purchases SEA (Android & iOS). SQLite, Firebase, REST APIs, Jest.",
      platform: "Android & iOS",
      techStack: ["React Native", "SQLite", "Firebase", "REST", "Jest"],
      appStoreUrl: "https://apps.apple.com/in/app/zigwheels-cars-bikes/id704453976"
    },
    {
      title: "Wealth Concert",
      description: "Fund distribution/committee management (Android & iOS). Redux/Thunk, Firebase, social login.",
      platform: "Android & iOS",
      techStack: ["React Native", "Redux", "Thunk", "Firebase", "Social Login"],
      appStoreUrl: "https://apps.apple.com/in/app/wealthconcert/id157651350"
    },
    {
      title: "Vouch",
      description: "Social feed (Instagram-like) (Android & iOS). Redux/Thunk, Firebase, REST, social login.",
      platform: "Android & iOS",
      techStack: ["React Native", "Redux", "Thunk", "Firebase", "REST", "Social Login"]
    },
    {
      title: "Sunny E-Store",
      description: "E-commerce gadgets (Android & iOS). UI/UX, business logic, REST/third-party, Firebase.",
      platform: "Android & iOS",
      techStack: ["React Native", "REST", "Firebase"]
    },
    {
      title: "Niine App",
      description: "Period tracking (Android & iOS). Track period/ovulation windows; UI/UX, business logic, REST/third-party, Firebase.",
      platform: "Android & iOS",
      techStack: ["React Native", "REST", "Firebase"],
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.periodtracker.periodcalendar.ovulation.periodcycle&hl=en"
    },
    {
      title: "Funda E-Learning",
      description: "Tutor-student booking/bidding (Android & iOS). Firebase + REST/third-party.",
      platform: "Android & iOS",
      techStack: ["React Native", "Firebase", "REST"]
    }
  ],
  education: [
    {
      degree: "Bachelor's Degree",
      institution: "College Of Engineering Roorkee",
      year: "2017",
      gpa: "7.4"
    },
    {
      degree: "12th",
      institution: "HR College Amnour",
      year: "2012",
      gpa: "7.85"
    },
    {
      degree: "10th",
      institution: "High School Amnour",
      year: "2009",
      gpa: "7.85"
    }
  ],
  certifications: [
    {
      name: "ChatGPT and GPT-4 LLM Guide – Prompt Engineering"
    }
  ]
};
