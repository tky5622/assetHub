import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body, 'body')
  res.status(200).json({ name: 'John Doe' })

}
