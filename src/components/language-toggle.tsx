import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useDirection } from "@/hooks/use-direction";

// Helper function to check if a language is RTL
const isRtlLanguage = (language: string): boolean =>
  ["ar", "he", "fa", "ur"].includes(language);

const LanguageDirectionToggle: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [direction, setDirection] = useState<"ltr" | "rtl">(
    isRtlLanguage(i18n.language) ? "rtl" : "ltr"
  );
  const { setDir } = useDirection();
  // Update direction based on language change
  useEffect(() => {
    const newDirection: "ltr" | "rtl" = isRtlLanguage(i18n.language)
      ? "rtl"
      : "ltr";
    setDir({ dir: newDirection });
    setDirection(newDirection);
    document.documentElement.setAttribute("dir", newDirection);
  }, [i18n.language]);

  // Function to toggle the language and update direction automatically
  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "ar" : "en"; // Toggle between English and Arabic as an example
    i18n.changeLanguage(newLanguage);

    const newDirection = isRtlLanguage(newLanguage) ? "rtl" : "ltr";
    setDirection(newDirection);
    document.documentElement.setAttribute("dir", newDirection);
  };

  // Manual direction override toggle
  const toggleDirection = () => {
    const newDirection: "ltr" | "rtl" = direction === "ltr" ? "rtl" : "ltr";
    setDirection(newDirection);
    document.documentElement.setAttribute("dir", newDirection);
  };

  return (
    <div>
      <Button variant="outline" onClick={toggleLanguage}>
        {t("change_language")} (Current: {i18n.language.toUpperCase()})
      </Button>
      {/* <Button variant="outline" onClick={toggleDirection} style={{ marginLeft: "8px" }}>
        Toggle Direction (Current: {direction.toUpperCase()})
      </Button> */}
    </div>
  );
};

export default LanguageDirectionToggle;
