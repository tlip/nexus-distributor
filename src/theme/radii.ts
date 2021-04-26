interface IRadiiScaleArray<T>
  extends IThemeScaleArray<
    T,
    {
      slight: number | string;
      small: number | string;
      medium: number | string;
      large: number | string;
      circle: string;
    }
  > {}

const radiiScale = [5, 10, 15, 20, '100%'];
const radiiScaleObject = {
  slight: radiiScale[0],
  small: radiiScale[1],
  medium: radiiScale[2],
  large: radiiScale[3],
  circle: radiiScale[4],
};

export const radii: IRadiiScaleArray<number | string> = Object.assign(
  radiiScale,
  radiiScaleObject
);
