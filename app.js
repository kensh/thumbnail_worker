const message_queue = require('amqplib/callback_api');
const QUEUE = 'task_queue'; 

const editor = require('./imagemagick.js');
const cache = require('./redis.js');

message_queue.connect('amqp://rabbitmq', (err, conn) => {
  conn.createChannel((err, ch) => {

    ch.assertQueue(QUEUE, {durable: true});
    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", QUEUE);

    ch.consume(QUEUE, (que) => {
      let msg = JSON.parse(que.content.toString());
      console.log(" [x] dequeued %s", que.content.toString());

      editor.convert(msg.filename);
      cache.set(msg.filename, msg.originalname);      
      
      ch.ack(que);
    }, {noAck: false});
  });
});
