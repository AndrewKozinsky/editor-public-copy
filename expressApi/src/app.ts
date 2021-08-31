import * as express from 'express'
import { Application, Request, Response } from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
const cookieParser = require('cookie-parser')
import userRouter from './routes/userRouter'
import siteRouter from './routes/siteRouter'
import { AppError } from './errors/appError'
import { globalErrorHandler } from './controllers/errorController'
import { addExtraHeaders } from './middlewares/commonMiddlewares'
import componentsFoldersRouter from './routes/componentsFoldersRouter'
import componentRouter from './routes/componentRouter'
import articlesFoldersRouter from './routes/articlesFoldersRouter'
import articleRouter from './routes/articleRouter'


const app: Application = express()

// Разбор кук
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
// Разбор тела запроса
app.use(bodyParser.json())

app.use(express.json({limit: '10kb'}))

app.use(express.static(path.join(__dirname, 'staticFiles')))

// Установка в req.headers.lang английского языка если язык не передан
app.use(addExtraHeaders)


app.get('/', function (req: Request, res: Response) {
    res.send('Our api server is working correctly.')
})

// Маршруты API
app.use('/users/', userRouter)
app.use('/sites/', siteRouter)
app.use('/componentsFolders/', componentsFoldersRouter)
app.use('/components/', componentRouter)
app.use('/articlesFolders/', articlesFoldersRouter)
app.use('/articles/', articleRouter)

// Статические файлы на сервере.
app.use(express.static(path.join(__dirname, 'staticFiles')))

// Обработка несуществующего маршрута
app.all("*", (req, res, next) => {
    next(
        new AppError(null, `Can't find ${req.originalUrl} on the server!`, 404)
    )
})

// Глобальный обработчик ошибок
app.use(globalErrorHandler)

export default app