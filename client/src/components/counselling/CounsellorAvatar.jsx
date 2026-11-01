import React, { useState } from 'react';

export const AnanyaAvatarSvg = ({ className = 'counsellor-profile-photo' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width="200"
    height="200"
    className={className}
    style={{ display: 'block', borderRadius: 'inherit' }}
  >
    <defs>
      <clipPath id="circleClipAnanyaInline">
        <circle cx="100" cy="100" r="96" />
      </clipPath>
      <linearGradient id="bgGradAnanyaInline" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EBF4F6" />
        <stop offset="100%" stop-color="#DCEBEE" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="99" fill="#C6DEE4" />
    <circle cx="100" cy="100" r="96" fill="url(#bgGradAnanyaInline)" />
    <g clipPath="url(#circleClipAnanyaInline)">
      <ellipse cx="100" cy="74" rx="42" ry="40" fill="#221A16" />
      <circle cx="100" cy="52" r="24" fill="#221A16" />
      <circle cx="100" cy="48" r="16" fill="#302520" />
      <path d="M 40 210 Q 45 150 72 136 L 100 148 L 128 136 Q 155 150 160 210 Z" fill="#2F6F7E" />
      <path d="M 80 140 Q 100 170 120 140 L 115 137 Q 100 162 85 137 Z" fill="#E3A857" />
      <path d="M 88 144 Q 100 162 112 144" stroke="#E3EEE4" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 50 210 Q 56 160 76 142 Q 62 170 60 210 Z" fill="#7FA68A" opacity="0.9" />
      <rect x="88" y="112" width="24" height="30" rx="6" fill="#BD8253" />
      <path d="M 88 122 Q 100 134 112 122 Z" fill="#A86F42" opacity="0.4" />
      <ellipse cx="100" cy="94" rx="31" ry="36" fill="#C68B59" />
      <circle cx="68" cy="96" r="6" fill="#C68B59" />
      <circle cx="68" cy="98" r="2.5" fill="#E3A857" />
      <circle cx="132" cy="96" r="6" fill="#C68B59" />
      <circle cx="132" cy="98" r="2.5" fill="#E3A857" />
      <path d="M 69 90 C 69 62 82 56 100 66 C 118 56 131 62 131 90 C 131 82 126 66 100 70 C 74 66 69 82 69 90 Z" fill="#221A16" />
      <path d="M 69 90 C 70 80 82 72 100 74 C 92 70 78 72 70 85 Z" fill="#302520" />
      <circle cx="100" cy="80" r="2" fill="#8B2635" />
      <path d="M 80 84 Q 88 81 94 85" stroke="#221A16" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M 106 85 Q 112 81 120 84" stroke="#221A16" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <ellipse cx="87" cy="92" rx="4.5" ry="3" fill="#221A16" />
      <ellipse cx="113" cy="92" rx="4.5" ry="3" fill="#221A16" />
      <circle cx="85.5" cy="90.5" r="1.3" fill="#FFFFFF" />
      <circle cx="111.5" cy="90.5" r="1.3" fill="#FFFFFF" />
      <path d="M 82 90 Q 87 87 92 90" stroke="#221A16" strokeWidth="1.2" fill="none" />
      <path d="M 108 90 Q 113 87 118 90" stroke="#221A16" strokeWidth="1.2" fill="none" />
      <path d="M 98 94 Q 100 102 103 102" stroke="#A86F42" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="78" cy="102" r="6" fill="#D47A6A" opacity="0.3" />
      <circle cx="122" cy="102" r="6" fill="#D47A6A" opacity="0.3" />
      <path d="M 90 112 Q 100 122 110 112" fill="#9E4747" />
      <path d="M 91 112 Q 100 115 109 112" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
    </g>
  </svg>
);

export const RahulAvatarSvg = ({ className = 'counsellor-profile-photo' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width="200"
    height="200"
    className={className}
    style={{ display: 'block', borderRadius: 'inherit' }}
  >
    <defs>
      <clipPath id="circleClipRahulInline">
        <circle cx="100" cy="100" r="96" />
      </clipPath>
      <linearGradient id="bgGradRahulInline" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EFF6F0" />
        <stop offset="100%" stop-color="#E3EEE4" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="99" fill="#C6DBC8" />
    <circle cx="100" cy="100" r="96" fill="url(#bgGradRahulInline)" />
    <g clipPath="url(#circleClipRahulInline)">
      <path d="M 50 210 Q 55 145 78 134 L 100 144 L 122 134 Q 145 145 150 210 Z" fill="#F7F5EF" />
      <path d="M 40 210 Q 48 146 76 136 L 90 144 L 90 210 L 40 210 Z" fill="#2F6F7E" />
      <path d="M 160 210 Q 152 146 124 136 L 110 144 L 110 210 L 160 210 Z" fill="#2F6F7E" />
      <path d="M 82 134 C 82 128 118 128 118 134 L 115 142 C 115 138 85 138 85 142 Z" fill="#245864" />
      <rect x="98" y="142" width="4" height="68" fill="#245864" />
      <circle cx="100" cy="154" r="2.2" fill="#E3A857" />
      <circle cx="100" cy="172" r="2.2" fill="#E3A857" />
      <circle cx="100" cy="190" r="2.2" fill="#E3A857" />
      <rect x="87" y="110" width="26" height="28" rx="6" fill="#BD8253" />
      <path d="M 87 122 Q 100 134 113 122 Z" fill="#A86F42" opacity="0.4" />
      <ellipse cx="100" cy="80" rx="36" ry="38" fill="#1D1714" />
      <circle cx="65" cy="94" r="7" fill="#BD8253" />
      <circle cx="135" cy="94" r="7" fill="#BD8253" />
      <ellipse cx="100" cy="94" rx="32" ry="36" fill="#BD8253" />
      <path d="M 72 96 C 72 128 84 134 100 134 C 116 134 128 128 128 96 C 124 112 114 125 100 125 C 86 125 76 112 72 96 Z" fill="#1D1714" opacity="0.8" />
      <path d="M 90 114 Q 100 111 110 114 Q 100 118 90 114 Z" fill="#1D1714" opacity="0.75" />
      <path d="M 64 84 C 64 54 82 46 102 46 C 126 46 138 58 136 78 C 130 68 116 62 98 62 C 80 62 68 72 64 84 Z" fill="#1D1714" />
      <path d="M 66 84 C 74 64 94 56 120 58 C 104 52 84 54 68 74 Z" fill="#2C231F" />
      <path d="M 78 82 Q 86 78 94 82" stroke="#1D1714" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M 106 82 Q 114 78 122 82" stroke="#1D1714" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <circle cx="86" cy="91" r="3.6" fill="#1D1714" />
      <circle cx="114" cy="91" r="3.6" fill="#1D1714" />
      <circle cx="85" cy="89.5" r="1.2" fill="#FFFFFF" />
      <circle cx="113" cy="89.5" r="1.2" fill="#FFFFFF" />
      <circle cx="86" cy="91" r="10.5" stroke="#2F6F7E" strokeWidth="2.2" fill="none" />
      <circle cx="114" cy="91" r="10.5" stroke="#2F6F7E" strokeWidth="2.2" fill="none" />
      <path d="M 96.5 91 L 103.5 91" stroke="#2F6F7E" strokeWidth="2" />
      <path d="M 75.5 89 L 66 87" stroke="#2F6F7E" strokeWidth="1.8" />
      <path d="M 124.5 89 L 134 87" stroke="#2F6F7E" strokeWidth="1.8" />
      <path d="M 80 87 L 84 83" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M 108 87 L 112 83" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M 98 94 Q 100 104 104 104" stroke="#A86F42" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 92 119 Q 100 126 108 119" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
  </svg>
);

export const SnehaAvatarSvg = ({ className = 'counsellor-profile-photo' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width="200"
    height="200"
    className={className}
    style={{ display: 'block', borderRadius: 'inherit' }}
  >
    <defs>
      <clipPath id="circleClipSnehaInline">
        <circle cx="100" cy="100" r="96" />
      </clipPath>
      <linearGradient id="bgGradSnehaInline" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FCF9F3" />
        <stop offset="100%" stop-color="#F5EBD7" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="99" fill="#E5D6B6" />
    <circle cx="100" cy="100" r="96" fill="url(#bgGradSnehaInline)" />
    <g clipPath="url(#circleClipSnehaInline)">
      <path d="M 60 85 C 50 120 48 160 52 210 L 148 210 C 152 160 150 120 140 85 C 130 55 70 55 60 85 Z" fill="#1E1714" />
      <path d="M 40 210 Q 46 148 72 136 L 100 148 L 128 136 Q 154 148 160 210 Z" fill="#E3A857" />
      <path d="M 115 138 Q 140 155 155 210 L 128 210 Q 112 165 96 150 Z" fill="#7FA68A" />
      <path d="M 118 140 Q 138 160 150 210" stroke="#E3EEE4" strokeWidth="1.8" strokeDasharray="3,3" fill="none" />
      <rect x="88" y="112" width="24" height="28" rx="6" fill="#D29766" />
      <path d="M 88 122 Q 100 132 112 122 Z" fill="#BE8050" opacity="0.4" />
      <ellipse cx="100" cy="94" rx="30" ry="35" fill="#D29766" />
      <circle cx="70" cy="95" r="5.5" fill="#D29766" />
      <circle cx="70" cy="98" r="2" fill="#B0B7BD" />
      <path d="M 68 102 L 72 102 L 73 105 L 67 105 Z" fill="#B0B7BD" />
      <circle cx="130" cy="95" r="5.5" fill="#D29766" />
      <circle cx="130" cy="98" r="2" fill="#B0B7BD" />
      <path d="M 128 102 L 132 102 L 133 105 L 127 105 Z" fill="#B0B7BD" />
      <path d="M 69 90 C 70 60 85 52 100 58 C 118 52 131 60 131 88 C 131 76 122 62 100 66 C 78 62 70 76 69 90 Z" fill="#1E1714" />
      <path d="M 68 92 C 60 115 58 145 68 185 C 72 160 74 130 73 102 Z" fill="#1E1714" />
      <path d="M 69 98 C 64 120 62 145 70 175" stroke="#2D231E" strokeWidth="2" fill="none" />
      <path d="M 81 83 Q 89 79 95 83" stroke="#1E1714" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M 105 83 Q 111 79 119 83" stroke="#1E1714" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <ellipse cx="88" cy="91" rx="4.2" ry="3" fill="#1E1714" />
      <ellipse cx="112" cy="91" rx="4.2" ry="3" fill="#1E1714" />
      <circle cx="86.5" cy="89.5" r="1.3" fill="#FFFFFF" />
      <circle cx="110.5" cy="89.5" r="1.3" fill="#FFFFFF" />
      <path d="M 83 89 Q 88 86 93 89" stroke="#1E1714" strokeWidth="1.4" fill="none" />
      <path d="M 107 89 Q 112 86 117 89" stroke="#1E1714" strokeWidth="1.4" fill="none" />
      <path d="M 98 94 Q 100 102 103 102" stroke="#BE8050" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="78" cy="100" r="6" fill="#E88374" opacity="0.32" />
      <circle cx="122" cy="100" r="6" fill="#E88374" opacity="0.32" />
      <path d="M 90 109 Q 100 123 110 109 Z" fill="#A84343" />
      <path d="M 91 109 Q 100 115 109 109 Z" fill="#FFFFFF" />
    </g>
  </svg>
);

export const ArjunAvatarSvg = ({ className = 'counsellor-profile-photo' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width="200"
    height="200"
    className={className}
    style={{ display: 'block', borderRadius: 'inherit' }}
  >
    <defs>
      <clipPath id="circleClipArjunInline">
        <circle cx="100" cy="100" r="96" />
      </clipPath>
      <linearGradient id="bgGradArjunInline" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EFF6F8" />
        <stop offset="100%" stop-color="#E0ECEF" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="99" fill="#C4DCE2" />
    <circle cx="100" cy="100" r="96" fill="url(#bgGradArjunInline)" />
    <g clipPath="url(#circleClipArjunInline)">
      <path d="M 38 210 Q 46 146 74 135 L 100 146 L 126 135 Q 154 146 162 210 Z" fill="#7FA68A" />
      <path d="M 83 133 C 83 126 117 126 117 133 L 114 143 C 114 137 86 137 86 143 Z" fill="#6B9176" />
      <rect x="98" y="142" width="4" height="68" fill="#6B9176" />
      <circle cx="100" cy="154" r="2.2" fill="#3D5243" />
      <circle cx="100" cy="172" r="2.2" fill="#3D5243" />
      <circle cx="100" cy="190" r="2.2" fill="#3D5243" />
      <rect x="88" y="110" width="24" height="28" rx="6" fill="#B87C4C" />
      <path d="M 88 122 Q 100 134 112 122 Z" fill="#A26839" opacity="0.4" />
      <ellipse cx="100" cy="80" rx="36" ry="38" fill="#252220" />
      <circle cx="66" cy="95" r="6.8" fill="#B87C4C" />
      <circle cx="134" cy="95" r="6.8" fill="#B87C4C" />
      <ellipse cx="100" cy="94" rx="31" ry="35" fill="#B87C4C" />
      <path d="M 65 84 C 65 52 82 46 100 46 C 122 46 135 54 135 78 C 130 66 118 60 100 60 C 82 60 70 70 65 84 Z" fill="#252220" />
      <path d="M 67 82 Q 74 68 84 64" stroke="#8E979E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 68 88 Q 75 76 80 72" stroke="#B0B8BF" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M 133 82 Q 126 68 116 64" stroke="#8E979E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 79 83 Q 87 80 94 83" stroke="#252220" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M 106 83 Q 113 80 121 83" stroke="#252220" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <ellipse cx="87" cy="92" rx="4" ry="2.8" fill="#252220" />
      <ellipse cx="113" cy="92" rx="4" ry="2.8" fill="#252220" />
      <circle cx="85.5" cy="90.5" r="1.1" fill="#FFFFFF" />
      <circle cx="111.5" cy="90.5" r="1.1" fill="#FFFFFF" />
      <path d="M 79 92 Q 81 94 80 96" stroke="#A26839" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M 121 92 Q 119 94 120 96" stroke="#A26839" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M 98 94 Q 100 103 104 103" stroke="#A26839" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 75 106 C 75 128 86 132 100 132 C 114 132 125 128 125 106 C 121 120 112 127 100 127 C 88 127 79 120 75 106 Z" fill="#252220" opacity="0.2" />
      <path d="M 91 114 Q 100 122 109 114" stroke="#753030" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M 93 115 Q 100 119 107 115" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </g>
  </svg>
);

const CounsellorAvatar = ({ name = '', photo = '', className = 'counsellor-profile-photo' }) => {
  const [loadFailed, setLoadFailed] = useState(false);

  // Directly match verified counsellor illustrated avatars
  const normalizedName = name.toLowerCase();

  const renderInlineAvatar = () => {
    if (normalizedName.includes('ananya')) {
      return <AnanyaAvatarSvg className={className} />;
    }
    if (normalizedName.includes('rahul')) {
      return <RahulAvatarSvg className={className} />;
    }
    if (normalizedName.includes('sneha')) {
      return <SnehaAvatarSvg className={className} />;
    }
    if (normalizedName.includes('arjun')) {
      return <ArjunAvatarSvg className={className} />;
    }
    // Default fallback
    return <AnanyaAvatarSvg className={className} />;
  };

  // If already known Indian counsellor, render the SVG illustration directly for crisp vector fidelity
  if (
    normalizedName.includes('ananya') ||
    normalizedName.includes('rahul') ||
    normalizedName.includes('sneha') ||
    normalizedName.includes('arjun')
  ) {
    return renderInlineAvatar();
  }

  // If photo is provided and hasn't failed, attempt to load <img>
  if (photo && !loadFailed) {
    return (
      <img
        src={photo}
        alt={name}
        className={className}
        onError={() => setLoadFailed(true)}
      />
    );
  }

  return renderInlineAvatar();
};

export default CounsellorAvatar;
