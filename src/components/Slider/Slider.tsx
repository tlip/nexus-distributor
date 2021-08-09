import React from 'react';
import styled from '@emotion/styled/macro';
import { Flex } from 'rebass';
import { Text } from 'components/Text';
import { Box, BoxProps } from 'components/Box/Box';
import { useDimensions } from 'hooks/useDimensions';

/**
 * Constants / Utils
 */

const disableScroll = () => false;

const attachEvents = (
  action: 'enable' | 'disable',
  handleEnd: (e: any) => void,
  handleMove: (e: any) => void
) => {
  const fxn = action === 'enable' ? 'removeEventListener' : 'addEventListener';
  const pageContent = document.getElementById('page-content');
  if (pageContent) {
    pageContent[fxn]('onscroll', disableScroll);
    pageContent.style.userSelect = action === 'disable' ? 'none' : 'initial';
    ['mouse', 'pointer', 'touch'].forEach((pre) => {
      document.body[fxn](`${pre}${pre === 'touch' ? 'end' : 'up'}`, handleEnd);
      document.body[fxn](`${pre}move`, handleMove);
    });
  }
};

/**
 * Type definitions
 */

export interface SliderProps extends BoxProps {
  'aria-labelledby'?: string;
  value?: any;
  valueSuffix?: string;
  onChange?: (value: any) => void;
  onInput?: (value: any) => void;
  disabled?: boolean;
}

/**
 * Styled Components
 */

const SliderTrack = styled(Box)`
  position: absolute;
  margin: auto 0;
  left: 0;
  height: 0.25em;
  border-radius: 0.5em;
  user-select: none;
  transition: 100ms linear;
  transform-origin: 50% 50%;
  transform: scale(0);
  opacity: 0;
  animation: 350ms slider-track-appear 0ms 1 forwards;
  @keyframes slider-track-appear {
    to {
      opacity: 1;
      transform: scaleY(1);
    }
  }

  &::before,
  &::after {
    ${({ theme }: any) => `
      font-family: ${theme.fonts.default};
      font-size: ${theme.fontSizes.caption1}px;
      font-weight: ${theme.fontWeights.bold};
      color: ${theme.colors.textGray};
    `};
    letter-spacing: 2.2px;
    position: absolute;
    bottom: -2em;
    opacity: 0;
    transform: translateY(-20px);
    animation: 200ms slider-track-value-appear 1s 1 forwards;
    @keyframes slider-track-value-appear {
      to {
        opacity: 1;
        transform: translateY(0px);
      }
    }
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const SliderThumbContainer = styled.div`
  position: absolute;
  cursor: pointer;
  display: inline-block;
  transition: 100ms linear;
  transform: translate(-50%, -0.4em);
  & > div > div:last-of-type {
    & > span {
      transition: 200ms linear;
    }
    opacity: 0;
    transform: translateY(20px);
    animation: 200ms slider-thumb-value-appear 600ms 1 forwards;
    @keyframes slider-thumb-value-appear {
      to {
        opacity: 1;
        transform: translateY(0px);
      }
    }
  }
`;

const SliderThumb = styled(Box)`
  position: relative;
  height: 1.125em;
  width: 1.125em;
  user-select: none;
  transform: scale(0);
  background: ${({ theme }: any) => theme.colors.white};
  box-shadow: 0 2px 7px 0 #d5dce7;
  animation: 150ms slider-thumb-appear 300ms 1 forwards;
  @keyframes slider-thumb-appear {
    to {
      transform: scale(1);
    }
  }

  &,
  &::before {
    pointer-events: none;
    border-radius: 100%;
  }
  &::before {
    content: '';
    position: absolute;
    transform: rotate(-45deg);
    height: 0.5em;
    width: 0.5em;
    top: 0.3125em;
    left: 0.3125em;
    background: ${({ theme }: any) => theme.colors.primary};
  }

  &.disabled {
    &,
    &::before,
    &::after {
      transition: 200ms linear;
      background: ${({ theme }: any) => theme.colors.text.primary};
    }
  }
`;

/**
 * Main component
 */
export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  value,
  valueSuffix,
  'aria-labelledby': ariaLabelledBy,
  disabled,
  sx,
  onChange,
  onInput,
  ...props
}) => {
  const v = +(value as number | string);
  const dv = +(defaultValue as number | string);
  const [active, setActive] = React.useState(false);
  const [_value, setValue] = React.useState(dv || v || +min);
  const name = React.useMemo(() => Math.random().toString(), []);
  const { ref: containerRef, elements } = useDimensions(name);
  let moveV = _value;

  const { width, left } = React.useMemo(() => {
    return {
      width: elements[name]?.width || 0,
      left: elements[name]?.left || 0,
    };
  }, [elements[name]]);

  // Update slider if value is being externally conteolled
  React.useEffect(() => {
    !isNaN(v) && value !== _value && setValue(v);
  }, [value]);

  // Position of slider thumb
  const x = ((+_value - +min) / (+max - +min)) * width;
  const position = Math.min(width - 9, Math.max(8, x));

  // Our handlers that activates/detivates the slider when dragged
  const handleStart = (): any => {
    !disabled && setActive(true);
  };

  const handleEnd = (): any => {
    onChange?.(moveV);
    onInput?.(moveV);
    setActive(false);
  };

  // Our "move" handler for the component
  const handleMove = (e: any) => {
    if (active) {
      const pageX = e.touches?.[0].pageX || e.pageX;
      const iter = ((pageX - left) / width) * (+max - +min);
      let val = Math.round(iter / +step) * +step;
      val = Math.round(Math.min(+max, Math.max(+min, val + +min)));
      setActive(true);
      setValue(val);
      moveV = val;
    }
  };

  // Whenever the slider is activated, we set listeners to the document body
  // to listen to move and end events. This way the user can move their cursor/finger
  // away from the slider and still have it update/disengage
  React.useEffect(() => {
    if (active) attachEvents('disable', handleEnd, handleMove);
    else attachEvents('enable', handleEnd, handleMove);
    return () => attachEvents('enable', handleEnd, handleMove);
  }, [active]);

  const handleKeyDown = (e: any) => {
    const incrementValue = (direction: 'up' | 'down') => {
      const val =
        direction === 'up'
          ? Math.min(+max, Math.max(+min, _value + +step))
          : Math.min(+max, Math.max(+min, _value - +step));
      setValue(val);
      onChange?.(val);
      onInput?.(val);
    };

    if (['ArrowUp', 'ArrowRight'].includes(e.key)) {
      e.nativeEvent.preventDefault();
      incrementValue('up');
    } else if (['ArrowDown', 'ArrowLeft'].includes(e.key)) {
      e.nativeEvent.preventDefault();
      incrementValue('down');
    }
  };

  return (
    <Box
      {...props}
      sx={{ width: '100%', position: 'relative', height: '4em', ...sx }}
      onPointerDown={handleStart}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      <div ref={containerRef} style={{ transform: 'translateY(2em)' }}>
        <SliderTrack
          width="100%"
          bg="border"
          sx={{
            '&::before': {
              content: `"${min}${valueSuffix ? ` ${valueSuffix}` : ''}"`,
            },
            '&::after': {
              content: `"${max}${valueSuffix ? ` ${valueSuffix}` : ''}"`,
            },
          }}
        />
        <SliderTrack
          sx={{
            bg: disabled ? 'textGray' : 'primary',
            width: position,
          }}
        />
        <SliderThumbContainer
          onPointerDown={handleStart}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          style={{ left: position }}
        >
          <Flex flexDirection="column" alignItems="center">
            <SliderThumb
              role="slider"
              tabIndex={+!disabled}
              onKeyDown={handleKeyDown}
              className={disabled ? 'disabled' : ''}
              aria-valuemin={min as number | undefined}
              aria-valuemax={max as number | undefined}
              aria-valuenow={value as number | undefined}
              aria-disabled={disabled}
              aria-labelledby={ariaLabelledBy}
              value={_value}
              disabled={disabled}
              {...{ min, max, step }}
            />
            <Box
              py="0.15em"
              px="0.5em"
              bg="white"
              style={{ position: 'absolute', top: -35 }}
              sx={{
                borderRadius: '0.3em',
                boxShadow: '0 2px 6px 0 rgba(198, 206, 219, 0.59)',
              }}
            >
              <Text
                variant="caption1"
                fontWeight="bold"
                color="textGray"
                style={{ letterSpacing: '2px', whiteSpace: 'nowrap' }}
              >
                {_value}
                {valueSuffix ? ` ${valueSuffix}` : ''}
              </Text>
            </Box>
          </Flex>
        </SliderThumbContainer>
      </div>
    </Box>
  );
};
