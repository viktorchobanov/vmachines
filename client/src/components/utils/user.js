import jwt from 'jsonwebtoken';

export function getUser() {
    return localStorage.getItem('jwtToken') && jwt.decode(localStorage.getItem('jwtToken')).username;
}