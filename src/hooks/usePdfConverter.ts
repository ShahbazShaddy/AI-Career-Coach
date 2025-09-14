import { useState } from 'react'
import { toast } from 'sonner'

const CONVERT_API_SECRET = import.meta.env.VITE_CONVERT_API_SECRET
const CONVERT_API_URL = import.meta.env.VITE_CONVERT_API_URL

export function usePdfConverter() {
  const [isConverting, setIsConverting] = useState(false)

  const convertPdfToText = async (file: File): Promise<string> => {
    console.log('Converting PDF to text, file size:', file.size, 'bytes')
    
    if (!CONVERT_API_SECRET) {
      throw new Error('ConvertAPI secret is not configured. Please add VITE_CONVERT_API_SECRET to your .env file.')
    }
    
    if (!CONVERT_API_URL) {
      throw new Error('ConvertAPI URL is not configured. Please add VITE_CONVERT_API_URL to your .env file.')
    }
    
    setIsConverting(true)
    
    try {
      // Create FormData for the API request
      const formData = new FormData()
      formData.append('File', file)
      formData.append('Secret', CONVERT_API_SECRET)
      formData.append('StoreFile', 'true')

      console.log('Sending PDF to ConvertAPI with secret:', CONVERT_API_SECRET.substring(0, 10) + '...')
      
      const response = await fetch(`${CONVERT_API_URL}?Secret=${CONVERT_API_SECRET}`, {
        method: 'POST',
        body: formData,
      })

      console.log('ConvertAPI response status:', response.status)
      console.log('ConvertAPI response headers:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        console.error('ConvertAPI error response:', errorText)
        
        let errorMessage = `PDF conversion failed with status ${response.status}`
        try {
          const errorJson = JSON.parse(errorText)
          if (errorJson.Message) {
            errorMessage += `: ${errorJson.Message}`
          }
        } catch (parseError) {
          errorMessage += `: ${errorText}`
        }
        
        throw new Error(errorMessage)
      }

      const result = await response.json()
      console.log('ConvertAPI result received:', result)
      
      // Check if conversion was successful and files were returned
      if (!result.Files || result.Files.length === 0) {
        console.error('No converted files in response:', result)
        throw new Error('No converted files received from API')
      }

      // Get the first converted file
      const convertedFile = result.Files[0]
      console.log('Converted file info:', {
        fileName: convertedFile.FileName,
        fileSize: convertedFile.FileSize,
        url: convertedFile.Url
      })

      // Download the converted text file from the provided URL
      console.log('Downloading converted text from:', convertedFile.Url)
      const textResponse = await fetch(convertedFile.Url, {
        method: 'GET',
        headers: {
          'Accept': 'text/plain, */*'
        }
      })
      
      if (!textResponse.ok) {
        console.error('Failed to download converted text, status:', textResponse.status)
        throw new Error(`Failed to download converted text: ${textResponse.status}`)
      }

      const textContent = await textResponse.text()
      console.log('PDF converted successfully! Text length:', textContent.length, 'characters')
      
      // Log first 200 characters for debugging
      console.log('Text preview:', textContent.substring(0, 200) + '...')
      
      if (!textContent.trim()) {
        throw new Error('Converted text is empty. The PDF might not contain readable text.')
      }

      return textContent.trim()
    } catch (error) {
      console.error('Error in PDF conversion process:', error)
      
      // More specific error messages
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error during PDF conversion. Please check your connection and try again.')
      } else if (error instanceof Error) {
        throw error
      } else {
        throw new Error('Unknown error occurred during PDF conversion. Please try again.')
      }
    } finally {
      setIsConverting(false)
    }
  }

  return { convertPdfToText, isConverting }
}