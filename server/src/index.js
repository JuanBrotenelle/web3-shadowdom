import fastify from "fastify";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fastifyStatic from "@fastify/static";
import fastifyJwt from "fastify-jwt";
import fastifyCors from "@fastify/cors";
import { main } from "./routes/main.js";
import corsConfig from "../cors.config.js";
import fs from 'fs';

// Директория текущего файла
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const httpsOptions = {
    key: fs.readFileSync(join(__dirname, '../certs/privkey.pem')),
    cert: fs.readFileSync(join(__dirname, '../certs/fullchain.pem'))
};

const server = fastify({
    logger: true,
    https: httpsOptions
});

// CORS
/*
В случае если требуется подключить определенные домены через cors.config.js, то можно использовать следующий код (просто подставить в origin):
(origin, cb) => {
        if (corsConfig.domains.indexOf(origin) !== -1 || !origin) {
          cb(null, true);
        } else {
          cb(new Error('Not allowed by CORS'));
        }
      },
*/
server.register(fastifyCors, {
    origin: '*',
    allowHeaders: ["Authorization", "Content-Type"],
    credentials: true,
    methods: ["GET", "POST"],
});

// JWT
server.register(fastifyJwt, {
    secret: "supersecret",
    sign: {
        expiresIn: "1h",
    },
});

// Определения статистического маршрута Fastify
server.register(fastifyStatic, {
    root: join(__dirname, '../public'),
    prefix: '/images/',
});


// Проверка работоспособности
server.get("/healthcheck", async (request, reply) => {
    reply.status(200).send({ status: "ok" });
});

// Основные маршруты
server.post("/get-token", async (request, reply) => {
    const { date } = request.body;

    if (date) {
        const token = server.jwt.sign({ date });
        reply.status(200).send({ token });
    } else {
        return
    }
});

server.register(main);


// Функция запуска сервера {host}:443
const start = async () => {
    try {
        await server.listen({ port: 443, host: '0.0.0.0' });
        console.log("Server is listening on port 443");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();