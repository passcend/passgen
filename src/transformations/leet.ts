export function leetSpeak(text: string): string {
    const map: { [key: string]: string } = {
        'a': '4', 'A': '4',
        'e': '3', 'E': '3',
        'i': '1', 'I': '1',
        'o': '0', 'O': '0',
        's': '5', 'S': '5',
        't': '7', 'T': '7',
        'b': '8', 'B': '8',
        'g': '9', 'G': '9',
        'l': '1', 'L': '1',
        'z': '2', 'Z': '2'
    };
    return text.split('').map(char => map[char] || char).join('');
}
