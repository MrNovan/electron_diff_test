import { Client } from 'pg';

export default async () => {
  const client = new Client({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: '5432',
    database: 'demo_2025',
  });

  await client.connect();
  return client;
};