import { expect, test, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import { plof } from '../src/lib';

test('sanity', () => {
  expect(1).toBe(1);
});

beforeAll(() => {
  if (fs.existsSync('./tmp')) {
    fs.rmdirSync('./tmp', { recursive: true });
  }
  fs.mkdirSync('./tmp');
});

afterAll(() => {
  fs.rmdirSync('./tmp', { recursive: true });
});

test('plof with origin file', async () => {
  await plof({
    repo: 'https://github.com/bayandin/awesome-awesomeness',
    origin: 'Dangerfile',
    target: 'tmp',
  });
  const exists = fs.existsSync('tmp/Dangerfile');
  expect(exists).toBe(true);
});

test('plof with origin directory', async () => {
  await plof({
    repo: 'https://github.com/bayandin/awesome-awesomeness',
    origin: '.github',
    target: 'tmp/foo',
  });
  // check if tmp/.github exists
  const exists = fs.existsSync('tmp/foo/pull_request_template.md');
  expect(exists).toBe(true);
});

test('plof with full content', async () => {
  await plof({
    repo: 'https://github.com/bayandin/awesome-awesomeness',
    target: './tmp/full',
  });
  const exists = fs.existsSync('./tmp/full');
  expect(exists).toBe(true);
});

test('plof with branch', async () => {
  await plof({
    repo: 'https://github.com/thurwitz/example-branches',
    branch: 'enhancement',
    origin: 'README.md',
    target: './tmp/example',
  });
  const exists = fs.existsSync('./tmp/example/README.md');
  expect(exists).toBe(true);
});

test('plof with multiple actions', async () => {
  await plof({
    repo: 'https://github.com/git/htmldocs',
    branch: 'gh-pages',
    origin: './MyFirstObjectWalk.html',
    target: './tmp/another',
  });
  // check if tmp/.github exists
  const exists = fs.existsSync('./tmp/another/MyFirstObjectWalk.html');
  expect(exists).toBe(true);
});
