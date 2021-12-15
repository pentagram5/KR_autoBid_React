const prod = {
    PROTOCOL: 'https://',
    URL: 'autoad.catbellcompany.com'
}
const dev = {
    PROTOCOL: 'https://',
    URL: 'autoad.catbellcompany.com'
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;