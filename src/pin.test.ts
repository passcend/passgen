import { generatePin } from './pin';

describe('generatePin', () => {
    test('should generate a PIN of specified length', () => {
        const pin = generatePin({ length: 6 });
        expect(pin).toHaveLength(6);
        expect(/^[0-9]+$/.test(pin)).toBe(true);
    });

    test('should use default length of 4', () => {
        const pin = generatePin();
        expect(pin).toHaveLength(4);
    });

    test('should respect allowSequential = true', () => {
        // We can't easily force it to generate a sequential PIN, but we can verify it doesn't crash.
        // And generally, it returns a string.
        const pin = generatePin({ allowSequential: true });
        expect(pin).toHaveLength(4);
    });

    test('should respect allowRepeated = true', () => {
        const pin = generatePin({ allowRepeated: true });
        expect(pin).toHaveLength(4);
    });

    // To strictly test the validation logic, we might need to export the helper functions or mock getRandomNumber.
    // However, since the logic is simple, we can run a statistical test or fuzzing.

    test('should not generate simple sequential PINs by default', () => {
        // Run many times, ensure none are "1234" etc.
        for (let i = 0; i < 100; i++) {
            const pin = generatePin({ length: 4 });
            const forward = '0123456789';
            const backward = '9876543210';
            // Only strictly exact matches are blocked by current implementation logic for length 4?
            // "0123456789".includes(pin) checks if pin is a substring.
            expect(forward.includes(pin)).toBe(false);
            expect(backward.includes(pin)).toBe(false);
        }
    });

    test('should not generate repeated PINs by default', () => {
        for (let i = 0; i < 100; i++) {
            const pin = generatePin({ length: 4 });
            const isAllSame = pin.split('').every(c => c === pin[0]);
            expect(isAllSame).toBe(false);
        }
    });

    test('should throw error for invalid length', () => {
        expect(() => generatePin({ length: 0 })).toThrow();
    });
});
