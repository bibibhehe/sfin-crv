import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (event, language) => {
    i18n.changeLanguage(language);
  };

  return (
    <ToggleButtonGroup
      value={i18n.language}
      exclusive
      onChange={handleChangeLanguage}
      aria-label="text alignment"
    >
      <ToggleButton value="en">
        EN
      </ToggleButton>
      <ToggleButton value="vi">
        VI
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
export default LanguageSwitcher;
