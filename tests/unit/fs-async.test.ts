import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { writeFileAtomicAsync, readFileAsync, pathExistsAsync } from '../../src/utils/fs-async.js';
import { mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

describe('writeFileAtomicAsync', () => {
  let testDir: string;

  beforeEach(async () => {
    // Create a unique temporary directory for each test
    testDir = join(tmpdir(), `atomic-write-test-${Date.now()}`);
    await mkdir(testDir, { recursive: true });
  });

  afterEach(async () => {
    // Clean up test directory
    await rm(testDir, { recursive: true, force: true });
  });

  test('should write file atomically', async () => {
    const filePath = join(testDir, 'test-file.txt');
    const content = 'Hello, atomic world!';

    await writeFileAtomicAsync(filePath, content);

    // Verify file exists and has correct content
    const result = await readFileAsync(filePath);
    expect(result).toBe(content);
  });

  test('should overwrite existing file atomically', async () => {
    const filePath = join(testDir, 'test-file.txt');
    const initialContent = 'Initial content';
    const newContent = 'Updated content';

    // Write initial content
    await writeFileAtomicAsync(filePath, initialContent);
    const firstRead = await readFileAsync(filePath);
    expect(firstRead).toBe(initialContent);

    // Overwrite with new content
    await writeFileAtomicAsync(filePath, newContent);
    const secondRead = await readFileAsync(filePath);
    expect(secondRead).toBe(newContent);
  });

  test('should clean up temp file after successful write', async () => {
    const filePath = join(testDir, 'test-file.txt');
    const content = 'Test content';

    await writeFileAtomicAsync(filePath, content);

    // Verify temp file doesn't exist
    const tmpExists = await pathExistsAsync(`${filePath}.tmp`);
    expect(tmpExists).toBe(false);
  });

  test('should handle JSON content correctly', async () => {
    const filePath = join(testDir, 'config.json');
    const data = { foo: 'bar', nested: { value: 42 } };
    const content = JSON.stringify(data, null, 2);

    await writeFileAtomicAsync(filePath, content);

    const result = await readFileAsync(filePath);
    expect(JSON.parse(result)).toEqual(data);
  });

  test('should throw error for invalid path', async () => {
    const invalidPath = join(testDir, 'nonexistent', 'deeply', 'nested', 'file.txt');
    const content = 'This should fail';

    await expect(writeFileAtomicAsync(invalidPath, content)).rejects.toThrow();
  });
});
