import { createTheme } from '@mui/material/styles';

// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

import { viVN as coreViVN, enUS as coreEnUS } from '@mui/material/locale';
import { viVN, enUS } from '@mui/x-date-pickers/locales';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization, i18n) => {
  const color = colors;

  const themeMode = customization?.navType;

  const themeOption = {
    colors: color,

    heading: color.grey900,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    divider: color.grey200,
    grey500: color.grey500,

    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    
    customization
  };

  const darkThemeOption = {
    colors: color,
    
    heading: color.grey300,
    darkTextPrimary: color.grey200,
    darkTextSecondary: color.grey50,
    textDark: color.grey300,
    divider: color.grey600,
    grey500: color.grey50,

    paper: color.darkPaper,
    backgroundDefault: color.darkPaper,
    background: color.darkLevel1,
    menuSelected: color.secondaryLight,
    menuSelectedBack: color.secondaryDark,

    customization
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeMode==='light'?themeOption:darkThemeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    typography: themeTypography(themeMode==='light'?themeOption:darkThemeOption)
  };

  const themes = i18n?.language === 'vi'?createTheme(themeOptions, viVN, coreViVN):createTheme(themeOptions, enUS, coreEnUS);
  const customStyle = componentStyleOverrides(themeMode==='light'?themeOption:darkThemeOption);

  themes.components = {...themes.components, ...customStyle};

  return themes;
};

export default theme;
