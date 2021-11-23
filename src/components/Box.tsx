import React, { ReactNode, FC } from "react";
import styled from "styled-components";
import {
  layout,
  space,
  position,
  flexbox,
  typography,
  border,
  color,
  grid,
  LayoutProps,
  PositionProps,
  FlexboxProps,
  TypographyProps,
  SpaceProps,
  BorderProps,
  ColorProps,
  GridProps,
} from "styled-system";

export interface Props
  extends PositionProps,
    SpaceProps,
    LayoutProps,
    FlexboxProps,
    TypographyProps,
    BorderProps,
    ColorProps,
    GridProps {
  children?: ReactNode;
  as?: string | keyof JSX.IntrinsicElements | React.ComponentType<any>;
  src?: string;
  href?: string;
  onClick?: () => void;
  title?: string;
}

// TODO its better for each component to have its own folder and index file
// This quick styled-system box component enables much faster and easier iteration time, but also has some limitations
// Here I opt into using styles-systems for the out of the box (no pun) media queries I can pass through its props
const Box = styled.div<Props>`
  ${position}
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${grid}
  ${typography}
  ${border}
`;

const BoxComponent: FC<Props> = ({ children, href, ...props }) => {
  return (
    <Box href={href} {...props}>
      {children || href}
    </Box>
  );
};

export default BoxComponent;
