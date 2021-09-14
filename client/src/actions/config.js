export default function config(token) {
    return {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
}