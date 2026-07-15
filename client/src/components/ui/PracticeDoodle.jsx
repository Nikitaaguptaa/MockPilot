/**
 * A small, original flat-style doodle of a person at a desk practicing on a laptop,
 * plus a few floating UI bits (checkmark, score chip). Hand-built with basic shapes
 * so it sits in our own navy/cream palette rather than borrowing any existing artwork.
 */
export default function PracticeDoodle({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 420 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ground shadow */}
      <ellipse cx="210" cy="345" rx="140" ry="14" fill="#0B3D62" opacity="0.06" />

      {/* Desk */}
      <rect x="70" y="250" width="280" height="14" rx="4" fill="#0B3D62" />
      <rect x="95" y="264" width="14" height="70" fill="#0B3D62" opacity="0.85" />
      <rect x="311" y="264" width="14" height="70" fill="#0B3D62" opacity="0.85" />

      {/* Laptop */}
      <rect x="150" y="190" width="120" height="78" rx="6" fill="#FFFFFF" stroke="#0B3D62" strokeWidth="3" />
      <rect x="160" y="200" width="100" height="58" rx="3" fill="#E8F0FC" />
      <path d="M170 230h45M170 240h60M170 248h35" stroke="#2563C9" strokeWidth="3" strokeLinecap="round" />
      <rect x="140" y="266" width="140" height="10" rx="4" fill="#0B3D62" />

      {/* Person — simple seated figure */}
      <circle cx="210" cy="120" r="28" fill="#F2C9A0" />
      {/* hair */}
      <path d="M182 112c0-20 16-34 28-34s28 14 28 34c0-6-10-10-28-10s-28 4-28 10z" fill="#3A2B22" />
      {/* body / shirt */}
      <path d="M165 250c2-38 18-62 45-62s43 24 45 62" fill="#2563C9" />
      <path d="M165 250c2-38 18-62 45-62s43 24 45 62" stroke="#0B3D62" strokeWidth="2" opacity="0.15" />
      {/* arms reaching to laptop */}
      <path d="M183 210c-6 14-8 26-4 36" stroke="#F2C9A0" strokeWidth="10" strokeLinecap="round" />
      <path d="M237 210c6 14 8 26 4 36" stroke="#F2C9A0" strokeWidth="10" strokeLinecap="round" />

      {/* Chair back */}
      <rect x="150" y="180" width="10" height="80" rx="4" fill="#0B3D62" opacity="0.5" />
      <rect x="260" y="180" width="10" height="80" rx="4" fill="#0B3D62" opacity="0.5" />

      {/* Floating chips */}
      <g>
        <rect x="290" y="90" width="108" height="40" rx="20" fill="#FFFFFF" stroke="#E4E0D8" strokeWidth="1.5" />
        <circle cx="312" cy="110" r="8" fill="#1F8A4C" />
        <path d="M308 110l3 3 6-7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="330" y="115" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#1B2430">Score: 8/10</text>
      </g>

      <g>
        <rect x="14" y="150" width="118" height="40" rx="20" fill="#FFFFFF" stroke="#E4E0D8" strokeWidth="1.5" />
        <circle cx="36" cy="170" r="8" fill="#2563C9" />
        <path d="M32 167v6M36 164v9M40 168v5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <text x="54" y="175" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#1B2430">ATS 87%</text>
      </g>

      {/* Decorative dots */}
      <circle cx="60" cy="80" r="5" fill="#2563C9" opacity="0.3" />
      <circle cx="360" cy="200" r="4" fill="#1F8A4C" opacity="0.3" />
      <circle cx="40" cy="250" r="4" fill="#B9762E" opacity="0.3" />
    </svg>
  )
}
