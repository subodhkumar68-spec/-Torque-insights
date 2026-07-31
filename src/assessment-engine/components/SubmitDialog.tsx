import React from 'react';

interface SubmitDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export const SubmitDialog: React.FC<SubmitDialogProps> = ({
  onCancel,
  onConfirm
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-slate-100 text-left">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Confirm Test Submission</h3>
        <p className="text-xs text-slate-500 font-semibold leading-relaxed">
          Are you sure you want to finish and submit your answers? You cannot change responses after submission.
        </p>
        <div className="flex gap-3 justify-end pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-650 hover:bg-slate-50 cursor-pointer"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2 bg-brand-red hover:bg-brand-redhover rounded-xl text-xs font-bold text-white cursor-pointer"
          >
            Submit Now
          </button>
        </div>
      </div>
    </div>
  );
};
