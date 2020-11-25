import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

const Spinner = () => (
  <Box py={5} width="300px" align="center">
    <CircularProgress />
  </Box>
);
export default Spinner;
