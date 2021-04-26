interface ITypographyScaleArray<T>
  extends IThemeScaleArray<
    T,
    {
      h1: number | string;
      h2: number | string;
      h3: number | string;
      h4: number | string;
      h5: number | string;
      h6: number | string;
      subhead: number | string;
      body1: number | string;
      body2: number | string;
      button: number | string;
      caption1: number | string;
      caption2: number | string;
    }
  > {}

interface ITypography {
  fonts: { [variant: string]: string };
  fontWeights: { [variant: string]: number };
  fontSizes: ITypographyScaleArray<number | string>;
  letterSpacings: ITypographyScaleArray<number | string>;
  text: { [variant: string]: { [styleProp: string]: string | number } };
}

/**
 * System-UI font-size scale
 */
const fontSizesScale = [10, 12, 14, 16, 18, 20, 22, 24, 28, 34, 42];
const fontSizesScaleObject = {
  bigTitle: fontSizesScale[10],
  h1: fontSizesScale[9],
  h2: fontSizesScale[8],
  h3: fontSizesScale[6],
  h4: fontSizesScale[4],
  h5: fontSizesScale[3],
  h6: fontSizesScale[2],
  subhead: fontSizesScale[5],
  body1: fontSizesScale[3],
  body2: fontSizesScale[2],
  button: fontSizesScale[2],
  caption1: fontSizesScale[1],
  caption2: fontSizesScale[0],
  error: fontSizesScale[2],
};
const fontSizes: ITypographyScaleArray<number | string> = Object.assign(
  fontSizesScale,
  fontSizesScaleObject
);

/**
 * System-UI letter-spacing scale
 */
const letterSpacingsScale = [-1, -0.75, -0.5, -0.25, 0, 0.1, 0.15, 0.4, 1.5];
const letterSpacingsScaleObject = {
  bigTitle: letterSpacingsScale[0],
  h1: letterSpacingsScale[1],
  h2: letterSpacingsScale[2],
  h3: letterSpacingsScale[3],
  h4: letterSpacingsScale[4],
  h5: letterSpacingsScale[5],
  h6: letterSpacingsScale[6],
  subhead: letterSpacingsScale[5],
  body1: letterSpacingsScale[6],
  body2: letterSpacingsScale[6],
  button: letterSpacingsScale[3],
  caption1: letterSpacingsScale[7],
  caption2: letterSpacingsScale[8],
  error: letterSpacingsScale[6],
  mono: letterSpacingsScale[6],
};
const letterSpacings: ITypographyScaleArray<number> = Object.assign(
  letterSpacingsScale,
  letterSpacingsScaleObject
);

/**
 * Helper function to keep text variant definitions a bit more dry
 */
const createTextVariant = (
  variant: string,
  fontWeight: string,
  opts?: { [styleName: string]: string | number }
) => ({
  fontFamily: 'default',
  fontSize: variant,
  letterSpacing: variant,
  color: 'text.primary',
  px: 0,
  fontWeight,
  ...opts,
});

/**
 * Complete `typography` theme export
 */
export const typography: ITypography = {
  fonts: {
    default: "'Open Sans', sans-serif",
  },
  fontWeights: {
    regular: 400,
    semibold: 600,
    bold: 700,
  },
  fontSizes,
  letterSpacings,
  text: {
    bigTitle: createTextVariant('bigTitle', 'semibold'),
    h1: createTextVariant('h1', 'semibold'),
    h2: createTextVariant('h2', 'semibold'),
    h3: createTextVariant('h3', 'semibold'),
    h4: createTextVariant('h4', 'semibold'),
    h5: createTextVariant('h5', 'semibold'),
    h6: createTextVariant('h6', 'semibold'),
    subhead: createTextVariant('subhead', 'regular'),
    body1: createTextVariant('body1', 'regular'),
    body2: createTextVariant('body2', 'regular'),
    button: createTextVariant('button', 'semibold'),
    caption1: createTextVariant('caption1', 'regular'),
    caption2: createTextVariant('caption2', 'semibold', {
      textTransform: 'uppercase',
    }),
    error: createTextVariant('error', 'bold', {
      my: '0.8em',
      color: 'accents.red',
    }),
  },
};
