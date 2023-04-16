export type ResponseError = {
  cod: string | number;
  message: string;
};

export type ResponseData = {
  name: string;
  wind: {
    speed: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
};
