import * as Cheerio from "cheerio";
import fs from "fs";
import puppeteer from "puppeteer";
require("dotenv").config();

const email = process.env.EMAIL;
const pass = process.env.PASS;

logic(1544, 40381);

async function logic(start: number, end: number) {
  const path = "uploads/key";
  const cookiesFilePath = "./cookies.json";

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    console.log(`Đã tạo thư mục "${path}".`);
  }

  if (!fs.existsSync(cookiesFilePath)) {
    const selectorLogin = "#mainmenu > ul:nth-child(1) > li:nth-child(2) > a";
    const inputSelector = "#Input_Email";
    const inputPassSelector = "#Input_Password";
    const browser = await puppeteer.launch({
      headless: false,
      protocolTimeout: 60000,
      defaultViewport: null,
      args: ["--start-minimized"], // Thêm cờ để ẩn trình duyệt xuống
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    page.setRequestInterception(true);

    page.on("request", async (request) => {
      if (
        request.resourceType() === "fetch" ||
        request.resourceType() === "stylesheet" ||
        request.resourceType() === "media" ||
        request.resourceType() === "font" ||
        request.resourceType() === "cspviolationreport" ||
        request.resourceType() === "script" ||
        request.resourceType() === "websocket" ||
        request.resourceType() === "xhr"
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });
    page.on("close", async () => {
      console.log("Page closed unexpectedly.");
      await browser.close();
    });

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0"
    );

    const url = `https://kichhoat24h.com`;

    await page.goto(url);
    const check404 = await page.$(selectorLogin);
    if (!check404) {
      await browser.close();
      return 0;
    }
    const g0 = (await page.waitForSelector(selectorLogin)).evaluate(
      (el) => el.textContent
    );
    console.log(await g0);
    await page.waitForSelector(selectorLogin);
    await page.click(selectorLogin);

    await page.waitForSelector(inputSelector);
    await page.type(inputSelector, email);

    await page.waitForSelector(inputPassSelector);
    await page.type(inputPassSelector, pass);

    await page.waitForSelector("#Input_RememberMe");
    await page.click("#Input_RememberMe");

    await page.waitForTimeout(10000);

    await page.waitForSelector("#account > div:nth-child(8) > button");
    await page.click("#account > div:nth-child(8) > button");

    await page.waitForTimeout(2000);

    // Lưu trữ cookies vào tệp
    const cookies = await page.cookies();
    fs.writeFileSync(cookiesFilePath, JSON.stringify(cookies));

    console.log("done time out");
    // Đóng trình duyệt
    await browser.close();
  }
  try {
    // Khởi tạo lại trình duyệt với chế độ không có giao diện đồ họa
    const headlessBrowser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });

    const headlessPage = await headlessBrowser.newPage();
    // Đọc cookies từ tệp (nếu đã lưu trữ trước đó)
    if (fs.existsSync(cookiesFilePath)) {
      const cookiesString = fs.readFileSync(cookiesFilePath).toString(); // Chuyển đổi từ Buffer sang chuỗi
      const cookies = JSON.parse(cookiesString);
      await headlessPage.setCookie(...cookies);
    }

    const selectorLike =
      "body > div > main > div > div.col-md-9 > div:nth-child(4) > div:nth-child(1) > a";
    const selectorContent =
      "body > div > main > div > div.col-md-9 > div.topic-detail.panel.panel-default > div.panel-body";
    const imgSelecter =
      "body > div > main > div > div.col-md-9 > div.topic-detail.panel.panel-default > div.panel-body > img";
    for (let index = start; index <= end; index++) {
      headlessPage.on("error", () => {
        logic(index, end);
      });
      const url = `https://kichhoat24h.com/topic/${index}`;
      console.log(url);
      await headlessPage.goto(url);
      if (await headlessPage.$(selectorLike)) {
        await headlessPage.waitForSelector(selectorLike);
        await headlessPage.click(selectorLike);
        await headlessPage.waitForTimeout(2000);

        await headlessPage.waitForSelector(selectorContent);

        // Trích xuất dữ liệu từ selector đã chỉ định
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
        // Chờ cho phần tử (selector) xuất hiện trên trang web
        try {
          await headlessPage.waitForSelector(imgSelecter);
          // Lấy thông tin vị trí và kích thước của phần tử
          const elementHandle = await headlessPage.$(imgSelecter);
          const boundingBox = await elementHandle.boundingBox();

          // Chụp màn hình chỉ với phần tử (selector) được chọn
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
          fs.appendFileSync("data.txt", $.html(), { flag: "a" });
          console.log("Đã ghi dữ liệu vào file txt thành công.");
        } else {
          console.log("Không tìm thấy dữ liệu trong selector đã chỉ định.");
        }
        await headlessPage.waitForTimeout(5000);
      }
    }
    await headlessPage.close();
  } catch (error) {
    console.error("Error:", error);
  }
  fs.appendFileSync("data.txt", `======= end: ${end} =======`, { flag: "a" });
}
