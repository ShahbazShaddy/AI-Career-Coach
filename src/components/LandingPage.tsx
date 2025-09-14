import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Bot, Target, Zap, CheckCircle, Star, Users, FileText, Brain, TrendingUp, Award } from 'lucide-react'

interface LandingPageProps {
  onDemo: () => void
  onContact: () => void
}

export function LandingPage({ onDemo, onContact }: LandingPageProps) {
  console.log('LandingPage component rendered')

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">AI Career Coach</span>
          </div>
          <Button 
            variant="outline" 
            className="border-purple-400/50 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 hover:border-purple-400 transition-all duration-300 text-sm sm:text-base bg-transparent"
            onClick={onContact}
          >
            Contact Us
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 lg:mb-12">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 mb-4 sm:mb-6">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
              <span className="text-purple-300 text-xs sm:text-sm font-medium">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Transform Your Career with
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block sm:inline"> AI-Powered </span>
              Guidance
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              Get personalized resume feedback, career advice, and job matching powered by cutting-edge AI. 
              Land your dream job faster with intelligent insights tailored to your goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                onClick={onDemo}
              >
                Try Demo Now
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200 hover:border-cyan-400 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl w-full sm:w-auto transition-all duration-300 bg-transparent"
                onClick={onContact}
              >
                Get in Touch
              </Button>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 lg:mt-16">
            <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <FileText className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-semibold text-sm">PDF & TXT Support</p>
              <p className="text-gray-400 text-xs mt-1">Upload any format</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Brain className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <p className="text-white font-semibold text-sm">AI Analysis</p>
              <p className="text-gray-400 text-xs mt-1">Smart recommendations</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-white font-semibold text-sm">Career Growth</p>
              <p className="text-gray-400 text-xs mt-1">Personalized guidance</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Award className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold text-sm">Interview Prep</p>
              <p className="text-gray-400 text-xs mt-1">Success strategies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose Our AI Career Coach?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              Advanced AI technology meets career expertise to deliver personalized guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
              <CardContent className="p-6 lg:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Smart Resume Analysis</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  AI analyzes your resume against job requirements and provides specific improvement suggestions with actionable feedback.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
              <CardContent className="p-6 lg:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Personalized Coaching</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Get tailored career advice based on your experience, goals, and current industry trends with real-time guidance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group md:col-span-2 lg:col-span-1">
              <CardContent className="p-6 lg:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Instant Feedback</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Receive immediate, actionable feedback to improve your resume and interview skills with comprehensive analysis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
              <div className="text-white font-semibold mb-1 text-sm sm:text-base">Success Rate</div>
              <div className="text-gray-400 text-xs sm:text-sm">Users land interviews faster</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-pink-400 mb-2 group-hover:scale-110 transition-transform duration-300">10k+</div>
              <div className="text-white font-semibold mb-1 text-sm sm:text-base">Resumes Analyzed</div>
              <div className="text-gray-400 text-xs sm:text-sm">Trusted by professionals</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div className="text-white font-semibold mb-1 text-sm sm:text-base">AI Support</div>
              <div className="text-gray-400 text-xs sm:text-sm">Always available guidance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 lg:mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
                  "The AI feedback was incredible! I updated my resume based on the suggestions and got 3 interview calls within a week."
                </p>
                <div className="text-white font-semibold text-sm">Sarah Chen</div>
                <div className="text-gray-400 text-xs">Software Engineer</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
                  "Finally landed my dream job! The personalized career advice and interview tips made all the difference."
                </p>
                <div className="text-white font-semibold text-sm">Michael Rodriguez</div>
                <div className="text-gray-400 text-xs">Product Manager</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their careers with AI-powered guidance
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={onDemo}
            >
              Start Your Journey Today
              <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">AI Career Coach</span>
            </div>
            <p className="text-gray-400 text-sm text-center sm:text-right">
              Empowering careers through intelligent technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}