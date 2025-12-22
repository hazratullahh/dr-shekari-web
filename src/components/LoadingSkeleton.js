// components/LoadingSkeleton.js
export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex flex-col">
      {/* Header skeleton */}
      <div className="w-full p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="h-12 w-48 bg-gray-300 rounded-xl animate-pulse"></div>
          <div className="hidden md:flex space-x-8">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-8 w-20 bg-gray-300 rounded-lg animate-pulse"></div>
            ))}
          </div>
          <div className="h-12 w-32 bg-gray-300 rounded-xl animate-pulse"></div>
        </div>
      </div>
      
      {/* Hero skeleton */}
      <div className="flex-1 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="h-6 w-32 bg-gray-300 rounded-full mb-8 animate-pulse"></div>
            <div className="h-16 w-full bg-gray-300 rounded-xl mb-6 animate-pulse"></div>
            <div className="h-16 w-3/4 bg-gray-300 rounded-xl mb-8 animate-pulse"></div>
            <div className="h-6 w-full bg-gray-300 rounded-lg mb-4 animate-pulse"></div>
            <div className="h-6 w-full bg-gray-300 rounded-lg mb-4 animate-pulse"></div>
            <div className="h-6 w-2/3 bg-gray-300 rounded-lg mb-10 animate-pulse"></div>
            <div className="flex space-x-4">
              <div className="h-12 w-40 bg-gray-300 rounded-xl animate-pulse"></div>
              <div className="h-12 w-40 bg-gray-300 rounded-xl animate-pulse"></div>
            </div>
          </div>
          
          <div className="relative h-[600px]">
            <div className="absolute w-64 h-80 bg-gray-300 rounded-2xl left-10 top-10 animate-pulse"></div>
            <div className="absolute w-64 h-72 bg-gray-300 rounded-2xl right-10 bottom-10 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}