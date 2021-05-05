interface IThemeScaleArray<T, P> extends Array<T>, P {}

type BrokenRebassProps = 'css' | 'filter' | 'length';

interface st <T> extends Omit<T, BrokenRebassProps> {
  css?: any;
  filter?: any;
  length?: any;
}
