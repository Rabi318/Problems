import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoffee } from "./redux/coffeeActions";

function App() {
  const [sortBy, setSortBy] = useState("");
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((state) => state.coffee);
  useEffect(() => {
    let query = sortBy ? `?sort=price&order=${sortBy}` : "";
    dispatch(fetchCoffee(query));
  });

  return (
    <>
      <div className="app-container">
        <div className="sort-container">
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort by price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {isLoading ? (
          <div className="spinner">Loading...</div>
        ) : isError ? (
          <div className="error-text">Failed to load data</div>
        ) : (
          <div className="grid-container">
            {data.map((coffee) => (
              <div className="card" key={coffee.id}>
                <img
                  src={coffee.image}
                  alt={coffee.title}
                  className="coffee-image"
                />
                <div className="coffee-title">{coffee.title}</div>
                <div className="coffee-price">Price: ₹{coffee.price}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
