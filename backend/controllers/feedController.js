import Feed from "../models/feed.js";
import connectRedis, { Reddisclient } from "../config/redis.js";

let io;

export const setSocketInstance = (socketIo) => {
  io = socketIo;
};

// Getting all the feeds
export const getFeeds = async (req, res) => {
  try {
    const cachedFeeds = await Reddisclient.get("feeds");
    if (cachedFeeds) {
      return res.json({
        source: "redis-cache",
        feeds: JSON.parse(cachedFeeds),
      });
    }
    const feeds = await Feed.find().sort({ createdAt: -1 });
    await Reddisclient.setEx(
      "feeds",
      60,
      JSON.stringify(feeds)
    );

    res.json({
      source: "mongodb",
      feeds,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Creating the Feeds
export const createFeed = async (req, res) => {
  try {
    const { message } = req.body;

    const feed = await Feed.create({ message });

    // Clear cache
    await Reddisclient.del("feeds");

    // Emit realtime event
    io.emit("new-feed", feed);

    res.status(201).json(feed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};