import TelegramBot = require("node-telegram-bot-api");
import { ETwitterStreamEvent, TwitterApi } from "twitter-api-v2";

const userClient = new TwitterApi({
  appKey: "sGM0CnTtR1LcHNo0WSowuY8uu",
  appSecret: "0clzXyTUK0ODqU0gKkHKgkjJ6G8AIbUdWSGgbX8jSeUUzO6Q7I",
  accessToken: "1673626503857471489-egPLOgjDuWFRe5c1Go3ICPStn0X21W",
  accessSecret: "cp9GCsukAo7n2dlOGAVzhQtXFv5RxK5Rqdqy1M2WyxAZr",
});
const bearerToken =
  "AAAAAAAAAAAAAAAAAAAAAArVoQEAAAAA4%2FpRvNNBNcA%2Ff4Qin5f5V%2FmZAdY%3Dl0yh7oGew2JEpWg0Aoh1faVgAPDST7bTJnngbzhWsH0m8ZHthz";

const client = new TwitterApi(bearerToken);

const telegramConfig = {
  token: "6036150576:AAHvXiZ9GEPGK8rj-FWp2ZlJZC7sBWXMahY",
  chatId: "-1001511550115",
};

const telegramBot = new TelegramBot(telegramConfig.token, { polling: true });
const startStreaming = async (screenName: string) => {
  const tweet = await userClient.v2.tweet("Hello, this is a test.");
  const user = await userClient.currentUserV2(true);
  try {
    console.log(await userClient.v2.me());
  } catch (error) {
    console.log(error.data);
  }
  await userClient.v2.deleteTweet(tweet.data.id);
  // Start stream!
  try {
    const stream = userClient.v2.sampleStream({ autoConnect: false });
    // const sampleFilterv2 = await client.v2.getStream("tweets/sample/stream");
    stream.on(ETwitterStreamEvent.Data, console.log);
    stream.on(ETwitterStreamEvent.Connected, () =>
      console.log("Stream is started.")
    );
    await stream.connect({
      autoReconnect: true,
      autoReconnectRetries: Infinity,
      keepAliveTimeout: 10000,
    });
  } catch (error) {
    console.log(error.data);
  }
  telegramBot.sendMessage(
    telegramConfig.chatId,
    `id: ${user.data.id}
name: ${user.data.name}
username: ${user.data.username}
      `,
    {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }
  );
};

// Bắt đầu stream với một tài khoản Twitter cụ thể
startStreaming("theestallion");
export class Tester {
  async test() {
    console.log("a");
  }
}
