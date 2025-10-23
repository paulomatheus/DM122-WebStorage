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
      this.save(form.email.value);
    });
  }

  async save(email) {
    if (!email) return;
    console.log(`👁️ [HtmlService.js] saving email ${email}`);
    const newSubscriber = await this.subscriberService.save(email);
    this.addSubsToTable([newSubscriber]);
  }

  addSubsToTable(subs) {
    const rows = subs.map(this.mapToRow).join("");
    this.addToTable(rows);
  }

  mapToRow(subscriber) {
    if (!subscriber) return;

    // TODO: implement a dialog to confirm the deletion
    // FIX: Date format
    const row = `
      <tr>
        <td>${subscriber.createdDate.toLocaleString("pt-BR")}</td>
        <td>${subscriber.email}</td>
        <td
          class="delete-sub"
          data-email="${subscriber.email}">
            🗑️
        </td>
      </tr>
    `;
    return row;
  }

  addToTable(rows) {
    const table = document.querySelector("table");
    if (!table) return;
    const tbody = table.tBodies[0];
    tbody.insertAdjacentHTML("beforeend", rows);
    this.setDeleteBehavior();
    this.toggleTable();
  }

  toggleTable() {
    const table = document.querySelector("table");
    const tbody = table.tBodies[0];
    const hasRows = tbody.rows.length;
    if (!hasRows) {
      table.hidden = true;
      return;
    }
    table.hidden = false;
  }

  // TODO: refactor needed
  setDeleteBehavior() {
    const bins = document.querySelectorAll(".delete-sub");
    bins.forEach((bin) => {

      bin.onclick = async () => {
        const isDeleted = await this.subscriberService.delete(
          bin.dataset.email
        );
        if (isDeleted) bin.parentNode.remove();
        this.toggleTable();
      };
    });

  }
}