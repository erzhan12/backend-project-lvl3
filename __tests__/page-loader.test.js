import fsp from 'fs/promises';
import {
  // describe, it,
  expect, test, beforeEach,
} from '@jest/globals';
// import { fileURLToPath } from 'url';
import path from 'path';
import nock from 'nock';
import os from 'os';
import pageLoader from '../src/page-loader.js';
// import exp from 'constants';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

let tmpDir = '';

beforeEach(async () => {
  tmpDir = await fsp.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
});

test('loading', async () => {
  const someHtml = '<html>some html</html>';
  nock(/ru\.hexlet\.io/)
    .get(/courses/)
    .reply(200, someHtml);
  await pageLoader('https://ru.hexlet.io/courses', tmpDir);
  const data = await fsp.readFile(path.join(tmpDir, 'ru_hexlet_io_courses.html'), 'utf-8');
  expect(data).toBe(someHtml);
});

// test('test fail', async () => {
//   nock(/ru\.hexlet\.io/)
//     .get(/courses/)
//     .reply(404, 'Page not found');
//     await pageLoader('https://ru.hexlet.io/courses', tmpDir);
//     const data = await fsp.readFile(path.join(tmpDir, 'ru_hexlet_io_courses.html'), 'utf-8');
//     expect(data).toBe(some_html);
// });
