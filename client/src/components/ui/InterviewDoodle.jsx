/**
 * Original flat-doodle illustration for the hero: two people in a mock-interview
 * conversation, with a small "thinking" speech bubble and a thumbs-up chip.
 * Built from basic shapes in our own navy/cream/blue palette — no borrowed artwork.
 */
export default function InterviewDoodle({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 460 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ground shadow */}
      <ellipse cx="230" cy="392" rx="160" ry="14" fill="#0B3D62" opacity="0.05" />

      {/* Shared low table */}
      <rect x="150" y="300" width="160" height="12" rx="4" fill="#0B3D62" opacity="0.85" />
      <rect x="165" y="312" width="10" height="55" fill="#0B3D62" opacity="0.6" />
      <rect x="285" y="312" width="10" height="55" fill="#0B3D62" opacity="0.6" />

      {/* Interviewer — left, navy blazer */}
      <circle cx="148" cy="160" r="30" fill="#E3AE82" />
      <path d="M118 152c0-22 17-38 30-38s30 16 30 38c0-7-13-12-30-12s-30 5-30 12z" fill="#2B2118" />
      <path d="M100 300c2-46 20-78 48-78s46 32 48 78z" fill="#0B3D62" />
      <path d="M148 222l-10 14 10 10 10-10z" fill="#FFFFFF" />
      <path d="M118 250c-8 16-11 32-7 50" stroke="#E3AE82" strokeWidth="11" strokeLinecap="round" />
      <path d="M178 250c8 16 11 32 7 50" stroke="#E3AE82" strokeWidth="11" strokeLinecap="round" />

      {/* Candidate — right, teal top */}
      <circle cx="312" cy="160" r="30" fill="#F2C9A0" />
      <path d="M286 145c4-18 14-26 26-26s24 10 26 24c-10-6-18-8-26-8s-18 4-26 10z" fill="#4A3526" />
      <path d="M264 300c2-46 20-78 48-78s46 32 48 78z" fill="#2563C9" />
      <path d="M298 252c-9 15-12 32-8 50" stroke="#F2C9A0" strokeWidth="11" strokeLinecap="round" />
      <path d="M326 252c9 15 12 32 8 50" stroke="#F2C9A0" strokeWidth="11" strokeLinecap="round" />

      {/* Thought / speech bubble above candidate */}
      <g>
        <rect x="330" y="60" width="110" height="56" rx="16" fill="#FFFFFF" stroke="#E4E0D8" strokeWidth="1.5" />
        <path d="M345 116l-10 18 18-10z" fill="#FFFFFF" stroke="#E4E0D8" strokeWidth="1.5" />
        <path d="M345 80h70M345 94h50" stroke="#2563C9" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Notepad chip near interviewer */}
      <g>
        <rect x="20" y="170" width="100" height="64" rx="10" fill="#FFFFFF" stroke="#E4E0D8" strokeWidth="1.5" />
        <path d="M36 188h68M36 200h68M36 212h44" stroke="#0B3D62" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* Thumbs-up confidence chip */}
      <g>
        <circle cx="382" cy="220" r="26" fill="#1F8A4C" />
        <path d="M372 224v12M372 212l8-12c2-3 7-2 7 2v8h10c3 0 5 3 4 6l-5 14a5 5 0 0 1-5 4h-19v-22z"
          fill="#FFFFFF" />
      </g>

      {/* Decorative dots */}
      <circle cx="60" cy="90" r="5" fill="#2563C9" opacity="0.25" />
      <circle cx="420" cy="320" r="5" fill="#B9762E" opacity="0.25" />
      <circle cx="230" cy="50" r="4" fill="#1F8A4C" opacity="0.3" />
    </svg>
  )
}
