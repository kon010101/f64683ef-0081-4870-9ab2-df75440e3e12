import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Item } from "./styledComponents";
import Card from "../Card/Card";

const CardGrid = ({ events }) => {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Grid container spacing={2}>
        {events &&
          events.map((event) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <Item>
                  <Card key={event._id} event={event} />;
                </Item>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default CardGrid;
