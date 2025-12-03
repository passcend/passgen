import { getRandomNumber } from '../random/number';

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = getRandomNumber(i + 1);
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}
