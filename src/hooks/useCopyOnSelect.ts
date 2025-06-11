import { useCallback, useEffect, useRef, useState } from "react";

export const useCopyOnSelect = (
  delay = 1000,
): { isCopied: boolean; handleMouseUp: () => void } => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const text = selection.toString().trim();
    if (text.length === 0) return;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
          setIsCopied(false);
          timeoutRef.current = null;
        }, delay);
      })
      .catch(() => {
        console.log("Ошибка при копировании");
      });
  }, [delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { isCopied, handleMouseUp };
};
