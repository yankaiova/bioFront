import { useEffect, useState } from "react";

export const useCopyOnSelect = (delay: number): { copied: boolean } => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleMouseUp = async (): Promise<void> => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const text = selection.toString().trim();
    if (text.length === 0) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), delay);
    } catch {
      console.log("Ошибка при копировании");
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [delay]);

  return { copied };
};
