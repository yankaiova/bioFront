import { useCallback, useEffect, useState } from "react";

export const useCopyOnSelect = (delay: number): { isCopied: boolean } => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleMouseUp = useCallback(async () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const text = selection.toString().trim();
    if (text.length === 0) return;

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), delay);
    } catch {
      console.log("Ошибка при копировании");
    }
  }, [delay]);

  useEffect(() => {
    const listener = () => {
      void handleMouseUp();
    };
    document.addEventListener("mouseup", listener);
    return () => document.removeEventListener("mouseup", listener);
  }, [handleMouseUp]);

  return { isCopied };
};
