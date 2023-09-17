import { BASE_URL } from 'const';
import useFetch from 'hooks/useFetch';

import './featuredProperties.css';

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(`${BASE_URL}/hotels?featured=true&limit=4`);

  return (
    <div className="fp">
      {loading ? (
        'Loading'
      ) : (
        <>
          {data.map((item: any) => (
            <div className="fpItem" key={item._id}>
              <img
                src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
