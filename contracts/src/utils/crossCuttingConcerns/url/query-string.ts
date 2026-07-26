export function toQueryString(obj: Record<string, any>, prefix = ""): string {
    const pairs: string[] = [];

    for (const [key, value] of Object.entries(obj)) {
        const k = prefix ? `${prefix}[${key}]` : key;

        if (typeof value === "object" && value !== null) {
            pairs.push(toQueryString(value, k));
        } else {
            pairs.push(`${encodeURIComponent(k)}=${encodeURIComponent(String(value))}`);
        }
    }

    return pairs.join("&");
}