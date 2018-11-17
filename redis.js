const redis = require("redis");
const client = redis.createClient();
 
client.on("error", (err) => {
    console.log("Error " + err);
});

const set = (filename, originalname) => {
  client.set('thumbnail_' + filename, originalname, redis.print);
};

exports.set = set;
