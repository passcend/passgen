import { getRandomNumber } from './random/number';

export interface PinGeneratorOptions {
    length: number;
    allowSequential: boolean;
    allowRepeated: boolean;
}

export const defaultPinOptions: PinGeneratorOptions = {
    length: 4,
    allowSequential: false,
    allowRepeated: false,
};

/**
 * Checks if a PIN contains sequential digits (e.g., 1234, 4321).
 */
function isSequential(pin: string): boolean {
    const forward = '0123456789';
    const backward = '9876543210';
    return forward.includes(pin) || backward.includes(pin);
}

/**
 * Checks if a PIN consists of the same repeated digit (e.g., 1111).
 */
function isRepeated(pin: string): boolean {
    if (pin.length === 0) return false;
    const first = pin[0];
    for (let i = 1; i < pin.length; i++) {
        if (pin[i] !== first) return false;
    }
    return true;
}

/**
 * Generate a random numeric PIN.
 */
export function generatePin(options: Partial<PinGeneratorOptions> = {}): string {
    const opts = { ...defaultPinOptions, ...options };

    // Safety check for length
    if (opts.length < 1) {
        throw new Error('PIN length must be at least 1');
    }

    // Loop until we find a valid PIN
    // Safety break after 1000 attempts to prevent infinite loops (though highly unlikely for PINs)
    let attempts = 0;
    while (attempts < 1000) {
        let pin = '';
        for (let i = 0; i < opts.length; i++) {
            pin += getRandomNumber(10).toString();
        }

        let valid = true;

        if (!opts.allowSequential && isSequential(pin)) {
            valid = false;
        }

        if (valid && !opts.allowRepeated && isRepeated(pin)) {
            valid = false;
        }

        if (valid) {
            return pin;
        }
        attempts++;
    }

    throw new Error('Failed to generate a valid PIN matching constraints after multiple attempts.');
}
