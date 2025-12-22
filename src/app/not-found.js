// app/not-found.js - Custom 404 page
import Link from 'next/link';
import { Home, Stethoscope, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDF5EE] to-white px-4">
      <div className="text-center max-w-lg">
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 flex items-center justify-center">
            <Stethoscope size={64} className="text-[#E9756D]" />
          </div>
          <div className="absolute -top-4 -right-4 text-8xl font-bold text-[#E9756D]/20">
            404
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          The page you&apos;re looking for seems to have moved or doesn&apos;t exist. 
          Please check the URL or return to our homepage.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          >
            <Home size={20} className="mr-2" />
            Back to Homepage
          </Link>
          
          <Link
            href="/contact"
            className="px-6 py-3 glass-card text-[#E9756D] font-semibold rounded-xl border border-[#F6CA97]/30 hover:border-[#E9756D] transition-all duration-300 flex items-center justify-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Contact Support
          </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Need immediate assistance?{' '}
            <a href="tel:+12345678900" className="text-[#E9756D] hover:underline">
              Call our emergency line
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}