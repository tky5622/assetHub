export interface SignatureContext {
  signature?: string
}

export interface GenericMetadata {
  /**
   * The metadata version.
   */
  version: string

  /**
   * The metadata id can be anything but if your uploading to ipfs
   * you will want it to be random.. using uuid could be an option!
   */
  metadata_id: string
  /**
   *  Signed metadata to validate the owner
   */
  signatureContext?: SignatureContext
  /**
   * This is the appId the content belongs to
   */
  appId?: string
}

export enum MetadataDisplayType {
  number = 'number',
  string = 'string',
  date = 'date',
}

interface MetadataMedia {
  item: string
  /**
   * This is the mime type of media
   */
  type: string
}

export interface MetadataAttribute {
  displayType?: MetadataDisplayType
  traitType?: string
  value: string
}

export interface Metadata extends GenericMetadata {
  description?: string
  content?: string
  external_url?: string | null
  name: string
  attributes: MetadataAttribute[]
  image?: string | null
  imageMimeType?: string | null
  media?: MetadataMedia[]
  animation_url?: string
  locale: string
  tags?: string[]
  contentWarning?: PublicationContentWarning
  mainContentFocus: PublicationMainFocus
}

export enum PublicationContentWarning {
  NSFW = 'NSFW',
  SENSITIVE = 'SENSITIVE',
  SPOILER = 'SPOILER',
}

export enum PublicationMainFocus {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  ARTICLE = 'ARTICLE',
  TEXT_ONLY = 'TEXT_ONLY',
  AUDIO = 'AUDIO',
  LINK = 'LINK',
  EMBED = 'EMBED',
}
