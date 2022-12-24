const amqp = require('amqplib');

async function Publisher(user_id, message) {
    const msgBuffer = Buffer.from(JSON.stringify({user_id, message}));
    try {
        const connection = await amqp.connect(process.env.RABBIT_MQ_CONNECTION_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(process.env.RABBIT_MQ_QUEUE);
        await channel.sendToQueue(process.env.RABBIT_MQ_QUEUE, msgBuffer);
        console.log("Broadcasting the message");
        await channel.close();
        await connection.close();
    } catch (ex) {
        console.error("----- Error in Publishing the message -----");
        console.error(ex);
    }
}

module.exports = Publisher;