import Dexie from "https://cdn.jsdelivr.net/npm/dexie@4.2.1/+esm";

const DB_KEY = "INATEL::SUBSCRIBER:DB";

export default class SubscriberService {
  #db = [];

  constructor() {
    console.log(`[SubscriberService.js] initialized`);
    this.#initializeDB();
  }

  #initializeDB() {
    console.log(`[SubscriberService.js] initializeDB`);
    const db = new Dexie(DB_KEY);
    db.version(1).stores({
      subs: "email",
    });
    db.on("populate", async () => {
      await db.subs.bulkPut([
        { email: "paulo@inatel.br", createdDate: new Date() },
        { email: "lidy@inatel.br", createdDate: new Date() },
        { email: "davi@inatel.br", createdDate: new Date() },
        { email: "pedro@inatel.br", createdDate: new Date() },
      ]);
    });
    db.open();
    this.#db = db;
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
    try {
      await this.#db.subs.add(newRecord);
      console.log(`[SubscriberService.js] ${email} added`);
      return { ...newRecord };
    } catch (error) {
      console.error(`[SubscriberService.js] duplicated email: ${email}`);
    }
  }

  async getAll() {
    return this.#db.subs.toArray();
  }

  async delete(email) {
    console.log(`[SubscriberService.js] delete ${email}`);
    await this.#db.subs.delete(email);
    return true;
  }
}