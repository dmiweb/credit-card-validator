import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(35000);

describe("test form validation cards", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    [page] = await browser.pages();
  });

  test("Form input should add .card-input-valid class if card is valid", async () => {
    await page.goto(baseUrl);

    await page.waitForSelector(".validation-form");

    const form = await page.$(".validation-form");
    const input = await form.$(".card-input");
    const submit = await form.$(".submit-btn");

    await input.type("2204706642093860");
    await submit.click();

    await page.waitForSelector(".validation-form .card-input.card-input-valid"); // waitFor больше не поддерживается
  });

  test("Form input should add .card-input-invalid class if card is invalid", async () => {
    await page.goto(baseUrl);

    await page.waitForSelector(".validation-form");

    const form = await page.$(".validation-form");
    const input = await form.$(".card-input");
    const submit = await form.$(".submit-btn");

    await input.type("0000000000000001");
    await submit.click();

    await page.waitForSelector(
      ".validation-form .card-input.card-input-invalid"
    );
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test("should add do something", async () => {
    await page.goto(baseUrl);
  });
});
