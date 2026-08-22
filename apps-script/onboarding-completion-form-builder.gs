/**
 * Creates a district-owned Google Form for the onboarding setup check.
 *
 * Run this from Apps Script while signed in with the school account that should
 * own the form and response spreadsheet.
 */
function createOnboardingSetupCheckForm() {
  var form = FormApp.create("GCI Computer Science Setup Check");

  form.setDescription(
    "Submit this setup check after you finish the onboarding checklist. " +
    "This confirms that you completed the required first-week setup steps or identified anything you still need help with."
  );

  form.setConfirmationMessage(
    "Your setup check was submitted. Return to your onboarding checklist and show your instructor if requested."
  );

  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(false);

  form.addTextItem()
    .setTitle("Student full name")
    .setHelpText("Enter your first and last name.")
    .setRequired(true);

  form.addTextItem()
    .setTitle("Student ID number")
    .setHelpText("Use numbers only, 3 to 12 digits.")
    .setRequired(true);

  form.addListItem()
    .setTitle("Course")
    .setChoiceValues([
      "Introduction to Software Engineering",
      "AP Computer Science A",
      "Introduction to Cybersecurity",
      "AP Cybersecurity",
      "Artificial Intelligence Foundations",
      "Career Essentials",
      "Career Exploration"
    ])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle("Setup check confirmation")
    .setHelpText("Check this after you have completed the onboarding checklist.")
    .setChoiceValues([
      "I completed the onboarding checklist and asked for help with anything I could not finish."
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("What is your setup status?")
    .setChoiceValues([
      "READY - Everything works and I am ready to continue.",
      "ALMOST READY - I completed most steps, but I still need help with one thing.",
      "NEED HELP - I could not complete one or more setup steps."
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("What do you still need help with?")
    .setHelpText("If you selected ALMOST READY or NEED HELP, briefly explain what you need help with. If you selected READY, leave this blank.")
    .setRequired(false);

  var spreadsheet = SpreadsheetApp.create("GCI Computer Science Setup Check Responses");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());

  Logger.log("Edit URL: " + form.getEditUrl());
  Logger.log("Student URL: " + form.getPublishedUrl());
  Logger.log("Responses Sheet URL: " + spreadsheet.getUrl());
}

function createOnboardingCompletionForm() {
  createOnboardingSetupCheckForm();
}
