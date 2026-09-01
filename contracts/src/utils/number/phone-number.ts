export function formatToIranianE164(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.startsWith('09') && cleaned.length === 11) {
        return `+98${cleaned.slice(1)}`;
    }

    if (cleaned.startsWith('9') && cleaned.length === 10) {
        return `+98${cleaned}`;
    }

    if (cleaned.startsWith('989') && cleaned.length === 12) {
        return `+${cleaned}`;
    }

    throw new Error(`Invalid Iranian mobile phone number format: "${phone}"`);
}