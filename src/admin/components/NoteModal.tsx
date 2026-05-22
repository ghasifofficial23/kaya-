import { useState } from 'react';

interface NoteModalProps {
  open: boolean;
  initialNote: string;
  onSave: (note: string) => void;
  onClose: () => void;
}

export function NoteModal({ open, initialNote, onSave, onClose }: NoteModalProps) {
  const [note, setNote] = useState(initialNote);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 600,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{ background: 'white', borderRadius: 20, padding: 24, width: '100%', maxWidth: 380 }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Add note</div>
        <textarea
          style={{
            width: '100%', padding: 12, border: '1px solid #E5E5EA', borderRadius: 10,
            fontSize: 15, outline: 'none', resize: 'vertical', minHeight: 80, fontFamily: 'inherit',
            boxSizing: 'border-box',
          }}
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="e.g. no onions, extra spicy..."
          autoFocus
        />
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <button
            onClick={onClose}
            style={{ padding: '12px 20px', borderRadius: 10, background: '#F2F2F7', color: '#3A3A3C', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(note)}
            style={{ flex: 1, padding: 12, borderRadius: 10, background: '#C8667A', color: 'white', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer' }}
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}
