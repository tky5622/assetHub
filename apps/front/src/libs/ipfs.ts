import { create } from 'ipfs-http-client'
import { INFURA_PROJECT_ID, INFURA_SECRET } from '../config/config'

const projectId = INFURA_PROJECT_ID
const secret = INFURA_SECRET

console.log(INFURA_PROJECT_ID, INFURA_SECRET)

const auth = 'Basic ' + Buffer.from(projectId + ':' + secret).toString('base64')

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  },
})

export const uploadIpfs = async <T>(data: T) => {
  const result = await client.add(JSON.stringify(data))

  console.log('upload result ipfs', result)
  return result
}
