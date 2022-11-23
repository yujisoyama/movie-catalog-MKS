import Redis from 'ioredis';
import { promisify } from 'util';
import "dotenv/config"

const port = Number(process.env.REDIS_PORT) || 6379

const redisClient = new Redis({
    port: port,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASS
});

function getRedis(value: string) {
    const syncRedisGet = promisify(redisClient.get).bind(redisClient);
    return syncRedisGet(value);
}

function setRedis(key: string, value: string) {
    const syncRedisSet = promisify(redisClient.set).bind(redisClient);
    return syncRedisSet(key, value);
}

export { redisClient, getRedis, setRedis }