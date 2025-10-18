export default class SubscriberService {
  db = [];

  constructor() {
    console.log(`👁️ [SubscriberService.js] initialized`);
  }

  async saveEmail(email) {
    if (!email) {
      console.error(`no email provided`);
      return;
    }
    this.db.push({
      createdDate: new Date(),
      email,
    });
    console.log(`👁️ [SubscriberService.js] ${email} added`);
    console.table(this.db);
  }
}