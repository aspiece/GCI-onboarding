/**
 * GCI Student Launch Portal — Site Configuration
 *
 * Edit this file to update links, add tools, or add courses.
 * No HTML changes required for most updates.
 *
 * Placeholder URLs are marked with // PLACEHOLDER
 */

const SITE_CONFIG = {
  schoolName: "Genesee Career Institute",
  shortName: "GCI",
  department: "Computer Science",

  // URL for the setup check Google Form — replace with actual form URL
  setupCheckUrl: "https://forms.google.com/PLACEHOLDER_SETUP_CHECK", // PLACEHOLDER

  // URL for the help/problem report Google Form — replace with actual form URL
  helpFormUrl: "https://forms.google.com/PLACEHOLDER_HELP_FORM", // PLACEHOLDER

  courses: {
    cs: {
      id: "cs",
      name: "Computer Science",
      description: "Intro programming, problem solving, and digital literacy",
      lms: [
        {
          label: "Google Classroom",
          url: "https://classroom.google.com",
          icon: "🎓"
        }
        // Add Canvas if used:
        // { label: "Canvas", url: "https://YOUR_DISTRICT.instructure.com", icon: "📚" }
      ],
      tools: [
        {
          label: "CodeHS",
          url: "https://codehs.com",
          icon: "💻",
          description: "Online coding platform"
        },
        {
          label: "GitHub",
          url: "https://github.com",
          icon: "🐙",
          description: "Code collaboration"
        },
        {
          label: "Student Help Desk",
          url: "https://forms.google.com/PLACEHOLDER_HELP_DESK", // PLACEHOLDER
          icon: "🛠️",
          description: "Technical support"
        }
      ],
      syllabusUrl: "https://docs.google.com/PLACEHOLDER_CS_SYLLABUS", // PLACEHOLDER
      orientationUrl: "https://classroom.google.com/PLACEHOLDER_CS_ORIENTATION", // PLACEHOLDER
      firstMissionUrl: "https://docs.google.com/PLACEHOLDER_CS_FIRST_MISSION" // PLACEHOLDER
    },

    hardware: {
      id: "hardware",
      name: "Computer Hardware",
      description: "Hardware components, repair, and troubleshooting",
      lms: [
        {
          label: "Google Classroom",
          url: "https://classroom.google.com",
          icon: "🎓"
        }
      ],
      tools: [
        {
          label: "CompTIA Resources",
          url: "https://www.comptia.org/training/resources", // PLACEHOLDER — update to district resource
          icon: "🏆",
          description: "Certification resources"
        },
        {
          label: "Hardware Lab Manual",
          url: "https://docs.google.com/PLACEHOLDER_HARDWARE_MANUAL", // PLACEHOLDER
          icon: "🔧",
          description: "Lab procedures and guides"
        },
        {
          label: "Student Help Desk",
          url: "https://forms.google.com/PLACEHOLDER_HELP_DESK", // PLACEHOLDER
          icon: "🛠️",
          description: "Technical support"
        }
      ],
      syllabusUrl: "https://docs.google.com/PLACEHOLDER_HARDWARE_SYLLABUS", // PLACEHOLDER
      orientationUrl: "https://classroom.google.com/PLACEHOLDER_HARDWARE_ORIENTATION", // PLACEHOLDER
      firstMissionUrl: "https://docs.google.com/PLACEHOLDER_HARDWARE_FIRST_MISSION" // PLACEHOLDER
    },

    apcsa: {
      id: "apcsa",
      name: "AP CSA / Game Design",
      description: "AP Computer Science A and game development",
      lms: [
        {
          label: "Google Classroom",
          url: "https://classroom.google.com",
          icon: "🎓"
        },
        {
          label: "Canvas",
          url: "https://YOUR_DISTRICT.instructure.com", // PLACEHOLDER — replace with district Canvas URL
          icon: "📚"
        }
      ],
      tools: [
        {
          label: "CodeHS",
          url: "https://codehs.com",
          icon: "💻",
          description: "AP CSA coding platform"
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
        },
        {
          label: "Game Design Tools",
          url: "https://docs.google.com/PLACEHOLDER_GAME_TOOLS", // PLACEHOLDER
          icon: "🎮",
          description: "Game development resources"
        }
      ],
      syllabusUrl: "https://docs.google.com/PLACEHOLDER_APCSA_SYLLABUS", // PLACEHOLDER
      orientationUrl: "https://classroom.google.com/PLACEHOLDER_APCSA_ORIENTATION", // PLACEHOLDER
      firstMissionUrl: "https://docs.google.com/PLACEHOLDER_APCSA_FIRST_MISSION" // PLACEHOLDER
    },

    essentials: {
      id: "essentials",
      name: "Career Essentials",
      description: "Digital skills for career and workplace readiness",
      lms: [
        {
          label: "Google Classroom",
          url: "https://classroom.google.com",
          icon: "🎓"
        }
      ],
      tools: [
        {
          label: "Microsoft Office Online",
          url: "https://office.com",
          icon: "📄",
          description: "Word, Excel, PowerPoint"
        },
        {
          label: "Google Workspace",
          url: "https://workspace.google.com",
          icon: "🔵",
          description: "Docs, Sheets, Slides"
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
      syllabusUrl: "https://docs.google.com/PLACEHOLDER_ESSENTIALS_SYLLABUS", // PLACEHOLDER
      orientationUrl: "https://classroom.google.com/PLACEHOLDER_ESSENTIALS_ORIENTATION", // PLACEHOLDER
      firstMissionUrl: "https://docs.google.com/PLACEHOLDER_ESSENTIALS_FIRST_MISSION" // PLACEHOLDER
    }
  }
};
