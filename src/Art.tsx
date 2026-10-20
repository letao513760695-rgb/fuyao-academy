import { useId } from 'react';

export function HeroArt() {
  return (
    <svg className="hero-art" viewBox="0 0 650 490" aria-hidden="true">
      <defs>
        <linearGradient id="hero-orb" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#dfebe1" />
          <stop offset="1" stopColor="#b7cfc0" />
        </linearGradient>
        <linearGradient id="hero-book" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#3c7662" />
          <stop offset="1" stopColor="#164837" />
        </linearGradient>
        <linearGradient id="hero-paper">
          <stop stopColor="#f4eee1" />
          <stop offset=".6" stopColor="#fffdf6" />
          <stop offset="1" stopColor="#d9d4c4" />
        </linearGradient>
        <linearGradient id="hero-gold">
          <stop stopColor="#e4d3ae" />
          <stop offset="1" stopColor="#bca074" />
        </linearGradient>
        <filter id="soft-shadow" x="-40%" y="-40%" width="180%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <pattern id="paper-lines" width="6" height="4" patternUnits="userSpaceOnUse">
          <path d="M0 3h6" stroke="#c1b9a6" strokeWidth=".45" />
        </pattern>
      </defs>
      <circle cx="369" cy="236" r="188" fill="url(#hero-orb)" />
      <circle
        cx="369"
        cy="236"
        r="218"
        fill="none"
        stroke="#ceded1"
        strokeWidth="1"
        strokeDasharray="3 8"
      />
      <path d="M76 287C151 115 370 68 573 119" stroke="#f9faf0" fill="none" strokeWidth="2" />
      <path d="M108 350C245 430 507 332 580 173" stroke="#9ab9a8" fill="none" opacity=".5" />
      <ellipse
        cx="354"
        cy="426"
        rx="185"
        ry="22"
        fill="#6a8f73"
        opacity=".22"
        filter="url(#soft-shadow)"
      />
      <path d="M218 336l201-41 126 59-203 49Z" fill="#d6c49d" />
      <path d="M218 336v27l124 66v-26Z" fill="#b59b6b" />
      <path d="M342 403l203-49v27l-203 48Z" fill="url(#hero-paper)" />
      <path d="M346 407l195-47v16l-195 48Z" fill="url(#paper-lines)" />
      <path d="M213 330l208-46 127 64-208 50Z" fill="url(#hero-gold)" />
      <path d="M240 309l170-38 101 48-169 43Z" fill="#f8f8ef" />
      <path d="M240 309v21l102 49v-17Z" fill="#bbc8b4" />
      <path d="M342 362l169-43v17l-169 43Z" fill="#e4e7d6" />
      <path d="M234 305l177-41 106 49-177 45Z" fill="#e6ecde" />
      <path d="M262 148l139-36 53 194-145 40Z" fill="#123e2f" />
      <path d="M277 141l135-35 55 191-141 37Z" fill="url(#hero-paper)" />
      <path d="M270 134l144-35 55 190-144 39Z" fill="url(#hero-book)" />
      <path
        d="M283 148l121-30 45 157-121 32Z"
        fill="none"
        stroke="#bbbf90"
        strokeWidth=".7"
        opacity=".7"
      />
      <path d="M270 134l-9 14 48 198 16-18Z" fill="#285641" />
      <g transform="translate(342 180) rotate(-15)">
        <path
          d="M-25-20c18-1 21 9 25 12 4-3 8-13 25-12v37C12 15 6 20 0 24c-6-4-12-9-25-7Z"
          fill="none"
          stroke="#d3c898"
          strokeWidth="1.8"
        />
        <path
          d="M0-8v32M-14-30c10 1 15 5 18 11M15-32l-8 10"
          fill="none"
          stroke="#d3c898"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="58"
          fill="#eee5be"
          fontSize="20"
          textAnchor="middle"
          fontFamily="serif"
          letterSpacing="3"
        >
          扶摇学院
        </text>
        <text x="0" y="78" fill="#d1d8bd" fontSize="8" textAnchor="middle" letterSpacing="2">
          道术兼济 · 鲲鹏天下
        </text>
        <path d="M-21 95h42" stroke="#b9bb8a" strokeWidth="1" />
      </g>
      <path d="M370 316l12-4 9 29-9-3-4 7Z" fill="#c6a16a" />
      <g transform="translate(476 334)">
        <path d="M0 51c11-37 17-66 8-105" fill="none" stroke="#6d8a63" strokeWidth="3" />
        <path d="M8 8C-28-7-29-28-24-43 0-39 15-18 8 8Z" fill="#7a9a72" />
        <path d="M12-16C43-29 43-47 39-64 16-56 6-34 12-16Z" fill="#4c775c" />
        <path d="M10-44C-8-58-9-81-3-91 15-78 19-58 10-44Z" fill="#93ab7d" />
        <path d="M6 29c30-6 38-23 36-38C22-8 4 9 6 29Z" fill="#8fa77a" />
      </g>
      <g transform="translate(196 234) rotate(-13)">
        <rect x="-40" y="-38" width="74" height="92" rx="7" fill="#faf9ef" />
        <rect x="-28" y="-25" width="22" height="22" rx="5" fill="#d9e6d3" />
        <path d="M-22-14l5 5 9-12" fill="none" stroke="#5b7d51" strokeWidth="2.5" />
        <path
          d="M-28 10h46M-28 21h38M-28 32h26"
          stroke="#d5d8c7"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(499 134)">
        <circle r="31" fill="#f5f0db" />
        <circle r="23" fill="none" stroke="#d2bc81" />
        <path
          d="M-8 2l5 5 12-13"
          fill="none"
          stroke="#ac925c"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <path d="M206 129l5-13 5 13 13 5-13 5-5 13-5-13-13-5Z" fill="#bd9e63" />
      <path d="M525 257l3-8 3 8 8 3-8 3-3 8-3-8-8-3Z" fill="#b49c68" />
      <circle cx="162" cy="326" r="4" fill="#9fb599" />
      <circle cx="444" cy="73" r="3" fill="#b5c6a9" />
    </svg>
  );
}

export function CourseArt({ theme = 0 }: { theme?: number }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg
      className={`course-art art-${theme % 6}`}
      viewBox="0 0 600 320"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={uid}>
          <stop
            stopColor={
              ['#153d35', '#e9dcc3', '#22384a', '#f0dfd2', '#dce7da', '#e1e5ed'][theme % 6]
            }
          />
          <stop
            offset="1"
            stopColor={
              ['#356b54', '#d6bb8d', '#465b6b', '#e9c5ae', '#abc8b2', '#bac7d8'][theme % 6]
            }
          />
        </linearGradient>
        <linearGradient id={`${uid}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f3e5bf" />
          <stop offset=".5" stopColor="#bb9354" />
          <stop offset="1" stopColor="#e5c78a" />
        </linearGradient>
      </defs>
      <rect width="600" height="320" fill={`url(#${uid})`} />
      <circle cx="480" cy="100" r="190" fill="none" stroke="#fff" opacity=".13" />
      <circle cx="480" cy="100" r="150" fill="none" stroke="#fff" opacity=".13" />
      {theme % 6 === 0 && (
        <g>
          <circle cx="472" cy="85" r="37" fill="#e6d5a2" opacity=".8" />
          <path
            d="M305 272l40-124 43 124M356 272l43-196 48 196M417 272l39-144 40 144M469 272l33-91 34 91"
            fill="#73937a"
            opacity=".28"
          />
          <path d="M313 263l223-11v14l-223 12Z" fill="#c3bc87" />
          <path
            d="M336 250V143l32-5v109M379 246V98l38-8v153M430 240V126l34-7v118M479 235v-68l29-5v72"
            fill="#d6d0ab"
            opacity=".8"
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M342 ${155 + i * 18}l20-3M385 ${113 + i * 24}l25-5M436 ${141 + i * 20}l22-4`}
              stroke="#587562"
              strokeWidth="4"
            />
          ))}
          <path d="M0 290c117-84 219 41 389-24s159-33 211-24v78H0Z" fill="#a3ad7c" opacity=".13" />
        </g>
      )}
      {theme % 6 === 1 && (
        <g transform="translate(438 176)">
          {[0, 1, 2, 3].map((i) => (
            <ellipse
              key={i}
              cx="20"
              cy={58 - i * 9}
              rx="88"
              ry="27"
              fill={`url(#${uid}-gold)`}
              stroke="#ae8b54"
              strokeWidth="1.5"
            />
          ))}
          <g transform="translate(0 -28) rotate(-20)">
            <circle r="83" fill={`url(#${uid}-gold)`} stroke="#ae8b54" strokeWidth="3" />
            <circle r="72" fill="none" stroke="#faf0cd" strokeWidth="2" />
            <circle r="64" fill="none" stroke="#b58d4b" strokeDasharray="2 4" strokeWidth="3" />
            <path d="M-20-20h40v40h-40Z" fill="#dcc598" stroke="#ad884b" strokeWidth="4" />
            <text x="0" y="-35" textAnchor="middle" fill="#987339" fontSize="21" fontFamily="serif">
              通宝
            </text>
            <path d="M-36 30q36 27 72 0" fill="none" stroke="#aa8344" strokeWidth="3" />
          </g>
        </g>
      )}
      {theme % 6 === 2 && (
        <g transform="translate(424 170) rotate(-18)">
          <rect
            x="-93"
            y="-57"
            width="214"
            height="129"
            rx="5"
            fill="#a9b7a0"
            opacity=".5"
            transform="rotate(13)"
          />
          <rect x="-110" y="-72" width="220" height="132" rx="5" fill="#b8c5af" />
          <rect
            x="-101"
            y="-63"
            width="202"
            height="114"
            rx="3"
            fill="none"
            stroke="#687f70"
            strokeWidth="2"
          />
          <rect
            x="-92"
            y="-54"
            width="184"
            height="96"
            fill="none"
            stroke="#788b79"
            strokeDasharray="2 3"
          />
          <circle cx="40" cy="-9" r="35" fill="#8da08a" />
          <path d="M16 9l15-30 12 15 10-20 18 35Z" fill="#bec9af" />
          <text x="-75" y="5" fill="#526f61" fontSize="36" fontFamily="serif">
            壹
          </text>
          <path d="M-77 23h48M-77 31h38" stroke="#7d917e" strokeWidth="2" />
          <text x="0" y="-36" textAnchor="middle" fontSize="9" fill="#526f61" letterSpacing="4">
            钱币文化 · 学习示意
          </text>
        </g>
      )}
      {theme % 6 === 3 && (
        <g>
          <path
            d="M340 89h152a22 22 0 0 1 22 22v72a22 22 0 0 1-22 22h-74l-37 31v-31h-41a22 22 0 0 1-22-22v-72a22 22 0 0 1 22-22Z"
            fill="#b96f51"
          />
          <path
            d="M406 163h110a17 17 0 0 1 17 17v48a17 17 0 0 1-17 17h-18v22l-29-22h-63a17 17 0 0 1-17-17v-48a17 17 0 0 1 17-17Z"
            fill="#f9efdf"
          />
          <path
            d="M347 122h99M347 142h73M414 192h88M414 211h58"
            stroke="#eec6a9"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
      )}
      {theme % 6 === 4 && (
        <g>
          <path d="M330 265v-50h56v-55h58v-55h58v160Z" fill="#f5f5e8" />
          <path d="M386 265v-50h58v-55h58v105Z" fill="#b9cbb3" />
          <path d="M409 129c-1-52 10-77 30-98" stroke="#426c51" fill="none" strokeWidth="4" />
          <path d="M418 86c-42-2-51-27-47-47 34 1 50 21 47 47Z" fill="#6c9568" />
          <path d="M429 64c30-2 44-23 41-43-28 4-43 23-41 43Z" fill="#446f50" />
          <circle cx="526" cy="73" r="19" fill="#ecdfad" />
        </g>
      )}
      {theme % 6 === 5 && (
        <g transform="translate(433 163)">
          <path
            d="M0-97c25 22 55 26 81 29v69c0 50-44 81-81 103-37-22-81-53-81-103v-69c26-3 56-7 81-29Z"
            fill="#647f99"
          />
          <path
            d="M0-79c20 17 43 22 65 25V1c0 38-34 65-65 85-31-20-65-47-65-85v-55c22-3 45-8 65-25Z"
            fill="none"
            stroke="#e3e6df"
            strokeWidth="1.5"
          />
          <path
            d="M-30 1l20 21 45-48"
            fill="none"
            stroke="#edf0e9"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
    </svg>
  );
}
