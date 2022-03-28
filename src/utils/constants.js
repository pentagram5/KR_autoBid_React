const prod = {
    PROTOCOL: 'http://',
    URL: '183.96.29.35:3000'
}
const dev = {
    PROTOCOL: 'https://',
    URL: 'autoad.catbellcompany.com'
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;