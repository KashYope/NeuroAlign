import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X, Camera } from 'lucide-react';

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
  locale: 'en' | 'fr';
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onClose, locale }) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize scanner
    // The ID must match the div ID
    const scannerId = "html5qr-code-full-region";

    // Safety check if element exists
    if (!document.getElementById(scannerId)) return;

    try {
      const scanner = new Html5QrcodeScanner(
        scannerId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          showTorchButtonIfSupported: true,
          rememberLastUsedCamera: true
        },
        false // verbose
      );

      scannerRef.current = scanner;

      scanner.render(
        (decodedText) => {
          // Success callback
          // Stop scanning before handling success to free resources
          scanner.clear().then(() => {
            onScanSuccess(decodedText);
          }).catch(err => {
            console.error("Failed to clear scanner", err);
            onScanSuccess(decodedText);
          });
        },
        (errorMessage) => {
          // Error callback (called frequently on every frame no QR is found)
          // Do nothing or log gently
        }
      );
    } catch (e) {
      console.error("Scanner initialization failed", e);
      setError(locale === 'fr'
        ? "Impossible d'initialiser la caméra. Veuillez vérifier les permissions."
        : "Could not initialize camera. Please ensure permissions are granted.");
    }

    // Cleanup function
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error("Failed to clear html5-qrcode scanner during cleanup", error);
        });
      }
    };
  }, [onScanSuccess, locale]);

  return (
    <div className="fixed inset-0 z-[200] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2rem] overflow-hidden shadow-2xl relative">
        <div className="p-4 flex justify-between items-center border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-900 font-black uppercase tracking-widest text-xs">
            <Camera className="w-4 h-4 text-indigo-600" />
            {locale === 'fr' ? 'Scanner le rapport' : 'Scan Report'}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 bg-slate-50 relative min-h-[400px] flex flex-col items-center justify-center">
          {error ? (
            <div className="text-center text-rose-500 font-bold p-4">
              <p>{locale === 'fr' ? 'Erreur caméra:' : 'Camera Error:'}</p>
              <p className="text-sm font-normal mt-2">{error}</p>
            </div>
          ) : (
             // The ID is critical for the library
             <div id="html5qr-code-full-region" className="w-full"></div>
          )}

          <p className="mt-6 text-center text-xs text-slate-400 font-medium max-w-[250px]">
            {locale === 'fr'
              ? 'Placez le QR code du PDF dans le cadre.'
              : 'Position the QR code from your PDF within the frame.'}
          </p>
        </div>
      </div>

      {/* CSS Overrides for html5-qrcode to make it look decent */}
      <style>{`
        #html5qr-code-full-region {
          border-radius: 1rem;
          overflow: hidden;
        }
        #html5qr-code-full-region video {
          border-radius: 1rem;
          object-fit: cover;
        }
        #html5qr-code-full-region__scan_region {
          background: transparent !important;
        }
        #html5qr-code-full-region__dashboard_section_csr span {
           display: none !important;
        }
        button.html5-qrcode-element {
          padding: 0.5rem 1rem !important;
          border-radius: 0.5rem !important;
          background-color: #4f46e5 !important;
          color: white !important;
          font-weight: bold !important;
          font-size: 0.75rem !important;
          text-transform: uppercase !important;
          border: none !important;
          margin-top: 1rem !important;
          cursor: pointer !important;
        }
        select.html5-qrcode-element {
          padding: 0.5rem !important;
          border-radius: 0.5rem !important;
          border: 1px solid #e2e8f0 !important;
          margin-bottom: 0.5rem !important;
          font-size: 0.875rem !important;
        }
      `}</style>
    </div>
  );
};

export default QRScanner;
