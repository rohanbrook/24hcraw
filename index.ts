import * as Cheerio from "cheerio";
import * as fs from "fs";
import puppeteer from "puppeteer";
require("dotenv").config();

const email = process.env.EMAIL;
const pass = process.env.PASS;

const path = "./uploads/key";
const cookiesFilePath = "./cookies.json";

const main = async () => {
  try {
    await ensureDirectories();
    await login();
    await processPages(40875, 44100);
  } catch (error) {
    console.error("Error:", error);
  }
};

const ensureDirectories = async () => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
    console.log(`Đã tạo thư mục "${path}".`);
  }
};

const login = async () => {
  if (!fs.existsSync(cookiesFilePath)) {
    const browser = await puppeteer.launch({
      headless: false,
      protocolTimeout: 60000,
      defaultViewport: null,
      args: ["--start-minimized"],
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);

    page.setRequestInterception(true);

    page.on("request", async (request) => {
      if (
        [
          "fetch",
          "stylesheet",
          "media",
          "font",
          "cspviolationreport",
          "script",
          "websocket",
          "xhr",
        ].includes(request.resourceType())
      ) {
        await request.abort();
      } else {
        await request.continue();
      }
    });

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0"
    );

    const url = `https://kichhoat24h.com`;

    await page.goto(url);
    const check404 = await page.$(
      "#mainmenu > ul:nth-child(1) > li:nth-child(2) > a"
    );
    if (!check404) {
      await browser.close();
      throw new Error("Trang không tồn tại hoặc không thể truy cập.");
    }

    await page.waitForSelector(
      "#mainmenu > ul:nth-child(1) > li:nth-child(2) > a"
    );
    await page.click("#mainmenu > ul:nth-child(1) > li:nth-child(2) > a");

    await page.waitForSelector("#Input_Email");
    await page.type("#Input_Email", email);

    await page.waitForSelector("#Input_Password");
    await page.type("#Input_Password", pass);

    await page.waitForSelector("#Input_RememberMe");
    await page.click("#Input_RememberMe");

    await page.waitForTimeout(10000);

    await page.waitForSelector("#account > div:nth-child(8) > button");
    await page.click("#account > div:nth-child(8) > button");

    await page.waitForTimeout(2000);

    const cookies = await page.cookies();
    fs.writeFileSync(cookiesFilePath, JSON.stringify(cookies));

    console.log("Đăng nhập thành công.");
    await browser.close();
  }
};

const processPages = async (start: number, end: number) => {
  const headlessBrowser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
  });

  const headlessPage = await headlessBrowser.newPage();
  headlessPage.on("close", async () => {
    console.log("Page closed unexpectedly.");
    return await headlessBrowser.close();
  });

  if (fs.existsSync(cookiesFilePath)) {
    const cookiesString = fs.readFileSync(cookiesFilePath).toString();
    const cookies = JSON.parse(cookiesString);
    await headlessPage.setCookie(...cookies);
  }

  for (let index = start; index <= end; index++) {
    console.time("Thời gian thực thi cho một lần lặp");
    try {
      const url = `https://kichhoat24h.com/topic/${index}`;
      console.log(url);
      await headlessPage.goto(url);

      if (
        await headlessPage.$(
          "body > div > main > div > div.col-md-9 > div:nth-child(4) > div:nth-child(1) > a"
        )
      ) {
        await headlessPage.waitForSelector(
          "body > div > main > div > div.col-md-9 > div:nth-child(4) > div:nth-child(1) > a"
        );
        await headlessPage.click(
          "body > div > main > div > div.col-md-9 > div:nth-child(4) > div:nth-child(1) > a"
        );
        await headlessPage.waitForTimeout(2000);

        await headlessPage.waitForSelector(
          "body > div > main > div > div.col-md-9 > div.topic-detail.panel.panel-default > div.panel-body"
        );

        const element = await headlessPage.$(
          "body > div > main > div > div.col-md-9 > div.topic-detail.panel.panel-default > div.panel-body"
        );
        const content = await headlessPage.evaluate(
          (el) => el.innerHTML,
          element
        );

        const $ = Cheerio.load(content);
        $("img").remove();

        await headlessPage.waitForTimeout(2000);

        try {
          await headlessPage.waitForSelector(
            "body > div > main > div > div.col-md-9 > div.topic-detail.panel.panel-default > div.panel-body > img"
          );
          const elementHandle = await headlessPage.$(
            "body > div > main > div > div.col-md-9 > div.topic-detail.panel.panel-default > div.panel-body > img"
          );
          const boundingBox = await elementHandle.boundingBox();

          await headlessPage.screenshot({
            clip: {
              x: boundingBox.x,
              y: boundingBox.y,
              width: boundingBox.width > 0 ? boundingBox.width : 128,
              height: boundingBox.height > 0 ? boundingBox.height : 40,
            },
            path: `${path}/${index}.png`,
          });
        } catch (error) {
          console.log("Không có ảnh!");
        }

        if (content) {
          fs.appendFileSync("data.txt", $.html() + "\n", { flag: "a" });
          console.log("Đã ghi dữ liệu vào file txt thành công.");
        } else {
          console.log("Không tìm thấy dữ liệu trong selector đã chỉ định.");
        }

        await headlessPage.waitForTimeout(2000);
        console.timeEnd("Thời gian thực thi cho một lần lặp");
      }
    } catch (error) {
      console.error("Error on page", index, ":", error);
      fs.appendFileSync("error.txt", `Error on page ${index} : error\n`, {
        flag: "a",
      });
      return processPages(index, end);
    }
  }

  await headlessPage.close();
};

main();
