import { useState, useCallback, useRef, createContext, useContext, type ReactNode } from 'react';

type ToastContextType = (msg: string) => void;
const ToastContext = createContext<ToastContextType>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((message: string) => {
    setMsg(message);
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2800);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        style={{
          position: 'fixed', bottom: 80, left: '50%', transform: `translateX(-50%) translateY(${visible ? 0 : 20}px)`,
          background: '#1C1C1E', color: 'white', padding: '10px 20px', borderRadius: 30,
          fontSize: 13, fontWeight: 500, opacity: visible ? 1 : 0,
          transition: 'all .3s', zIndex: 9999, whiteSpace: 'nowrap', pointerEvents: 'none',
        }}
      >
        {msg}
      </div>
    </ToastContext.Provider>
  );
}
