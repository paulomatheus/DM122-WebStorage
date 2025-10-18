export default class HTMLService {
  constructor(subscriberService) {
    this.setFormListener();
    this.subscriberService = subscriberService;
  }

  setFormListener() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("[HtmlService.js] form trigged!");
      this.saveEmail(form.email.value);
    });
  }

  saveEmail(email) {
    if (!email) return;
    console.log(`👁️ [HtmlService.js] email ${email}`);
  }
}