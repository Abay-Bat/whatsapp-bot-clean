const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Создаем клиента
const client = new Client();

// Генерация QR-кода
client.on('qr', qr => {
    console.log('Сканируй QR-код для входа в WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Когда бот готов
client.on('ready', () => {
    console.log('✅ Бот запущен и готов к работе!');
});

// Обработка входящих сообщений
client.on('message', async message => {
    const text = message.body.toLowerCase();

    // Ответ на "привет"
    if (text.includes('привет')) {
        await message.reply('Привет! Я бот турагентства. Спросите меня про туры ✈️🏝️');
    }

    // Тур на следующий месяц
    if (text.includes('тур') && text.includes('следующий месяц')) {
        await message.reply('Да, у нас есть туры на следующий месяц. Уточните, пожалуйста, страну или направление 😊');
    }

    // Сколько стоит тур на двоих
    if (text.includes('тур') && text.includes('на двоих')) {
        await message.reply('Цены зависят от направления и даты. Напишите страну и желаемые даты, и мы рассчитаем стоимость 👌');
    }

    // Входит ли перелёт
    if (text.includes('перелет') || text.includes('перелёт')) {
        await message.reply('Да, во все наши туры входит перелёт туда и обратно 🛫🛬');
    }

    // Бассейн в отеле
    if (text.includes('бассейн') && text.includes('отеле')) {
        await message.reply('Большинство наших отелей включают бассейн 🏊‍♀️. Уточните, пожалуйста, страну или отель.');
    }

    // Завтрак и трансфер
    if (text.includes('завтрак') || text.includes('трансфер')) {
        await message.reply('Да, в большинстве туров включены завтрак и трансфер из аэропорта 🍳🚗');
    }

    // Цена тура по странам
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

    // Неизвестный вопрос
    if (text.includes('?') || text.includes('сколько') || text.includes('есть')) {
        await message.reply('Спасибо за вопрос! Пожалуйста, уточните страну или даты тура 🌍🗓️');
    }
});

// Запуск клиента
client.initialize();