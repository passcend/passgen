import { CHOSUNG, JUNGSUNG, JONGSUNG } from './constants';

export function decomposeHangul(char: string): string[] {
    const code = char.charCodeAt(0);
    // Hangul Syllables range: AC00 - D7A3
    if (code < 0xAC00 || code > 0xD7A3) {
        return [char];
    }

    const offset = code - 0xAC00;
    const jong = offset % 28;
    const jung = ((offset - jong) / 28) % 21;
    const cho = (((offset - jong) / 28) - jung) / 21;

    const result = [CHOSUNG[cho], JUNGSUNG[jung]];
    if (jong > 0) {
        result.push(JONGSUNG[jong]);
    }
    return result;
}
