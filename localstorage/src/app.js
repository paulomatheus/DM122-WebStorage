import HTMLService from "./HTMLService.js";
import SubscriberService from "./SubscriberService.js";

class App {
  constructor() {
    const subscriberService = new SubscriberService();
    new HTMLService(subscriberService);
    console.log(`[app.js] initialized`);
  }
}

new App();
