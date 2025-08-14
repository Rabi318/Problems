import React, { useRef } from "react";

type Props = {
  onChange?: (digits: string) => void;
  onComplete?: (digits: string) => void;
};

export default function Otp4RefOnly({ onChange, onComplete }: Props) {
  // Initialize an array of exactly 4 slots so `.current` is always defined
  const inputsRef = useRef<Array<HTMLInputElement | null>>(Array(4).fill(null));

  // Utility: keep digits only
  const onlyDigits = (s: string) => (s || "").replace(/\D+/g, "");

  // Read the concatenated value from inputs (may contain empty strings)
  function readAll(): string {
    return inputsRef.current.map((el) => (el ? el.value : "")).join("");
  }

  // Write digits sequentially starting at startIndex. Returns last written index.
  function writeSequential(digits: string, startIndex: number): number {
    let last = startIndex - 1;
    let idx = startIndex;
    for (let k = 0; k < digits.length && idx < 4; k++, idx++) {
      const el = inputsRef.current[idx];
      if (!el) break;
      el.value = digits[k];
      last = idx;
    }
    return Math.max(startIndex - 1, last);
  }

  // Focus a box and place caret at the end (since each box holds at most 1 char)
  function focusBox(i: number) {
    const el = inputsRef.current[i];
    if (!el) return;
    try {
      el.focus();
      const pos = el.value.length; // 0 or 1
      el.setSelectionRange(pos, pos);
    } catch {
      /* ignore */
    }
  }

  // Emit callbacks
  function emit() {
    const raw = onlyDigits(readAll());
    onChange?.(raw);
    if (raw.length === 4) onComplete?.(raw);
  }

  // Input handler: handles single-digit typing, multi-digit autocompletion, etc.
  function handleInput(i: number, e: React.FormEvent<HTMLInputElement>) {
    const el = e.currentTarget;
    const incoming = onlyDigits(el.value);

    if (!incoming) {
      // User cleared or non-digit inserted -> ensure empty and emit
      el.value = "";
      emit();
      return;
    }

    // Place first digit in current box, spill remainder to following boxes
    const first = incoming[0];
    const rest = incoming.slice(1);

    el.value = first;
    const lastWritten = rest.length ? writeSequential(rest, i + 1) : i;

    // Focus next empty from current index forward; otherwise cap to last box
    let nextIdx = 3;
    for (let j = i + 1; j < 4; j++) {
      const it = inputsRef.current[j];
      if (!it || it.value === "") {
        nextIdx = j;
        break;
      }
      // if none empty, nextIdx remains 3
    }

    // If the previously written index is less than nextIdx, prefer lastWritten + 1
    if (lastWritten + 1 < 4) {
      nextIdx = Math.min(nextIdx, lastWritten + 1);
    }

    // Ensure nextIdx is within [0,3]
    nextIdx = Math.max(0, Math.min(3, nextIdx));
    focusBox(nextIdx);
    emit();
  }

  // Keydown handler: block non-digit keys, handle Backspace/Delete navigation
  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    const { key, ctrlKey, metaKey, altKey } = e;

    // Allow browser/system shortcuts
    if (ctrlKey || metaKey) return;

    // Navigation keys allowed
    if (
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

    // Backspace behaviour: delete current or move to previous
    if (key === "Backspace") {
      e.preventDefault();
      const el = inputsRef.current[i];
      if (!el) return;

      if (el.value) {
        // If current has a digit, delete it and keep focus here
        el.value = "";
        focusBox(i);
      } else {
        // Move to previous box and clear it
        const prev = Math.max(0, i - 1);
        const prevEl = inputsRef.current[prev];
        if (prevEl) {
          prevEl.value = "";
          focusBox(prev);
        }
      }
      emit();
      return;
    }

    // Delete key: clear current and keep focus
    if (key === "Delete") {
      e.preventDefault();
      const el = inputsRef.current[i];
      if (!el) return;
      el.value = "";
      focusBox(i);
      emit();
      return;
    }

    // Arrow navigation manual handling
    if (key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      focusBox(i - 1);
      return;
    }
    if (key === "ArrowRight" && i < 3) {
      e.preventDefault();
      focusBox(i + 1);
      return;
    }

    // Alt combos: let browser handle
    if (altKey) return;

    // Block non-digit characters
    if (key.length === 1) {
      const code = key.charCodeAt(0);
      const isDigit = code >= 48 && code <= 57;
      if (!isDigit) {
        e.preventDefault();
      }
      // otherwise allow; actual writing is handled by onInput
    }
  }

  // Paste handler: distribute digits starting from focused index
  function handlePaste(i: number, e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const text = e.clipboardData.getData("text") || "";
    const digits = onlyDigits(text);
    if (!digits) return;

    // Limit to remaining boxes
    const toWrite = digits.slice(0, 4 - i);
    const last = writeSequential(toWrite, i);

    // After paste, focus the next empty or last box + 1
    let next = last + 1;
    if (next >= 4) next = 3;
    // If there is an empty earlier, go there
    for (let j = i; j < 4; j++) {
      const it = inputsRef.current[j];
      if (!it || it.value === "") {
        next = j;
        break;
      }
    }

    focusBox(next);
    emit();
  }

  // Create a typed ref callback to avoid TS complaining about inline assignment
  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputsRef.current[index] = el;
  };

  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2, 3].map((i) => (
        <input
          key={i}
          ref={setInputRef(i)}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          onInput={(e) => handleInput(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={(e) => handlePaste(i, e)}
          className="w-12 h-12 text-center text-xl rounded-xl border border-gray-300 outline-none focus:border-gray-500"
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
