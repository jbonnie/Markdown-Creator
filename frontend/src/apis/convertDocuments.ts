import axios from 'axios'
import type { ConvertDocumentsResponse } from '../types/document'

export const convertDocuments = async (files: File[]): Promise<ConvertDocumentsResponse> => {
  const formData = new FormData()

  files.forEach((file) => {
    formData.append('files', file)
  })

  const response = await axios.post<ConvertDocumentsResponse>(
    'http://localhost:8080/api/v1/convert',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000 * 5, // 5분
    }
  )

  return response.data
}