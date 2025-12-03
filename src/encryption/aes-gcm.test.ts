import { encrypt, decrypt } from './aes-gcm';

describe('AES-GCM Encryption with PBKDF2', () => {
  const secret = 'mySecretPassword123';
  const plainText = 'Hello World! This is a secret message.';

  test('should encrypt and decrypt correctly', async () => {
    const encrypted = await encrypt(plainText, secret);
    expect(encrypted).not.toBe(plainText);

    const decrypted = await decrypt(encrypted, secret);
    expect(decrypted).toBe(plainText);
  });

  test('should fail decryption with wrong key', async () => {
    const encrypted = await encrypt(plainText, secret);
    const wrongSecret = 'wrongPassword';

    await expect(decrypt(encrypted, wrongSecret)).rejects.toThrow();
  });

  test('should produce different ciphertexts for same input (random Salt & IV)', async () => {
    const enc1 = await encrypt(plainText, secret);
    const enc2 = await encrypt(plainText, secret);

    expect(enc1).not.toBe(enc2);

    const dec1 = await decrypt(enc1, secret);
    const dec2 = await decrypt(enc2, secret);

    expect(dec1).toBe(plainText);
    expect(dec2).toBe(plainText);
  });

  test('should handle empty string', async () => {
      const empty = '';
      const encrypted = await encrypt(empty, secret);
      const decrypted = await decrypt(encrypted, secret);
      expect(decrypted).toBe(empty);
  });

  test('should handle special characters and unicode', async () => {
      const complexText = '안녕 Hello @#$%^&*() 1234';
      const encrypted = await encrypt(complexText, secret);
      const decrypted = await decrypt(encrypted, secret);
      expect(decrypted).toBe(complexText);
  });

  test('should handle large payloads (> 100KB) safely', async () => {
      // 200KB string
      const largeText = 'A'.repeat(200 * 1024);
      const encrypted = await encrypt(largeText, secret);
      const decrypted = await decrypt(encrypted, secret);
      expect(decrypted).toBe(largeText);
  }, 10000); // Increase timeout for slow PBKDF2/encryption
});
