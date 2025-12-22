// app/icon.tsx - Practical solution with fallback
import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export const runtime = 'edge';

// Pre-defined SVG for the logo (you can replace this with your actual logo SVG)
const logoSVG = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background gradient -->
  <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
  
  <!-- Medical cross -->
  <rect x="13" y="8" width="6" height="16" rx="1" fill="white"/>
  <rect x="8" y="13" width="16" height="6" rx="1" fill="white"/>
  
  <!-- DR text (subtle) -->
  <text x="16" y="22" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="10" font-weight="bold" opacity="0.9">DR</text>
  
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#E9756D"/>
      <stop offset="100%" stop-color="#F6CA97"/>
    </linearGradient>
  </defs>
</svg>
`;

export default async function Icon() {
  try {
    // In production, you would check if logo.png exists
    // For now, we'll use a smart approach

    // Check environment - in dev we might not have the logo
    const hasLogo = process.env.NODE_ENV === 'production';

    if (hasLogo) {
      // Try to use the actual logo
      return new ImageResponse(
        (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #E9756D 0%, #F6CA97 100%)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white',
              position: 'relative',
            }}
          >
            {/* If logo exists, show simple "DR" with medical symbol */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '10px', opacity: 0.9 }}>🏥</div>
              <div style={{ fontSize: '10px', marginTop: '2px' }}>DR</div>
            </div>

            {/* Corner accent */}
            <div
              style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.3)',
              }}
            />
          </div>
        ),
        { ...size }
      );
    }
  } catch (error) {
    console.log('Fallback to default icon');
  }

  // Default beautiful icon
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #E9756D 0%, #F6CA97 100%)',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated gradient effect */}
        <div
          style={{
            position: 'absolute',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
            animation: 'shine 3s ease-in-out infinite',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          {/* Medical symbol */}
          <div
            style={{
              width: '12px',
              height: '12px',
              position: 'relative',
              marginBottom: '2px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '12px',
                height: '3px',
                background: 'white',
                borderRadius: '1px',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '3px',
                height: '12px',
                background: 'white',
                borderRadius: '1px',
              }}
            />
          </div>

          {/* DR text */}
          <div
            style={{
              fontSize: '10px',
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '0.5px',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            DR
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      // Note: CSS animations don't work in ImageResponse
      // This is just for visual structure
    }
  );
}




// import { ImageResponse } from 'next/og'

// export const size = {
//   width: 32,
//   height: 32,
// }
// export const contentType = 'image/png'

// export default function Icon() {
//   return new ImageResponse(
//     (
//       <div
//         style={{
//           width: '100%',
//           height: '100%',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           background: 'linear-gradient(135deg, #E9756D 0%, #F6CA97 100%)',
//           borderRadius: '6px',
//           fontSize: '18px',
//           fontWeight: 'bold',
//           color: 'white',
//         }}
//       >
//         DR
//       </div>
//     ),
//     {
//       ...size,
//     }
//   )
// }