import { useEffect, useContext } from "react";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

import { formatDate } from "../util";
import CardGrid from "../components/CardGrid/CardGrid";
import { EventContext } from "../context/EventContext";
import { eventActionTypes } from "../context/actionTypes";

const { FETCH_ERROR, FETCH_SUCCESS, SET_FILTERED } = eventActionTypes;

/**
 * Sets styles for sticky titles
 */
const titleStyles = (theme) => ({
  position: "sticky",
  top: "64px",
  margin: "1rem 0",
  padding: "0.5rem 0",
  background: "rgba(255, 255, 255, 0.8)",
  zIndex: 1060,

  [theme.breakpoints.down("sm")]: {
    top: "56px",
  },
});

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
      eventMap.set(
        event.date,
        eventMap.has(event.date)
          ? [...eventMap.get(event.date), event]
          : [event]
      );
    });

    return Array.from(eventMap).map(([key, events]) => {
      return (
        <div key={key} className="GridContainer">
          <Typography variant="h4" color="primary" sx={titleStyles}>
            {formatDate(key)}
          </Typography>
          <CardGrid events={events} />
        </div>
      );
    });
  };

  useEffect(() => {
    // Just fetch on the first launch
    if (eventState.allEvents.length === 0) {
      fetch("https://tlv-events-app.herokuapp.com/events/uk/london")
        .then((res) => res.json())
        .then((events) => {
          dispatch({ type: FETCH_SUCCESS, payload: events });
          dispatch({ type: SET_FILTERED, payload: events });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: FETCH_ERROR, payload: err });
        });
    }

    // Exclude elements, that are already in cart
    dispatch({
      type: SET_FILTERED,
      payload: eventState.allEvents.filter(
        (event) => !eventState.cartEvents.includes(event)
      ),
    });
  }, []);

  console.log(eventState);

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
        {eventState.loading
          ? "loading..."
          : eventState.error
          ? "ooops...something went wrong"
          : renderCardGrids()}
      </Container>
    </div>
  );
};

export default LandingPage;
