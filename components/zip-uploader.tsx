"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Upload, FileUp, Check, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ZipUploader() {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === 'application/zip' || droppedFile.name.endsWith('.zip')) {
        setFile(droppedFile)
      } else {
        setStatusMessage('Please upload a zip file')
        setUploadStatus('error')
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const simulateProgress = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)
      if (progress >= 90) {
        clearInterval(interval)
      }
    }, 100)
    return interval
  }

  const handleUpload = async () => {
    if (!file) return
    
    setIsUploading(true)
    setUploadStatus('idle')
    setUploadProgress(0)
    
    const progressInterval = simulateProgress()
    
    try {
      const formData = new FormData()
      formData.append('zipFile', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      
      const result = await response.json()
      
      if (response.ok) {
        setUploadStatus('success')
        setStatusMessage(result.message || 'Components uploaded successfully')
        setTimeout(() => {
          setIsOpen(false)
          // Reload the page to show new components
          window.location.reload()
        }, 2000)
      } else {
        setUploadStatus('error')
        setStatusMessage(result.error || 'Failed to upload components')
      }
    } catch (error) {
      clearInterval(progressInterval)
      setUploadStatus('error')
      setStatusMessage('An error occurred during upload')
    } finally {
      setIsUploading(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setUploadStatus('idle')
    setUploadProgress(0)
    setStatusMessage('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) resetForm()
    }}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Upload Components
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Upload Components Zip</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
            } ${file ? 'bg-muted/20' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!file ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <FileUp className="h-12 w-12 text-muted-foreground/50" />
                <div>
                  <p className="text-sm font-medium">
                    Drag and drop your zip file here or{' '}
                    <label className="text-primary cursor-pointer hover:underline">
                      browse
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".zip,application/zip" 
                        onChange={handleFileChange}
                      />
                    </label>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    The zip file should contain component files and a metadata.json file
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="flex items-center space-x-2">
                  <FileUp className="h-6 w-6 text-primary" />
                  <span className="font-medium">{file.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setFile(null)}
                  disabled={isUploading}
                >
                  Change file
                </Button>
              </div>
            )}
          </div>
          
          {uploadStatus !== 'idle' && (
            <Alert 
              className={`mt-4 ${
                uploadStatus === 'success' ? 'bg-green-500/10 text-green-500' : 
                uploadStatus === 'error' ? 'bg-red-500/10 text-red-500' : ''
              }`}
            >
              {uploadStatus === 'success' ? (
                <Check className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>{statusMessage}</AlertDescription>
            </Alert>
          )}
          
          {isUploading && (
            <div className="mt-4 space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                Uploading and processing components...
              </p>
            </div>
          )}
          
          <div className="flex justify-end mt-6 space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpload} 
              disabled={!file || isUploading}
            >
              Upload
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
