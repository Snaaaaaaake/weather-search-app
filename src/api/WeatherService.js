import apiKey from "../constants/apiKey";

function resCheck(res) {
  if (!res.ok) throw new Error("Ничего не найдено");
  return res.json();
}

export default class WeaterService {
  constructor() {
    this.url = "https://api.openweathermap.org/data/2.5/";
    this.apiKey = apiKey;
    this.lang = "ru";
  }
  getCity = (id) => {
    const adress = `${this.url}weather?q=${id}&appid=${this.apiKey}&lang=${this.lang}`;
    return fetch(adress).then(resCheck);
  };
  getWeeklyWeather = (lat, lon) => {
    // На неделю бесплатно данные можно получать только по координатам
    const adress = `${this.url}onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${this.apiKey}&lang=${this.lang}`;
    return fetch(adress).then((res) => (!res.ok ? new Error(res.status) : res.json()));
  };
}
