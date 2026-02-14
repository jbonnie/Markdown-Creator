import { apiClient } from './api'
import { MarkdownDocument } from '../types/document'

export const convertDocuments = async (files: File[]): Promise<MarkdownDocument[]> => {
  const formData = new FormData()

  files.forEach((file) => {
    formData.append('files', file)
  })

  return await apiClient.post<MarkdownDocument[]>('/convert', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}