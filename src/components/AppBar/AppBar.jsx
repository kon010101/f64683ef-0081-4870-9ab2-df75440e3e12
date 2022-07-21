import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import HomeIcon from "@mui/icons-material/Home";

import { Search, StyledInputBase, SearchIconWrapper } from "./styledComponents";
import { eventActionTypes } from "../../context/actionTypes";
import { EventContext } from "../../context/EventContext";

const { SET_FILTERED } = eventActionTypes;

const PrimarySearchAppBar = () => {
  const eventContext = useContext(EventContext);
  const { eventState, dispatch } = eventContext;

  const handleSearch = ({ target }) => {
    // If the search is empty, show all events, but those in cart
    if (!target.value || target.value === "") {
      const eventsWithoutCartEvents = eventState.allEvents.filter(
        (event) => !eventState.cartEvents.includes(event)
      );
      dispatch({ type: SET_FILTERED, payload: eventsWithoutCartEvents });
      return;
    }

    const filteredEvents = eventState.allEvents.filter((event) => {
      return event.title.toLowerCase().includes(target.value.toLowerCase());
    });

    dispatch({ type: SET_FILTERED, payload: filteredEvents });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/">
            <HomeIcon sx={{ color: "#fff" }} />
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={handleSearch}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ display: "flex" }}>
            <IconButton size="large" color="inherit">
              <FilterAltIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <Link to="/cart">
              <IconButton
                size="large"
                sx={{
                  color: "#fff",
                }}
              >
                <Badge
                  badgeContent={eventState.cartEvents.length}
                  color="error"
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default PrimarySearchAppBar;
