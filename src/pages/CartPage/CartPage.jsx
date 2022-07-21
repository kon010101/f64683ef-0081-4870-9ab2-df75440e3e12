import { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

import CardGrid from "../../components/CardGrid/CardGrid";
import { EventContext } from "../../context/EventContext";
import { eventActionTypes } from "../../context/actionTypes";

const { CLEAR_CART } = eventActionTypes;

const CartPage = () => {
  const eventContext = useContext(EventContext);
  const { eventState, dispatch } = eventContext;

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <div>
      <Container>
        <Typography
          sx={{
            margin: "1rem 0",
            paddingTop: "64px",
          }}
          variant="h2"
        >
          Cart
        </Typography>
        <Button onClick={clearCart}>Clear Cart</Button>
        {eventState.cartEvents.length > 0 ? (
          <CardGrid events={eventState.cartEvents} />
        ) : (
          <Box>Cart empty...</Box>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
