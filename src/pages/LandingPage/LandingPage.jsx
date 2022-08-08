import { useEffect, useContext } from "react";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

import { StickyTitle } from "./styledComponents";
import { formatTitleDate } from "../../util";
import CardGrid from "../../components/CardGrid/CardGrid";
import { EventContext } from "../../context/EventContext";
import { eventActionTypes } from "../../context/actionTypes";
import axios from "axios";

const { FETCH_ERROR, FETCH_SUCCESS, SET_FILTERED } = eventActionTypes;

const LandingPage = () => {
  const eventContext = useContext(EventContext);
  const { eventState, dispatch } = eventContext;

  const renderCardGrids = () => {
    // Sort events by date
    const sortedEvents = eventState.filteredEvents.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    // Create a map oject with dates as keys to show
    // elements grouped by date
    const eventMap = new Map();

    sortedEvents.forEach((event) => {
      eventMap.set(event.date, eventMap.has(event.date) ? [...eventMap.get(event.date), event] : [event]);
    });

    return Array.from(eventMap).map(([key, events]) => {
      return (
        <div key={key} className="GridContainer">
          <StickyTitle variant="h4" color="primary">
            {formatTitleDate(key)}
          </StickyTitle>
          <CardGrid events={events} />
        </div>
      );
    });
  };

  useEffect(() => {
    // Just fetch on the first launch
    if (eventState.allEvents.length === 0) {
      axios("https://tlv-events-app.herokuapp.com/events/uk/london")
        .then(({ data }) => {
          dispatch({ type: FETCH_SUCCESS, payload: data });
          dispatch({ type: SET_FILTERED, payload: data });
        })
        .catch((err) => {
          dispatch({ type: FETCH_ERROR, payload: "Error: Not able to fetch data from API" });
          console.error(err);
        });
    }

    // Exclude elements, that are already in cart
    dispatch({
      type: SET_FILTERED,
      payload: eventState.allEvents.filter((event) => !eventState.cartEvents.includes(event)),
    });
  }, [dispatch, eventState.allEvents, eventState.cartEvents]);

  return (
    <div className="LandingPage">
      <Container>
        <Typography
          sx={{
            margin: "1rem 0",
            paddingTop: "64px",
          }}
          variant="h2"
        >
          Public Events
        </Typography>
        {eventState.loading ? "loading..." : eventState.error ? eventState.error : renderCardGrids()}
      </Container>
    </div>
  );
};

export default LandingPage;
