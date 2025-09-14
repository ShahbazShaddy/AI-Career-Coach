import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Linkedin, ExternalLink, MessageCircle } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  console.log('ContactModal rendered, isOpen:', isOpen)

  const handleEmailClick = () => {
    console.log('Opening email client')
    window.location.href = 'mailto:bsf1800638@ue.edu.pk'
  }

  const handleLinkedInClick = () => {
    console.log('Opening LinkedIn profile')
    window.open('https://www.linkedin.com/in/dilawar-ali-02a2382a5/', '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-slate-900/95 border-white/20 backdrop-blur-sm mx-4">
        <DialogHeader className="text-center pb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-white text-xl sm:text-2xl">Let's Connect</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Ready to transform your career? Let's connect and discuss how our AI-powered career coaching can help you land your dream job.
            </p>
          </div>
          
          <div className="grid gap-4">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group" onClick={handleEmailClick}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-white text-base">Send Email</div>
                    <div className="text-sm text-gray-400 break-all">bsf1800638@ue.edu.pk</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group" onClick={handleLinkedInClick}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-white text-base">LinkedIn Profile</div>
                    <div className="text-sm text-gray-400">Professional Network</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="pt-4 border-t border-white/20 text-center">
            <p className="text-gray-400 text-sm">
              We typically respond within 24 hours
            </p>
            <div className="flex justify-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 text-xs">Available now</span>
            </div>
          </div>

          <Button
            onClick={onClose}
            variant="outline"
            className="w-full border-purple-400/50 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 hover:border-purple-400 transition-all duration-300 bg-transparent"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}