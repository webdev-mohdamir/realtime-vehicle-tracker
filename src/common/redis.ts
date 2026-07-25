import Redis from "ioredis";


export class RedisClient {
    private static instance: RedisClient;
    private redis: Redis;

    private constructor() {
        this.redis = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379', 10),
            password: process.env.REDIS_PASSWORD || undefined,
        });
    }

    public static getInstance(): RedisClient {
        if (!RedisClient.instance) {
            RedisClient.instance = new RedisClient();
        }
        return RedisClient.instance;
    }

    public getRedis(): Redis {
        return this.redis;
    }

    public async set(key: string, value: string, expireInSeconds?: number): Promise<void> {
        if (expireInSeconds) {
            await this.redis.set(key, value, 'EX', expireInSeconds);
        } else {
            await this.redis.set(key, value);
        }
    }

    public async get(key: string): Promise<string | null> {
        return await this.redis.get(key);
    }
}