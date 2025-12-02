export interface PasswordPolicy {
    minLength?: number;
    maxLength?: number;
    minUppercase?: number;
    minLowercase?: number;
    minNumbers?: number;
    minSpecial?: number;
    requireUppercase?: boolean; // Equivalent to minUppercase: 1
    requireLowercase?: boolean; // Equivalent to minLowercase: 1
    requireNumbers?: boolean;   // Equivalent to minNumbers: 1
    requireSpecial?: boolean;   // Equivalent to minSpecial: 1
    forbiddenPatterns?: RegExp[]; // e.g. /\s/ for no spaces
    forbiddenStrings?: string[]; // e.g. ['password', 'admin']
}

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

/**
 * Validates a password against a specific policy.
 * @param password The password string to validate.
 * @param policy The policy to enforce.
 * @returns An object containing isValid boolean and an array of error messages.
 */
export function validatePassword(password: string, policy: PasswordPolicy): ValidationResult {
    const errors: string[] = [];

    if (!password) {
        return { isValid: false, errors: ['Password is empty'] };
    }

    if (policy.minLength !== undefined && password.length < policy.minLength) {
        errors.push(`Password must be at least ${policy.minLength} characters long.`);
    }

    if (policy.maxLength !== undefined && password.length > policy.maxLength) {
        errors.push(`Password must be no more than ${policy.maxLength} characters long.`);
    }

    let upperCount = 0;
    let lowerCount = 0;
    let numberCount = 0;
    let specialCount = 0;

    for (const char of password) {
        if (/[A-Z]/.test(char)) upperCount++;
        else if (/[a-z]/.test(char)) lowerCount++;
        else if (/[0-9]/.test(char)) numberCount++;
        else if (/[^a-zA-Z0-9]/.test(char)) specialCount++;
    }

    // Check minimum counts
    const reqUpper = policy.minUppercase ?? (policy.requireUppercase ? 1 : 0);
    if (upperCount < reqUpper) {
        errors.push(`Password must contain at least ${reqUpper} uppercase character(s).`);
    }

    const reqLower = policy.minLowercase ?? (policy.requireLowercase ? 1 : 0);
    if (lowerCount < reqLower) {
        errors.push(`Password must contain at least ${reqLower} lowercase character(s).`);
    }

    const reqNumber = policy.minNumbers ?? (policy.requireNumbers ? 1 : 0);
    if (numberCount < reqNumber) {
        errors.push(`Password must contain at least ${reqNumber} number(s).`);
    }

    const reqSpecial = policy.minSpecial ?? (policy.requireSpecial ? 1 : 0);
    if (specialCount < reqSpecial) {
        errors.push(`Password must contain at least ${reqSpecial} special character(s).`);
    }

    // Check forbidden patterns
    if (policy.forbiddenPatterns) {
        for (const pattern of policy.forbiddenPatterns) {
            if (pattern.test(password)) {
                errors.push('Password contains a forbidden pattern.');
            }
        }
    }

    // Check forbidden strings
    if (policy.forbiddenStrings) {
        for (const str of policy.forbiddenStrings) {
            if (password.includes(str)) {
                errors.push(`Password must not contain "${str}".`);
            }
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}
