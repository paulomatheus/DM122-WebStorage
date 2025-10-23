
export default class HTMLService {
  constructor(subscriberService) {

    this.subscriberService = subscriberService;
    this.setFormListener();
    this.fetchSubscribers();
  }

  async fetchSubscribers() {
    const subs = await this.subscriberService.getAll();
    if (!subs.length) return;
    this.addSubsToTable(subs);
  }

  setFormListener() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("[HtmlService.js] form trigged!");
      this.saveEmail(form.email.value);
    });
  }

  async saveEmail(email) {
    if (!email) return;
    console.log(`👁️ [HtmlService.js] saving email ${email}`);
    const newSubscriber = await this.subscriberService.saveEmail(email);
    this.addSubsToTable([newSubscriber]);
  }

  addSubsToTable(subs) {
    const rows = subs.map(this.mapToRow).join("");
    this.addToTable(rows);
  }

  mapToRow(subscriber) {
    if (!subscriber) return;
    // TODO: implemente the delete action
    // FIX: Date format
    const row = `
      <tr>
        <td>${subscriber.createdDate.toLocaleString("pt-BR")}</td>
        <td>${subscriber.email}</td>
        <td>🗑️</td>
      </tr>
    `;
    return row;
  }

  addToTable(rows) {
    const table = document.querySelector("table");
    if (!table) return;
    const tbody = table.tBodies[0];
    tbody.insertAdjacentHTML("beforeend", rows);
    table.hidden = false;
  }
}