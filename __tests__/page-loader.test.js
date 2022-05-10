import fsp from 'fs/promises';
import {
  // describe, it,
  expect, test, beforeEach, beforeAll,
} from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import nock from 'nock';
import os from 'os';
import pageLoader from '../src/page-loader.js';
// import exp from 'constants';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFixturesDir = () => path.join(__dirname, '..', '__fixtures__');

let tmpDir = '';
let fixturesPath;
let fixturesDir;

beforeAll(() => {
  fixturesPath = getFixturePath('ru_hexlet_io_courses.html');
  fixturesDir = getFixturesDir();
});

beforeEach(async () => {
  tmpDir = await fsp.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
});

test('plain', async () => {
  const someHtml = await fsp.readFile(path.join(fixturesDir, 'plain.html'), 'utf-8');
  nock(/ru\.hexlet\.io/)
    .get(/courses/)
    .reply(200, someHtml);
  await pageLoader('https://ru.hexlet.io/courses', tmpDir);
  const data = await fsp.readFile(path.join(tmpDir, 'ru_hexlet_io_courses.html'), 'utf-8');
  expect(data).toBe(someHtml);
});

test('image', async () => {
  const imageHtml = await fsp.readFile(path.join(fixturesDir, 'image.html'), 'utf-8');
  nock(/ru\.hexlet\.io/)
    .get(/courses/)
    .reply(200, imageHtml);
    await pageLoader('https://ru.hexlet.io/courses', tmpDir);
    const data = await fsp.readFile(path.join(tmpDir, 'ru_hexlet_io_courses.html'), 'utf-8');
    expect(data).toBe(imageHtml);
});
