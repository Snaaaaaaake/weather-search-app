import React, { useState } from "react";
import { Typography, Container, Box, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchForm from "../SearchForm/SearchForm";
import CityCard from "../CityCard/CityCard";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const App = () => {
  const classes = useStyles();
  const [modalState, setModalState] = useState(false);
  return (
    <Container className={classes.rootContainer} maxWidth="xs">
      <Box className={classes.titleContainer}>
        <Typography align="center" variant="h3" component="h1">
          Поиск погоды
        </Typography>
      </Box>
      <ErrorBoundary>
        <SearchForm openModalHandler={() => setModalState(true)} />
      </ErrorBoundary>
      <Modal
        className={classes.modal}
        open={modalState}
        onClose={() => setModalState(false)}
        disableAutoFocus={true}
        disableEnforceFocus={true}
      >
        <Box>
          <ErrorBoundary>
            <CityCard onCloseHandler={() => setModalState(false)} />
          </ErrorBoundary>
        </Box>
      </Modal>
    </Container>
  );
};

const useStyles = makeStyles({
  rootContainer: {
    marginTop: 40,
    padding: "0 20px",
  },
  titleContainer: { padding: "0 20px" },
  modal: {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "auto",
  },
});

export default App;
