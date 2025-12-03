export function getRandomBytes(length: number): Uint8Array {
    const array = new Uint8Array(length);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        crypto.getRandomValues(array);
    } else if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
        window.crypto.getRandomValues(array);
    } else {
        // Fallback for Node.js environments where global crypto might not be set (older versions)
        // Ideally, consumers should ensure crypto is available or use a polyfill.
        // But let's try to require it dynamically if we are in a CommonJS env.
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const nodeCrypto = require('crypto');
            const buffer = nodeCrypto.randomBytes(length);
            array.set(buffer);
        } catch (e) {
            throw new Error('Cryptographically secure random number generator not available.');
        }
    }
    return array;
}
