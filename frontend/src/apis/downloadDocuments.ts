import { apiClient } from './api'
import type { ConvertDocumentsResponse, DownloadDocumentsRequest } from '../types/document'

export const downloadDocuments = async (documents: ConvertDocumentsResponse): Promise<Blob> => {
  const requestBody = documents.map(doc => ({
    fileName: doc.fileName,
    content: doc.content
  }))

  return await apiClient.post<Blob>('/download', requestBody, {
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}