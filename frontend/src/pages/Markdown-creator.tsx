import { useState } from 'react'
import FileUpload from '../components/FileUpload'
import Spinner from '../components/Spinner'
import { useConvertDocuments } from '../hooks/useConvertDocuments'
import './css/Markdown-creator.css'

function MarkdownCreator() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const { documents, isLoading, error, convert, reset } = useConvertDocuments(selectedFiles)

  const handleFilesSelect = (files: File[]) => {
    setSelectedFiles(files)
    reset() // 새 파일 선택 시 이전 결과 초기화
  }

  const handleConvert = async () => {
    await convert()
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Document Converter</h1>
      <p className="page-subtitle">Transform your documents into markdown format</p>

      <FileUpload onFilesSelect={handleFilesSelect} />

      {error && (
        <div className="error-message" style={{ marginTop: '20px', maxWidth: '600px' }}>
          ⚠️ {error}
        </div>
      )}

      {selectedFiles.length > 0 && !isLoading && !documents && (
        <div className="button-container">
          <button className="convert-button" onClick={handleConvert}>
            변환하기
          </button>
        </div>
      )}

      {isLoading && <Spinner size="large" message="문서 변환 중..." />}

      {documents && documents.length > 0 && (
        <div style={{ marginTop: '40px', color: '#e2e8f0', width: '100%', maxWidth: '800px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
            변환 완료! ({documents.length}개 문서)
          </h2>
          {documents.map((doc, index) => (
            <div
              key={index}
              style={{
                marginBottom: '30px',
                background: 'rgba(30, 41, 59, 0.5)',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(148, 163, 184, 0.1)'
              }}
            >
              <h3 style={{ marginBottom: '10px', color: '#e2e8f0' }}>{doc.fileName}</h3>
              <p style={{ marginBottom: '15px', color: '#94a3b8', fontSize: '14px' }}>
                크기: {(doc.fileSize / 1024).toFixed(2)} KB
              </p>
              <pre style={{
                background: 'rgba(15, 23, 42, 0.5)',
                padding: '20px',
                borderRadius: '8px',
                overflow: 'auto',
                maxHeight: '400px',
                color: '#e2e8f0',
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                {doc.content}
              </pre>
            </div>
          ))}

          <div className="button-container">
            <button
              className="convert-button"
              onClick={() => {
                setSelectedFiles([])
                reset()
              }}
              style={{ marginTop: '20px' }}
            >
              새 문서 변환
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MarkdownCreator