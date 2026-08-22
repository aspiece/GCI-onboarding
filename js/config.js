/**
 * Computer Science Student Launch Portal — Site Configuration
 *
 * Edit this file to update links, add tools, or add courses.
 * No HTML changes required for most updates.
 *
 * Placeholder URLs are marked with // PLACEHOLDER
 */

const SITE_CONFIG = {
  schoolName: "Computer Science Program",
  shortName: "CS",
  department: "Computer Science",

  // URL for the onboarding setup check Google Form — replace with actual form URL
  setupCheckUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdxjlf5uciQGZC0fg7-eHgv8q7NXk8B7buDldYWf4beXI_9sg/viewform",

  // URL for the help/problem report Google Form — replace with actual form URL
  helpFormUrl: "https://forms.google.com/PLACEHOLDER_HELP_FORM", // PLACEHOLDER

  // Deployed Google Apps Script web app URL for onboarding progress tracking.
  // Keep blank in public GitHub Pages deployments unless a server-side proxy is added.
  trackingScriptUrl: "", // PLACEHOLDER

  // Public link to the district-authenticated secure contact check-in form.
  // This URL may be public because the Apps Script deployment should require school-domain sign-in.
  secureCheckInUrl: "https://script.google.com/a/macros/geneseeisd.org/s/AKfycbzoh-Cmaa1xKnO5rZssUWwnqV53jIqJolaLWuo4SaRD_VUh9KHUGrnFhLqq089Eypqv/exec",

  softwareStoreLinks: {
    teams: "https://apps.microsoft.com/detail/xp8bt8dw290mpq",
    vscode: "https://apps.microsoft.com/detail/XP9KHM4BK9FZ7Q"
  },

  courses: {
    softwareEngineering: {
      id: "softwareEngineering",
      name: "Introduction to Software Engineering",
      description: "App and game development, debugging, collaboration, and real-world problem solving",
      requiresTechnicalSetup: true,
      lms: [
        {
          label: "Google Classroom",
          url: "https://classroom.google.com",
          icon: "🎓"
        }
      ],
      tools: [
        {
          label: "Microsoft Teams",
          url: "https://teams.microsoft.com",
          icon: "",
          description: "Class communication and student helpdesk"
        },
        {
          label: "CodeHS",
          url: "https://codehs.com",
          icon: "",
          description: "Online coding platform"
        },
        {
          label: "Visual Studio Code",
          url: "https://code.visualstudio.com",
          icon: "",
          description: "Install or update from Microsoft Store"
        },
        {
          label: "Student Help Desk",
          url: "https://forms.google.com/PLACEHOLDER_HELP_DESK", // PLACEHOLDER
          icon: "🛠️",
          description: "Technical support"
        }
      ],
      syllabusUrl: "https://docs.google.com/PLACEHOLDER_SOFTWARE_ENGINEERING_SYLLABUS", // PLACEHOLDER
      orientationUrl: "https://classroom.google.com/PLACEHOLDER_SOFTWARE_ENGINEERING_ORIENTATION", // PLACEHOLDER
      firstMissionUrl: "https://docs.google.com/PLACEHOLDER_SOFTWARE_ENGINEERING_FIRST_MISSION" // PLACEHOLDER
    },

    apcsa: {
      id: "apcsa",
      name: "AP Computer Science A",
      description: "Java programming, object-oriented design, projects, and AP exam preparation",
      requiresTechnicalSetup: true,
      lms: [
        {
          label: "Google Classroom",
          url: "https://classroom.google.com",
          icon: "🎓"
        }
      ],
      tools: [
        {
          label: "Microsoft Teams",
          url: "https://teams.microsoft.com",
          icon: "",
          description: "Class communication and student helpdesk"
        },
        {
          label: "CodeHS",
          url: "https://codehs.com",
          icon: "",
          description: "Java coding platform"
        },
        {
          label: "Visual Studio Code",
          url: "https://code.visualstudio.com",
          icon: "",
          description: "Install or update from Microsoft Store"
        },
        {
          label: "GitHub",
          url: "https://github.com",
          icon: "🐙",
          description: "Code collaboration"
        },
        {
          label: "AP Classroom",
          url: "https://apclassroom.collegeboard.org",
          icon: "🎯",
          description: "College Board AP resources"
        }
      ],
      syllabusUrl: "https://docs.google.com/PLACEHOLDER_APCSA_SYLLABUS", // PLACEHOLDER
      orientationUrl: "https://classroom.google.com/PLACEHOLDER_APCSA_ORIENTATION", // PLACEHOLDER
      firstMissionUrl: "https://docs.google.com/PLACEHOLDER_APCSA_FIRST_MISSION" // PLACEHOLDER
    },

    introCybersecurity: {
      id: "introCybersecurity",
      name: "Introduction to Cybersecurity",
      description: "Digital citizenship, networks, devices, threats, and secure systems",
      requiresTechnicalSetup: true,
      lms: [
        {
          label: "Google Classroom",
          url: "https://classroom.google.com",
          icon: "🎓"
        }
      ],
      tools: [
        {
          label: "Microsoft Teams",
          url: "https://teams.microsoft.com",
          icon: "",
          description: "Class communication and student helpdesk"
        },
        {
          label: "Visual Studio Code",
          url: "https://code.visualstudio.com",
          icon: "",
          description: "Install or update from Microsoft Store"
        },
        {
          label: "CompTIA Resources",
          url: "https://www.comptia.org/training/resources", // PLACEHOLDER — update to district resource
          icon: "🏆",
          description: "Certification resources"
        },
        {
          label: "Student Help Desk",
          url: "https://forms.google.com/PLACEHOLDER_HELP_DESK", // PLACEHOLDER
          icon: "🛠️",
          description: "Technical support"
        }
      ],
      syllabusUrl: "https://docs.google.com/PLACEHOLDER_INTRO_CYBERSECURITY_SYLLABUS", // PLACEHOLDER
      orientationUrl: "https://classroom.google.com/PLACEHOLDER_INTRO_CYBERSECURITY_ORIENTATION", // PLACEHOLDER
      firstMissionUrl: "https://docs.google.com/PLACEHOLDER_INTRO_CYBERSECURITY_FIRST_MISSION" // PLACEHOLDER
    },

    apCybersecurity: {
      id: "apCybersecurity",
      name: "AP Cybersecurity",
      description: "Security tools, network defense, simulations, labs, and certification preparation",
      requiresTechnicalSetup: true,
      lms: [
        {
          label: "Google Classroom",
          url: "https://classroom.google.com",
          icon: "🎓"
        }
      ],
      tools: [
        {
          label: "Microsoft Teams",
          url: "https://teams.microsoft.com",
          icon: "",
          description: "Class communication and student helpdesk"
        },
        {
          label: "Visual Studio Code",
          url: "https://code.visualstudio.com",
          icon: "",
          description: "Install or update from Microsoft Store"
        },
        {
          label: "Cybersecurity Labs",
          url: "https://docs.google.com/PLACEHOLDER_CYBERSECURITY_LABS", // PLACEHOLDER
          icon: "🔐",
          description: "Security practice activities"
        },
        {
          label: "Certification Resources",
          url: "https://docs.google.com/PLACEHOLDER_CYBER_CERT_RESOURCES", // PLACEHOLDER
          icon: "🏆",
          description: "Network+ and Security+ preparation"
        }
      ],
      syllabusUrl: "https://docs.google.com/PLACEHOLDER_AP_CYBERSECURITY_SYLLABUS", // PLACEHOLDER
      orientationUrl: "https://classroom.google.com/PLACEHOLDER_AP_CYBERSECURITY_ORIENTATION", // PLACEHOLDER
      firstMissionUrl: "https://docs.google.com/PLACEHOLDER_AP_CYBERSECURITY_FIRST_MISSION" // PLACEHOLDER
    },

    careerExploration: {
      id: "careerExploration",
      name: "Career Exploration",
      description: "Career pathways, interests, resumes, portfolios, and future planning",
      requiresTechnicalSetup: false,
      lms: [
        {
          label: "Google Classroom",
          url: "https://classroom.google.com",
          icon: "🎓"
        }
      ],
      tools: [
        {
          label: "Microsoft Teams",
          url: "https://teams.microsoft.com",
          icon: "",
          description: "Class communication and student helpdesk"
        },
        {
          label: "Google Workspace",
          url: "https://workspace.google.com",
          icon: "🔵",
          description: "Docs, Sheets, Slides"
        },
        {
          label: "Portfolio Resources",
          url: "https://docs.google.com/PLACEHOLDER_PORTFOLIO_RESOURCES", // PLACEHOLDER
          icon: "🧰",
          description: "Resume and portfolio support"
        },
        {
          label: "Career Resources",
          url: "https://docs.google.com/PLACEHOLDER_CAREER_RESOURCES", // PLACEHOLDER
          icon: "💼",
          description: "Career exploration tools"
        },
        {
          label: "Student Help Desk",
          url: "https://forms.google.com/PLACEHOLDER_HELP_DESK", // PLACEHOLDER
          icon: "🛠️",
          description: "Technical support"
        }
      ],
      syllabusUrl: "https://docs.google.com/PLACEHOLDER_CAREER_EXPLORATION_SYLLABUS", // PLACEHOLDER
      orientationUrl: "https://classroom.google.com/PLACEHOLDER_CAREER_EXPLORATION_ORIENTATION", // PLACEHOLDER
      firstMissionUrl: "https://docs.google.com/PLACEHOLDER_CAREER_EXPLORATION_FIRST_MISSION" // PLACEHOLDER
    },

    careerEssentials: {
      id: "careerEssentials",
      name: "Career Essentials",
      description: "Workplace habits, communication, project management, teamwork, ethics, and credentials",
      requiresTechnicalSetup: false,
      lms: [
        {
          label: "Google Classroom",
          url: "https://classroom.google.com",
          icon: "🎓"
        }
      ],
      tools: [
        {
          label: "Microsoft Teams",
          url: "https://teams.microsoft.com",
          icon: "",
          description: "Class communication and student helpdesk"
        },
        {
          label: "Google Workspace",
          url: "https://workspace.google.com",
          icon: "🔵",
          description: "Docs, Sheets, Slides"
        },
        {
          label: "Project Resources",
          url: "https://docs.google.com/PLACEHOLDER_CAREER_ESSENTIALS_RESOURCES", // PLACEHOLDER
          icon: "🧰",
          description: "Project management and workplace resources"
        },
        {
          label: "Student Help Desk",
          url: "https://forms.google.com/PLACEHOLDER_HELP_DESK", // PLACEHOLDER
          icon: "🛠️",
          description: "Technical support"
        }
      ],
      syllabusUrl: "https://docs.google.com/PLACEHOLDER_CAREER_ESSENTIALS_SYLLABUS", // PLACEHOLDER
      orientationUrl: "https://classroom.google.com/PLACEHOLDER_CAREER_ESSENTIALS_ORIENTATION", // PLACEHOLDER
      firstMissionUrl: "https://docs.google.com/PLACEHOLDER_CAREER_ESSENTIALS_FIRST_MISSION" // PLACEHOLDER
    },

    aiFoundations: {
      id: "aiFoundations",
      name: "Artificial Intelligence Foundations",
      description: "AI systems, data, bias, ethics, career uses, and an AI for Good capstone",
      requiresTechnicalSetup: true,
      lms: [
        {
          label: "Google Classroom",
          url: "https://classroom.google.com",
          icon: "🎓"
        }
      ],
      tools: [
        {
          label: "Microsoft Teams",
          url: "https://teams.microsoft.com",
          icon: "",
          description: "Class communication and student helpdesk"
        },
        {
          label: "Visual Studio Code",
          url: "https://code.visualstudio.com",
          icon: "",
          description: "Install or update from Microsoft Store"
        },
        {
          label: "AI Learning Resources",
          url: "https://docs.google.com/PLACEHOLDER_AI_RESOURCES", // PLACEHOLDER
          icon: "🧠",
          description: "AI foundations course materials"
        },
        {
          label: "Google Workspace",
          url: "https://workspace.google.com",
          icon: "🔵",
          description: "Docs, Sheets, Slides"
        },
        {
          label: "Student Help Desk",
          url: "https://forms.google.com/PLACEHOLDER_HELP_DESK", // PLACEHOLDER
          icon: "🛠️",
          description: "Technical support"
        }
      ],
      syllabusUrl: "https://docs.google.com/PLACEHOLDER_AI_FOUNDATIONS_SYLLABUS", // PLACEHOLDER
      orientationUrl: "https://classroom.google.com/PLACEHOLDER_AI_FOUNDATIONS_ORIENTATION", // PLACEHOLDER
      firstMissionUrl: "https://docs.google.com/PLACEHOLDER_AI_FOUNDATIONS_FIRST_MISSION" // PLACEHOLDER
    }
  }
};
