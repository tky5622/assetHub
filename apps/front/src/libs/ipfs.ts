import { create } from 'ipfs-http-client'
import { INFURA_PROJECT_ID, INFURA_SECRET } from '../constant/ipfsSetting'

const projectId = INFURA_PROJECT_ID

const secret = INFURA_SECRET
const auth = 'Basic ' + Buffer.from(projectId + ':' + secret).toString('base64')


import { Web3Storage } from 'web3.storage'

// Construct with token and endpoint
const client = new Web3Storage({ token: API_TOKEN })

const fileInput = document.querySelector('input[type="file"]')

// Pack files into a CAR and send to web3.storage
const rootCid = await client.put(fileInput.files) // Promise<CIDString>

// Get info on the Filecoin deals that the CID is stored in
const info = await client.status(rootCid) // Promise<Status | undefined>

// Fetch and verify files from web3.storage
const res = await client.get(rootCid) // Promise<Web3Response | null>
const files = await res.files() // Promise<Web3File[]>
for (const file of files) {
  console.log(`${file.cid} ${file.name} ${file.size}`)
}


// const client = create({
//   url: 'https://ipfs.infura.io:5001/api/v0',
//   headers: {
//     auth,
//   },
// })



// `Basic ${Buffer.from(
//       `${projectId}:${secret}`,
//       'utf-8'
//     ).toString('base64')}`,
// const client = create({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https',
//   headers: {
//     authorization: auth,
//   },
// })

// export const uploadIpfs = async <T>(data: T) => {
//   const client = create({
//     url: 'https://ipfs.infura.io:5001/api/v0',
//     headers: {
//       authorization: auth,
//     },
//   })
//   const added = await client.add(JSON.stringify(data), {
// progress: (prog) => console.log(`received: ${prog}`)
// }
// )
//   const newMetadataURI = `https://ipfs.infura.io/ipfs/${added.path}`


//   console.log('upload result ipfs', newMetadataURI)
//   return newMetadataURI
// }
