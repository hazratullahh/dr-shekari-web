// components/ui/LoadingFallback.js - Reusable loading skeletons
const LoadingFallback = ({ type = 'section' }) => {
  const loaders = {
    'full-page': (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#F6CA97] border-t-[#E9756D] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dr-shekari.com...</p>
        </div>
      </div>
    ),
    'hero': (
      <div className="min-h-screen pt-20 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="h-6 w-32 bg-gradient-to-r from-[#F6CA97]/20 to-[#E9756D]/20 rounded-full mb-8 animate-pulse"></div>
              <div className="h-16 w-full bg-gradient-to-r from-[#F6CA97]/10 to-[#E9756D]/10 rounded-xl mb-6 animate-pulse"></div>
              <div className="h-16 w-3/4 bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-xl mb-8 animate-pulse"></div>
              <div className="space-y-4 mb-10">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-40 bg-gradient-to-r from-[#E9756D]/20 to-[#F6CA97]/20 rounded-xl animate-pulse"></div>
                <div className="h-12 w-40 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
            <div className="relative h-[600px]">
              <div className="absolute w-4/5 h-3/4 bg-gradient-to-r from-[#F6CA97]/10 to-[#E9756D]/10 rounded-3xl animate-pulse"></div>
              <div className="absolute right-0 bottom-0 w-2/3 h-1/2 bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-3xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    ),
    'section': (
      <div className="py-20 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="h-8 w-48 bg-gradient-to-r from-[#F6CA97]/20 to-[#E9756D]/20 rounded-full mx-auto mb-6 animate-pulse"></div>
            <div className="h-12 w-3/4 bg-gray-200 rounded-xl mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-1/2 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card p-8 rounded-2xl">
                <div className="h-10 w-10 bg-gray-200 rounded-full mb-6 animate-pulse"></div>
                <div className="h-8 w-3/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    'card': (
      <div className="glass-card p-6 rounded-2xl">
        <div className="h-48 bg-gradient-to-r from-[#F6CA97]/10 to-[#E9756D]/10 rounded-xl mb-6 animate-pulse"></div>
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  };

  return loaders[type] || loaders.section;
};

export default LoadingFallback;