import React from "react";

export default function Footer({ onDiscard, onSaveDraft, onSubmit }) {
  return (
    <div>
      <div className="w-full flex justify-between items-center mt-5">
        <div className="">
          <button
            type="button"
            onClick={onDiscard}
            className="text-[var(--gray)] rounded-xl font-bold p-3"
          >
            Discard
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={onSaveDraft}
            className="text-[var(--gray)] bg-[var(--purple-900)] p-3 font-bold rounded-xl"
          >
            Save as Draft
          </button>
        </div>

        <div>
          <button
            type="submit"
            onClick={onSubmit}
            className="text-white font-bold rounded-xl p-3 bg-[var(--purple-500)]"
          >
            Save & Send
          </button>
        </div>
      </div>
    </div>
  );
}
