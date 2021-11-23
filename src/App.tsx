import React from "react";
import data from "./segment-data.json";
import Box from "./components/Box"; //TODO ideally shared project components would have absolute imports, but there wasn't time
import EmailChart from "./components/EmailChart";

import { StyledBannerImg, AnimatedNameDiv, responsiveStyle } from "./styled";

// TODO ideally I structure the app into pages and components, but there wasnt any time
const App = () => {
  return (
    <Box
      p={responsiveStyle.padding}
      minHeight="95vh"
      overflowY="auto"
      display="flex"
      flexDirection="column"
    >
      <header>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height={responsiveStyle.headerHeight}
          flexWrap="wrap"
        >
          <AnimatedNameDiv>
            <Box fontWeight="bold" fontSize={responsiveStyle.fontSize}>
              Todor Imreorov assessment...
            </Box>
          </AnimatedNameDiv>

          <StyledBannerImg src="/wp-logo.png" />
        </Box>
      </header>
      <Box
        as="section"
        pt={responsiveStyle.padding}
        display="flex"
        flexDirection="column"
        flex="1"
        alignContent="center"
      >
        <Box fontSize={responsiveStyle.fontSize} as="h3" alignSelf="center">
          What is the best time and day to send an email?
        </Box>
        <Box flex="1" alignSelf="center" verticalAlign="center">
          <EmailChart
            contacts={data?.contacts}
            segmentName={data?.segmentName}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default App;
