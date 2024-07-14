

 const FONT_SIZE = {
    H1: 32,
    H2: 28,
    H3: 24,
    H4: 20,
    H5: 18,
    H6: 16,
    SP:17,
    SUBTITLE: 14,
    BODY: 16,
    SMALL: 12,
  };
  
  const FONT_WEIGHT = {
    REGULAR: '400',
    BOLD: '700',
    SEMIBOLD: '600',
    LIGHT: '300',
    HEAVYBOLD:'900'
  };
  
  const typography = {
    h1: {
      fontSize: FONT_SIZE.H1,
      fontWeight: FONT_WEIGHT.HEAVYBOLD,
    },
    h2: {
      fontSize: FONT_SIZE.H2,
      fontWeight: FONT_WEIGHT.BOLD,
    },
    bold: {
     
      fontWeight: FONT_WEIGHT.BOLD,
    },
    mainHeading: {
      fontSize: FONT_SIZE.H4,
      fontWeight: FONT_WEIGHT.SEMIBOLD,
    },
    heading: {
      fontSize: FONT_SIZE.H5,
      fontWeight: FONT_WEIGHT.SEMIBOLD,
    },
    h6: {
      fontSize: FONT_SIZE.H6,
      fontWeight: FONT_WEIGHT.SEMIBOLD,
    },
    sp: {
      fontSize: FONT_SIZE.SP,
      fontWeight: FONT_WEIGHT.SEMIBOLD,
    },
    subtitle: {
      fontSize: FONT_SIZE.SUBTITLE,
      fontWeight: FONT_WEIGHT.REGULAR,
    },
    body: {
      fontSize: FONT_SIZE.BODY,
      fontWeight: FONT_WEIGHT.REGULAR,
    },
    small: {
      fontSize: FONT_SIZE.SMALL,
      fontWeight: FONT_WEIGHT.LIGHT,
    },
  };
  
  export default typography;
  