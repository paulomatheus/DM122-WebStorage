const DB_KEY = "INATEL::SUBSCRIBER:DB";

export default class SubscriberService {
  #db = [];

  constructor() {
    this.deserialize();
    console.log(`👁️ [SubscriberService.js] initialized`);
  }

  async save(email) {
    if (!email) {
      console.error(`[SubscriberService.js] no email provided`);
      return;
    }
    const newRecord = {
      createdDate: new Date(),
      email,
    };
    // TODO: implemente duplicated item validation
    this.#db.push(newRecord);
    console.log(`👁️ [SubscriberService.js] ${email} added`);
    console.table(this.#db);
    this.serialize();
    return newRecord;
  }

  async getAll() {
    return this.#db;
  }

  async delete(email) {
    console.log(`👁️ [SubscriberService.js] delete ${email}`);
    this.#db = this.#db.filter((sub) => sub.email != email);
    this.serialize();
    return true;
  }
  
  serialize() {
    const subsString = JSON.stringify(this.#db);
    window.localStorage.setItem(DB_KEY, subsString);
    console.log(`👁️ [SubscriberService.js] finished serialization`);
  }

  deserialize() {
    const subsString = window.localStorage.getItem(DB_KEY) || "[]";
    const subsJson = JSON.parse(subsString);
    this.#db = subsJson;
    console.log(`👁️ [SubscriberService.js] load subs data`);
    console.table(this.#db);
  }
}