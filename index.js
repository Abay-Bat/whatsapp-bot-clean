const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const QRCode = require('qrcode'); // For saving QR code as image

// Создаем клиента
const client = new Client();

// Генерация QR-кода
client.on('qr', qr => {
    console.log('Сканируй QR-код для входа в WhatsApp:');
    
    // Generate and print small QR code in terminal
    qrcode.generate(qr, { small: true });

    // Also print the raw QR string as a URL so it can be copied or opened manually
    console.log('\nИли открой этот URL в браузере для входа:');
    console.log(qr);

    // Save the QR code as an image file 'qr.png'
    QRCode.toFile('qr.png', qr, function (err) {
        if (err) {
            console.error('Ошибка при сохранении QR-кода:', err);
        } else {
            console.log('QR-код сохранён как qr.png — скачайте и отсканируйте с телефона');
        }
    });
});

// Когда бот готов
client.on('ready', () => {
    console.log('✅ Бот запущен и готов к работе!');
});

// Обработка входящих сообщений
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

// Запуск клиента
client.initialize();
