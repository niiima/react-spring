import React from "react";

import styled from "styled-components";
import { useSpring, config } from "react-spring";

import { AnimatedBox } from "../animated-box";
import { Img } from "..//img";
import { Heading } from "../heading";
import { Typography } from "../typography";

const CardWrapper = styled(AnimatedBox)`
  transition: box-shadow 0.5s ease-in-out;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  :hover {
    box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
  }
`;
CardWrapper.defaultProps = {
  bg: "#fff",
  width: "100%",
  padding: 2,
  borderRadius: 0
};

export const Card = ({
  content,
  children,
  yRotation = 100,
  xRotation = 50,
  sScale = 1.025,
  opacityOnMouseLeave = false
}) => {
  const calc = (x, y) => [
    -(y - window.innerHeight / 2) / yRotation,
    (x - window.innerWidth / 2) / xRotation,
    sScale
  ];

  const trans = (x, y, s) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
    // config: config.stiff
  }));

  const [opacity, setOpacity] = useSpring(() => ({
    opacity: 1
  }));

  return (
    <CardWrapper
      onMouseMove={({ clientX: x, clientY: y }) => {
        set({ xys: calc(x, y) });
        if (opacityOnMouseLeave) {
          setOpacity({ opacity: 1 });
        }
      }}
      onMouseLeave={() => {
        set({ xys: [0, 0, 1] });
        if (opacityOnMouseLeave) {
          setOpacity({ opacity: 0.75 });
        }
      }}
      style={{ transform: props.xys.interpolate(trans), ...opacity }}
    >
      {content && (
        <>
          <Img src={content.picUrl} minWidth={160} />
          <Heading as="h3">{content.caption}</Heading>
          <Typography>{content.text}</Typography>
        </>
      )}
      {!content && children}
    </CardWrapper>
  );
};
