import request from 'superagent'
import prefix from 'superagent-prefix'

const baseUrl = 'http://localhost:3000'

export default (method, path) => request(method, path).use(prefix(baseUrl))
