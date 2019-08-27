export function verifyUser() {
    const isAdmin = localStorage.getItem('pausework-info');
    const token = localStorage.getItem('pausework-token');
    return [isAdmin, token];
}