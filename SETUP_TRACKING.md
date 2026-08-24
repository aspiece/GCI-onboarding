# Tracking Setup

> Current launch note: the contact information step now uses a Google Form linked from `secureCheckInUrl` in `js/config.js`. The Apps Script secure contact form flow below is legacy reference only.

This setup keeps the public onboarding site separate from private student data. The public GitHub site shows the onboarding steps. The Google Sheet and Apps Script should be created from the school Google account that is allowed to store student information.

## Google Sheet

1. Sign in with the school account that should own the student data.
2. Create a new Google Sheet.
3. Name it:

   `GCI Computer Science Onboarding Progress`

4. Create these tabs exactly:
   - `Onboarding Progress`
   - `Secure Contact Check-In`
   - `Setup Notes`

## Apps Script Setup

1. Open the Google Sheet.
2. Go to Extensions > Apps Script.
3. Rename the Apps Script project from `Untitled project` to:

   `GCI Computer Science Onboarding`

4. Replace the default Code.gs with the contents of `apps-script/onboarding-tracker.gs`.
5. Create a new HTML file named `SecureContactCheckIn`.
6. Paste the contents of `apps-script/SecureContactCheckIn.html` into that HTML file.
7. In Project Settings, check `Show "appsscript.json" manifest file in editor`.
8. Open `appsscript.json` and replace it with the contents of `apps-script/appsscript.json`.
9. In Project Settings, add a script property:
   - Property: `TRACKING_SHARED_SECRET`
   - Value: a private random phrase you choose
10. Deploy as a web app:
   - Execute as: User accessing the web app
   - Who has access: users in the school Google domain
11. Copy the deployed web app URL.
12. Do not use this deployed web app URL for the live contact information form unless you intentionally return to the legacy Apps Script flow.
13. Copy `js/private-config.example.js` to `js/private-config.js` only for local/private progress tracking tests.
14. Paste the deployed web app URL and shared secret into `js/private-config.js`.

Example:

```js
window.SITE_PRIVATE_CONFIG = {
  trackingScriptUrl: "YOUR_DEPLOYED_WEB_APP_URL",
  trackingSharedSecret: "YOUR_SHARED_SECRET",
  secureCheckInUrl: "YOUR_CONTACT_INFORMATION_GOOGLE_FORM_URL"
};
```

Do not commit `js/private-config.js` to the public repository.

For a public GitHub Pages deployment, do not commit `trackingSharedSecret`. A static site cannot keep that value secret. The contact information Google Form URL may be committed when the form itself is configured appropriately for school use.

## Permission Warning

The first time the web app runs, Google may show a permission screen. To make that screen less alarming:

1. Make sure the Apps Script project is named `GCI Computer Science Onboarding`, not `Untitled project`.
2. Confirm the Google account shown is the school account.
3. Click `Review permissions`.
4. Review the requested access. This script should only need access to the current spreadsheet and the signed-in user's email address.
5. If your district requires app approval, ask the school Google administrator to review or allow the internal Apps Script app.

Students should not proceed if the project name is still `Untitled project` or if the account shown is not their school account.

## Test

1. Refresh the local preview.
2. Enter a test name and student ID.
3. Open the contact information form.
4. Submit test contact information while signed in with a district account.
5. Return to the portal, check the acknowledgment, and select a course.
6. Mark one onboarding step complete.
7. Confirm the Google Sheet receives rows in:
   - `Secure Contact Check-In`
   - `Onboarding Progress`
