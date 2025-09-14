import { useState } from 'react'
import { LandingPage } from '@/components/LandingPage'
import { ChatbotDemo } from '@/components/ChatbotDemo'
import { ContactModal } from '@/components/ContactModal'

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'demo'>('landing')
  const [showContact, setShowContact] = useState(false)

  console.log('App rendered with currentPage:', currentPage)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {currentPage === 'landing' && (
        <LandingPage 
          onDemo={() => {
            console.log('Switching to demo page')
            setCurrentPage('demo')
          }}
          onContact={() => {
            console.log('Opening contact modal')
            setShowContact(true)
          }}
        />
      )}
      
      {currentPage === 'demo' && (
        <ChatbotDemo 
          onBack={() => {
            console.log('Returning to landing page')
            setCurrentPage('landing')
          }}
        />
      )}

      <ContactModal 
        isOpen={showContact} 
        onClose={() => setShowContact(false)} 
      />
    </div>
  )
}

export default App