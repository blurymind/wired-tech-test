import styled, { keyframes } from "styled-components";

// TODO I used pure styled here
export const StyledBannerImg = styled.img`
  object-fit: contain;
  height: 100%;
`;

// TODO It's better for performance to avoid passing anonymous objects/functions to props
export const responsiveStyle = {
  fontSize: [14, 20], // These arrays are a very nice and quick way to aid the responsive design with unified media queries!
  headerHeight: ["50px", "100px"],
  padding: ["5px", "15px"],
};

const moveKeys = keyframes`
  from {transform: translateX(-100px); opacity: 0;}
  to { transform: translateX(0px); opacity: 1;}
`;
export const AnimatedNameDiv = styled.div`
  opacity: 1;
  transform: translate(-100, 0);
  animation: ${moveKeys} 0.5s ease-out;
`;
