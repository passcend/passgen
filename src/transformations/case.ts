export type CaseType = 'lowercase' | 'uppercase' | 'titlecase';

export function transformCase(text: string, type: CaseType): string {
    if (!text) return text;
    switch (type) {
        case 'lowercase':
            return text.toLowerCase();
        case 'uppercase':
            return text.toUpperCase();
        case 'titlecase':
            // Capitalize first letter, lower case the rest
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        default:
            return text;
    }
}
