import type { Step } from "react-joyride";

/* =================================================================== */
/*  1. Templates Page                                                   */
/* =================================================================== */

export const templatesTourSteps: Step[] = [
  {
    target: "body",
    placement: "center",
    disableBeacon: true,
    title: "Welcome to SimpliCV! 🎉",
    content:
      "Let's take a quick tour so you feel right at home. It'll only take a moment!",
  },
  {
    target: '[data-tour="templates-sidebar"]',
    placement: "right",
    title: "Template categories",
    content:
      "Switch between Resume and Offer Letter templates here. Pick the type you need.",
  },
  {
    target: '[data-tour="templates-heading"]',
    placement: "bottom",
    title: "Browse designs",
    content:
      "We have a collection of professional designs. Scroll through and pick one you like — you can always change it later.",
  },
];

/* =================================================================== */
/*  2. My Resumes Page                                                  */
/* =================================================================== */

export const resumesDashboardTourSteps: Step[] = [
  {
    target: "body",
    placement: "center",
    disableBeacon: true,
    title: "Your Resume Dashboard 📄",
    content:
      "This is where all your resumes live. Let's see what you can do here.",
  },
  {
    target: '[data-tour="resumes-header"]',
    placement: "bottom",
    title: "Overview",
    content:
      "See how many resumes you've created at a glance.",
  },
  {
    target: '[data-tour="resumes-new-btn"]',
    placement: "bottom",
    title: "Create a new resume",
    content:
      "Click here to pick a template and start a brand-new resume.",
  },
  {
    target: '[data-tour="resumes-list"]',
    placement: "top",
    title: "Your resumes",
    content:
      "All your existing resumes appear here. Click any card to edit, download, or share it.",
  },
];

/* =================================================================== */
/*  3. Resume Editor Page                                               */
/* =================================================================== */

export const resumeEditorTourSteps: Step[] = [
  {
    target: "body",
    placement: "center",
    disableBeacon: true,
    title: "Welcome to the Editor ✏️",
    content:
      "This is where the magic happens! Let's walk through the key areas.",
  },
  {
    target: '[data-tour="editor-breadcrumbs"]',
    placement: "bottom",
    title: "Section navigation",
    content:
      "These breadcrumbs let you jump between sections — Personal info, Work experience, Skills, and more.",
  },
  {
    target: '[data-tour="editor-add-content"]',
    placement: "bottom",
    title: "Add content",
    content:
      "Need another section? Click here to add new content blocks to your resume.",
  },
  {
    target: '[data-tour="editor-customize-btn"]',
    placement: "bottom",
    title: "Customize appearance",
    content:
      "Switch to the Customisation panel to tweak fonts, layout, spacing, and more.",
  },
  {
    target: '[data-tour="editor-import-btn"]',
    placement: "bottom",
    title: "Import a resume",
    content:
      "Already have a resume? Import it from a PDF or DOCX and we'll pre-fill the fields for you.",
  },
  {
    target: '[data-tour="editor-form"]',
    placement: "right",
    title: "Fill in your details",
    content:
      "This is the main form area. Fill in your information and watch the live preview update instantly.",
  },
  {
    target: '[data-tour="editor-preview"]',
    placement: "left",
    title: "Live preview",
    content:
      "Your resume updates in real-time as you type. What you see is what you get!",
  },
  {
    target: '[data-tour="editor-quick-tools"]',
    placement: "right",
    title: "Quick styling tools",
    content:
      "Change accent color, border style, view fullscreen, download or share — all in one click.",
  },
  {
    target: '[data-tour="editor-footer"]',
    placement: "top",
    title: "Navigate & save",
    content:
      "Use Previous / Next to move between steps. Change your template anytime. Your work auto-saves!",
  },
];

/* =================================================================== */
/*  4. Offer Letters Dashboard                                          */
/* =================================================================== */

export const offerLettersDashboardTourSteps: Step[] = [
  {
    target: "body",
    placement: "center",
    disableBeacon: true,
    title: "Offer Letters Dashboard 📨",
    content:
      "Manage all your offer letters here. Let's take a quick look around.",
  },
  {
    target: '[data-tour="offers-header"]',
    placement: "bottom",
    title: "Overview",
    content:
      "See how many offer letters you've created.",
  },
];

/* =================================================================== */
/*  5. Offer Letter Editor                                              */
/* =================================================================== */

export const offerLetterEditorTourSteps: Step[] = [
  {
    target: "body",
    placement: "center",
    disableBeacon: true,
    title: "Offer Letter Editor ✍️",
    content:
      "Build professional offer letters step by step. Let's see the layout.",
  },
  {
    target: '[data-tour="offer-company-form"]',
    placement: "right",
    title: "Company details",
    content:
      "Start by entering your company name, logo, and address.",
  },
  {
    target: '[data-tour="offer-date-form"]',
    placement: "right",
    title: "Letter date",
    content:
      "Set the date that appears on the offer letter.",
  },
  {
    target: '[data-tour="offer-candidate-form"]',
    placement: "right",
    title: "Candidate info",
    content:
      "Add the candidate's name and other info that will appear in the letter.",
  },
  {
    target: '[data-tour="offer-body-form"]',
    placement: "right",
    title: "Letter body",
    content:
      "Write the main content of your offer letter. Use the rich text editor for formatting.",
  },
  {
    target: '[data-tour="offer-closing-form"]',
    placement: "right",
    title: "Closing & Signature",
    content:
      "Add a closing message and signature to finalize the letter.",
  },
  {
    target: '[data-tour="offer-preview"]',
    placement: "left",
    title: "Live preview",
    content:
      "See exactly how your offer letter will look. Download or view fullscreen from the tools on the left.",
  },
];
