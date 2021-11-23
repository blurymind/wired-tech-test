import React, { useEffect, useMemo, useState } from "react";
import {
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Tooltip,
  ComposedChart,
} from "recharts";
import Box from "./Box";
import { responsiveStyle } from "../styled";

//TODO its better to keep these types into their own file
type CampaignEventType = { event: string; at: string };
type ContactType = { email: string; campaignEvents: Array<CampaignEventType> };
export interface Props {
  contacts?: Array<ContactType>;
  segmentName?: string;
  evaluateForTimeOfDay?: boolean;
}

// TODO this is very crude, but I was running out of time
const getDaySlice = (curHr: any) => {
  if (curHr < 12) {
    return "Morning";
  } else if (curHr < 18) {
    return "Afternoon";
  } else {
    return "Lunch";
  }
};

// TODO it would be better to change function to start with monday, instead of sunday like unixtime does
const dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// TODO this data is not displayed great, because I had no time to normalize it or explore styling the chart at all
const getHitsPerDayAnalitics = (contacts: Array<any>) => {
  const result: any = {};
  contacts
    .map((contact) => contact.campaignEvents)
    .flat()
    .forEach((event) => {
      const weekDay = new Date(event.at).getDay();
      const weekSlice = getDaySlice(new Date(event.at).getHours());
      if (!result[weekDay])
        result[weekDay] = {
          count: 0,
          time: { Morning: 0, Afternoon: 0, Lunch: 0 },
        };
      result[weekDay].count += 1;
      result[weekDay].time[weekSlice] += 1; // TODO this crude counter doesnt take into account which emails at all
    });

  const prettyResult = Object.entries(result).map(([key, val]) => {
    return {
      day: dayOfWeek[key as any],
      //@ts-ignore - TODO no time to write type for everything alas
      count: val.count,
      //@ts-ignore
      time: val.time,
    };
  });
  return prettyResult;
};

const EmailChart = ({ contacts, segmentName }: Props) => {
  const [width, setWidth] = useState(400);
  // TODO here we do not want to re-compute the data so its cheaper when the chart resizes
  const analitics = useMemo(
    () => getHitsPerDayAnalitics(contacts || []),
    [contacts]
  );

  //TODO since this is a canvas element, I am detecting when it resizes to update its width prop. Would much rather do it with pure css tbh
  const handleElementResize = () => {
    setWidth(window.innerWidth * 0.9);
  };
  useEffect(() => {
    window.addEventListener("resize", handleElementResize, false);
    handleElementResize();
    return () => window.removeEventListener("resize", handleElementResize);
  }, []);

  return (
    <Box>
      <Box alignSelf="center" mb={responsiveStyle.padding}>
        Segment: {segmentName || "N/A"}
      </Box>
      <ComposedChart width={width} height={650} data={analitics}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/*<Bar dataKey="count" stackId="a" fill="#8884d8" />*/}
        {/*TODO I wasnt very well aware of different chart libraries or how to use them, so this part was rushed*/}
        <Bar dataKey="time.Morning" stackId="b" fill="#00C49F" barSize={20} />
        <Bar dataKey="time.Afternoon" stackId="b" fill="#ff9933" barSize={20} />
        <Bar dataKey="time.Lunch" stackId="b" fill="#4da6ff" barSize={20} />
        <Line type="monotone" dataKey="count" fill="#8884d8" stroke="#8884d8" />
      </ComposedChart>
    </Box>
  );
};

export default EmailChart;
