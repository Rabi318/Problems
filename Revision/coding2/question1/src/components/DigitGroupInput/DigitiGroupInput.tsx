import React, { useRef } from "react";

type Props = {
  initialValue?: string; // accepts digits or preformatted (spaces allowed)
  onChange?: (rawDigits: string) => void;
};

export default function DigitGroupInput({ initialValue, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const composingRef = useRef(false);

  // ✅ Fixed: direct initialization — no lazy function, no TS error
  const lastRawRef = useRef<string>(toRawDigits(initialValue ?? ""));

  // --- Helpers ---
  function toRawDigits(s: string): string {
    return (s || "").replace(/\D+/g, "");
  }

  function formatRaw(raw: string): string {
    if (!raw) return "";
    const parts: string[] = [];
    for (let i = 0; i < raw.length; i += 4) parts.push(raw.slice(i, i + 4));
    return parts.join(" ");
  }

  // Count digits to the left of a given formatted index
  function countDigitsLeft(formatted: string, index: number): number {
    let cnt = 0;
    for (let i = 0; i < index && i < formatted.length; i++) {
      const ch = formatted.charCodeAt(i);
      if (ch >= 48 && ch <= 57) cnt++; // '0'..'9'
    }
    return cnt;
  }

  // Map raw digit index back to formatted index
  function formattedIndexFromRaw(rawIdx: number): number {
    if (rawIdx <= 0) return 0;
    const spacesBefore = Math.floor(rawIdx / 4);
    return rawIdx + spacesBefore;
  }

  function reformatAndPreserveSelection() {
    const el = inputRef.current;
    if (!el) return;

    const prevFormatted = el.value;
    const selStart = el.selectionStart ?? prevFormatted.length;
    const selEnd = el.selectionEnd ?? prevFormatted.length;

    const raw = toRawDigits(prevFormatted);

    const rawStart = countDigitsLeft(prevFormatted, selStart);
    const rawEnd = countDigitsLeft(prevFormatted, selEnd);

    const nextFormatted = formatRaw(raw);

    if (prevFormatted !== nextFormatted) {
      el.value = nextFormatted;
    }

    const nextStart = formattedIndexFromRaw(rawStart);
    const nextEnd = formattedIndexFromRaw(rawEnd);

    const clampedStart = Math.min(nextStart, nextFormatted.length);
    const clampedEnd = Math.min(nextEnd, nextFormatted.length);

    try {
      el.setSelectionRange(clampedStart, clampedEnd);
    } catch {
      // Some inputs may not support selection range
    }

    if (raw !== lastRawRef.current) {
      lastRawRef.current = raw;
      onChange && onChange(raw);
    }
  }

  // --- Event Handlers ---
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (composingRef.current) return;

    const { key, ctrlKey, metaKey, altKey } = e;

    if (ctrlKey || metaKey) return;

    if (
      key === "Backspace" ||
      key === "Delete" ||
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      key === "ArrowUp" ||
      key === "ArrowDown" ||
      key === "Home" ||
      key === "End" ||
      key === "Tab"
    ) {
      return;
    }

    if (altKey) return;

    if (key.length === 1) {
      const code = key.charCodeAt(0);
      const isDigit = code >= 48 && code <= 57;
      if (!isDigit) {
        e.preventDefault();
        return;
      }
    }
  }

  function handleInput() {
    if (composingRef.current) return;
    reformatAndPreserveSelection();
  }

  function handlePaste() {
    // Let onInput handle the cleanup & formatting
  }

  function handleCompositionStart() {
    composingRef.current = true;
  }

  function handleCompositionEnd() {
    composingRef.current = false;
    reformatAndPreserveSelection();
  }

  const defaultFormatted = formatRaw(toRawDigits(initialValue ?? ""));

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      pattern="\d*"
      defaultValue={defaultFormatted}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      onPaste={handlePaste}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      className="w-full max-w-md rounded-2xl border border-gray-300 px-4 py-2 text-base tracking-widest outline-none focus:border-gray-500"
      placeholder="____ ____ ____ ____"
      aria-label="Enter digits"
    />
  );
}
