import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { PublicationMainFocus } from '../../graphql/generated';
import { uploadIpfs } from '../../libs/ipfs';
import { Metadata } from '../../libs/publication-metadata';
import { createProjectIdQuery } from '../../constant/LensContract'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body, 'body')

    const gltfUrl = req.body.file

    const gltfUri = await uploadIpfs<string>(gltfUrl)
    console.log(gltfUri)


const test = {
  version: '2.0.0',
  mainContentFocus: PublicationMainFocus.Embed,
  metadata_id: uuidv4(),
  description: 'Description',
  locale: 'en-US',
  content: 'Content',
  external_url: null,
  image: null,
  imageMimeType: null,
  name: 'Name',
  attributes: [],
  animation_url: gltfUri.path,
  tags: [
    createProjectIdQuery(req.body.projectId),
  ],
  appId: 'api_examples_github',
} as unknown as Metadata
  console.log(test, 'test')

  const uri = await uploadIpfs<Metadata>(test)
  console.log(uri, 'uplopd IPGS')
  res.status(200).json({
    uri: uri,
    path: uri.path
  })
}

