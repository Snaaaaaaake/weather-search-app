import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchCityThunkAction } from "../../actions/actions";
import ServiceContext from "../ServiceContext/ServiceContext";
import Spinner from "../Spinner/Spinner";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import getWeatherIcon from "../../utils/getWeatherIcon";
import toCelsius from "../../utils/toCelsius";

const SearchForm = (props) => {
  const weatherService = useContext(ServiceContext);
  const classes = useStyles();
  const [formState, setFormState] = useState("");
  const {
    fetchCityThunkAction,
    openModalHandler,
    cityState: { city, isLoading, error },
  } = props;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    fetchCityThunkAction(weatherService, formState.toLowerCase());
  };

  return (
    <>
      <form className={classes.form} onSubmit={onSubmitHandler} autoComplete="off">
        <TextField
          className={classes.input}
          id="outlined-basic"
          onChange={(event) => setFormState(event.target.value)}
          label="Введите город"
          value={formState}
          variant="outlined"
          required
          disabled={isLoading}
          inputProps={{ pattern: "^[а-яА-ЯеЁa-zA-Z\\s\\-]+$" }}
        />
        <Button disabled={isLoading} variant="contained" type="submit" color="primary">
          Найти
        </Button>
      </form>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorComponent error={error} />
      ) : !city ? null : (
        <Box className={classes.buttonContainer}>
          <Button variant="contained" color="primary" className={classes.button} onClick={openModalHandler}>
            <img src={getWeatherIcon(city.weather[0].icon)} alt={city.name} />
            <Box>
              <Typography variant="body1" component="h2">
                {city.name}
              </Typography>
              <Typography variant="caption" component="p">
                {`${toCelsius(city.main.temp)}°C`}
              </Typography>
            </Box>
          </Button>
        </Box>
      )}
    </>
  );
};

const useStyles = makeStyles({
  form: {
    margin: "40px 0",
    display: "flex",
    maxWidth: 400,
  },
  input: {
    flexGrow: 1,
    marginRight: 10,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    display: "flex",
  },
});

const mapStateToProps = (state) => ({
  cityState: state.cityState,
});
const mapDispatchToProps = {
  fetchCityThunkAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
