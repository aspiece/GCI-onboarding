# Onboarding Setup Check Google Form

Use the existing Setup Check step for simple, secure onboarding progress tracking. Students submit the setup check once after completing the onboarding checklist.

## Recommended Form Style

Google Forms does not allow custom CSS, so match the onboarding portal by using:

- Title: `GCI Computer Science Setup Check`
- Clean blue theme color
- Roboto font
- Simple header with no decorative image unless you have an approved GCI/Computer Science graphic
- Short, direct question wording

## Create the Form from Your School Account

1. Sign in with `aspiece@geneseeisd.org`.
2. Open Apps Script at <https://script.google.com/>.
3. Create a new Apps Script project.
4. Name the project:

   `GCI CS Setup Check Form Builder`

5. Paste the contents of `apps-script/onboarding-completion-form-builder.gs` into `Code.gs`.
6. Save.
7. Run `createOnboardingSetupCheckForm`.
8. Approve the permissions.
9. Open `Executions` or `Logs` to copy:
   - Edit URL
   - Student URL
   - Responses Sheet URL

## Recommended Form Settings

After the form is created, open the form editor and check:

- Collect email addresses: on
- Restrict to users in your school/district domain: on, if available
- Limit to 1 response: optional; only use if students reliably sign in with their own accounts
- Allow response edits: off

## Add Visual Styling

In the form editor:

1. Click `Customize theme`.
2. Use Roboto or the closest available clean sans-serif font.
3. Choose a blue theme color close to the onboarding portal.
4. Avoid a busy header image unless it is an approved school/program graphic.

## Fields Created

- Student full name
- Student ID number
- Course
- Setup check confirmation
- What is your setup status?
- What do you still need help with?

## After Creation

Copy the Student URL and send it back here. It will replace `PLACEHOLDER_SETUP_CHECK` as the Setup Check button in the portal.
