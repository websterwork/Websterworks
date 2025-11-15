import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { Application } from 'express';
import { AppModule } from './../src/app.module';

describe('Auth CSRF flow (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/auth/token should return a token and set cookie', async () => {
    const server = app.getHttpServer() as unknown as Application;
    const res = await request(server).get('/api/auth/token').expect(200);

    // Expect token in body
    expect(res.body).toBeDefined();
    const body = res.body as Record<string, unknown> | undefined;
    const token = body?.csrfToken ?? body;
    expect(token).toBeDefined();

    // Expect a set-cookie header for XSRF cookie
    const setCookie = res.headers['set-cookie'] as unknown as
      | string[]
      | undefined;
    expect(Array.isArray(setCookie)).toBeTruthy();
    if (Array.isArray(setCookie)) {
      // There should be at least one cookie containing XSRF or the configured cookie name
      const found = setCookie.some((c) => /XSRF-?TOKEN|XSRF-TOKEN/i.test(c));
      expect(found).toBeTruthy();
    }
  });
});
