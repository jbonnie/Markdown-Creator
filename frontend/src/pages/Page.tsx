import { useState } from 'react'
import FileUpload from '../components/FileUpload'
import Spinner from '../components/Spinner'
import './css/Page.css'

function Page() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isConverting, setIsConverting] = useState(false)

  const handleFilesSelect = (files: File[]) => {
    setSelectedFiles(files)
  }

  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      alert('파일을 선택해주세요.')
      return
    }

    setIsConverting(true)

    setTimeout(() => {
      console.log('변환할 파일:', selectedFiles)
      setIsConverting(false)
    }, 2000)
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Markdown Creator</h1>
      <p className="page-subtitle">Transform your documents into markdown format</p>

      <FileUpload onFilesSelect={handleFilesSelect} />

      {selectedFiles.length > 0 && !isConverting && (
        <div className="button-container">
          <button className="convert-button" onClick={handleConvert}>
            변환하기
          </button>
        </div>
      )}

      {isConverting && <Spinner size="large" message="문서 변환 중..." />}
    </div>
  )
}

export default Page