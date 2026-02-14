/* 문서 변환 */
export interface MarkdownDocument {
  fileName: string
  fileSize: number
  content: string
}

export interface ConvertDocumentsRequest {
  files: File[]
}

export interface ConvertDocumentsResponse {
  documents: MarkdownDocument[]
}
