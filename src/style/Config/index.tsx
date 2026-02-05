import type { ThemeConfig } from 'antd';
import { ConfigProvider, theme as antdTheme } from 'antd';

import { hexToRGBA } from 'utils/functions';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { theme as styledTheme } from '../Theme';

export interface GlobalTheme {
  antd: ThemeConfig;
  styled: typeof styledTheme;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

const colors = styledTheme.color;

export const theme: GlobalTheme = {
  antd: {
    algorithm: antdTheme.defaultAlgorithm,
    hashed: false,
    token: {
      colorText: colors.text.primary,
      colorBgLayout: colors.body,
      colorBgContainer: colors.white,
      colorError: colors.danger,
      colorWarning: colors.warning,
      colorInfo: colors.light,
      colorSuccess: colors.success,
      colorPrimary: colors.primary,
      controlOutline: colors.controlOutline,
      colorBorder: colors.colorBorder,
      colorTextPlaceholder: colors.placeholder,
      colorTextDisabled: colors.primary,
      colorLink: colors.text.primary,
      colorLinkHover: colors.text.primary,

      colorBgContainerDisabled: hexToRGBA(colors.primary, 0.1),
      controlItemBgActive: hexToRGBA(colors.primary, 0.1),
      controlItemBgHover: hexToRGBA(colors.primary, 0.1),

      controlPaddingHorizontal: 20 + 1,
      controlPaddingHorizontalSM: 16 + 1,
      paddingXXS: 6,
      paddingSM: 20,
      borderRadius: 20,
      borderRadiusLG: 12,
      borderRadiusSM: 5,
      borderRadiusOuter: 5,
      borderRadiusXS: 5,

      controlHeight: 40,
      controlHeightLG: 55,
      controlHeightSM: 30,

      fontSize: 14,
      fontSizeLG: 16,
      fontSizeXL: 18,
      fontSizeSM: 12,
      fontSizeIcon: 14,
      fontFamily: styledTheme.font.family.inter
    },
    components: {
      Form: {
        itemMarginBottom: 0,
        labelColor: colors.text.primary,
        labelHeight: 22,
        verticalLabelPadding: '0 0 8px'
      },
      Layout: {
        headerHeight: 50,
        headerBg: colors.white,
        triggerBg: colors.white,
        triggerHeight: 40,
        siderBg: colors.white,
        fontSizeIcon: 16,
        headerPadding: '10px 20px'
      },
      Menu: {
        fontSize: 14,
        iconSize: 16,
        collapsedIconSize: 16,
        borderRadiusLG: 0,
        itemMarginInline: 0,
        itemMarginBlock: 4,
        itemHeight: 50,
        itemPaddingInline: '16px',
        controlPaddingHorizontal: 0,
        // Light theme colors for sidebar
        itemBg: colors.white,
        itemColor: colors.text.primary,
        itemHoverBg: colors.primary,
        itemSelectedBg: colors.primary,
        itemSelectedColor: colors.white,
        // Icon colors
        iconMarginInlineEnd: 10,
        // Submenu styling
        subMenuItemBg: colors.white,
        // Dark theme colors (keeping for consistency)
        darkItemBg: colors.primary,
        darkItemColor: '#FFFFFF9C',
        darkItemHoverBg: '#FFFFFF1A',
        darkItemSelectedBg: '#FFFFFF1A',
        darkItemHoverColor: colors.white,
        darkItemSelectedColor: colors.white,
        darkSubMenuItemBg: colors.primary
      },
      Button: {
        borderRadius: 100,
        borderRadiusLG: 100,
        borderRadiusSM: 6,
        colorTextDisabled: colors.white
        // colorBorder: 'transparent'
      },
      Pagination: {
        borderRadius: 6
      },
      Select: {
        borderRadius: 12
      },
      Tabs: {
        horizontalItemPadding: '12px 0'
      },
      Table: {
        headerBorderRadius: 0,
        headerBg: '#FAFBFC',
        rowHoverBg: hexToRGBA(colors.primary, 0.1),
        cellPaddingBlockSM: 8,
        cellPaddingBlockMD: 12,
        cellPaddingInlineSM: 14,
        cellPaddingInlineMD: 16,
        margin: 10
      },
      Modal: {
        borderRadiusLG: 20,
        paddingMD: 30,
        paddingContentHorizontalLG: 40,
        colorPrimary: colors.text.primary
      },
      Typography: {
        algorithm: true,
        fontSizeHeading1: 36,
        fontSizeHeading2: 32,
        titleMarginBottom: 0,
        titleMarginTop: 0,
        colorText: colors.black
      }
    }
  },
  styled: styledTheme
};

function ThemeProvider({ children }: Readonly<ThemeProviderProps>) {
  const { antd, styled } = theme;
  return (
    <ConfigProvider theme={antd}>
      <StyledThemeProvider theme={styled}>
        {/* <GlobalStyles /> */}
        {children}
      </StyledThemeProvider>
    </ConfigProvider>
  );
}

export default ThemeProvider;
