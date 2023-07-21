import axios from "axios";
import { readFileSync } from "fs";
import { HttpProxyAgent } from "http-proxy-agent";
const proxies = readFileSync("./proxy.txt", {
  encoding: "utf-8",
}).split("\n");

const getRandomProxy = () => {
  const randomIndex = Math.floor(Math.random() * proxies.length);
  return proxies[randomIndex];
};

const checkProxy = () => {
  const proxy = getRandomProxy().split(":");
  const agent = new HttpProxyAgent(`http://${proxy[0]}:${proxy[1]}`);

  axios
    .get(`https://api.ipify.org?format=json`, {
      httpsAgent: agent,
      timeout: 5000,
      timeoutErrorMessage: "lỗi",
      proxy: {
        host: proxy[0],
        port: Number(proxy[1]),
      },
    })
    .then((res) => {
      const { ip } = res.data;
      if (ip) {
        console.log(proxy);
      }
    })
    .catch((error) => {});
};
for (const iterator of proxies) {
  checkProxy();
}
