import { getRandomBytes } from './bytes';

/**
 * Get a random number in range [0, max) using rejection sampling to avoid modulo bias.
 */
export function getRandomNumber(max: number): number {
    if (max < 1) throw new Error('Max must be greater than 0');
    if (max === 1) return 0;

    // The maximum value of a 32-bit unsigned integer is 2^32 - 1 = 4294967295.
    // We want to sample from [0, limit) where limit is the largest multiple of max <= 2^32.
    // If the random number falls >= limit, we reject it and try again.

    // 2^32 = 4294967296
    const maxUint32 = 4294967296;
    const limit = maxUint32 - (maxUint32 % max);

    let randomNumber: number;
    do {
         const randomBytes = getRandomBytes(4);
         randomNumber = new DataView(randomBytes.buffer).getUint32(0, true);
    } while (randomNumber >= limit);

    return randomNumber % max;
}
