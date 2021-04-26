interface ISpaceScaleArray<T>
  extends IThemeScaleArray<T, Record<string, unknown>> {
  // ...to do? maybe?
}

const spaceScale = new Array(14).fill(0).map((_, i) => `${i * 0.25}em`);
const spaceScaleObject = {
  // if we need it?
};

export const space: ISpaceScaleArray<number | string> = Object.assign(
  spaceScale,
  spaceScaleObject
);
