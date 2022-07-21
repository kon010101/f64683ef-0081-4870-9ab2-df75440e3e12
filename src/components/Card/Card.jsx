import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import Location from "../Location/Location";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { fabStyle } from "./styles";
import { EventContext } from "../../context/EventContext";
import { eventActionTypes } from "../../context/actionTypes";
import { formatDate, formatTime } from "../../util";
import IconWithText from "../IconWithText/IconWithText";
import Image from "../Image/Image";

const { ADD_TO_CART, REMOVE_FROM_CART } = eventActionTypes;

const Card = ({ event }) => {
  const { title, flyerFront, venue, startTime, endTime } = event;
  const { eventState, dispatch } = useContext(EventContext);

  const eventInCart = () => {
    return eventState.cartEvents.find((cartEvent) => cartEvent === event);
  };

  const handleButtonClick = () => {
    if (eventInCart()) {
      dispatch({ type: REMOVE_FROM_CART, payload: event });
    } else {
      dispatch({ type: ADD_TO_CART, payload: event });
    }
  };

  return (
    <Box sx={{ padding: "0 0.5rem" }}>
      <IconWithText title={title} />
      <Image url={flyerFront} />
      <Location url={venue.direction} name={venue.name} />
      <Typography align="left">
        Starts: {formatDate(startTime)}, {formatTime(startTime)}
      </Typography>
      <Typography align="left">
        Ends: {formatDate(endTime)}, {formatTime(endTime)}
      </Typography>
      <Fab
        sx={fabStyle}
        onClick={handleButtonClick}
        size="small"
        color="primary"
        aria-label="add"
      >
        {eventInCart() ? <RemoveIcon /> : <AddIcon />}
      </Fab>
    </Box>
  );
};

export default Card;
