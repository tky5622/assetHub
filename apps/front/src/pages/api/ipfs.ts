import { NextApiRequest, NextApiResponse } from 'next'
import { setProfileMetadata } from '../../libs/set-profile-metadata'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body, 'body')
  setProfileMetadata(req.body.address, req.body, req.body.profileId)
  res.status(200).json({ name: 'John Doe' })
}
