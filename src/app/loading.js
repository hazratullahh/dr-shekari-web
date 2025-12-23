export default function Loading() {
  
  return (
    <div className="min-h-screen bg-linear-to-br from-[#FDF5EE] via-white to-[#F9F0E8] flex flex-col items-center justify-center px-4">
      {/* Main Loader Container */}
      <div className="relative w-full max-w-2xl mx-auto">

        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#E9756D] blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#F6CA97] blur-3xl" />
        </div>

        {/* Kidney System */}
        <div className="relative mb-12">
          {/* Left Kidney */}
          <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <KidneyAnimation side="left" />
          </div>

          {/* Right Kidney */}
          <div className="absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2">
            <KidneyAnimation side="right" />
          </div>

          {/* Ureters */}
          <div className="absolute top-1/2 left-1/4 right-1/4 h-2">
            <div className="absolute inset-0 flex justify-between">
              {/* Left Ureter */}
              <div className="w-1/2 relative">
                <UreterAnimation direction="down" />
              </div>

              {/* Right Ureter */}
              <div className="w-1/2 relative">
                <UreterAnimation direction="down" />
              </div>
            </div>
          </div>

          {/* Bladder */}
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2">
            <BladderAnimation />
          </div>

          {/* Urethra with Stent */}
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full">
            <StentAnimation />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-linear-to-r from-[#E9756D] to-[#F6CA97] animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Loading <span className="text-transparent bg-clip-text bg-linear-to-r from-[#E9756D] to-[#F6CA97]">Medical Excellence</span>
          </h2>

          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Preparing your journey to better urological health...
          </p>

          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-linear-to-r from-[#E9756D] via-[#FF9A8B] to-[#F6CA97] rounded-full animate-progress" />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">Initializing</span>
              <span className="text-sm font-medium text-[#E9756D]">Processing</span>
              <span className="text-sm text-gray-500">Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
        {[
          { label: 'Kidney Filters', value: '2M', unit: '/day' },
          { label: 'Blood Flow', value: '1.2', unit: 'L/min' },
          { label: 'Filtration Rate', value: '125', unit: 'mL/min' },
          { label: 'Processing', value: '99', unit: '%' },
        ].map((stat, index) => (
          <div key={index} className="text-center p-4 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.unit}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Kidney Animation Component
function KidneyAnimation({ side = 'left' }) {
  return (
    <div className={`relative ${side === 'left' ? '-scale-x-100' : ''}`}>
      {/* Kidney Outline */}
      <div className="relative w-32 h-40">
        <div className="absolute inset-0 border-2 border-[#E9756D] rounded-full opacity-20" />

        {/* Inner Structure */}
        <div className="absolute inset-4 border-2 border-[#F6CA97] rounded-full opacity-30" />

        {/* Nephrons (Filtration Units) */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-linear-to-r from-[#E9756D] to-[#F6CA97] animate-pulse"
            style={{
              left: `${30 + Math.sin(i * 0.8) * 20}%`,
              top: `${30 + Math.cos(i * 0.8) * 20}%`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}

        {/* Blood Flow Animation */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-1 bg-linear-to-r from-[#E9756D] to-[#FF9A8B] rounded-full animate-flow"
              style={{
                left: `${-20}%`,
                top: `${15 + i * 15}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>

        {/* Filtration Animation */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400 animate-filter"
              style={{
                left: `${40 + Math.sin(i) * 10}%`,
                top: `${40 + Math.cos(i) * 10}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Renal Artery/Vein */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-4 bg-linear-to-r from-[#E9756D] to-[#FF9A8B] rounded-t-full animate-pulse" />
      </div>
    </div>
  );
}

// Ureter Animation Component
function UreterAnimation({ direction = 'down' }) {
  return (
    <div className="relative h-32">
      {/* Ureter Tube */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-full">
        {/* Outer Wall */}
        <div className="absolute inset-0 bg-linear-to-b from-[#F6CA97]/20 to-transparent rounded-lg" />

        {/* Inner Lining */}
        <div className="absolute inset-1 bg-linear-to-b from-[#E9756D]/10 to-transparent rounded" />

        {/* Urine Flow */}
        <div className="absolute inset-0 overflow-hidden rounded">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 transform -translate-x-1/2 w-3 h-6 bg-linear-to-b from-yellow-400/40 to-amber-300/60 rounded-full animate-urine-flow"
              style={{
                top: `${i * -30}%`,
                animationDelay: `${i * 0.4}s`
              }}
            />
          ))}
        </div>

        {/* Peristaltic Waves */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 transform -translate-x-1/2 w-8 h-2 bg-linear-to-r from-[#E9756D]/30 to-transparent rounded-full animate-peristalsis"
              style={{
                top: `${20 + i * 30}%`,
                animationDelay: `${i * 0.6}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Bladder Animation Component
function BladderAnimation() {
  return (
    <div className="relative">
      {/* Bladder Outline */}
      <div className="relative w-40 h-32">
        {/* Bladder Shape */}
        <div className="absolute inset-0 border-2 border-[#E9756D] rounded-full opacity-20" />
        <div className="absolute inset-4 border-2 border-[#F6CA97] rounded-full opacity-30" />

        {/* Filling Animation */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-36 h-0 animate-fill">
          <div className="absolute inset-0 bg-linear-to-t from-yellow-400/30 to-amber-300/20 rounded-t-full" />
        </div>

        {/* Detrusor Muscle Fibers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-linear-to-b from-[#E9756D]/20 to-[#F6CA97]/20 rounded-full"
            style={{
              left: `${10 + (i * 7)}%`,
              top: '20%',
              transform: `rotate(${i % 2 === 0 ? '45deg' : '-45deg'})`
            }}
          />
        ))}
      </div>

      {/* Ureter Connections */}
      <div className="absolute -top-8 left-1/4 transform -translate-x-1/2">
        <div className="w-4 h-8 bg-linear-to-b from-[#E9756D]/20 to-transparent rounded-t-lg" />
      </div>
      <div className="absolute -top-8 right-1/4 transform translate-x-1/2">
        <div className="w-4 h-8 bg-linear-to-b from-[#E9756D]/20 to-transparent rounded-t-lg" />
      </div>
    </div>
  );
}

// Stent Animation Component
function StentAnimation() {
  return (
    <div className="relative">
      {/* Urethra Tube */}
      <div className="relative w-4 h-48 mx-auto">
        {/* Tube Outer */}
        <div className="absolute inset-0 bg-linear-to-b from-[#F6CA97]/10 to-transparent rounded" />

        {/* Tube Inner */}
        <div className="absolute inset-1 bg-linear-to-b from-[#E9756D]/5 to-transparent rounded" />

        {/* Stent */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-40">
          {/* Stent Body */}
          <div className="absolute inset-0 bg-linear-to-b from-blue-400/30 to-cyan-300/20 rounded-lg" />

          {/* Stent Coils */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 transform -translate-x-1/2 w-8 h-1 bg-linear-to-r from-blue-400/40 to-cyan-300/30 rounded-full"
              style={{
                top: `${10 + i * 16}%`,
                transform: `translateX(-50%) rotate(${i % 2 === 0 ? '45deg' : '-45deg'})`
              }}
            />
          ))}

          {/* Drainage Holes */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-300/50"
              style={{
                left: `${i % 3 === 0 ? '20%' : i % 3 === 1 ? '50%' : '80%'}`,
                top: `${5 + i * 8}%`
              }}
            />
          ))}

          {/* Urine Flow Through Stent */}
          <div className="absolute inset-0 overflow-hidden rounded">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 transform -translate-x-1/2 w-2 h-12 bg-linear-to-b from-yellow-300/30 to-amber-200/20 rounded-full animate-stent-flow"
                style={{
                  top: `${i * -40}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Urine Flow */}
        <div className="absolute inset-0 overflow-hidden rounded">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 transform -translate-x-1/2 w-2 h-8 bg-linear-to-b from-yellow-400/30 to-amber-300/20 rounded-full animate-urine-flow"
              style={{
                top: `${i * -30}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Stent Anchors */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-4 bg-linear-to-b from-blue-400/30 to-transparent rounded-t-full" />
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-4 bg-linear-to-t from-blue-400/30 to-transparent rounded-b-full" />
      </div>
    </div>
  );
}