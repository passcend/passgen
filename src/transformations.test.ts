import { leetSpeak, transformCase } from './transformations';

describe('Transformations', () => {
    describe('leetSpeak', () => {
        it('should substitute characters correctly', () => {
            expect(leetSpeak('leet')).toBe('1337');
            expect(leetSpeak('password')).toBe('p455w0rd');
            expect(leetSpeak('HELLO')).toBe('H3110'); // H is not mapped, E->3, L->1, O->0
            // Actually check my map:
            // 'a': '4', 'A': '4',
            // 'e': '3', 'E': '3',
            // 'i': '1', 'I': '1',
            // 'o': '0', 'O': '0',
            // 's': '5', 'S': '5',
            // 't': '7', 'T': '7',
            // 'b': '8', 'B': '8',
            // 'g': '9', 'G': '9',
            // 'l': '1', 'L': '1',
            // 'z': '2', 'Z': '2'
            // H is not in map.
            // L is in map.
            expect(leetSpeak('HELLO')).toBe('H3110');
        });

        it('should handle strings without leet characters', () => {
            expect(leetSpeak('mry')).toBe('mry');
        });

        it('should handle empty strings', () => {
            expect(leetSpeak('')).toBe('');
        });
    });

    describe('transformCase', () => {
        it('should convert to lowercase', () => {
            expect(transformCase('Hello World', 'lowercase')).toBe('hello world');
        });

        it('should convert to uppercase', () => {
            expect(transformCase('Hello World', 'uppercase')).toBe('HELLO WORLD');
        });

        it('should convert to titlecase', () => {
            expect(transformCase('hello world', 'titlecase')).toBe('Hello world');
            expect(transformCase('HELLO WORLD', 'titlecase')).toBe('Hello world');
        });

        it('should handle empty strings', () => {
            expect(transformCase('', 'lowercase')).toBe('');
        });
    });
});
