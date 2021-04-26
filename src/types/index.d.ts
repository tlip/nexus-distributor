interface IThemeScaleArray<T, P> extends Array<T>, P {}

type BrokenRebassProps = 'css' | 'filter' | 'length';

interface FixedRebassProps<T> extends Omit<T, BrokenRebassProps> {
  css?: any;
  filter?: any;
  length?: any;
}
