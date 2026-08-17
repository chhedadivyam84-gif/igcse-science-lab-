import 'server-only';

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Storage adapter for generated artefacts (note exports, rasterised diagrams).
 *
 * Only the local-disk driver is implemented. `s3` is declared here as the seam
 * an object-storage backend would plug into — it throws rather than pretending
 * to work, so nothing in the UI can silently lose a student's file.
 */
export interface StorageDriver {
  put(key: string, data: Buffer | string, contentType?: string): Promise<string>;
  get(key: string): Promise<Buffer>;
  urlFor(key: string): string;
}

class LocalDiskStorage implements StorageDriver {
  constructor(private readonly root: string) {}

  private resolve(key: string) {
    // Prevents `../` traversal out of the storage root.
    const safe = key.replace(/\\/g, '/').split('/').filter((s) => s && s !== '..').join('/');
    return path.join(this.root, safe);
  }

  async put(key: string, data: Buffer | string) {
    const target = this.resolve(key);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, data);
    return key;
  }

  async get(key: string) {
    return readFile(this.resolve(key));
  }

  urlFor(key: string) {
    return `/api/files/${key}`;
  }
}

class UnconfiguredStorage implements StorageDriver {
  constructor(private readonly driver: string) {}
  private fail(): never {
    throw new Error(
      `STORAGE_DRIVER="${this.driver}" is not implemented. Use "local", or add an adapter in src/lib/storage.ts.`,
    );
  }
  async put(): Promise<string> {
    this.fail();
  }
  async get(): Promise<Buffer> {
    this.fail();
  }
  urlFor(): string {
    this.fail();
  }
}

function build(): StorageDriver {
  const driver = process.env.STORAGE_DRIVER ?? 'local';
  if (driver === 'local') {
    return new LocalDiskStorage(path.resolve(process.env.STORAGE_LOCAL_DIR ?? './storage'));
  }
  return new UnconfiguredStorage(driver);
}

export const storage = build();
