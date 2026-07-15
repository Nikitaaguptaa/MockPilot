// Animated SVG illustrations — lottie-style animations
// Each component has CSS animations that mimic lottie feel

import styles from './LottieAnim.module.css'

// ── HERO: Girl working on laptop ──
export function HeroAnimation({ className = '' }) {
  return (
    <div className={`${styles.wrap} ${className}`}>
      <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
        {/* Desk */}
        <rect x="40" y="270" width="320" height="10" rx="5" fill="#1a3a5c" className={styles.desk}/>
        <rect x="60" y="280" width="8" height="60" rx="4" fill="#0f2a42"/>
        <rect x="332" y="280" width="8" height="60" rx="4" fill="#0f2a42"/>

        {/* Laptop screen */}
        <rect x="110" y="200" width="180" height="70" rx="8" fill="#0d1f35" stroke="#00d4ff" strokeWidth="1.5" className={styles.laptop}/>
        <rect x="100" y="268" width="200" height="6" rx="3" fill="#0f2a42" stroke="#00d4ff" strokeWidth="1"/>
        {/* Screen glow */}
        <rect x="118" y="208" width="164" height="54" rx="4" fill="#061525" opacity="0.9"/>
        {/* Code lines on screen */}
        <line x1="128" y1="222" x2="220" y2="222" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        <line x1="128" y1="232" x2="190" y2="232" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        <line x1="128" y1="242" x2="210" y2="242" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <line x1="128" y1="252" x2="175" y2="252" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        {/* Cursor blink */}
        <rect x="178" y="249" width="2" height="8" rx="1" fill="#00d4ff" className={styles.cursor}/>

        {/* Person */}
        {/* Head */}
        <circle cx="260" cy="165" r="28" fill="none" stroke="#00d4ff" strokeWidth="1.8" className={styles.head}/>
        {/* Hair */}
        <path d="M232 162 Q234 138 260 136 Q286 138 288 162" fill="none" stroke="#4a6fa5" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Hair strands */}
        <path d="M232 155 Q228 145 232 138" fill="none" stroke="#4a6fa5" strokeWidth="2" strokeLinecap="round"/>
        <path d="M288 155 Q292 148 288 140" fill="none" stroke="#4a6fa5" strokeWidth="2" strokeLinecap="round"/>
        {/* Eyes */}
        <circle cx="252" cy="162" r="3" fill="#00d4ff" opacity="0.8"/>
        <circle cx="268" cy="162" r="3" fill="#00d4ff" opacity="0.8"/>
        {/* Smile */}
        <path d="M254 174 Q260 180 266 174" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Headphones */}
        <path d="M234 160 Q232 144 260 142 Q288 144 286 160" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="229" y="157" width="7" height="12" rx="3.5" fill="none" stroke="#7c3aed" strokeWidth="2"/>
        <rect x="284" y="157" width="7" height="12" rx="3.5" fill="none" stroke="#7c3aed" strokeWidth="2"/>

        {/* Body */}
        <path d="M242 193 Q260 208 278 193 L295 260 L225 260 Z" fill="none" stroke="#00d4ff" strokeWidth="1.8" strokeLinejoin="round"/>
        {/* Arms */}
        <path d="M228 215 L165 258" fill="none" stroke="#00d4ff" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M292 215 L308 258" fill="none" stroke="#00d4ff" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="164" cy="263" r="5" fill="none" stroke="#00d4ff" strokeWidth="1.5"/>
        <circle cx="308" cy="263" r="5" fill="none" stroke="#00d4ff" strokeWidth="1.5"/>

        {/* Chair */}
        <rect x="232" y="257" width="56" height="8" rx="4" fill="none" stroke="#4a6fa5" strokeWidth="1.5"/>
        <rect x="248" y="265" width="8" height="24" rx="4" fill="none" stroke="#4a6fa5" strokeWidth="1.5"/>
        <rect x="264" y="265" width="8" height="24" rx="4" fill="none" stroke="#4a6fa5" strokeWidth="1.5"/>
        <circle cx="252" cy="292" r="4" fill="none" stroke="#4a6fa5" strokeWidth="1.5"/>
        <circle cx="272" cy="292" r="4" fill="none" stroke="#4a6fa5" strokeWidth="1.5"/>

        {/* Coffee */}
        <rect x="320" y="248" width="24" height="22" rx="4" fill="none" stroke="#00d4ff" strokeWidth="1.5" opacity="0.7"/>
        <path d="M344 254 Q353 254 353 263 Q353 272 344 272" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        {/* Steam */}
        <path d="M328 244 Q330 238 328 232" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" className={styles.steam1}/>
        <path d="M337 242 Q339 236 337 230" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" className={styles.steam2}/>

        {/* Books */}
        <rect x="48" y="254" width="50" height="8" rx="3" fill="none" stroke="#7c3aed" strokeWidth="1.5"/>
        <rect x="48" y="246" width="44" height="8" rx="3" fill="none" stroke="#00d4ff" strokeWidth="1.5"/>
        <rect x="48" y="238" width="38" height="8" rx="3" fill="none" stroke="#10b981" strokeWidth="1.5"/>

        {/* Plant */}
        <rect x="358" y="244" width="20" height="28" rx="4" fill="none" stroke="#10b981" strokeWidth="1.5" opacity="0.7"/>
        <path d="M368 244 Q368 224 358 218" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        <path d="M368 234 Q368 218 378 212" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>

        {/* Floating sparkles */}
        <path d="M360 100 L362 94 L364 100 L370 102 L364 104 L362 110 L360 104 L354 102 Z" fill="#00d4ff" opacity="0.5" className={styles.spark1}/>
        <path d="M60 130 L62 124 L64 130 L70 132 L64 134 L62 140 L60 134 L54 132 Z" fill="#7c3aed" opacity="0.5" className={styles.spark2}/>
        <path d="M350 170 L351 167 L352 170 L355 171 L352 172 L351 175 L350 172 L347 171 Z" fill="#10b981" opacity="0.6" className={styles.spark3}/>
        <path d="M75 220 L76 217 L77 220 L80 221 L77 222 L76 225 L75 222 L72 221 Z" fill="#00d4ff" opacity="0.4" className={styles.spark1}/>

        {/* Code decorations */}
        <text x="38" y="118" fontFamily="Fira Code, monospace" fontSize="12" fill="rgba(0,212,255,0.15)" fontWeight="600">&lt;/&gt;</text>
        <text x="350" y="210" fontFamily="Fira Code, monospace" fontSize="10" fill="rgba(124,58,237,0.2)" fontWeight="600">{ }</text>

        {/* Glow under laptop */}
        <ellipse cx="200" cy="276" rx="85" ry="5" fill="rgba(0,212,255,0.06)"/>
      </svg>
    </div>
  )
}

// ── DASHBOARD: AI Robot / Analysis ──
export function DashboardAnimation({ className = '' }) {
  return (
    <div className={`${styles.wrap} ${className}`}>
      <svg viewBox="0 0 320 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
        {/* Robot head */}
        <rect x="100" y="40" width="120" height="100" rx="20" fill="none" stroke="#00d4ff" strokeWidth="2" className={styles.head}/>
        {/* Antenna */}
        <line x1="160" y1="40" x2="160" y2="20" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="160" cy="16" r="5" fill="none" stroke="#00d4ff" strokeWidth="2" className={styles.spark1}/>
        {/* Eyes */}
        <rect x="120" y="68" width="24" height="16" rx="4" fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="1.5"/>
        <rect x="176" y="68" width="24" height="16" rx="4" fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="1.5"/>
        <rect x="125" y="72" width="14" height="8" rx="2" fill="#00d4ff" className={styles.blink}/>
        <rect x="181" y="72" width="14" height="8" rx="2" fill="#00d4ff" className={styles.blink}/>
        {/* Mouth */}
        <rect x="130" y="108" width="60" height="14" rx="7" fill="none" stroke="#00d4ff" strokeWidth="1.5"/>
        <rect x="138" y="113" width="8" height="4" rx="2" fill="#00d4ff" opacity="0.6"/>
        <rect x="150" y="113" width="8" height="4" rx="2" fill="#00d4ff" opacity="0.8"/>
        <rect x="162" y="113" width="8" height="4" rx="2" fill="#00d4ff" opacity="0.6"/>
        {/* Ears */}
        <rect x="86" y="70" width="14" height="30" rx="7" fill="none" stroke="#7c3aed" strokeWidth="2"/>
        <rect x="220" y="70" width="14" height="30" rx="7" fill="none" stroke="#7c3aed" strokeWidth="2"/>
        {/* Body */}
        <rect x="110" y="145" width="100" height="80" rx="14" fill="none" stroke="#00d4ff" strokeWidth="1.8" className={styles.body}/>
        {/* Chest panel */}
        <rect x="125" y="158" width="70" height="42" rx="8" fill="rgba(0,212,255,0.05)" stroke="#7c3aed" strokeWidth="1"/>
        {/* Panel lines */}
        <line x1="133" y1="168" x2="187" y2="168" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        <line x1="133" y1="177" x2="175" y2="177" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        <line x1="133" y1="186" x2="180" y2="186" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        {/* Arms */}
        <rect x="72" y="148" width="38" height="14" rx="7" fill="none" stroke="#00d4ff" strokeWidth="1.5"/>
        <rect x="210" y="148" width="38" height="14" rx="7" fill="none" stroke="#00d4ff" strokeWidth="1.5"/>
        {/* Hands */}
        <circle cx="68" cy="155" r="8" fill="none" stroke="#7c3aed" strokeWidth="1.5"/>
        <circle cx="252" cy="155" r="8" fill="none" stroke="#7c3aed" strokeWidth="1.5"/>
        {/* Legs */}
        <rect x="128" y="225" width="22" height="50" rx="10" fill="none" stroke="#00d4ff" strokeWidth="1.5"/>
        <rect x="170" y="225" width="22" height="50" rx="10" fill="none" stroke="#00d4ff" strokeWidth="1.5"/>
        {/* Feet */}
        <rect x="120" y="268" width="38" height="12" rx="6" fill="none" stroke="#4a6fa5" strokeWidth="1.5"/>
        <rect x="162" y="268" width="38" height="12" rx="6" fill="none" stroke="#4a6fa5" strokeWidth="1.5"/>

        {/* Floating data dots */}
        <circle cx="60" cy="60" r="4" fill="#00d4ff" opacity="0.4" className={styles.float1}/>
        <circle cx="275" cy="90" r="3" fill="#7c3aed" opacity="0.5" className={styles.float2}/>
        <circle cx="55" cy="180" r="3" fill="#10b981" opacity="0.4" className={styles.float3}/>
        <circle cx="278" cy="200" r="4" fill="#00d4ff" opacity="0.3" className={styles.float1}/>

        {/* Sparkles */}
        <path d="M270 50 L272 44 L274 50 L280 52 L274 54 L272 60 L270 54 L264 52 Z" fill="#00d4ff" opacity="0.4" className={styles.spark2}/>
        <path d="M45 140 L47 134 L49 140 L55 142 L49 144 L47 150 L45 144 L39 142 Z" fill="#7c3aed" opacity="0.4" className={styles.spark1}/>
      </svg>
    </div>
  )
}

// ── INTERVIEW: Person speaking / microphone ──
export function InterviewAnimation({ className = '' }) {
  return (
    <div className={`${styles.wrap} ${className}`}>
      <svg viewBox="0 0 320 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
        {/* Screen / Monitor */}
        <rect x="60" y="30" width="200" height="140" rx="12" fill="rgba(0,212,255,0.04)" stroke="#00d4ff" strokeWidth="2"/>
        <rect x="70" y="40" width="180" height="120" rx="8" fill="#061525"/>
        {/* Monitor stand */}
        <rect x="145" y="170" width="30" height="20" rx="4" fill="none" stroke="#4a6fa5" strokeWidth="1.5"/>
        <rect x="120" y="188" width="80" height="6" rx="3" fill="none" stroke="#4a6fa5" strokeWidth="1.5"/>

        {/* Interview question on screen */}
        <text x="85" y="65" fontFamily="Fira Code, monospace" fontSize="8" fill="#00d4ff" opacity="0.6">// Interview Question</text>
        <line x1="85" y1="75" x2="230" y2="75" stroke="rgba(0,212,255,0.15)" strokeWidth="1"/>
        <line x1="85" y1="88" x2="200" y2="88" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <line x1="85" y1="98" x2="215" y2="98" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <line x1="85" y1="108" x2="180" y2="108" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>

        {/* Score badge on screen */}
        <rect x="180" y="120" width="58" height="28" rx="8" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="1.5"/>
        <text x="188" y="132" fontFamily="Fira Code, monospace" fontSize="8" fill="#10b981">Score</text>
        <text x="188" y="143" fontFamily="Fira Code, monospace" fontSize="9" fill="#10b981" fontWeight="600">8/10</text>

        {/* Person / user at bottom */}
        {/* Head */}
        <circle cx="160" cy="230" r="22" fill="none" stroke="#7c3aed" strokeWidth="1.8" className={styles.head}/>
        {/* Face */}
        <circle cx="153" cy="228" r="2.5" fill="#7c3aed" opacity="0.7"/>
        <circle cx="167" cy="228" r="2.5" fill="#7c3aed" opacity="0.7"/>
        <path d="M154 238 Q160 243 166 238" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Body hint */}
        <path d="M145 252 Q160 262 175 252" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round"/>

        {/* Microphone */}
        <rect x="150" y="258" width="20" height="30" rx="10" fill="none" stroke="#00d4ff" strokeWidth="2" className={styles.mic}/>
        <path d="M140 278 Q140 298 160 298 Q180 298 180 278" fill="none" stroke="#00d4ff" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="160" y1="298" x2="160" y2="308" stroke="#00d4ff" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="148" y1="308" x2="172" y2="308" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round"/>

        {/* Sound waves */}
        <path d="M128 268 Q124 278 128 288" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" className={styles.wave1}/>
        <path d="M118 262 Q112 278 118 294" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" className={styles.wave2}/>
        <path d="M192 268 Q196 278 192 288" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" className={styles.wave1}/>
        <path d="M202 262 Q208 278 202 294" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" className={styles.wave2}/>

        {/* Stars */}
        <path d="M50 50 L52 44 L54 50 L60 52 L54 54 L52 60 L50 54 L44 52 Z" fill="#00d4ff" opacity="0.3" className={styles.spark1}/>
        <path d="M270 240 L272 234 L274 240 L280 242 L274 244 L272 250 L270 244 L264 242 Z" fill="#7c3aed" opacity="0.35" className={styles.spark2}/>
      </svg>
    </div>
  )
}

// ── HISTORY: Charts / Analytics ──
export function HistoryAnimation({ className = '' }) {
  return (
    <div className={`${styles.wrap} ${className}`}>
      <svg viewBox="0 0 320 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
        {/* Main chart card */}
        <rect x="40" y="30" width="240" height="160" rx="14" fill="rgba(0,212,255,0.03)" stroke="#00d4ff" strokeWidth="1.5"/>

        {/* Chart title */}
        <text x="58" y="52" fontFamily="Fira Code, monospace" fontSize="9" fill="#00d4ff" opacity="0.7">// Performance Trend</text>
        <line x1="55" y1="60" x2="265" y2="60" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

        {/* Y axis */}
        <line x1="65" y1="70" x2="65" y2="170" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        {/* X axis */}
        <line x1="65" y1="170" x2="265" y2="170" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>

        {/* Grid lines */}
        <line x1="65" y1="120" x2="265" y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4,4"/>
        <line x1="65" y1="95" x2="265" y2="95" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4,4"/>
        <line x1="65" y1="145" x2="265" y2="145" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4,4"/>

        {/* Area fill */}
        <path d="M75 155 L115 140 L150 120 L185 100 L220 85 L255 75 L255 170 L75 170 Z" fill="url(#chartGrad)" opacity="0.3"/>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Line */}
        <path d="M75 155 L115 140 L150 120 L185 100 L220 85 L255 75" fill="none" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.chartLine}/>

        {/* Data points */}
        <circle cx="75" cy="155" r="4" fill="#00d4ff" className={styles.dot1}/>
        <circle cx="115" cy="140" r="4" fill="#00d4ff" className={styles.dot2}/>
        <circle cx="150" cy="120" r="4" fill="#00d4ff" className={styles.dot3}/>
        <circle cx="185" cy="100" r="4" fill="#7c3aed" className={styles.dot1}/>
        <circle cx="220" cy="85" r="4" fill="#7c3aed" className={styles.dot2}/>
        <circle cx="255" cy="75" r="5" fill="#10b981" className={styles.spark1}/>

        {/* Mini stat cards */}
        <rect x="40" y="205" width="68" height="60" rx="10" fill="rgba(0,212,255,0.05)" stroke="rgba(0,212,255,0.15)" strokeWidth="1.2"/>
        <text x="56" y="226" fontFamily="Fira Code, monospace" fontSize="8" fill="#8892a4">Sessions</text>
        <text x="52" y="246" fontFamily="Fira Code, monospace" fontSize="18" fill="#00d4ff" fontWeight="700">9</text>

        <rect x="126" y="205" width="68" height="60" rx="10" fill="rgba(124,58,237,0.05)" stroke="rgba(124,58,237,0.15)" strokeWidth="1.2"/>
        <text x="134" y="226" fontFamily="Fira Code, monospace" fontSize="8" fill="#8892a4">Avg Score</text>
        <text x="134" y="246" fontFamily="Fira Code, monospace" fontSize="16" fill="#7c3aed" fontWeight="700">72%</text>

        <rect x="212" y="205" width="68" height="60" rx="10" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.15)" strokeWidth="1.2"/>
        <text x="220" y="226" fontFamily="Fira Code, monospace" fontSize="8" fill="#8892a4">Best ATS</text>
        <text x="220" y="246" fontFamily="Fira Code, monospace" fontSize="16" fill="#10b981" fontWeight="700">92%</text>

        {/* Sparkles */}
        <path d="M18 60 L20 54 L22 60 L28 62 L22 64 L20 70 L18 64 L12 62 Z" fill="#00d4ff" opacity="0.3" className={styles.spark2}/>
        <path d="M298 150 L300 144 L302 150 L308 152 L302 154 L300 160 L298 154 L292 152 Z" fill="#7c3aed" opacity="0.3" className={styles.spark1}/>
      </svg>
    </div>
  )
}

// ── SUCCESS / DONE ──
export function SuccessAnimation({ className = '' }) {
  return (
    <div className={`${styles.wrap} ${className}`}>
      <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
        {/* Trophy */}
        <rect x="100" y="140" width="80" height="14" rx="7" fill="none" stroke="#f59e0b" strokeWidth="2"/>
        <rect x="118" y="154" width="44" height="20" rx="4" fill="none" stroke="#f59e0b" strokeWidth="1.5"/>
        <rect x="90" y="174" width="100" height="10" rx="5" fill="none" stroke="#f59e0b" strokeWidth="2"/>
        {/* Cup */}
        <path d="M95 80 L95 140 Q95 160 140 160 Q185 160 185 140 L185 80 Z" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" strokeWidth="2"/>
        {/* Handles */}
        <path d="M95 90 Q70 90 70 115 Q70 140 95 140" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
        <path d="M185 90 Q210 90 210 115 Q210 140 185 140" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
        {/* Star on trophy */}
        <path d="M140 100 L143 112 L155 112 L146 120 L149 132 L140 124 L131 132 L134 120 L125 112 L137 112 Z" fill="#f59e0b" opacity="0.6" className={styles.spark1}/>

        {/* Confetti */}
        <rect x="50" y="60" width="8" height="8" rx="2" fill="#00d4ff" opacity="0.6" transform="rotate(30 54 64)" className={styles.conf1}/>
        <rect x="220" y="80" width="8" height="8" rx="2" fill="#7c3aed" opacity="0.6" transform="rotate(-20 224 84)" className={styles.conf2}/>
        <rect x="60" y="160" width="6" height="6" rx="1" fill="#10b981" opacity="0.7" transform="rotate(45 63 163)" className={styles.conf3}/>
        <rect x="240" y="140" width="6" height="6" rx="1" fill="#f59e0b" opacity="0.7" transform="rotate(-30 243 143)" className={styles.conf1}/>
        <circle cx="80" cy="110" r="5" fill="#ec4899" opacity="0.5" className={styles.float2}/>
        <circle cx="210" cy="60" r="4" fill="#00d4ff" opacity="0.5" className={styles.float3}/>
        <circle cx="230" cy="200" r="5" fill="#7c3aed" opacity="0.5" className={styles.float1}/>

        {/* Sparkles */}
        <path d="M36 80 L38 74 L40 80 L46 82 L40 84 L38 90 L36 84 L30 82 Z" fill="#00d4ff" opacity="0.5" className={styles.spark1}/>
        <path d="M246 100 L248 94 L250 100 L256 102 L250 104 L248 110 L246 104 L240 102 Z" fill="#f59e0b" opacity="0.5" className={styles.spark2}/>
        <path d="M50 220 L52 214 L54 220 L60 222 L54 224 L52 230 L50 224 L44 222 Z" fill="#10b981" opacity="0.5" className={styles.spark3}/>
      </svg>
    </div>
  )
}
