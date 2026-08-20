export function ServiceIcon({ icon }: { icon: string }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', strokeWidth: 2 };

  switch (icon) {
    case 'screen':
      return (
        <svg {...common} stroke="#6C4CF1">
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M8 21h8" />
        </svg>
      );
    case 'document':
      return (
        <svg {...common} stroke="#B8791A">
          <path d="M4 19V5a2 2 0 012-2h9l5 5v11a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
          <path d="M14 3v5h5" />
        </svg>
      );
    case 'star':
      return (
        <svg {...common} stroke="#1B9C87">
          <path d="M12 2l3 6 6 1-4.5 4.5L17.5 20 12 17l-5.5 3 1-6.5L3 9l6-1z" />
        </svg>
      );
    case 'target':
    default:
      return (
        <svg {...common} stroke="#B8243F">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
  }
}

const bgByIcon: Record<string, string> = {
  target: '#FFE3E9',
  screen: '#EAE3FB',
  document: '#FFF1D9',
  star: '#DAF7F1',
};

export function iconBackground(icon: string) {
  return bgByIcon[icon] || '#FFE3E9';
}
