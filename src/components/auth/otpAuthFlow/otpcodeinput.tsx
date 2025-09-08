import { useEffect, useRef } from "react";
import { otpFields } from "../../../utilities/data";
import type { OtpProps } from "../../../utilities/types.declarationts";

export function OtpInputComponent({ otp, setOtp }: OtpProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    const numericValue = value.replace(/\D/g, ""); 
    const otpArray = otp.split("");
    otpArray[index] = numericValue[0] || "";
    setOtp(otpArray.join(""));
    if (numericValue && index < otpFields.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").replace(/\D/g, "").slice(0, otpFields.length);
    setOtp(pasteData);
    pasteData.split("").forEach((char, idx) => {
      if (inputsRef.current[idx]) {
        inputsRef.current[idx]!.value = char;
      }
    });

    const lastIndex = Math.min(pasteData.length, otpFields.length) - 1;
    inputsRef.current[lastIndex]?.focus();
  };

  return (
    <div className="w-full flex flex-row gap-[5px] justify-center">
      {otpFields.map((field, index) => (
        <input
          key={field.id}
          type="tel"
          inputMode="numeric"
          maxLength={1}
          value={otp[index] || ""}
          onChange={({ target: { value: text } }) => handleChange(text, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => {
          inputsRef.current[index] = el;
          }}
          className="w-12 h-12 text-center border border-gray-300 rounded bg-white focus:outline-none focus:border-2 focus:border-primary"
        />
      ))}
    </div>
  );
}
