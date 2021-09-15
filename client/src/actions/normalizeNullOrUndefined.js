export const normalizeNullOrUndefined = (value) => {
    if (value === 'undefined') return undefined;
    if (value === 'null') return null;
    return value;
};