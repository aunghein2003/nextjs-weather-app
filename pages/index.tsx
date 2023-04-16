import Image from "next/legacy/image";
import background from "@/assest/background.jpg";
import { BsSearch } from "react-icons/bs";
import { useRef, useState } from "react";
import fetchingApi from "@/utils/fetchingApi";
import { Bars } from "react-loader-spinner";
import { ResponseData, ResponseError } from "@/types";

export default function Home() {
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<ResponseData | null>(null);
  const [error, setError] = useState<ResponseError | null>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let city = ref.current?.value;
    if (!city) {
      return alert("Please fill the name of city");
    }
    setLoading(true);
    setError(null);
    setWeather(null);
    const data = await fetchingApi(city);
    setLoading(false);
    if (data.cod != 200) {
      setError(data);
    } else {
      setWeather(data);
    }
  };

  return (
    <div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/20 z-[1]" />
      <Image
        className="object-cover"
        layout="fill"
        src={background}
        alt="background"
      />
      <div className="relative max-w-2xl h-screen mx-auto p-5 px-7 z-20">
        <form
          className="w-full mx-auto p-3 px-4 bg-transparent border-2 rounded-2xl flex justify-between items-center"
          onSubmit={submitHandler}
        >
          <input
            ref={ref}
            type="text"
            className="bg-inherit text-xl text-white placeholder:text-white/50 basis-2/3 focus:outline-none"
            placeholder="Search City"
          />
          <button className="cursor-pointer" type="submit">
            <BsSearch className="text-white font-bold text-lg" />
          </button>
        </form>

        {loading && (
          <div className=" mt-[20vh] flex justify-center">
            <Bars width={50} height={50} color="#fff" />
          </div>
        )}

        {error && (
          <div className="mt-[20vh] flex items-center flex-col gap-y-5 text-white">
            <h1 className="text-4xl">Error : {error.cod}</h1>
            <p className="text-2xl">{error.message}</p>
          </div>
        )}

        {weather && (
          <div>
            <div className="mt-[10vh] flex justify-between items-center">
              <div className="flex flex-col items-center">
                <Image
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather"
                  width={100}
                  height={100}
                />
                <h3 className="text-3xl font-semibold text-white">
                  {weather.weather[0].main}
                </h3>
              </div>
              <h1 className=" text-7xl font-semibold text-white">
                {weather.main.temp.toFixed(0)}&#176;
              </h1>
            </div>
            <div className="p-5 py-10 mt-[20vh] rounded-xl text-white bg-black/70">
              <h1 className="text-3xl text-center">
                Weather in {weather.name}
              </h1>
              <div className="flex justify-between items-center mt-10">
                <div className="text-center text-xl font-semibold">
                  <h3>{weather.main.feels_like.toFixed(0)}&#176;</h3>
                  <h3>Feels Like</h3>
                </div>
                <div className="text-center text-xl">
                  <h3>{weather.main.humidity}%</h3>
                  <h3>Humidity</h3>
                </div>
                <div className="text-center text-xl">
                  <h3>{weather.wind.speed.toFixed(0)}MPH</h3>
                  <h3>Winds</h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
