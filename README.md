# GCI Computer Science — Student Launch Portal

A lightweight, static student onboarding website for Genesee Career Institute Computer Science courses. Hosted on GitHub Pages. No frameworks, no build step, no dependencies.

---

## What This Project Does

When students arrive on the first day of class, they open one URL (or scan a QR code) and independently complete:

1. Sign in to school accounts
2. Open their class (Google Classroom / Canvas)
3. Access course tools (CodeHS, GitHub, etc.)
4. Review course orientation
5. Complete a setup check
6. Start a first mission activity

Progress is tracked in `localStorage` — no personal data is collected or transmitted.

---

## How to Preview Locally

Open `index.html` directly in any browser. No server or build process required.

For a more accurate preview of GitHub Pages paths, you can use any static file server:

```bash
# Python (built-in)
python3 -m http.server 8080
# Then open http://localhost:8080
```

---

## How to Enable GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select your branch (e.g., `main`) and root `/`.
4. Click **Save**.
5. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.

---

## Where Course Configuration Is Stored

All course data, tool links, and external URLs are in **`js/config.js`**.

The `SITE_CONFIG` object contains:

| Key | Description |
|-----|-------------|
| `setupCheckUrl` | URL for the setup check Google Form |
| `helpFormUrl` | URL for the help/problem report Google Form |
| `courses.*` | One entry per course (see below) |

Each course has:
- `name`, `description`
- `lms[]` — LMS buttons to show (Google Classroom, Canvas)
- `tools[]` — Course-specific tools
- `syllabusUrl` — Link to course syllabus
- `orientationUrl` — Link to course orientation
- `firstMissionUrl` — Link to first mission activity

---

## How to Change a Link

Open `js/config.js` and update the URL for the relevant tool, course, or form. Example:

```js
// Before
syllabusUrl: "https://docs.google.com/PLACEHOLDER_CS_SYLLABUS",

// After
syllabusUrl: "https://docs.google.com/d/YOUR_REAL_DOC_ID/view",
```

---

## How to Add Another Course

In `js/config.js`, add a new entry to the `courses` object:

```js
courses: {
  // ... existing courses ...
  networking: {
    id: "networking",
    name: "Networking",
    description: "Network fundamentals and infrastructure",
    lms: [
      { label: "Google Classroom", url: "https://classroom.google.com", icon: "🎓" }
    ],
    tools: [
      { label: "Packet Tracer", url: "https://PLACEHOLDER", icon: "🌐", description: "Network simulation" }
    ],
    syllabusUrl: "https://docs.google.com/PLACEHOLDER_NETWORKING_SYLLABUS",
    orientationUrl: "https://classroom.google.com/PLACEHOLDER_NETWORKING_ORIENTATION",
    firstMissionUrl: "https://docs.google.com/PLACEHOLDER_NETWORKING_FIRST_MISSION"
  }
}
```

No HTML changes are needed. The new course card will appear automatically.

---

## Where to Place the GCI Logo

1. Add your logo file to `assets/gci-logo.png` (or `.svg`).
2. In each HTML file (`index.html`, `orientation.html`, `help.html`), replace this block:

```html
<div class="logo-placeholder" aria-hidden="true">GCI</div>
```

with:

```html
<img src="assets/gci-logo.png" alt="Genesee Career Institute" width="48" height="48">
```

See `assets/README.md` for details.

---

## Placeholder URLs

All placeholder URLs are marked with `// PLACEHOLDER` in `js/config.js`. Before launching with students, replace:

| Placeholder | Replace with |
|-------------|-------------|
| `PLACEHOLDER_SETUP_CHECK` | Your setup check Google Form URL |
| `PLACEHOLDER_HELP_FORM` | Your problem report Google Form URL |
| `PLACEHOLDER_HELP_DESK` | Your student help desk form URL |
| `PLACEHOLDER_CS_SYLLABUS` | CS course syllabus URL |
| `PLACEHOLDER_CS_ORIENTATION` | CS orientation assignment URL |
| `PLACEHOLDER_CS_FIRST_MISSION` | CS first mission activity URL |
| `PLACEHOLDER_HARDWARE_*` | Computer Hardware course URLs |
| `PLACEHOLDER_APCSA_*` | AP CSA / Game Design course URLs |
| `PLACEHOLDER_ESSENTIALS_*` | Career Essentials course URLs |
| `YOUR_DISTRICT.instructure.com` | Your district's Canvas domain |
| `PLACEHOLDER_GAME_TOOLS` | Game design tools URL |
| `PLACEHOLDER_CAREER_RESOURCES` | Career resources URL |

Public services (Gmail, Google Drive, Google Classroom, GitHub, CodeHS, AP Classroom) use real public URLs and do not need updating.

---

## Before Launch Checklist

- [ ] Replace all `PLACEHOLDER` URLs in `js/config.js`
- [ ] Replace Canvas domain (`YOUR_DISTRICT.instructure.com`) with actual district URL
- [ ] Add GCI logo to `assets/` and update header in all HTML files
- [ ] Update CSS brand colors in `css/styles.css` (`:root` variables)
- [ ] Test on a student Chromebook
- [ ] Test on a phone
- [ ] Verify all external links open correctly
- [ ] Create setup check Google Form and paste URL into config
- [ ] Create help/report Google Form and paste URL into config
- [ ] Enable GitHub Pages

---

## Repository Structure

```
/
├── index.html          # Homepage + onboarding dashboard
├── orientation.html    # Course orientation reference page
├── help.html           # Help workflow and problem reporting
├── css/
│   └── styles.css      # All styles, CSS variables for branding
├── js/
│   ├── config.js       # Course data, URLs, configuration
│   └── app.js          # Application logic, progress tracking
├── assets/
│   └── README.md       # Instructions for adding the GCI logo
└── README.md           # This file
```

---

## Privacy

- No student names, emails, or personal data are collected.
- Progress tracking uses browser `localStorage` only — data stays on the student's device.
- No analytics, tracking scripts, or third-party services are included.
- All student-specific information remains within district Google Workspace systems.
