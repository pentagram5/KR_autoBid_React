const prod = {
    PROTOCOL: 'http://',
    URL: '192.168.0.10:3000'
    // URL: 'autoad.catbellcompany.com'
}
const dev = {
    PROTOCOL: 'https://',
    URL: 'autoad.catbellcompany.com'
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;