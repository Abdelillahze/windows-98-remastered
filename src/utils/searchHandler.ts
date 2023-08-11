import puppeteer from "puppeteer";
import { Browser } from "puppeteer";

export default async function searchHandler(url: string) {
  const browser: Browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);
  const html = await page.content();

  return html;
}
