import express from 'express'
import { Express, json } from 'express'
import helmet from 'helmet'
//import routes from '/path/to/Routes.ts"

const app: Express = express()
app.use(helmet())
app.use(json())
//app.use(routes)

export default app