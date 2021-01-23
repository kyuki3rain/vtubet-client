import media from 'styled-media-query';
import {
  ThemedStyledProps,
  InterpolationValue,
  FlattenInterpolation,
} from 'styled-components';

/**
 * https://github.com/morajabi/styled-media-query/blob/master/src/index.d.ts
 */
type InterpolationFunction<Props, Theme> = (
  props: ThemedStyledProps<Props, Theme>
) => InterpolationValue | FlattenInterpolation<ThemedStyledProps<Props, Theme>>;

type GeneratorFunction<Props, Theme> = (
  strings: TemplateStringsArray,
  ...interpolations: (
    | InterpolationValue
    | InterpolationFunction<Props, Theme>
    | FlattenInterpolation<ThemedStyledProps<Props, Theme>>
  )[]
) => any;

const rules: { [v: string]: GeneratorFunction<unknown, any> } = {
  pc: (...args) => media.greaterThan('medium')(...args),
  sp: (...args) => media.lessThan('medium')(...args),
};

export default rules;