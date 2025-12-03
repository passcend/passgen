import { decomposeHangul } from './decompose';
import { QWERTY_MAP } from './constants';

export function convertHangulToQwerty(text: string): string {
    let result = '';
    for (const char of text) {
        const decomposed = decomposeHangul(char);
        for (const jamo of decomposed) {
            // Check if it's a complex Jamo that needs splitting for QWERTY mapping
            // In 2-set, ㄳ is typed as r (ㄱ) then t (ㅅ).
            // However, our QWERTY_MAP has 'rt' for 'ㄳ'.
            if (QWERTY_MAP[jamo]) {
                result += QWERTY_MAP[jamo];
            } else {
                // If not found (e.g. non-Hangul), keep as is
                // But wait, ㄳ in JONGSUNG array is a single string.
                // We need to ensure QWERTY_MAP covers all.
                // Let's verify standard keyboard behavior.
                // Yes, ㄳ is rt.
                result += jamo; // Fallback? Should not happen for valid Hangul Jamo
            }
        }
    }
    return result;
}
