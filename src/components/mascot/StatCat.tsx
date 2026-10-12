import React from 'react';

interface StatCatProps {
  mood?: 'happy' | 'explaining' | 'thinking' | 'celebrating' | 'detective';
  speech?: string;
  speechId?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIdHint?: boolean;
}

export const StatCat: React.FC<StatCatProps> = ({
  mood = 'happy',
  speech,
  speechId,
  size = 'md',
  className = '',
  showIdHint = false,
}) => {
  const sizeMap = {
    sm: { cat: 64, text: 'text-xs' },
    md: { cat: 96, text: 'text-sm' },
    lg: { cat: 128, text: 'text-base' },
  };

  const { cat: dim, text: textSize } = sizeMap[size];

  return (
    <div className={`flex items-end gap-3 ${className}`}>
      {/* SVG Mascot */}
      <div className="relative shrink-0 flex flex-col items-center select-none" style={{ width: dim, height: dim }}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-md transition-transform hover:scale-105 duration-300"
          aria-label="Stat Cat mascot"
          role="img"
        >
          {/* Soft shadow */}
          <ellipse cx="60" cy="112" rx="42" ry="7" fill="#E4E4E7" opacity="0.8" />

          {/* Cat Body */}
          <path
            d="M 35 110 C 35 75, 85 75, 85 110 Z"
            fill="#FEF08A"
            stroke="#18181B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Cat Collar in Black with Gold Bell */}
          <path
            d="M 42 100 Q 60 108 78 100"
            stroke="#18181B"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Gold Bell */}
          <circle cx="60" cy="105" r="5" fill="#FACC15" stroke="#18181B" strokeWidth="2" />
          <circle cx="60" cy="106" r="1.5" fill="#18181B" />

          {/* Cat Head */}
          <circle
            cx="60"
            cy="62"
            r="38"
            fill="#FEF9C3"
            stroke="#18181B"
            strokeWidth="3.5"
          />

          {/* Ears */}
          <polygon
            points="32,36 44,14 55,30"
            fill="#FEF08A"
            stroke="#18181B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <polygon
            points="35,33 44,19 51,29"
            fill="#FDE047"
          />
          <polygon
            points="88,36 76,14 65,30"
            fill="#FEF08A"
            stroke="#18181B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <polygon
            points="85,33 76,19 69,29"
            fill="#FDE047"
          />

          {/* Detective Hat or Graduate Cap or Party hat */}
          {mood === 'detective' ? (
            <g>
              <ellipse cx="60" cy="27" rx="36" ry="9" fill="#FACC15" stroke="#18181B" strokeWidth="3" />
              <path d="M 38 27 C 38 12, 82 12, 82 27 Z" fill="#FDE047" stroke="#18181B" strokeWidth="3" />
              {/* Hat Ribbon */}
              <line x1="39" y1="26" x2="81" y2="26" stroke="#18181B" strokeWidth="3" />
              <circle cx="60" cy="22" r="3" fill="#18181B" />
            </g>
          ) : mood === 'celebrating' ? (
            <g>
              {/* Party hat yellow with black dots */}
              <polygon points="60,6 48,28 72,28" fill="#FACC15" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />
              <circle cx="60" cy="5" r="4.5" fill="#FEF08A" stroke="#18181B" strokeWidth="2" />
              <line x1="53" y1="20" x2="67" y2="20" stroke="#18181B" strokeWidth="2.5" />
            </g>
          ) : (
            /* Forehead hair tuft */
            <path d="M 57 28 Q 60 22 63 28" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          )}

          {/* Cheeks */}
          <circle cx="39" cy="74" r="6" fill="#FBBF24" opacity="0.8" />
          <circle cx="81" cy="74" r="6" fill="#FBBF24" opacity="0.8" />

          {/* Eyes */}
          {mood === 'celebrating' || mood === 'happy' ? (
            <g>
              <path d="M 43 62 Q 50 54 57 62" stroke="#18181B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M 63 62 Q 70 54 77 62" stroke="#18181B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </g>
          ) : mood === 'thinking' ? (
            <g>
              <circle cx="49" cy="60" r="4.5" fill="#18181B" />
              <circle cx="51" cy="58" r="1.5" fill="#FFFFFF" />
              <path d="M 65 62 Q 72 58 77 62" stroke="#18181B" strokeWidth="3" strokeLinecap="round" fill="none" />
              <line x1="60" y1="22" x2="60" y2="15" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              <circle cx="48" cy="61" r="5" fill="#18181B" />
              <circle cx="50" cy="59" r="1.8" fill="#FFFFFF" />
              <circle cx="72" cy="61" r="5" fill="#18181B" />
              <circle cx="74" cy="59" r="1.8" fill="#FFFFFF" />
            </g>
          )}

          {/* Nose & Mouth */}
          <polygon points="60,68 57,65 63,65" fill="#18181B" />
          <path d="M 57 69 Q 60 74 63 69" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Whiskers */}
          <line x1="28" y1="67" x2="16" y2="65" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
          <line x1="29" y1="73" x2="18" y2="75" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
          <line x1="92" y1="67" x2="104" y2="65" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
          <line x1="91" y1="73" x2="102" y2="75" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />

          {/* Paw */}
          <g>
            <ellipse cx="78" cy="98" rx="8" ry="6" fill="#FEF08A" stroke="#18181B" strokeWidth="2" />
            {mood === 'explaining' && (
              <line x1="78" y1="95" x2="98" y2="82" stroke="#EAB308" strokeWidth="4.5" strokeLinecap="round" />
            )}
            {mood === 'detective' && (
              <g>
                <circle cx="94" cy="88" r="9" fill="#FEF08A" fillOpacity="0.5" stroke="#18181B" strokeWidth="2.5" />
                <line x1="88" y1="94" x2="78" y2="102" stroke="#18181B" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Thought / Speech Bubble */}
      {speech && (
        <div className="relative bg-white border-2 border-[#18181B] text-[#18181B] rounded-2xl rounded-bl-none p-3.5 shadow-md max-w-md animate-fadeIn">
          <p className={`${textSize} font-black leading-relaxed text-[#18181B]`}>{speech}</p>
          {showIdHint && speechId && (
            <p className="text-xs text-[#B45309] mt-1 pt-1 border-t border-[#FEF08A] italic font-bold">
              🇮🇩 {speechId}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
