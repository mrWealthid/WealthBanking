import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Card from "./Card";
import Loader from "./Loader";
import { FaAngleDoubleDown } from "react-icons/fa";

const Shopify = () => {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: false,
  });

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // const [focused, setFocused] = useState(false);

  function formatDate(date) {
    let myDate = new Date(date),
      month = "" + (myDate.getMonth() + 1),
      day = "" + myDate.getDate(),
      year = myDate.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  //   const [search, setSearch] = useState("");
  let content = null;

  let startDates = formatDate(startDate);

  let endDates = formatDate(endDate);

  let url =
    endDate === undefined && startDate === undefined
      ? "https://api.nasa.gov/planetary/apod?api_key=ZeS2ABWgbioS2oB03u2GPJ5T8reP6cNu7bQpB5uV"
      : `https://api.nasa.gov/planetary/apod?api_key=ZeS2ABWgbioS2oB03u2GPJ5T8reP6cNu7bQpB5uV&start_date=${startDates}&end_date=${endDates}`;
  //  (!startDates && !endDates)

  useEffect(() => {
    setState({ loading: true, data: null, error: false });

    axios
      .get(url)
      .then((resp) => resp.data)
      .then((data) => {
        console.log(data);
        setState({
          loading: false,
          data: data,
          error: false,
        });
      })
      .catch(() => setState({ loading: false, data: null, error: true }));
  }, [url, endDates]);

  state.loading && (content = <Loader />);
  state.error && (content = <p>Ooops... An Error Occured</p>);

  return (
    <div className="flex flex-col justify-center mt-10 items-center mx-auto w-10/12">
      <h1 className="md:text-2xl font-medium text-gray-700 flex mb-10 text-center items-center gap-3">
        Spacestagram: Image-sharing from the final frontier{" "}
        <FaAngleDoubleDown className="animate-ping text-sm" />
      </h1>

      <div className="flex md:flex-row flex-col  items-center justify-center w-full">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="rounded-lg text-sm mb-2 md:mb-0 p-3 md:text-base"
          placeholderText="Start Date.."
          dateFormat="yyyy-MM-d"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date.."
          className="rounded-lg text-sm p-3 md:text-base"
          dateFormat="yyyy-MM-d"
        />
      </div>

      {state.data ? (
        <div
          className={` grid mt-10  ${
            endDate === undefined
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2 lg:grid-col-auto"
          } mx-auto justify-center gap-6`}
        >
          {endDate === undefined ? (
            <Card
              hdurl={state.data.hdurl}
              title={state.data.title}
              explanation={state.data.explanation}
              copyright={state.data.copyright}
              date={state.data.date}
            />
          ) : (
            state.data.map((item, index) => {
              const {
                hdurl: image,
                explanation: desc,
                title,
                copyRight,
                date,
              } = item;

              return (
                <Card
                  hdurl={image}
                  title={title}
                  explanation={desc}
                  copyright={copyRight}
                  date={date}
                  key={index}
                />
              );
            })
          )}
        </div>
      ) : (
        content
      )}
    </div>
  );
};

export default Shopify;
