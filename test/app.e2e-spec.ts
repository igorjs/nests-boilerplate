import { configureServer } from 'src/app.server';
import * as request from 'supertest';
import TestAgent from 'supertest/lib/agent';

describe('Server (e2e)', () => {
  let app: Awaited<ReturnType<typeof configureServer>>;
  let server: TestAgent;

  beforeAll(async () => {
    app = await configureServer();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    server = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  // APP MODULE
  it('/healthcheck (GET)', async () => {
    const response = await server.get('/api/healthcheck');
    expect(response.status).toBe(200);
    expect(response.text).toBe('healthy');
  });

  // SCHEDULE MODULE
  it('/v1/schedules (GET)', async () => {
    const response = await server.get('/api/v1/schedules');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // TASK MODULE
  it('/v1/tasks (GET)', async () => {
    const response = await server.get('/api/v1/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
