import React, { useEffect, useContext } from "react";
import { connect as connectWithStore } from "react-redux";
import {
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Box,
  Container,
} from "@material-ui/core";
import ServiceContext from "../ServiceContext/ServiceContext";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import { fetchWeeklyWeatherThunkAction, fetchWeeklyWeatherRequestAction } from "../../actions/actions";
import Spinner from "../Spinner/Spinner";
import getWeatherIcon from "../../utils/getWeatherIcon";
import toCelsius from "../../utils/toCelsius";
import toMRS from "../../utils/toMRS";
import dateFormatter from "../../utils/dateFormatter";

const CityCard = (props) => {
  const weatherService = useContext(ServiceContext);
  const {
    onCloseHandler,
    fetchWeeklyWeatherThunkAction,
    fetchWeeklyWeatherRequestAction,
    cityState: { city },
    cityWeeklyWeatherState: { cityWeeklyWeather, isLoading, error },
  } = props;

  const rawDate = new Date(city.dt * 1000);
  const date = dateFormatter(rawDate);
  const hours = rawDate.getHours();

  useEffect(() => {
    fetchWeeklyWeatherThunkAction(weatherService);
    return () => fetchWeeklyWeatherRequestAction();
  }, [fetchWeeklyWeatherRequestAction, fetchWeeklyWeatherThunkAction, weatherService]);

  const WeeklyWeatherBlock = () => {
    return (
      <Box mt="15px">
        <Typography variant="body1" component="p">
          В ближайшие дни:
        </Typography>
        <Box display="grid" gridTemplateColumns="auto auto">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <ErrorComponent error={error} />
          ) : (
            cityWeeklyWeather.map((day, index) => {
              const rawDate = new Date(day.dt * 1000);
              const date = dateFormatter(rawDate);
              return (
                index !== 0 && (
                  <Box key={`day_${index}`} mr="10px" mt="13px">
                    <Typography variant="body2" color="textSecondary" component="p">
                      {date}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {`Днём: ${toCelsius(day.temp.day)}°C`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {`Ночью: ${toCelsius(day.temp.night)}°C`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {day.weather[0].description[0].toUpperCase() + day.weather[0].description.substring(1)}
                    </Typography>
                  </Box>
                )
              );
            })
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Container maxWidth="xs" disableGutters>
      <Card>
        <Box width="100px" mx="auto">
          <CardMedia component="img" image={getWeatherIcon(city.weather[0].icon)} />
        </Box>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Сегодня, {date}:
          </Typography>
          <Typography gutterBottom variant="h4" component="h2">
            {city.name}
          </Typography>
          <Typography variant="body1" component="p">
            {toCelsius(city.main.temp)}°C
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Ощущается как {toCelsius(city.main.feels_like)}°C
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {city.weather[0].description[0].toUpperCase() + city.weather[0].description.substring(1)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Ветер {city.wind.speed} м/с
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Давление {toMRS(city.main.pressure)} мрс
          </Typography>
          {cityWeeklyWeather && hours > 6 && (
            <Typography variant="body2" color="textSecondary" component="p">
              Температура ночью: {toCelsius(cityWeeklyWeather[0].temp.night)}°C
            </Typography>
          )}
          <WeeklyWeatherBlock />
        </CardContent>
        <CardActions>
          <Button onClick={onCloseHandler} size="small" color="primary">
            Закрыть
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    cityState: state.cityState,
    cityWeeklyWeatherState: state.cityWeeklyWeatherState,
  };
};
const mapDispatchToProps = { fetchWeeklyWeatherThunkAction, fetchWeeklyWeatherRequestAction };

export default connectWithStore(mapStateToProps, mapDispatchToProps)(CityCard);
