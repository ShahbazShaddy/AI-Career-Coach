# AI Career Coach - Resume & Career Guidance

Transform your career with our AI-powered resume analyzer and career coach. Get personalized feedback, optimize your resume, and land your dream job with intelligent guidance.

## Features

- **AI-Powered Resume Analysis**: Upload PDF or TXT resumes for intelligent analysis
- **Personalized Career Coaching**: Get tailored advice based on your experience and goals
- **Job Matching**: Align your resume with specific job requirements
- **Interview Preparation**: Get tips and strategies for successful interviews
- **Real-time Chat Interface**: Interactive conversation with AI career coach

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **AI Integration**: GROQ API for chat completions
- **PDF Processing**: ConvertAPI for PDF to text conversion
- **State Management**: React Query for server state
- **Notifications**: Sonner for toast notifications

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-career-coach
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your actual API keys:
   ```env
   # API Keys - Replace with your actual keys
   VITE_GROQ_API_KEY=your_groq_api_key_here
   VITE_CONVERT_API_SECRET=your_convert_api_secret_here
   
   # API URLs (usually don't need to change these)
   VITE_GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
   VITE_CONVERT_API_URL=https://v2.convertapi.com/convert/pdf/to/txt
   ```

### API Key Setup

#### GROQ API Key
1. Visit [GroqCloud](https://console.groq.com/)
2. Sign up or log in to your account
3. Navigate to the API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env` file as `VITE_GROQ_API_KEY`

#### ConvertAPI Secret
1. Visit [ConvertAPI](https://www.convertapi.com/)
2. Sign up or log in to your account
3. Go to your dashboard to find your secret key
4. Copy the secret and add it to your `.env` file as `VITE_CONVERT_API_SECRET`

### Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

## Usage

### Uploading a Resume
1. Click on "Try Demo Now" from the landing page
2. Fill in the job parameters (Job Title, Experience Level, Requirements)
3. Upload your resume (PDF or TXT format)
4. Start chatting with the AI career coach

### Getting Career Advice
- Ask for resume feedback and improvement suggestions
- Get advice on skills development for specific positions
- Receive interview preparation tips and strategies
- Learn about industry-specific requirements

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── ChatbotDemo.tsx # Main chatbot interface
│   ├── ContactModal.tsx# Contact modal component
│   └── LandingPage.tsx # Landing page component
├── hooks/              # Custom React hooks
│   ├── useGroqChat.ts  # GROQ API integration
│   └── usePdfConverter.ts # PDF conversion logic
├── lib/                # Utility functions
│   └── utils.ts        # General utilities
└── main.tsx           # Application entry point
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GROQ_API_KEY` | API key for GROQ chat completions | Yes |
| `VITE_CONVERT_API_SECRET` | Secret key for ConvertAPI PDF processing | Yes |
| `VITE_GROQ_API_URL` | GROQ API endpoint URL | Yes |
| `VITE_CONVERT_API_URL` | ConvertAPI endpoint URL | Yes |

## Security Notes

- Never commit your `.env` file to version control
- Keep your API keys secure and rotate them regularly
- The `.env.example` file shows the required format without exposing actual keys
- All environment variables are prefixed with `VITE_` for Vite compatibility

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure your `.env` file is in the root directory
   - Verify that your API keys are correct and active
   - Restart the development server after updating environment variables

2. **PDF Upload Issues**
   - Check that your ConvertAPI secret is valid
   - Ensure the uploaded file is a valid PDF
   - Verify network connectivity to ConvertAPI

3. **Chat Not Working**
   - Confirm your GROQ API key has sufficient credits
   - Check the browser console for detailed error messages
   - Verify the API endpoint URLs are correct

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Email: bsf1800638@ue.edu.pk
- LinkedIn: [Dilawar Ali](https://www.linkedin.com/in/dilawar-ali-02a2382a5/)