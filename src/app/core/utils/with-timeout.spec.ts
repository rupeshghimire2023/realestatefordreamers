import { withTimeout } from './with-timeout';

describe('withTimeout', () => {
  it('resolves with the value when the promise settles in time', async () => {
    await expect(withTimeout(Promise.resolve('ok'), 50)).resolves.toBe('ok');
  });

  it('passes through rejections', async () => {
    await expect(withTimeout(Promise.reject(new Error('boom')), 50)).rejects.toThrow('boom');
  });

  it('rejects when the promise never settles', async () => {
    const never = new Promise<never>(() => {});
    await expect(withTimeout(never, 10, 'Saving lead')).rejects.toThrow('Saving lead timed out after 10ms');
  });
});
