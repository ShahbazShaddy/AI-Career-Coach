import { useState } from 'react'

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_API_URL = import.meta.env.VITE_GROQ_API_URL

export function useGroqChat() {
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (prompt: string): Promise<string> => {
    console.log('Sending message to GROQ API, prompt length:', prompt.length)
    
    if (!GROQ_API_KEY) {
      throw new Error('GROQ API key is not configured. Please add VITE_GROQ_API_KEY to your .env file.')
    }
    
    if (!GROQ_API_URL) {
      throw new Error('GROQ API URL is not configured. Please add VITE_GROQ_API_URL to your .env file.')
    }
    
    setIsLoading(true)
    
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          model: 'llama-3.3-70b-versatile',
          temperature: 0.7,
          max_tokens: 1500,
        }),
      })

      console.log('GROQ API response status:', response.status)

      if (!response.ok) {
        const errorData = await response.text()
        console.error('GROQ API error:', errorData)
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      console.log('GROQ API response received, choices:', data.choices?.length)
      
      const message = data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t generate a response. Please try again.'
      return message
    } catch (error) {
      console.error('Error in GROQ API call:', error)
      throw new Error('Failed to get AI response. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return { sendMessage, isLoading }
}