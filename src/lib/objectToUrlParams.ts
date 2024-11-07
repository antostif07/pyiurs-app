export function objectToUrlParams(obj: { [key: string]: any }): string {
    const params: string[] = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
        }
    }
    return params.join('&');
}