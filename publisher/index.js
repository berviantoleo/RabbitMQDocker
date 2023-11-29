const amqplib = require('amqplib');

(async () => {
    const queue = 'tasks';
    const conn = await connecting();

    const ch1 = await conn.createChannel();
    await ch1.assertQueue(queue);

    // Sender
    const ch2 = await conn.createChannel();

    setInterval(() => {
        console.log("Sending data");
        ch2.sendToQueue(queue, Buffer.from('something to do'));
    }, 1000);
})();

async function connecting() {
    let conn;
    let connected = false;
    let maxTrial = 5;
    let trial = 0;
    do {
        try {
            conn = await amqplib.connect(process.env.AMQP_URL);
        } catch (err) {
            console.error(err)
        }
        connected = !!conn;
        trial += 1;
        await sleep((Math.random() * 10 + 1) * 1000);
    } while (!connected && trial < maxTrial)

    if (!conn) {
        throw new Error("Couldn't connect to RabbitMQ")
    }
    return conn;
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
