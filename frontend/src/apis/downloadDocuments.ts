import axios from 'axios'
import type { ConvertDocumentsResponse } from '../types/document'

interface DownloadResponse {
  blob: Blob
  fileName: string | null
}

export const downloadDocuments = async (documents: ConvertDocumentsResponse): Promise<DownloadResponse> => {
  const requestBody = documents.map(doc => ({
    fileName: doc.fileName,
    content: doc.content
  }))

  const response = await axios.post('http://localhost:8080/api/v1/download', requestBody, {
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Content-Disposition 헤더에서 파일명 추출
  const contentDisposition = response.headers['content-disposition']
  let fileName: string | null = null

  if (contentDisposition) {
    const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition)
    if (matches && matches[1]) {
      fileName = matches[1].replace(/['"]/g, '')
    }
  }

  return {
    blob: response.data,
    fileName
  }
}