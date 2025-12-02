import { validatePassword, PasswordPolicy } from './validator';

describe('validatePassword', () => {
    it('should validate length', () => {
        const policy: PasswordPolicy = { minLength: 8 };
        expect(validatePassword('short', policy).isValid).toBe(false);
        expect(validatePassword('longenough', policy).isValid).toBe(true);
    });

    it('should validate max length', () => {
        const policy: PasswordPolicy = { maxLength: 5 };
        expect(validatePassword('toolong', policy).isValid).toBe(false);
        expect(validatePassword('short', policy).isValid).toBe(true);
    });

    it('should validate required characters', () => {
        const policy: PasswordPolicy = {
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecial: true,
        };

        expect(validatePassword('abc', policy).isValid).toBe(false);
        expect(validatePassword('Abc1!', policy).isValid).toBe(true);

        const res = validatePassword('abc', policy);
        expect(res.errors).toContain('Password must contain at least 1 uppercase character(s).');
        expect(res.errors).toContain('Password must contain at least 1 number(s).');
        expect(res.errors).toContain('Password must contain at least 1 special character(s).');
    });

    it('should validate minimum character counts', () => {
        const policy: PasswordPolicy = {
            minUppercase: 2,
            minNumbers: 2,
        };

        expect(validatePassword('A1', policy).isValid).toBe(false);
        expect(validatePassword('AB12', policy).isValid).toBe(true);
    });

    it('should validate forbidden strings', () => {
        const policy: PasswordPolicy = {
            forbiddenStrings: ['password', 'admin'],
        };

        expect(validatePassword('mypassword123', policy).isValid).toBe(false);
        expect(validatePassword('superadmin', policy).isValid).toBe(false);
        expect(validatePassword('secure', policy).isValid).toBe(true);
    });

    it('should validate forbidden patterns', () => {
        const policy: PasswordPolicy = {
            forbiddenPatterns: [/\s/], // No whitespace
        };

        expect(validatePassword('no space', policy).isValid).toBe(false);
        expect(validatePassword('nospace', policy).isValid).toBe(true);
    });

    it('should return multiple errors', () => {
        const policy: PasswordPolicy = {
            minLength: 10,
            requireNumbers: true,
        };

        const res = validatePassword('short', policy);
        expect(res.isValid).toBe(false);
        expect(res.errors.length).toBe(2);
        expect(res.errors).toContain('Password must be at least 10 characters long.');
        expect(res.errors).toContain('Password must contain at least 1 number(s).');
    });

    it('should handle empty password', () => {
        const policy: PasswordPolicy = { minLength: 5 };
        const res = validatePassword('', policy);
        expect(res.isValid).toBe(false);
        expect(res.errors).toContain('Password is empty');
    });
});
