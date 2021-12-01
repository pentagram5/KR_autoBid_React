const prod = {
    PROTOCOL: 'http://',
    URL: ''
}
const dev = {
    PROTOCOL: 'http://',
    URL: '218.52.115.188:8000'
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;