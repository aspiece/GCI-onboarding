const SHEET_NAME = "Onboarding Progress";
const CONTACT_SHEET_NAME = "Secure Contact Check-In";
const ALLOWED_EVENT_TYPES = [
  "course_selected",
  "step_progress",
  "progress_reset"
];

function doGet() {
  return HtmlService
    .createTemplateFromFile("SecureContactCheckIn")
    .evaluate()
    .setTitle("Secure Contact Check-In")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
}

function doPost(e) {
  let payload;
  try {
    payload = JSON.parse(e.postData.contents || "{}");
  } catch (error) {
    return jsonResponse_({ ok: false, error: "Invalid request body" });
  }

  const progress = payload.progress || {};
  const expectedSecret = PropertiesService.getScriptProperties().getProperty("TRACKING_SHARED_SECRET");

  if (!expectedSecret) {
    return jsonResponse_({ ok: false, error: "Tracking shared secret is not configured" });
  }

  if (payload.sharedSecret !== expectedSecret) {
    return jsonResponse_({ ok: false, error: "Unauthorized" });
  }

  const validationError = validatePayload_(payload);
  if (validationError) {
    return jsonResponse_({ ok: false, error: validationError });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(5000);

  try {
    const sheet = getProgressSheet_();
    sheet.appendRow([
    new Date(),
    clean_(payload.eventType),
    clean_(payload.studentName),
    clean_(payload.studentId),
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    clean_(payload.courseId),
    clean_(payload.courseName),
    clean_(payload.stepKey),
    payload.completed === undefined ? "" : payload.completed,
    progress.step1 ? "Yes" : "No",
    progress.step2 ? "Yes" : "No",
    progress.step3 ? "Yes" : "No",
    progress.step4 ? "Yes" : "No",
    progress.step5 ? "Yes" : "No",
    progress.step6 ? "Yes" : "No",
    progress.step7 ? "Yes" : "No"
    ]);
  } finally {
    lock.releaseLock();
  }

  return jsonResponse_({ ok: true });
}

function validatePayload_(payload) {
  if (ALLOWED_EVENT_TYPES.indexOf(payload.eventType) === -1) {
    return "Invalid event type";
  }

  if (!payload.studentName || !payload.studentId) {
    return "Missing student identity";
  }

  if (!payload.courseId || !payload.courseName) {
    return "Missing course information";
  }

  return "";
}

function submitSecureContactCheckIn(formData) {
  const payload = formData || {};
  const requiredError = validateSecureContactPayload_(payload);
  if (requiredError) {
    return { ok: false, error: requiredError };
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(5000);

  try {
    const sheet = getContactSheet_();
    sheet.appendRow([
      new Date(),
      clean_(Session.getActiveUser().getEmail()),
      clean_(payload.studentName),
      clean_(payload.studentId),
      clean_(normalizePhone_(payload.studentCellPhone)),
      clean_(payload.studentPersonalEmail),
      clean_(payload.guardian1Name),
      clean_(payload.guardian1Email),
      clean_(normalizePhone_(payload.guardian1CellPhone)),
      clean_(payload.guardian2Name),
      clean_(payload.guardian2Email),
      clean_(normalizePhone_(payload.guardian2CellPhone)),
      payload.privacyAcknowledged === true
    ]);
  } finally {
    lock.releaseLock();
  }

  return { ok: true };
}

function validateSecureContactPayload_(payload) {
  if (
    !payload.studentName ||
    !payload.studentId ||
    !payload.studentCellPhone ||
    !payload.studentPersonalEmail ||
    !payload.guardian1Name ||
    !payload.guardian1Email ||
    !payload.guardian1CellPhone ||
    payload.privacyAcknowledged !== true
  ) {
    return "Missing required contact fields";
  }

  if (!isValidStudentId_(payload.studentId)) {
    return "Student ID should contain 3 to 12 digits only";
  }

  if (!isValidEmail_(payload.studentPersonalEmail)) {
    return "Student personal email address is not valid";
  }

  if (!isValidEmail_(payload.guardian1Email)) {
    return "Parent/guardian 1 email address is not valid";
  }

  if (payload.guardian2Email && !isValidEmail_(payload.guardian2Email)) {
    return "Parent/guardian 2 email address is not valid";
  }

  if (!isValidPhone_(payload.studentCellPhone)) {
    return "Student cell phone number should be a 10-digit phone number";
  }

  if (!isValidPhone_(payload.guardian1CellPhone)) {
    return "Parent/guardian 1 cell phone number should be a 10-digit phone number";
  }

  if (payload.guardian2CellPhone && !isValidPhone_(payload.guardian2CellPhone)) {
    return "Parent/guardian 2 cell phone number should be a 10-digit phone number";
  }

  return "";
}

function isValidStudentId_(value) {
  return /^[0-9]{3,12}$/.test(String(value || "").trim());
}

function isValidEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function isValidPhone_(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 11 && digits.charAt(0) === "1");
}

function normalizePhone_(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 11 && digits.charAt(0) === "1") {
    return digits.slice(1).replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }

  if (digits.length === 10) {
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }

  return value;
}

function clean_(value) {
  return String(value || "").trim().slice(0, 250);
}

function getContactSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(CONTACT_SHEET_NAME) || spreadsheet.insertSheet(CONTACT_SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Authenticated Google Account",
      "Student Name",
      "Student ID",
      "Student Cell Phone",
      "Student Personal Email",
      "Parent/Guardian 1 Name",
      "Parent/Guardian 1 Email",
      "Parent/Guardian 1 Cell Phone",
      "Parent/Guardian 2 Name",
      "Parent/Guardian 2 Email",
      "Parent/Guardian 2 Cell Phone",
      "Privacy Acknowledged"
    ]);
  }

  return sheet;
}

function jsonResponse_(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}

function getProgressSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Event Type",
      "Student Name",
      "Student ID",
      "Student Cell Phone",
      "Student Personal Email",
      "Parent/Guardian 1 Name",
      "Parent/Guardian 1 Email",
      "Parent/Guardian 1 Cell Phone",
      "Parent/Guardian 2 Name",
      "Parent/Guardian 2 Email",
      "Parent/Guardian 2 Cell Phone",
      "Privacy Acknowledged",
      "Course ID",
      "Course Name",
      "Step Key",
      "Completed",
      "Step 1",
      "Step 2",
      "Step 3",
      "Step 4",
      "Step 5",
      "Step 6",
      "Step 7"
    ]);
  }

  return sheet;
}
