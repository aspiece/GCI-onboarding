/**
 * GCI Student Launch Portal — Application Logic
 *
 * Handles course selection, dashboard rendering, progress tracking.
 * All state stored in localStorage — no personal data collected.
 */

(function () {
  "use strict";

  // ─── Constants ───────────────────────────────────────────────────────────────
  const LS_COURSE = "gci_selected_course";
  const LS_PROGRESS = "gci_progress";
  const TOTAL_STEPS = 6;

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

  // ─── Escape HTML ─────────────────────────────────────────────────────────────
  function esc(str) {
    const d = document.createElement("div");
    d.appendChild(document.createTextNode(String(str)));
    return d.innerHTML;
  }

  // ─── Progress Bar ────────────────────────────────────────────────────────────
  function renderProgressBar(progress) {
    const completed = Object.values(progress).filter(Boolean).length;
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
      >${done ? "✅ Marked Complete" : "Mark Complete"}</button>
    `;
  }

  // ─── Step 1: Sign In ─────────────────────────────────────────────────────────
  function renderStep1(progress) {
    return `
      <section class="step-card" id="step-signin" aria-labelledby="step1-heading">
        <div class="step-header">
          <span class="step-number" aria-hidden="true">1</span>
          <h2 id="step1-heading">Sign In</h2>
          ${markCompleteBtn("step1", progress)}
        </div>
        <p class="step-desc">Make sure you can access all three of your school accounts before continuing.</p>
        <div class="btn-group">
          <button class="btn-primary ext-link" data-url="https://mail.google.com" aria-label="Open Gmail in new tab">
            ✉️ Gmail
          </button>
          <button class="btn-primary ext-link" data-url="https://drive.google.com" aria-label="Open Google Drive in new tab">
            📁 Google Drive
          </button>
        </div>
        <p class="step-note">Use your <strong>school Google account</strong>, not a personal account.</p>
      </section>
    `;
  }

  // ─── Step 2: Open Your Class ──────────────────────────────────────────────────
  function renderStep2(course, progress) {
    const lmsButtons = course.lms.map(lms => `
      <button class="btn-primary ext-link" data-url="${esc(lms.url)}" aria-label="Open ${esc(lms.label)} in new tab">
        ${esc(lms.icon)} ${esc(lms.label)}
      </button>
    `).join("");

    return `
      <section class="step-card" id="step-class" aria-labelledby="step2-heading">
        <div class="step-header">
          <span class="step-number" aria-hidden="true">2</span>
          <h2 id="step2-heading">Open Your Class</h2>
          ${markCompleteBtn("step2", progress)}
        </div>
        <p class="step-desc">Open your course in your learning management system.</p>
        <div class="btn-group">
          ${lmsButtons}
        </div>
        <p class="step-note">⚠️ Only open or join the course your instructor tells you to use.</p>
      </section>
    `;
  }

  // ─── Step 3: Check Your Tools ────────────────────────────────────────────────
  function renderStep3(course, progress) {
    const toolCards = course.tools.map(tool => `
      <div class="tool-card">
        <div class="tool-icon" aria-hidden="true">${esc(tool.icon)}</div>
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
      <section class="step-card" id="step-tools" aria-labelledby="step3-heading">
        <div class="step-header">
          <span class="step-number" aria-hidden="true">3</span>
          <h2 id="step3-heading">Check Your Tools</h2>
          ${markCompleteBtn("step3", progress)}
        </div>
        <p class="step-desc">Open each tool and make sure you can sign in.</p>
        <div class="tool-list">
          ${toolCards}
        </div>
      </section>
    `;
  }

  // ─── Step 4: Course Orientation ───────────────────────────────────────────────
  function renderStep4(course, progress) {
    return `
      <section class="step-card" id="step-orientation" aria-labelledby="step4-heading">
        <div class="step-header">
          <span class="step-number" aria-hidden="true">4</span>
          <h2 id="step4-heading">Course Orientation</h2>
          ${markCompleteBtn("step4", progress)}
        </div>
        <p class="step-desc">Review your course syllabus and complete the orientation.</p>
        <div class="btn-group">
          <button class="btn-primary ext-link" data-url="${esc(course.syllabusUrl)}" aria-label="View Course Syllabus in new tab">
            📄 View Course Syllabus
          </button>
          <button class="btn-primary ext-link" data-url="${esc(course.orientationUrl)}" aria-label="Start Course Orientation in new tab">
            🚀 Start Course Orientation
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
  function renderStep5(progress) {
    return `
      <section class="step-card" id="step-setup" aria-labelledby="step5-heading">
        <div class="step-header">
          <span class="step-number" aria-hidden="true">5</span>
          <h2 id="step5-heading">Setup Check</h2>
          ${markCompleteBtn("step5", progress)}
        </div>
        <p class="step-desc">Complete the setup check to confirm everything is working.</p>
        <button class="btn-cta ext-link" data-url="${esc(SITE_CONFIG.setupCheckUrl)}" aria-label="Complete my setup check — opens Google Form in new tab">
          ✅ COMPLETE MY SETUP CHECK
        </button>
        <div class="status-grid">
          <div class="status-item status-green">
            <span class="status-dot">🟢</span>
            <div>
              <strong>READY</strong>
              <p>Everything works. You're all set!</p>
            </div>
          </div>
          <div class="status-item status-yellow">
            <span class="status-dot">🟡</span>
            <div>
              <strong>ALMOST READY</strong>
              <p>Something needs attention, but you can continue.</p>
            </div>
          </div>
          <div class="status-item status-red">
            <span class="status-dot">🔴</span>
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
  function renderStep6(course, progress) {
    return `
      <section class="step-card step-card--accent" id="step-mission" aria-labelledby="step6-heading">
        <div class="step-header">
          <span class="step-number" aria-hidden="true">6</span>
          <h2 id="step6-heading">First Mission</h2>
          ${markCompleteBtn("step6", progress)}
        </div>
        <p class="step-lead"><strong>Everything working? Don't wait.</strong></p>
        <h3>🖥️ Meet Your Computer</h3>
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
          🚀 Start First Mission
        </button>
      </section>
    `;
  }

  // ─── Daily Routine ────────────────────────────────────────────────────────────
  function renderDailyRoutine() {
    return `
      <aside class="daily-routine" aria-labelledby="daily-heading">
        <h2 id="daily-heading">📅 When You Arrive Each Day</h2>
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
            ↩ Change Course
          </button>
        </div>
        ${renderProgressBar(progress)}
      </div>
      <div class="steps-container">
        ${renderStep1(progress)}
        ${renderStep2(course, progress)}
        ${renderStep3(course, progress)}
        ${renderStep4(course, progress)}
        ${renderStep5(progress)}
        ${renderStep6(course, progress)}
      </div>
      ${renderDailyRoutine()}
    `;

    // Bind events
    dashboardEl.querySelectorAll(".ext-link").forEach(btn => {
      btn.addEventListener("click", () => {
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
          renderDashboard(courseId);
        }
      });
    }
  }

  // Step ID map for scroll restoration
  const STEP_ID_MAP = {
    step1: "step-signin",
    step2: "step-class",
    step3: "step-tools",
    step4: "step-orientation",
    step5: "step-setup",
    step6: "step-mission"
  };

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
