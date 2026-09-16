export function TowerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="none"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cyan signal wave arcs */}
      <g stroke="#29abe2" strokeWidth={46} strokeLinecap="round">
        <path d="M 334.7 471.9 A 265 265 0 0 1 334.7 78.1" />
        <path d="M 376.8 405.6 A 188 188 0 0 1 376.8 144.4" />
        <path d="M 647.2 144.4 A 188 188 0 0 1 647.2 405.6" />
        <path d="M 689.3 78.1 A 265 265 0 0 1 689.3 471.9" />
      </g>

      {/* Diagonal truss braces */}
      <path
        d="M 474 548 L 565 668 L 433 798"
        stroke="#29abe2"
        strokeWidth={42}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Main tower legs */}
      <path
        d="M 488 385 L 390 935"
        stroke="#8b61c2"
        strokeWidth={50}
        strokeLinecap="round"
      />
      <path
        d="M 536 385 L 634 935"
        stroke="#8b61c2"
        strokeWidth={50}
        strokeLinecap="round"
      />

      {/* Top antenna ring and core */}
      <circle
        cx="512"
        cy="275"
        r="111"
        stroke="#8b61c2"
        strokeWidth={50}
      />
      <circle cx="512" cy="275" r="42" fill="#ff751f" />
    </svg>
  );
}
