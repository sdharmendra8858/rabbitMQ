const amqp = require("amqplib");
const LoggerService = require("./../services/LoggerService");

async function consumer() {
    try {
        const connection = await amqp.connect(process.env.RABBIT_MQ_CONNECTION_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(process.env.RABBIT_MQ_QUEUE);
        channel.consume(process.env.RABBIT_MQ_QUEUE, async(message) => {
            const data = JSON.parse(message.content.toString());
            const loggerService = new LoggerService();
            await loggerService.writeLogs(data.user_id, data.message);
            console.log(`Received message for: ${data.user_id}`);
            channel.ack(message);
        });
        console.log(`Waiting for messages...`);
    } catch (ex) {
        console.error(ex);
    }
}

module.exports = consumer;