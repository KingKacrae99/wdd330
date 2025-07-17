export default class Alert {
  constructor(jsonPath) {
    this.jsonPath = jsonPath;
  }

  async init() {
    const alerts = await this.getAlerts();
    if (alerts && alerts.length > 0) {
      this.displayAlerts(alerts);
    }
  }

  async getAlerts() {
    try {
      const response = await fetch(this.jsonPath);
      if (!response.ok) throw new Error("there was an erro getting the aletrs");
      return await response.json();
    } catch (error) {
      console.log("there was an erro getting the aletrs", error);
      return [];
    }
  }

  displayAlerts(alerts) {
    const section = document.createElement("section");
    section.classList.add("alert-list");

    alerts.forEach(alert => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background || "gray";
      p.style.color = alert.color || "white";
      p.style.padding = "10px";
      p.style.margin = "5px 0";
      section.appendChild(p);
    });

    const main = document.querySelector("main");
    if (main) {
      main.prepend(section); // lo pone al inicio de <main>
    }
  }
}