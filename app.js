const rabbit = require('amqplib/callback_api');
const QUEUE = 'task_queue'; 

const editor = require('./imagemagick.js');
const path = require('path');
const upDir = path.join(__dirname, 'upload');

rabbit.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {

    ch.assertQueue(QUEUE, {durable: true});
    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", QUEUE);

    ch.consume(QUEUE, (que) => {
      console.log(" [x] dequeued %s", que.content.toString());
      editor.convert(upDir + '/sample.jpg', upDir + '/sample.png');

      ch.ack(que);
    }, {noAck: false});
  });
});
