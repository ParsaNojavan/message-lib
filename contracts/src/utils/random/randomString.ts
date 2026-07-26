export default function generateRandomId(length = 4): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export function generateRandom(string: boolean, number: boolean, length = 4): string {
    const strings = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const chars = (string && strings || '') + (number && numbers || '')
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}  