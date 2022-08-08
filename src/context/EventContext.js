import { createContext, useReducer } from "react";
import { eventActionTypes } from "./actionTypes.js";

const { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, FETCH_SUCCESS, FETCH_ERROR, SET_FILTERED } = eventActionTypes;

const initialState = {
  allEvents: [],
  filteredEvents: [],
  cartEvents: [],
  loading: true,
  error: "",
};

const getCorrectDirectionEvents = (events) => {
  const wrongPart = "Colour+Factory+london";

  return events.map((event) => {
    const correctedUrl = event.venue.direction.replace(wrongPart, `${event.venue.name} ${event.city}`);

    return { ...event, venue: { ...event.venue, direction: correctedUrl } };
  });
};

const eventReducer = (state, action) => {
  const { filteredEvents, cartEvents } = state;

  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        allEvents: getCorrectDirectionEvents(action.payload),
        loading: false,
      };
    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_FILTERED:
      return {
        ...state,
        filteredEvents: action.payload,
      };
    case ADD_TO_CART:
      if (cartEvents.find((item) => action.payload === item)) {
        return state;
      }
      return {
        ...state,
        cartEvents: [...cartEvents, action.payload],
        filteredEvents: filteredEvents.filter((event) => action.payload !== event),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartEvents: cartEvents.filter((item) => item._id !== action.payload._id),
      };
    case CLEAR_CART:
      return {
        ...state,
        cartEvents: [],
      };
    default:
      return state;
  }
};

export const EventContext = createContext();

export const EventContextProvider = ({ children }) => {
  const [eventState, dispatch] = useReducer(eventReducer, initialState);

  return <EventContext.Provider value={{ eventState, dispatch }}>{children}</EventContext.Provider>;
};
