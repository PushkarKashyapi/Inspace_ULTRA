/* InspaceCraft Design Studio · settings
   1. submitUrl: paste your Google Sheet link here (the Apps Script "Web app" URL from the setup guide).
      Every time a customer presses "Save as PDF", their details and the PDF go to that sheet.
      Leave it empty and the studio still works; nothing is sent.
   2. Everything else is optional. */
window.IC_CONFIG = {
  submitUrl: '',
  requestApi: 'https://inspace-backender.onrender.com/lead',   // where 3D design requests go (your existing lead backend)
  sendPdf: true,              // also save each customer's PDF in your Google Drive, linked in the sheet
  showRates: true,            // show item rates in the estimate and PDF (amounts are always shown)
  whatsapp: '919031800901',   // number for the "Chat on WhatsApp" link, with country code, no +
  showSetup: false            // shows the admin setup guide link in the footer; set to false on the live website
};
