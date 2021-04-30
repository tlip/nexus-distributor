interface ISpaceScaleArray<T>
  extends IThemeScaleArray<T, Record<string, unknown>> {
  contentWidth: string;
  contentMaxWidth: string;
}

const spaceScale = new Array(14).fill(0).map((_, i) => `${i * 0.25}em`);
const spaceScaleObject = {
  contentWidth: '67.5em',
  contentMaxWidth: 'calc(100vw - 1em)',
};

export const space: ISpaceScaleArray<number | string> = Object.assign(
  spaceScale,
  spaceScaleObject
);
