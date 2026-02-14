import { apiClient } from './api'
import type { ConvertDocumentsResponse } from '../types/document'

export const convertDocuments = async (files: File[]): Promise<ConvertDocumentsResponse> => {
  const formData = new FormData()

  files.forEach((file) => {
    formData.append('files', file)
  })

  return await apiClient.post<ConvertDocumentsResponse>('/convert', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 60000 * 5, // 5분
  })
}