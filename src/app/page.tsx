'use client';

import { useState, useEffect } from "react";
import { CheckCircle, Download, AlertCircle, FileText, Sparkles } from "lucide-react";

export default function Home() {
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Particle animation component
  const Particles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }}
      />
    ));
    return <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>;
  };

  // Function to handle download with better error handling
  const handleDownload = async () => {
    try {
      setIsLoading(true);
      
      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // First, check if the file exists
      const response = await fetch('/Vajra_Catalogue.pdf', { method: 'HEAD' });
      
      if (!response.ok) {
        setError(true);
        setIsLoading(false);
        console.error('PDF file not found');
        return;
      }

      // Create download link with proper MIME type
      const link = document.createElement("a");
      link.href = "/Vajra_Catalogue.pdf";
      link.download = "Vajra_Catalogue.pdf";
      
      // Set proper attributes for better mobile support
      link.setAttribute('type', 'application/pdf');
      link.style.display = 'none';
      
      // Append to body, click, then remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloaded(true);
      setError(false);
      setIsLoading(false);
    } catch (err) {
      console.error('Download failed:', err);
      setError(true);
      setIsLoading(false);
    }
  };

  // Alternative method using window.open (better for mobile)
  const handleDownloadAlternative = () => {
    // This opens the PDF in a new tab, allowing users to download from there
    const newWindow = window.open('/Vajra_Catalogue.pdf', '_blank');
    if (!newWindow) {
      // Fallback if popup is blocked
      window.location.href = '/Vajra_Catalogue.pdf';
    }
    setDownloaded(true);
    setIsLoading(false);
  };

  const retryDownload = () => {
    setError(false);
    setDownloaded(false);
    handleDownloadAlternative();
  };

  useEffect(() => {
    // Add a small delay to ensure the component is mounted
    const timer = setTimeout(() => {
      handleDownload();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <Particles />

      <div className="relative z-10 bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-lg text-center border border-white/20 transform transition-all duration-1000 hover:scale-105">
        {/* Floating PDF icon */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full shadow-lg animate-bounce">
            <FileText className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Content area with fade animations */}
        <div className="pt-8">
          {/* Loading State */}
          {isLoading && !error && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="relative">
                  <Download className="w-8 h-8 text-blue-400 animate-bounce" />
                  <div className="absolute -inset-2 bg-blue-400/20 rounded-full animate-ping"></div>
                </div>
                <span className="text-white text-xl font-medium">Preparing your download...</span>
              </div>
              
              {/* Progress bar animation */}
              <div className="w-full bg-white/20 rounded-full h-2 mb-6 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse-width"></div>
              </div>
              
              <p className="text-blue-200 text-sm">Please wait while we fetch your file</p>
            </div>
          )}

          {/* Success State */}
          {downloaded && !error && (
            <div className="animate-fade-in">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-green-500/20 rounded-full animate-ping"></div>
                </div>
                <div className="relative flex items-center justify-center">
                  <CheckCircle className="w-16 h-16 text-green-400 animate-scale-in" />
                </div>
              </div>
              
              <h2 className="text-white text-2xl font-bold mb-4">Download Complete!</h2>
              <p className="text-green-200 text-lg mb-6">Thank you for downloading Vajra_Catalogue.pdf</p>
              
              <div className="flex items-center justify-center gap-2 text-green-300">
                <Sparkles className="w-5 h-5 animate-spin" />
                <span className="text-sm">Your file should appear in your downloads folder</span>
                <Sparkles className="w-5 h-5 animate-spin animation-delay-1000" />
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="animate-fade-in">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-red-500/20 rounded-full animate-ping"></div>
                </div>
                <div className="relative flex items-center justify-center">
                  <AlertCircle className="w-16 h-16 text-red-400 animate-shake" />
                </div>
              </div>
              
              <h2 className="text-white text-2xl font-bold mb-4">Download Failed</h2>
              <p className="text-red-200 text-lg mb-6">Vajra_Catalogue.pdf could not be found</p>
              
              <button
                onClick={retryDownload}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Try Alternative Method
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes pulse-width {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-pulse-width {
          animation: pulse-width 2s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}