const puppeteer = require("puppeteer");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

(async () => {
  const login = process.env.LOGIN;
  const pass = process.env.PASSWORD;

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1500, height: 1000 },
    args: ["--window-size=1500,1000"],
  });
  const page = await browser.newPage();
  const skipModal = ".csms-navigation-bar__logo";
  const like = '[data-qa="profile-card-action-vote-yes"]';

  const autoLikeStart = async () => {
    setInterval(async () => {
      await page.waitForSelector(skipModal);
      await page.click(skipModal);
      await page.waitForSelector(like);
      await page.click(like);
    }, 2000);
  };

  page.setDefaultTimeout(0);
  await page.goto("https://badoo.com/signin/?f=top");
  await page.type("#signin-name", login);
  await page.type("#signin-password", pass);
  await page.click(".csms-button");

  setTimeout(async () => {
    await page.click(".qa-button");
  }, 2000);

  await autoLikeStart();
})();
