"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Cheerio = require("cheerio");
var fs = require("fs");
var puppeteer_1 = require("puppeteer");
require("dotenv").config();
var email = process.env.EMAIL;
var pass = process.env.PASS;
logic(1, 40381);
function logic(start, end) {
    return __awaiter(this, void 0, void 0, function () {
        var path, cookiesFilePath, selectorLogin, inputSelector, inputPassSelector, browser_1, page, url, check404, g0, _a, _b, cookies, headlessBrowser, headlessPage, cookiesString, cookies, selectorLike, selectorContent, imgSelecter, _loop_1, index, error_1;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    path = "./uploads/key";
                    cookiesFilePath = "./cookies.json";
                    if (!fs.existsSync(path)) {
                        fs.mkdirSync(path, { recursive: true });
                        console.log("\u0110\u00E3 t\u1EA1o th\u01B0 m\u1EE5c \"".concat(path, "\"."));
                    }
                    if (!!fs.existsSync(cookiesFilePath)) return [3 /*break*/, 25];
                    selectorLogin = "#mainmenu > ul:nth-child(1) > li:nth-child(2) > a";
                    inputSelector = "#Input_Email";
                    inputPassSelector = "#Input_Password";
                    return [4 /*yield*/, puppeteer_1.default.launch({
                            headless: false,
                            protocolTimeout: 60000,
                            defaultViewport: null,
                            args: ["--start-minimized"], // Thêm cờ để ẩn trình duyệt xuống
                        })];
                case 1:
                    browser_1 = _c.sent();
                    return [4 /*yield*/, browser_1.newPage()];
                case 2:
                    page = _c.sent();
                    page.setDefaultNavigationTimeout(0);
                    return [4 /*yield*/, page.setRequestInterception(true)];
                case 3:
                    _c.sent();
                    page.on("request", function (request) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(request.resourceType() === "fetch" ||
                                        request.resourceType() === "stylesheet" ||
                                        request.resourceType() === "media" ||
                                        request.resourceType() === "font" ||
                                        request.resourceType() === "cspviolationreport" ||
                                        request.resourceType() === "script" ||
                                        request.resourceType() === "websocket" ||
                                        request.resourceType() === "xhr")) return [3 /*break*/, 2];
                                    return [4 /*yield*/, request.abort()];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, request.continue()];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    page.on("close", function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log("Page closed unexpectedly.");
                                    return [4 /*yield*/, browser_1.close()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, page.setUserAgent("Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0")];
                case 4:
                    _c.sent();
                    url = "https://kichhoat24h.com";
                    return [4 /*yield*/, page.goto(url)];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, page.$(selectorLogin)];
                case 6:
                    check404 = _c.sent();
                    if (!!check404) return [3 /*break*/, 8];
                    return [4 /*yield*/, browser_1.close()];
                case 7:
                    _c.sent();
                    return [2 /*return*/, 0];
                case 8: return [4 /*yield*/, page.waitForSelector(selectorLogin)];
                case 9:
                    g0 = (_c.sent()).evaluate(function (el) { return el.textContent; });
                    _b = (_a = console).log;
                    return [4 /*yield*/, g0];
                case 10:
                    _b.apply(_a, [_c.sent()]);
                    return [4 /*yield*/, page.waitForSelector(selectorLogin)];
                case 11:
                    _c.sent();
                    return [4 /*yield*/, page.click(selectorLogin)];
                case 12:
                    _c.sent();
                    return [4 /*yield*/, page.waitForSelector(inputSelector)];
                case 13:
                    _c.sent();
                    return [4 /*yield*/, page.type(inputSelector, email)];
                case 14:
                    _c.sent();
                    return [4 /*yield*/, page.waitForSelector(inputPassSelector)];
                case 15:
                    _c.sent();
                    return [4 /*yield*/, page.type(inputPassSelector, pass)];
                case 16:
                    _c.sent();
                    return [4 /*yield*/, page.waitForSelector("#Input_RememberMe")];
                case 17:
                    _c.sent();
                    return [4 /*yield*/, page.click("#Input_RememberMe")];
                case 18:
                    _c.sent();
                    return [4 /*yield*/, page.waitForTimeout(10000)];
                case 19:
                    _c.sent();
                    return [4 /*yield*/, page.waitForSelector("#account > div:nth-child(8) > button")];
                case 20:
                    _c.sent();
                    return [4 /*yield*/, page.click("#account > div:nth-child(8) > button")];
                case 21:
                    _c.sent();
                    return [4 /*yield*/, page.waitForTimeout(2000)];
                case 22:
                    _c.sent();
                    return [4 /*yield*/, page.cookies()];
                case 23:
                    cookies = _c.sent();
                    fs.writeFileSync(cookiesFilePath, JSON.stringify(cookies));
                    console.log("done time out");
                    // Đóng trình duyệt
                    return [4 /*yield*/, browser_1.close()];
                case 24:
                    // Đóng trình duyệt
                    _c.sent();
                    _c.label = 25;
                case 25:
                    _c.trys.push([25, 35, , 36]);
                    return [4 /*yield*/, puppeteer_1.default.launch({
                            headless: true,
                            defaultViewport: null,
                        })];
                case 26:
                    headlessBrowser = _c.sent();
                    return [4 /*yield*/, headlessBrowser.newPage()];
                case 27:
                    headlessPage = _c.sent();
                    if (!fs.existsSync(cookiesFilePath)) return [3 /*break*/, 29];
                    cookiesString = fs.readFileSync(cookiesFilePath).toString();
                    cookies = JSON.parse(cookiesString);
                    return [4 /*yield*/, headlessPage.setCookie.apply(headlessPage, cookies)];
                case 28:
                    _c.sent();
                    _c.label = 29;
                case 29:
                    selectorLike = "body > div > main > div > div.col-md-9 > div:nth-child(4) > div:nth-child(1) > a";
                    selectorContent = "body > div > main > div > div.col-md-9 > div.topic-detail.panel.panel-default > div.panel-body";
                    imgSelecter = "body > div > main > div > div.col-md-9 > div.topic-detail.panel.panel-default > div.panel-body > img";
                    _loop_1 = function (index) {
                        var url, element, content, $, elementHandle, boundingBox, error_2;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    headlessPage.on("error", function () {
                                        logic(index, end);
                                    });
                                    url = "https://kichhoat24h.com/topic/".concat(index);
                                    console.log(url);
                                    return [4 /*yield*/, headlessPage.goto(url)];
                                case 1:
                                    _d.sent();
                                    return [4 /*yield*/, headlessPage.$(selectorLike)];
                                case 2:
                                    if (!_d.sent()) return [3 /*break*/, 18];
                                    return [4 /*yield*/, headlessPage.waitForSelector(selectorLike)];
                                case 3:
                                    _d.sent();
                                    return [4 /*yield*/, headlessPage.click(selectorLike)];
                                case 4:
                                    _d.sent();
                                    return [4 /*yield*/, headlessPage.waitForTimeout(2000)];
                                case 5:
                                    _d.sent();
                                    return [4 /*yield*/, headlessPage.waitForSelector(selectorContent)];
                                case 6:
                                    _d.sent();
                                    return [4 /*yield*/, headlessPage.$("body > div > main > div > div.col-md-9 > div.topic-detail.panel.panel-default > div.panel-body")];
                                case 7:
                                    element = _d.sent();
                                    return [4 /*yield*/, headlessPage.evaluate(function (el) { return el.innerHTML; }, element)];
                                case 8:
                                    content = _d.sent();
                                    $ = Cheerio.load(content);
                                    $("img").remove();
                                    return [4 /*yield*/, headlessPage.waitForTimeout(2000)];
                                case 9:
                                    _d.sent();
                                    _d.label = 10;
                                case 10:
                                    _d.trys.push([10, 15, , 16]);
                                    return [4 /*yield*/, headlessPage.waitForSelector(imgSelecter)];
                                case 11:
                                    _d.sent();
                                    return [4 /*yield*/, headlessPage.$(imgSelecter)];
                                case 12:
                                    elementHandle = _d.sent();
                                    return [4 /*yield*/, elementHandle.boundingBox()];
                                case 13:
                                    boundingBox = _d.sent();
                                    // Chụp màn hình chỉ với phần tử (selector) được chọn
                                    return [4 /*yield*/, headlessPage.screenshot({
                                            clip: {
                                                x: boundingBox.x,
                                                y: boundingBox.y,
                                                width: boundingBox.width > 0 ? boundingBox.width : 128,
                                                height: boundingBox.height > 0 ? boundingBox.height : 40,
                                            },
                                            path: "".concat(path, "/").concat(index, ".png"),
                                        })];
                                case 14:
                                    // Chụp màn hình chỉ với phần tử (selector) được chọn
                                    _d.sent();
                                    return [3 /*break*/, 16];
                                case 15:
                                    error_2 = _d.sent();
                                    console.log("Không có ảnh!");
                                    return [3 /*break*/, 16];
                                case 16:
                                    if (content) {
                                        fs.appendFileSync("data.txt", $.html(), { flag: "a" });
                                        console.log("Đã ghi dữ liệu vào file txt thành công.");
                                    }
                                    else {
                                        console.log("Không tìm thấy dữ liệu trong selector đã chỉ định.");
                                    }
                                    return [4 /*yield*/, headlessPage.waitForTimeout(2000)];
                                case 17:
                                    _d.sent();
                                    _d.label = 18;
                                case 18: return [2 /*return*/];
                            }
                        });
                    };
                    index = start;
                    _c.label = 30;
                case 30:
                    if (!(index <= end)) return [3 /*break*/, 33];
                    return [5 /*yield**/, _loop_1(index)];
                case 31:
                    _c.sent();
                    _c.label = 32;
                case 32:
                    index++;
                    return [3 /*break*/, 30];
                case 33: return [4 /*yield*/, headlessPage.close()];
                case 34:
                    _c.sent();
                    return [3 /*break*/, 36];
                case 35:
                    error_1 = _c.sent();
                    console.error("Error:", error_1);
                    return [3 /*break*/, 36];
                case 36:
                    fs.appendFileSync("data.txt", "======= end: ".concat(end, " ======="), { flag: "a" });
                    return [2 /*return*/];
            }
        });
    });
}
