import { useState } from 'react'
import { convertDocuments } from '../apis/convertDocuments'
import { MarkdownDocument } from '../types/document'
import { ApiException } from '../types/api'

interface UseConvertDocumentsReturn {
  documents: MarkdownDocument[]
  isLoading: boolean
  error: string | null
  convert: (files: File[]) => Promise<void>
  reset: () => void
}

export const useConvertDocuments = (): UseConvertDocumentsReturn => {
  const [documents, setDocuments] = useState<MarkdownDocument[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const convert = async (files: File[]) => {
    if (files.length === 0) {
      setError('파일을 선택해주세요.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await convertDocuments(files)
      setDocuments(result)
      console.log('변환 성공:', result)
    } catch (err) {
      if (err instanceof ApiException) {
        setError(`변환 실패: ${err.message} (${err.status})`)
      } else if (err instanceof Error) {
        setError(`변환 실패: ${err.message}`)
      } else {
        setError('문서 변환 중 알 수 없는 오류가 발생했습니다.')
      }
      console.error('변환 에러:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setDocuments([])
    setError(null)
  }

  return {
    documents,
    isLoading,
    error,
    convert,
    reset,
  }
}