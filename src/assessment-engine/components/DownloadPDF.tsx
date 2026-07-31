import React from 'react';
import { Download } from 'lucide-react';

interface DownloadPDFProps {
  themeColor?: string;
  onClick?: () => void;
}

export const DownloadPDF: React.FC<DownloadPDFProps> = ({
  themeColor = '#C62828',
  onClick
}) => {
  const handlePrint = () => {
    if (onClick) onClick();
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-xs font-bold text-white shadow-md hover:scale-[1.02] transition-all cursor-pointer"
      style={{ backgroundColor: themeColor }}
    >
      <Download className="h-4.5 w-4.5" />
      <span>Download Report PDF</span>
    </button>
  );
};
