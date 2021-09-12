export function config(token) {
    return {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
}