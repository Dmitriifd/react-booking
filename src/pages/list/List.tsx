import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import Header from 'components/header/Header';
import Navbar from 'components/navbar/Navbar';
import SearchItem from 'components/searchItem/SearchItem';
import useFetch from 'hooks/useFetch';
import { BASE_URL } from 'const';

import './list.css';

export interface LocationState {
  destination: string;
  date: Date[];
  options: Options;
}

export interface Date {
  startDate: string;
  endDate: string;
  key: string;
}

export interface Options {
  adult: string;
  children: string;
  room: string;
}

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState((location.state as LocationState).destination);
  const capitalizedStr = destination.replace(/^\w/, (c) => c.toUpperCase());
  const [dates, setDate] = useState((location.state as any).dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState((location.state as LocationState).options);

  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  const { data, loading, error, reFetch } = useFetch(
    `${BASE_URL}/hotels?city=${capitalizedStr}&min=${min || 0}&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <>
      <Navbar />
      <Header type="list" />

      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                'MM/dd/yyyy'
              )} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              'loading'
            ) : (
              <>
                {data.map((item: any) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
