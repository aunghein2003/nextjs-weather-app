const fetchingApi = async (city: string) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export default fetchingApi;
