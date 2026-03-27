import { ResumeData } from '../types/resume';

export const resumeData: ResumeData = {
  name: "Aman Sharma",
  location: "Gurgaon, Haryana, India",
  email: "amandevship@gmail.com",
  phone: "8475962723",
  website: "https://amandevship.netlify.app",
  linkedIn: "https://www.linkedin.com/in/aman-sharma-5475901ba/",
  github: "https://github.com/amandevship",
  title: "Senior Software Engineer",
  totalExperience: "6+ years",
  professionalSummary:
    "Senior Software Engineer with 6+ years of experience building scalable cross-platform mobile (React Native) and web (React.js) applications. Proven expertise in full-stack development with Node.js, REST and GraphQL APIs, state management (Redux, Redux Toolkit, Context API), and production deployments on the App Store and Play Store. Experienced in performance optimization, technical mentoring, code reviews, and delivering high-impact features in Agile environments across product-led and enterprise teams.",
  workExperience: [
    {
      role: "Senior Software Engineer",
      company: "TO THE NEW",
      period: "Aug 2024 – Dec 2025",
      location: "Noida, UP, India",
      achievements: [
        "Led development of cross-platform mobile applications (Android & iOS) using React Native, improving performance, stability, and user experience.",
        "Built and enhanced scalable web applications using React.js for enterprise clients across multiple domains.",
        "Designed and developed backend services using Node.js and Express.js, implementing secure and scalable REST and GraphQL APIs.",
        "Delivered end-to-end features across frontend and backend, ensuring seamless integration and consistent user experience.",
        "Optimized application performance by reducing crashes and improving load time through profiling, debugging, and performance tuning.",
        "Developed reusable and modular components to improve maintainability and accelerate feature delivery.",
        "Implemented efficient state management using Redux, Redux Toolkit, and Context API for complex data flows.",
        "Mentored junior developers, conducted code reviews, and enforced best practices and scalable architecture standards.",
        "Collaborated with cross-functional teams (product, QA, backend) to deliver high-quality features within Agile timelines."
      ]
    },
    {
      role: "Software Engineer",
      company: "CarDekho Group",
      period: "Mar 2022 – Apr 2024",
      location: "Gurugram, Haryana, India",
      achievements: [
        "Developed and enhanced cross-platform mobile applications (Android & iOS) using React Native for large-scale dealer and lead management platforms serving users in South East Asia.",
        "Built scalable and high-performance web applications using React.js for dealer operations and insurance/loan management systems.",
        "Integrated RESTful and GraphQL APIs, ensuring seamless data synchronization between frontend and backend systems.",
        "Implemented local data storage using Realm DB, enabling offline capabilities and improved performance.",
        "Delivered end-to-end features across mobile and web, ensuring consistency and seamless user experience across platforms.",
        "Wrote unit and integration tests using Jest to ensure code quality and stability.",
        "Collaborated with cross-functional teams (product, QA, backend) in Agile environments using Jira."
      ]
    },
    {
      role: "Software Engineer",
      company: "NMG Technologies",
      period: "Nov 2020 – Mar 2022",
      location: "Gurugram, Haryana, India",
      achievements: [
        "Developed cross-platform mobile (React Native) and web (React.js) applications for social networking (Vouch) and fintech fund management (Wealth Concert) platforms.",
        "Implemented state management using Redux and Redux Thunk to handle complex data flows and real-time updates.",
        "Integrated Firebase services for authentication, real-time data handling, analytics, and push notifications.",
        "Implemented social login integrations (Google, Facebook) to improve user onboarding experience.",
        "Integrated RESTful APIs for user data, financial transactions, social interactions, and backend communication.",
        "Optimized application performance, improving load time, responsiveness, and overall user experience."
      ]
    },
    {
      role: "Software Engineer",
      company: "Affle (India) Ltd",
      period: "Apr 2019 – Oct 2020",
      location: "Gurugram, Haryana, India",
      achievements: [
        "Developed cross-platform mobile (React Native) and web (React.js) applications for e-commerce (Sunny E-Store) and health-tech (Niine) domains.",
        "Implemented core product features including product listing, search, cart, checkout flows, and health tracking functionalities.",
        "Integrated RESTful and third-party APIs for payments, order management, user data, and health insights.",
        "Implemented data-driven features such as cycle tracking, reminders, and predictive insights for the Niine health application.",
        "Integrated Firebase services for authentication, push notifications, and analytics.",
        "Optimized application performance, improving load time and overall user experience."
      ]
    }
  ],
  skills: [
    {
      category: "Mobile",
      skills: ["React Native", "Android Studio", "Xcode", "iOS", "Android", "Realm DB", "Firebase"]
    },
    {
      category: "Frontend",
      skills: [
        "React.js",
        "JavaScript (ES6+)",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Redux",
        "Redux Toolkit",
        "Redux Thunk",
        "Context API",
        "React Query",
        "React Hooks"
      ]
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "REST APIs", "GraphQL"]
    },
    {
      category: "Databases",
      skills: ["MongoDB", "PostgreSQL", "Realm DB", "Firebase Realtime Database"]
    },
    {
      category: "Testing",
      skills: ["Jest", "Unit Testing", "Integration Testing"]
    },
    {
      category: "Tools & DevOps",
      skills: ["Git", "GitHub", "Jira", "Asana", "Crashlytics", "New Relic", "Firebase Analytics"]
    },
    {
      category: "App Distribution",
      skills: ["App Store (iOS)", "Google Play Store (Android)"]
    }
  ],
  projects: [
    {
      title: "Aramex",
      description:
        "Revamped and optimized a large-scale logistics and shipment tracking platform across mobile (React Native), web (React.js), and backend (Node.js). Improved backend REST APIs and data flow using Node.js and Express.js; optimized MongoDB query performance and schema design. Refactored the codebase to improve maintainability, scalability, and performance. Resolved production issues and improved application reliability through debugging and monitoring.",
      platform: "Mobile & Web",
      techStack: ["React Native", "React.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "Redux", "React Query", "REST APIs"],
      appStoreUrls: ["https://apps.apple.com/in/app/aramex/id1246178925"],
      playStoreUrls: ["https://play.google.com/store/apps/details?id=com.aramex.mobile&hl=en"],
      webAppUrls: ["https://aramex.com/track/shipments"]
    },
    {
      title: "DaMENSCH",
      description:
        "Built and enhanced a full-stack e-commerce platform for men’s apparel across mobile (React Native), web (React.js), and backend (Node.js). Designed and enhanced REST/GraphQL APIs for product listings, authentication, order management, and payments. Monitored and resolved production issues using Crashlytics, Firebase Analytics, and New Relic. Implemented advanced state management using Redux and Redux Toolkit to handle complex user interactions.",
      platform: "Mobile & Web",
      techStack: ["React Native", "React.js", "Node.js", "MongoDB", "TypeScript", "Redux Toolkit", "GraphQL", "Firebase", "New Relic"],
      appStoreUrls: ["https://apps.apple.com/in/app/damensch/id1663216493"],
      playStoreUrls: ["https://play.google.com/store/apps/details?id=com.damensch.app"],
      webAppUrls: ["https://www.damensch.com/men/innerwear"]
    },
    {
      title: "OTO Dealer",
      description:
        "Developed and maintained a dealer management platform for South East Asia across mobile and web. Utilized Realm DB for efficient local data storage and offline capabilities; wrote unit and integration tests using Jest.",
      platform: "Mobile & Web",
      techStack: ["React Native", "React.js", "TypeScript", "Redux", "Realm DB", "GraphQL", "Firebase", "Jest"],
      appStoreUrls: ["https://apps.apple.com/in/app/oto-dealer/id1489698884"],
      playStoreUrls: ["https://play.google.com/store/apps/details?id=com.oto.dealer"],
      webAppUrls: ["https://www.oto.com/en"]
    },
    {
      title: "OTO SFA",
      description:
        "Developed and maintained a loan/insurance lead management platform for South East Asia across mobile and web. Utilized Realm DB for efficient local data storage and offline capabilities; wrote unit and integration tests using Jest.",
      platform: "Mobile & Web",
      techStack: ["React Native", "React.js", "TypeScript", "Redux", "Realm DB", "GraphQL", "Firebase", "Jest"],
      appStoreUrls: ["https://apps.apple.com/in/app/oto-sfa/id1489698573"],
      playStoreUrls: ["https://play.google.com/store/apps/details?id=com.oto.sfa"],
      webAppUrls: ["https://sfa.oto.com/user-login"]
    },
    {
      title: "Vouch",
      description:
        "Built a social networking application across Android, iOS, and web. Implemented social feeds, likes, comments, and user profiles with real-time updates.",
      platform: "Mobile & Web",
      techStack: ["React Native", "React.js", "Redux", "Redux Thunk", "Firebase", "REST APIs"],
      webAppUrls: ["https://www.vouchtheapp.com/"],
      webAppDisabled: true
    },
    {
      title: "Wealth Concert",
      description:
        "Built a fintech fund management application across Android, iOS, and web. Implemented fund distribution and financial transaction tracking features with secure backend integrations.",
      platform: "Mobile & Web",
      techStack: ["React Native", "React.js", "Redux", "Firebase", "REST APIs"],
      appStoreUrls: ["https://apps.apple.com/in/app/wealthconcert/id157651350"],
      webAppUrls: ["https://nmgtechnologies.com/success-stories/wealth-concert"]
    },
    {
      title: "Niine",
      description:
        "Developed a period tracking and ovulation calendar app across Android, iOS, and web. Implemented predictive cycle analytics and Firebase authentication.",
      platform: "Mobile & Web",
      techStack: ["React Native", "React.js", "Redux", "Firebase", "REST APIs"],
      playStoreUrls: ["https://play.google.com/store/apps/details?id=com.periodtracker.periodcalendar.ovulation.periodcycle&hl=en"],
      webAppUrls: ["https://www.niine.com/period-predictor.php"],
      webAppDisabled: true
    },
    {
      title: "Sunny E-Store",
      description:
        "Developed an e-commerce gadget platform across Android, iOS, and web. Implemented cart/checkout flows and third-party payment integrations.",
      platform: "Mobile & Web",
      techStack: ["React Native", "React.js", "Redux", "Firebase", "REST APIs"],
      webAppUrls: ["https://sunny.com.mm/"],
      webAppDisabled: true
    }
  ],
  education: [
    {
      degree: "Bachelor of Technology, Computer Science",
      institution: "College of Engineering Roorkee",
      year: "2017",
      percentage: "70%"
    }
  ],
  certifications: [
  ]
};
