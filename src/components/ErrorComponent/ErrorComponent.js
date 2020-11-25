import React from "react";
import { Box, Typography } from "@material-ui/core";

const ErrorComponent = (props) => {
  return (
    <Box align="center">
      <Typography variant="h6" component="h6">{`${props.error.message}`}</Typography>
    </Box>
  );
};
export default ErrorComponent;
