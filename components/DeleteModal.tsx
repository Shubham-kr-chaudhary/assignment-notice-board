type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteModal({
  open,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
        <h2 className="text-xl font-semibold">
          Delete Notice
        </h2>

        <p className="mt-3 text-zinc-400">
          Are you sure you want to delete
          this notice? This action cannot
          be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              rounded-lg
              border
              border-zinc-700
              px-4
              py-2
              hover:bg-zinc-800
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              rounded-lg
              bg-red-600
              px-4
              py-2
              text-white
              hover:bg-red-700
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}