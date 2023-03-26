import type { Express, ErrorRequestHandler } from 'express'
import multer from 'multer'
import bodyParser from 'body-parser'
import { body } from 'express-validator'


const fileTypes = {
  'image/png': '.png',
  'image/jpg': '.jpg',
  'image/jpeg': '.jpeg',
}

const storage = multer.diskStorage({
  destination: 'files/amity-upload/',
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`

    cb(null, `${file.fieldname}-${uniqueSuffix}${fileTypes?.[file.mimetype] || ''}`)
  },
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (fileTypes?.[file.mimetype]) {
      cb(null, true)
    } else {
      cb(null, false)

      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  },
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {}

export const extendExpressApp = async (app: Express, commonContext: Object) => {
  app.use('/', async (req, res, next) => {
    // Add context to the req
    req.context = await commonContext.withRequest(req, res)
    next()
  })

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  // parse the errorhandler
  app.use(errorHandler)


}
