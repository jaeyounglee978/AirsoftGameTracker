import { Request, Response } from 'express'

export function defaultResponse (req: Request, res: Response) {
  res.send('Hello World!')
}

export function echo (req: Request, res: Response) {
  res.json(req.query)
}
