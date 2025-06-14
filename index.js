const fs = require('fs');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const QRCode = require('qrcode'); // For saving QR code as image

const SESSION_FILE_PATH = './session.json';

let sessionCfg = {};
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({
    session: sessionCfg
});

client.on('qr', qr => {
    console.log('Сканируй QR-код для входа в WhatsApp:');
    qrcode.generate(qr, { small: true });

    console.log('\nИли открой этот URL в браузере для входа:');
    console.log(qr);

    QRCode.toFile('qr.png', qr, function (err) {
        if (err) {
            console.error('Ошибка при сохранении QR-кода:', err);
        } else {
            console.log('QR-код сохранён как qr.png — скачайте и отсканируйте с телефона');
        }
    });
});

client.on('authenticated', (session) => {
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error('Ошибка при сохранении сессии:', err);
        } else {
            console.log('✅ Сессия успешно сохранена!');
        }
    });
});

client.on('ready', () => {
    console.log('✅ Бот запущен и готов к работе!');
});

client.on('message', async message => {
    const text = message.body.toLowerCase();

    if (text.includes('привет')) {
        await message.reply('Привет! Я бот турагентства. Спросите меня про туры ✈️🏝️');
    }

    if (text.includes('тур') && text.includes('следующий месяц')) {
        await message.reply('Да, у нас есть туры на следующий месяц. Уточните, пожалуйста, страну или направление 😊');
    }

    if (text.includes('тур') && text.includes('на двоих')) {
        await message.reply('Цены зависят от направления и даты. Напишите страну и желаемые даты, и мы рассчитаем стоимость 👌');
    }

    if (text.includes('перелет') || text.includes('перелёт')) {
        await message.reply('Да, во все наши туры входит перелёт туда и обратно 🛫🛬');
    }

    if (text.includes('бассейн') && text.includes('отеле')) {
        await message.reply('Большинство наших отелей включают бассейн 🏊‍♀️. Уточните, пожалуйста, страну или отель.');
    }

    if (text.includes('завтрак') || text.includes('трансфер')) {
        await message.reply('Да, в большинстве туров включены завтрак и трансфер из аэропорта 🍳🚗');
    }

    if (text.includes('тур') && (
        text.includes('дубай') || 
        text.includes('таиланд') || 
        text.includes('вьетнам') || 
        text.includes('турция')
    )) {
        await message.reply(
            'Вот примерные цены на 7 ночей на двоих:\n' +
            '🇦🇪 Дубай — от 1200$\n' +
            '🇹🇭 Таиланд — от 1300$\n' +
            '🇻🇳 Вьетнам — от 1100$\n' +
            '🇹🇷 Турция — от 900$\n\n' +
            'Уточните даты, чтобы мы рассчитали точную цену ✅'
        );
    }

    if (text.includes('?') || text.includes('сколько') || text.includes('есть')) {
        await message.reply('Спасибо за вопрос! Пожалуйста, уточните страну или даты тура 🌍🗓️');
    }
});

client.initialize();
