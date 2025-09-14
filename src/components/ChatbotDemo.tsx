import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Upload, Send, Bot, User, FileText, Settings, File, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useGroqChat } from '@/hooks/useGroqChat'
import { usePdfConverter } from '@/hooks/usePdfConverter'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
// Import markdown components
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

interface ChatbotDemoProps {
  onBack: () => void
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function ChatbotDemo({ onBack }: ChatbotDemoProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Career Coach. Upload your resume (PDF or TXT) and tell me about the job you\'re targeting, and I\'ll provide personalized feedback to help you land that position.',
      timestamp: new Date()
    }
  ])
  
  const [jobTitle, setJobTitle] = useState('')
  const [jobRequirements, setJobRequirements] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('')
  const [resumeText, setResumeText] = useState('')
  const [currentMessage, setCurrentMessage] = useState('')
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [uploadStatus, setUploadStatus] = useState<'none' | 'uploading' | 'success' | 'error'>('none')
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { sendMessage, isLoading } = useGroqChat()
  const { convertPdfToText, isConverting } = usePdfConverter()

  console.log('ChatbotDemo rendered with messages:', messages.length)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    console.log('File selected:', {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: new Date(file.lastModified).toISOString()
    })
    
    setUploadedFileName(file.name)
    setUploadStatus('uploading')
    setUploadError('')
    
    try {
      let content = ''
      
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        console.log('Processing PDF file...')
        toast.info('Converting PDF to text...', { duration: 3000 })
        content = await convertPdfToText(file)
        console.log('PDF conversion completed, content length:', content.length)
      } else if (file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt')) {
        console.log('Processing TXT file...')
        const reader = new FileReader()
        content = await new Promise<string>((resolve, reject) => {
          reader.onload = (e) => {
            const result = e.target?.result as string
            console.log('TXT file read, content length:', result.length)
            resolve(result)
          }
          reader.onerror = () => {
            console.error('FileReader error:', reader.error)
            reject(new Error('Failed to read text file'))
          }
          reader.readAsText(file)
        })
      } else {
        throw new Error(`Unsupported file type: ${file.type || 'unknown'}. Please upload a PDF or TXT file.`)
      }

      if (!content.trim()) {
        throw new Error('The uploaded file appears to be empty or contains no readable text.')
      }

      setResumeText(content)
      setUploadStatus('success')
      toast.success('Resume uploaded and processed successfully!', { 
        description: `Extracted ${content.length} characters from ${file.name}`,
        duration: 4000 
      })
      console.log('File processing completed successfully')
    } catch (error) {
      console.error('Error processing file:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to process file'
      setUploadStatus('error')
      setUploadError(errorMessage)
      toast.error('Upload Failed', { 
        description: errorMessage,
        duration: 5000 
      })
      setUploadedFileName('')
      setResumeText('')
    }
  }

  const generatePrompt = (userMessage: string) => {
    const basePrompt = `You are an expert AI Career Coach and Resume Analyzer with years of experience in recruitment and career development.
    
Job Context:
- Target Job Title: ${jobTitle || 'Not specified'}
- Job Requirements: ${jobRequirements || 'Not specified'}
- Experience Level: ${experienceLevel || 'Not specified'}

Resume Content:
${resumeText || 'No resume uploaded yet'}

User Question: ${userMessage}

Please provide specific, actionable advice to help improve this resume for the target position. Focus on:

1. **Content Analysis**: What's missing or could be improved in the resume content
2. **Skills Alignment**: How well current skills match the job requirements
3. **Keyword Optimization**: Important keywords that should be included
4. **Structure & Format**: Improvements to layout and organization
5. **Achievement Highlighting**: Better ways to showcase accomplishments with quantifiable results
6. **Industry Standards**: Best practices specific to this role/industry

Be specific, constructive, and provide concrete examples where possible. Format your response clearly with sections and bullet points for easy reading.`

    return basePrompt
  }

  const renderMarkdown = (content: string) => {
    return (
      <ReactMarkdown 
        className="markdown-content text-sm sm:text-base" 
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 {...props} className="text-xl font-bold my-3 text-purple-300" />,
          h2: ({node, ...props}) => <h2 {...props} className="text-lg font-bold my-2 text-purple-300" />,
          h3: ({node, ...props}) => <h3 {...props} className="text-md font-bold my-2 text-purple-300" />,
          h4: ({node, ...props}) => <h4 {...props} className="font-bold my-2 text-purple-300" />,
          p: ({node, ...props}) => <p {...props} className="mb-3 leading-relaxed" />,
          ul: ({node, ...props}) => <ul {...props} className="mb-3 ml-4 list-disc space-y-1" />,
          ol: ({node, ...props}) => <ol {...props} className="mb-3 ml-4 list-decimal space-y-1" />,
          li: ({node, ...props}) => <li {...props} className="mb-1 pl-1" />,
          a: ({node, ...props}) => <a {...props} className="text-blue-400 hover:underline" />,
          blockquote: ({node, ...props}) => <blockquote {...props} className="border-l-4 border-purple-400/30 pl-3 my-2 italic text-gray-300" />,
          code: ({node, inline, ...props}) => 
            inline ? 
              <code {...props} className="bg-white/10 px-1 py-0.5 rounded text-purple-200 font-mono text-sm" /> : 
              <code {...props} className="block bg-black/30 p-3 rounded-md font-mono text-sm whitespace-pre-wrap my-3 text-purple-200 overflow-auto" />,
          pre: ({node, ...props}) => <pre {...props} className="my-3" />,
          strong: ({node, ...props}) => <strong {...props} className="font-semibold text-purple-300" />,
          em: ({node, ...props}) => <em {...props} className="italic text-cyan-300" />,
          table: ({node, ...props}) => <table {...props} className="border-collapse table-auto w-full my-3" />,
          thead: ({node, ...props}) => <thead {...props} className="bg-white/5" />,
          tbody: ({node, ...props}) => <tbody {...props} />,
          tr: ({node, ...props}) => <tr {...props} className="border-b border-white/10" />,
          th: ({node, ...props}) => <th {...props} className="p-2 text-left text-purple-300 font-semibold" />,
          td: ({node, ...props}) => <td {...props} className="p-2" />,
          hr: ({node, ...props}) => <hr {...props} className="my-4 border-white/20" />,
        }}
      >
        {content}
      </ReactMarkdown>
    )
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    console.log('Sending message:', currentMessage)
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setCurrentMessage('')

    try {
      const prompt = generatePrompt(currentMessage)
      const response = await sendMessage(prompt)
      
      console.log('Received AI response:', response.substring(0, 100) + '...')
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to get AI response. Please try again.')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading':
        return <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    if (isConverting) return 'Converting PDF...'
    switch (uploadStatus) {
      case 'uploading':
        return 'Processing file...'
      case 'success':
        return `✓ ${uploadedFileName} (${resumeText.length.toLocaleString()} characters)`
      case 'error':
        return `✗ ${uploadError || 'Upload failed'}`
      default:
        return 'No file uploaded'
    }
  }

  const resetUpload = () => {
    setUploadStatus('none')
    setUploadedFileName('')
    setResumeText('')
    setUploadError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen p-2 sm:p-4 lg:p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 lg:mb-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-purple-400/50 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 hover:border-purple-400 transition-all duration-300 w-full sm:w-auto bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">AI Career Coach Demo</h1>
            <p className="text-sm text-gray-400 mt-1 hidden sm:block">Get personalized resume feedback and career guidance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Settings Panel */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2 text-lg">
                  <Settings className="w-5 h-5" />
                  Job Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-white text-sm font-medium">Target Job Title</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Software Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm focus:border-purple-400 focus:ring-purple-400/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel" className="text-white text-sm font-medium">Experience Level</Label>
                  <Input
                    id="experienceLevel"
                    placeholder="e.g., Mid-level (3-5 years)"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm focus:border-purple-400 focus:ring-purple-400/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobRequirements" className="text-white text-sm font-medium">Job Requirements</Label>
                  <Textarea
                    id="jobRequirements"
                    placeholder="Paste key requirements from the job posting..."
                    value={jobRequirements}
                    onChange={(e) => setJobRequirements(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-20 text-sm resize-none focus:border-purple-400 focus:ring-purple-400/20"
                  />
                </div>

                {/* Parameters Summary */}
                {(jobTitle || experienceLevel) && (
                  <div className="pt-2 border-t border-white/20">
                    <p className="text-xs text-gray-400 mb-2">Current Parameters:</p>
                    <div className="flex flex-wrap gap-1">
                      {jobTitle && <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-300 border-purple-400/30">{jobTitle}</Badge>}
                      {experienceLevel && <Badge variant="outline" className="text-xs border-cyan-400/30 text-cyan-300">{experienceLevel}</Badge>}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5" />
                  Resume Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isConverting || uploadStatus === 'uploading'}
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200 hover:border-cyan-400 transition-all duration-300 h-11 bg-transparent"
                  disabled={isConverting || uploadStatus === 'uploading'}
                >
                  {isConverting || uploadStatus === 'uploading' ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 mr-2" />
                  )}
                  Upload Resume
                </Button>

                {/* Upload Status */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    {getStatusIcon()}
                    <span className={cn(
                      "text-sm flex-1",
                      uploadStatus === 'success' && "text-green-400",
                      uploadStatus === 'error' && "text-red-400",
                      uploadStatus === 'uploading' && "text-blue-400",
                      uploadStatus === 'none' && "text-gray-400"
                    )}>
                      {getStatusText()}
                    </span>
                    {uploadStatus === 'error' && (
                      <Button
                        onClick={resetUpload}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1 h-auto"
                      >
                        Reset
                      </Button>
                    )}
                  </div>
                  
                  {uploadStatus === 'error' && uploadError && (
                    <div className="text-xs text-red-300 bg-red-500/10 border border-red-500/20 rounded p-2">
                      {uploadError}
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <File className="w-3 h-3" />
                    <span>Supported: PDF, TXT (Max 10MB)</span>
                  </div>
                  <p>PDF files are automatically converted to text for AI analysis using ConvertAPI</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm flex flex-col" style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>
              <CardHeader className="pb-4 flex-shrink-0">
                <CardTitle className="text-white flex items-center gap-2 text-lg">
                  <Bot className="w-5 h-5" />
                  Chat with Your AI Career Coach
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2" style={{ maxHeight: 'calc(100% - 150px)' }}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-2 sm:gap-3",
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-lg text-sm sm:text-base overflow-hidden",
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-white/10 text-white border border-white/20'
                        )}
                      >
                        <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                          {message.role === 'user' ? (
                            <User className="w-3 h-3 sm:w-4 sm:h-4" />
                          ) : (
                            <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                          )}
                          <span className="text-xs sm:text-sm font-medium">
                            {message.role === 'user' ? 'You' : 'AI Coach'}
                          </span>
                          <span className="text-xs text-gray-400 ml-auto">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="break-words overflow-wrap-anywhere hyphens-auto">
                          {message.role === 'assistant' ? (
                            renderMarkdown(message.content)
                          ) : (
                            <div className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                              {message.content}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-2 sm:gap-3 justify-start">
                      <div className="bg-white/10 text-white border border-white/20 p-3 sm:p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                          <span className="text-xs sm:text-sm font-medium">AI Coach</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <Separator className="bg-white/20 mb-4 flex-shrink-0" />

                {/* Message Input */}
                <div className="space-y-3 flex-shrink-0">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                      <Textarea
                        placeholder="Ask for resume feedback, career advice, or job matching tips..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[44px] max-h-[120px] text-sm resize-none focus:border-purple-400 focus:ring-purple-400/20"
                        rows={1}
                      />
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={isLoading || !currentMessage.trim()}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-11 px-4 sm:px-6 transition-all duration-300 flex-shrink-0"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      <span className="hidden sm:inline ml-2">Send</span>
                    </Button>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-400/50 text-green-300 hover:bg-green-500/20 hover:text-green-200 hover:border-green-400 text-xs transition-all duration-300 bg-transparent"
                      onClick={() => setCurrentMessage("Please analyze my resume and suggest improvements")}
                      disabled={isLoading || !resumeText}
                    >
                      Analyze Resume
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-400/50 text-blue-300 hover:bg-blue-500/20 hover:text-blue-200 hover:border-blue-400 text-xs transition-all duration-300 bg-transparent"
                      onClick={() => setCurrentMessage("How can I improve my skills for this position?")}
                      disabled={isLoading}
                    >
                      Skill Advice
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-yellow-400/50 text-yellow-300 hover:bg-yellow-500/20 hover:text-yellow-200 hover:border-yellow-400 text-xs transition-all duration-300 bg-transparent"
                      onClick={() => setCurrentMessage("What interview questions should I prepare for?")}
                      disabled={isLoading}
                    >
                      Interview Tips
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}