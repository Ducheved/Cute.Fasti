export interface RedisConfig {
  address: string;
  port: string;
  user: string;
  password: string;
  prefix: string;
}

export const config = {
  redis: {
    address: process.env.REDIS_ADDRESS || '',
    port: process.env.REDIS_PORT || '',
    user: process.env.REDIS_USER || '',
    password: process.env.REDIS_PASSWORD || '',
    prefix: process.env.REDIS_PREFIX || '',
  },
  hashLength: 4,
  defaultPrefix: 'nya',
};
