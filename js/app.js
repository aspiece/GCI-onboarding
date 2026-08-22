/**
 * Computer Science Student Launch Portal — Application Logic
 *
 * Handles course selection, dashboard rendering, progress tracking.
 * All state stored in localStorage — no personal data collected.
 */

(function () {
  "use strict";

  // ─── Constants ───────────────────────────────────────────────────────────────
  const LS_COURSE = "gci_selected_course";
  const LS_PROGRESS = "gci_progress";
  const TOTAL_STEPS = 7;

  // ─── Utility ─────────────────────────────────────────────────────────────────
  function getProgress() {
    try {
      const raw = localStorage.getItem(LS_PROGRESS);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function saveProgress(progress) {
    localStorage.setItem(LS_PROGRESS, JSON.stringify(progress));
  }

  function getSelectedCourse() {
    return localStorage.getItem(LS_COURSE) || null;
  }

  function saveSelectedCourse(courseId) {
    localStorage.setItem(LS_COURSE, courseId);
  }

  function clearSelectedCourse() {
    localStorage.removeItem(LS_COURSE);
  }

  function openLink(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function getTrackingUrl() {
    return window.SITE_PRIVATE_CONFIG?.trackingScriptUrl || SITE_CONFIG.trackingScriptUrl || "";
  }

  function getTrackingSharedSecret() {
    return window.SITE_PRIVATE_CONFIG?.trackingSharedSecret || "";
  }

  function getSecureCheckInUrl() {
    return window.SITE_PRIVATE_CONFIG?.secureCheckInUrl || SITE_CONFIG.secureCheckInUrl || "";
  }

  function getSecureCheckInReturnUrl() {
    const secureUrl = getSecureCheckInUrl();
    if (!secureUrl) return "";

    try {
      const url = new URL(secureUrl);
      url.searchParams.set("returnUrl", window.location.href);
      return url.toString();
    } catch {
      return secureUrl;
    }
  }

  function isTrackingConfigured() {
    const url = getTrackingUrl();
    return url && !url.includes("PLACEHOLDER");
  }

  function sendTrackingEvent(eventType, course, extra) {
    if (!isTrackingConfigured()) return;

    const payload = {
      eventType,
      timestamp: new Date().toISOString(),
      courseId: course.id,
      courseName: course.name,
      progress: getProgress(),
      sharedSecret: getTrackingSharedSecret(),
      ...extra
    };

    fetch(getTrackingUrl(), {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    }).catch(() => {
      // Students should be able to continue even if tracking is temporarily unavailable.
    });
  }

  // ─── Escape HTML ─────────────────────────────────────────────────────────────
  function esc(str) {
    const d = document.createElement("div");
    d.appendChild(document.createTextNode(String(str)));
    return d.innerHTML;
  }

  // Known step keys — used for counting and scroll restoration
  const STEP_KEYS = ["step1", "step2", "step3", "step4", "step5", "step6", "step7"];

  // Step ID map for scroll restoration
  const STEP_ID_MAP = {
    step1: "step-credentials",
    step2: "step-signin",
    step3: "step-class",
    step4: "step-tools",
    step5: "step-orientation",
    step6: "step-setup",
    step7: "step-mission"
  };

  // ─── Progress Bar ────────────────────────────────────────────────────────────
  function renderProgressBar(progress) {
    const completed = STEP_KEYS.filter(k => !!progress[k]).length;
    const pct = Math.round((completed / TOTAL_STEPS) * 100);
    return `
      <div class="progress-container" aria-label="Onboarding progress">
        <div class="progress-summary">
          <span class="progress-text">${completed} of ${TOTAL_STEPS} steps complete</span>
          <button class="btn-link reset-btn" id="resetProgressBtn" aria-label="Reset all progress">Reset Progress</button>
        </div>
        <div class="progress-bar-track" role="progressbar" aria-valuenow="${completed}" aria-valuemin="0" aria-valuemax="${TOTAL_STEPS}" aria-label="${completed} of ${TOTAL_STEPS} steps complete">
          <div class="progress-bar-fill" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  }

  // ─── Step Mark Complete Button ────────────────────────────────────────────────
  function markCompleteBtn(stepKey, progress) {
    const done = !!progress[stepKey];
    return `
      <button
        class="btn-mark-complete ${done ? "done" : ""}"
        data-step="${esc(stepKey)}"
        aria-pressed="${done}"
        aria-label="${done ? "Step marked complete. Click to undo." : "Mark this step complete"}"
      >${done ? "Marked Complete" : "Mark Complete"}</button>
    `;
  }

  // ─── Step 1: Sign In ─────────────────────────────────────────────────────────
  function renderStep1(course, progress) {
    const secureContactContent = `
      <div class="orientation-checklist">
        <h3>Secure contact check-in</h3>
        <p><strong>Complete this after your instructor gives you your GCI student ID and temporary password.</strong></p>
        <p>The secure contact form asks for your student ID and contact information. If you do not know your student ID yet, stop here and ask your instructor before opening the form.</p>
        <p>GCI Computer Science staff use this information only for emergencies, workplace learning activities, and connections to potential employers.</p>
        ${getSecureCheckInUrl()
          ? `<a class="btn-primary" href="${esc(getSecureCheckInReturnUrl())}" target="_blank" rel="noopener noreferrer" aria-label="Open secure contact form in new tab">Open Secure Contact Form</a>`
          : `<button class="btn-primary" type="button" disabled aria-label="Open secure contact form in new tab">Open Secure Contact Form</button>`}
        ${getSecureCheckInUrl() ? "" : `<p class="step-note">The secure contact form link has not been configured yet. Ask your instructor for help.</p>`}
      </div>
      <p class="step-note">Do not enter your password in any onboarding form. Passwords should only be given by your instructor in person.</p>
    `;

    const setupContent = course.requiresTechnicalSetup === false
      ? `
        <p class="step-desc">Make sure you know which course platform your instructor wants you to use today.</p>
        <ol class="mission-list">
          <li>Open the browser your instructor tells you to use.</li>
          <li>Sign in with the account your instructor assigns for this course.</li>
          <li>Create bookmarks for sites you will use often, including your class page and course resources.</li>
        </ol>
        <p class="step-note">Career Exploration and Career Essentials may not require a workstation assignment or program credential setup.</p>
      `
      : `
        <p class="step-desc">Before you sign in, make sure you have the workstation and account details assigned by your instructor.</p>
        <ol class="mission-list">
          <li>Find your assigned workstation.</li>
          <li>Get your GCI student ID from your instructor.</li>
          <li>Write down your GCI email format: <strong>gci.[student ID]@students.geneseeisd.org</strong>.</li>
          <li>Get your temporary password from your instructor in person.</li>
          <li>After you have your GCI student ID and temporary password, complete the secure contact check-in below.</li>
          <li>Open Chrome or Edge and create a browser profile with your program account.</li>
          <li>Turn on sync so your bookmarks and settings stay with your account.</li>
          <li>Open the Microsoft Store on your workstation and install or update Microsoft Teams.</li>
          <li>While you are in the Microsoft Store, install or update Visual Studio Code so you are ready for coding activities.</li>
          <li>Create bookmarks for sites you will use often, including Gmail, Drive, your class page, and course tools.</li>
        </ol>
        <p class="step-note">Example: if your student ID is 12345, your email is <strong>gci.12345@students.geneseeisd.org</strong>. Ask your instructor before saving a password on a shared or lab computer.</p>
      `;

    return `
      <section class="step-card" id="step-credentials" aria-labelledby="step1-heading">
        <div class="step-header">
          <span class="step-number" aria-hidden="true">1</span>
          <h2 id="step1-heading">${course.requiresTechnicalSetup === false ? "Get Ready for Class" : "Get Your Workstation and Credentials"}</h2>
          ${markCompleteBtn("step1", progress)}
        </div>
        ${setupContent}
        ${secureContactContent}
      </section>
    `;
  }

  // ─── Step 2: Open Your Class ──────────────────────────────────────────────────
  function renderStep2(progress) {
    return `
      <section class="step-card" id="step-signin" aria-labelledby="step2-heading">
        <div class="step-header">
          <span class="step-number" aria-hidden="true">2</span>
          <h2 id="step2-heading">Sign In to Core Tools</h2>
          ${markCompleteBtn("step2", progress)}
        </div>
        <p class="step-desc">Use your program email and instructor-provided password to sign in to your core school tools.</p>
        <div class="btn-group">
          <button class="btn-primary ext-link" data-url="https://mail.google.com" aria-label="Open Gmail in new tab">
            Gmail
          </button>
          <button class="btn-primary ext-link" data-url="https://drive.google.com" aria-label="Open Google Drive in new tab">
            Google Drive
          </button>
          <button class="btn-primary ext-link" data-url="https://teams.microsoft.com" aria-label="Open Microsoft Teams in new tab">
            Microsoft Teams
          </button>
        </div>
        <div class="orientation-checklist">
          <h3>Teams chat task</h3>
          <ol>
            <li>Open Microsoft Teams.</li>
            <li>Find your instructor in Chat.</li>
            <li>Send this message: <strong>Hello, I am signed in to Teams and ready for class.</strong></li>
          </ol>
        </div>
        <p class="step-note">Use your program account, not a personal account. Teams is used for class communication and the centralized student helpdesk.</p>
      </section>
    `;
  }

  function renderStep3(course, progress) {
    const lmsButtons = course.lms.map(lms => `
      <button class="btn-primary ext-link" data-url="${esc(lms.url)}" aria-label="Open ${esc(lms.label)} in new tab">
        ${lms.icon ? `<span aria-hidden="true">${esc(lms.icon)}</span>` : ""}${esc(lms.label)}
      </button>
    `).join("");

    return `
      <section class="step-card" id="step-class" aria-labelledby="step3-heading">
        <div class="step-header">
          <span class="step-number" aria-hidden="true">3</span>
          <h2 id="step3-heading">Open Your Class</h2>
          ${markCompleteBtn("step3", progress)}
        </div>
        <p class="step-desc">Open Google Classroom, bookmark it, and confirm that you are enrolled in the correct courses.</p>
        <div class="btn-group">
          ${lmsButtons}
        </div>
        <div class="orientation-checklist">
          <h3>Google Classroom check</h3>
          <ol>
            <li>Open Google Classroom.</li>
            <li>Bookmark the Google Classroom page so you can return to it quickly.</li>
            <li>Confirm that you see your Computer Science course.</li>
            <li>Confirm that you see one careers course.</li>
            <li>First-year students should see Career Essentials.</li>
            <li>Second-year students should see Career Exploration.</li>
            <li>Open the introductory post from your instructor in your Computer Science course.</li>
            <li>Add a class comment that introduces yourself.</li>
          </ol>
        </div>
        <p class="step-note">If a course is missing, you see the wrong careers course, or you cannot comment on the post, tell your instructor before continuing.</p>
      </section>
    `;
  }

  // ─── Step 3: Check Your Tools ────────────────────────────────────────────────
  function renderStep4(course, progress) {
    const toolCards = course.tools.map(tool => `
      <div class="tool-card">
        <div class="tool-icon" aria-hidden="true">${tool.icon ? esc(tool.icon) : ""}</div>
        <div class="tool-info">
          <div class="tool-name">${esc(tool.label)}</div>
          <div class="tool-desc">${esc(tool.description)}</div>
        </div>
        <button class="btn-secondary ext-link" data-url="${esc(tool.url)}" aria-label="Open ${esc(tool.label)} in new tab">
          Open
        </button>
      </div>
    `).join("");

    return `
      <section class="step-card" id="step-tools" aria-labelledby="step4-heading">
        <div class="step-header">
          <span class="step-number" aria-hidden="true">4</span>
          <h2 id="step4-heading">Check Your Tools</h2>
          ${markCompleteBtn("step4", progress)}
        </div>
        <p class="step-desc">Open each tool and make sure you can sign in.</p>
        <div class="tool-list">
          ${toolCards}
        </div>
      </section>
    `;
  }

  // ─── Step 4: Course Orientation ───────────────────────────────────────────────
  function renderStep5(course, progress) {
    return `
      <section class="step-card" id="step-orientation" aria-labelledby="step5-heading">
        <div class="step-header">
          <span class="step-number" aria-hidden="true">5</span>
          <h2 id="step5-heading">Course Orientation</h2>
          ${markCompleteBtn("step5", progress)}
        </div>
        <p class="step-desc">Review your course syllabus and complete the orientation.</p>
        <div class="btn-group">
          <button class="btn-primary ext-link" data-url="${esc(course.syllabusUrl)}" aria-label="View Course Syllabus in new tab">
            View Course Syllabus
          </button>
          <button class="btn-primary ext-link" data-url="${esc(course.orientationUrl)}" aria-label="Start Course Orientation in new tab">
            Start Course Orientation
          </button>
        </div>
        <div class="orientation-checklist">
          <h3>During orientation you will learn:</h3>
          <ul>
            <li>Where assignments are posted</li>
            <li>How assignments are submitted</li>
            <li>What to do when absent</li>
            <li>How to ask for help</li>
            <li>Equipment expectations</li>
            <li>What to do when technology fails</li>
            <li>Appropriate AI use</li>
            <li>How grades work</li>
          </ul>
        </div>
      </section>
    `;
  }

  // ─── Step 5: Setup Check ─────────────────────────────────────────────────────
  function renderStep6(progress) {
    return `
      <section class="step-card" id="step-setup" aria-labelledby="step6-heading">
        <div class="step-header">
          <span class="step-number" aria-hidden="true">6</span>
          <h2 id="step6-heading">Setup Check</h2>
          ${markCompleteBtn("step6", progress)}
        </div>
        <p class="step-desc">Submit the setup check after you finish the onboarding checklist. This lets your instructor know you are ready or that you still need help.</p>
        <button class="btn-cta ext-link" data-url="${esc(SITE_CONFIG.setupCheckUrl)}" aria-label="Submit setup check — opens Google Form in new tab">
          SUBMIT SETUP CHECK
        </button>
        <div class="status-grid">
          <div class="status-item status-green">
            <span class="status-dot status-dot--green" aria-hidden="true"></span>
            <div>
              <strong>READY</strong>
              <p>Everything works. You're all set!</p>
            </div>
          </div>
          <div class="status-item status-yellow">
            <span class="status-dot status-dot--yellow" aria-hidden="true"></span>
            <div>
              <strong>ALMOST READY</strong>
              <p>Something needs attention, but you can continue.</p>
            </div>
          </div>
          <div class="status-item status-red">
            <span class="status-dot status-dot--red" aria-hidden="true"></span>
            <div>
              <strong>HELP NEEDED</strong>
              <p>A problem is preventing you from continuing.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // ─── Step 6: First Mission ────────────────────────────────────────────────────
  function renderStep7(course, progress) {
    return `
      <section class="step-card step-card--accent" id="step-mission" aria-labelledby="step7-heading">
        <div class="step-header">
          <span class="step-number" aria-hidden="true">7</span>
          <h2 id="step7-heading">First Mission</h2>
          ${markCompleteBtn("step7", progress)}
        </div>
        <p class="step-lead"><strong>Everything working? Don't wait.</strong></p>
        <h3>Meet Your Computer</h3>
        <p class="step-desc">Discover the following about your computer and record your findings:</p>
        <ol class="mission-list">
          <li>Operating system (name and version)</li>
          <li>Processor (CPU name and speed)</li>
          <li>Installed RAM (amount of memory)</li>
          <li>Total storage capacity</li>
          <li>Available storage space</li>
          <li>One specification you do <em>not</em> understand</li>
          <li>Your best explanation of what that specification means</li>
        </ol>
        <button class="btn-cta btn-cta--secondary ext-link" data-url="${esc(course.firstMissionUrl)}" aria-label="Start First Mission — opens in new tab">
          Start First Mission
        </button>
      </section>
    `;
  }

  // ─── Daily Routine ────────────────────────────────────────────────────────────
  function renderDailyRoutine() {
    return `
      <aside class="daily-routine" aria-labelledby="daily-heading">
        <h2 id="daily-heading">When You Arrive Each Day</h2>
        <ol>
          <li>Log in to your school account.</li>
          <li>Open your course.</li>
          <li>Check today's instructions.</li>
          <li>Begin working.</li>
        </ol>
        <p class="routine-note">Starting independently shows your instructor you're ready to learn.</p>
      </aside>
    `;
  }

  // ─── Dashboard ───────────────────────────────────────────────────────────────
  function renderDashboard(courseId) {
    const course = SITE_CONFIG.courses[courseId];
    if (!course) {
      showCourseSelection();
      return;
    }

    const progress = getProgress();

    const dashboardEl = document.getElementById("dashboard");
    const courseSelectEl = document.getElementById("course-selection");

    courseSelectEl.hidden = true;
    dashboardEl.hidden = false;

    dashboardEl.innerHTML = `
      <div class="dashboard-header">
        <div class="dashboard-title-row">
          <div>
            <h1 class="dashboard-course-name">${esc(course.name)}</h1>
            <p class="dashboard-subtitle">Onboarding Checklist</p>
          </div>
          <button class="btn-link change-course-btn" id="changeCourseBtn" aria-label="Change selected course">
            Change Course
          </button>
        </div>
        ${renderProgressBar(progress)}
      </div>
      <div class="steps-container">
        ${renderStep1(course, progress)}
        ${renderStep2(progress)}
        ${renderStep3(course, progress)}
        ${renderStep4(course, progress)}
        ${renderStep5(course, progress)}
        ${renderStep6(progress)}
        ${renderStep7(course, progress)}
      </div>
      ${renderDailyRoutine()}
    `;

    // Bind events
    dashboardEl.querySelectorAll(".ext-link").forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.tagName === "A") return;
        const url = btn.dataset.url;
        if (url) openLink(url);
      });
    });

    dashboardEl.querySelectorAll(".btn-mark-complete").forEach(btn => {
      btn.addEventListener("click", () => {
        const stepKey = btn.dataset.step;
        const prog = getProgress();
        prog[stepKey] = !prog[stepKey];
        saveProgress(prog);
        sendTrackingEvent("step_progress", course, {
          stepKey,
          completed: !!prog[stepKey]
        });
        renderDashboard(courseId);
        // Restore scroll position to the clicked step
        const stepEl = document.getElementById(STEP_ID_MAP[stepKey]);
        if (stepEl) stepEl.scrollIntoView({ block: "nearest" });
      });
    });

    const changeBtn = document.getElementById("changeCourseBtn");
    if (changeBtn) {
      changeBtn.addEventListener("click", () => {
        clearSelectedCourse();
        showCourseSelection();
      });
    }

    const resetBtn = document.getElementById("resetProgressBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Reset all progress? This cannot be undone.")) {
          saveProgress({});
          sendTrackingEvent("progress_reset", course, {});
          renderDashboard(courseId);
        }
      });
    }
  }

  // ─── Course Selection ─────────────────────────────────────────────────────────
  function showCourseSelection() {
    const courseSelectEl = document.getElementById("course-selection");
    const dashboardEl = document.getElementById("dashboard");

    dashboardEl.hidden = true;
    courseSelectEl.hidden = false;

    const grid = document.getElementById("course-grid");
    if (!grid) return;

    grid.innerHTML = Object.values(SITE_CONFIG.courses).map(course => `
      <button
        class="course-card"
        data-course="${esc(course.id)}"
        aria-label="Select ${esc(course.name)}"
      >
        <span class="course-card-name">${esc(course.name)}</span>
        <span class="course-card-desc">${esc(course.description)}</span>
      </button>
    `).join("");

    grid.querySelectorAll(".course-card").forEach(card => {
      card.addEventListener("click", () => {
        const courseId = card.dataset.course;
        saveSelectedCourse(courseId);
        sendTrackingEvent("course_selected", SITE_CONFIG.courses[courseId], {});
        renderDashboard(courseId);
        window.scrollTo(0, 0);
      });
    });
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────
  function init() {
    const savedCourse = getSelectedCourse();
    if (savedCourse && SITE_CONFIG.courses[savedCourse]) {
      renderDashboard(savedCourse);
    } else {
      showCourseSelection();
    }
  }

  // Run after DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
