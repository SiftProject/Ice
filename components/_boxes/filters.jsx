import { useState } from "react";
import styles from "./boxes.module.sass";

const BoxFilters = ({ setFilters, tag }) => {
  const [value, setValue] = useState("LOW");
  const changeOption = (e) => setValue(e.target.value);

  const types = ["Featured", "Tech", "Gaming", "Miscellaneous", "Budget"];
  const selectType = (type) =>
    setFilters((state) => ({ ...state, type: type }));

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.orderPart}>
        <label htmlFor="cars">Order by</label>

        <div>
          <select name="cars" id="cars" onChange={changeOption}>
            <option value="HIGH">Price (High to Low)</option>
            <option value="LOW">Price (Low to High)</option>
          </select>
        </div>
      </div>

      <ul className={styles.tagsPart}>
        {types.map((type) => (
          <li className={tag.toLowerCase() === type.toLowerCase() ? styles.SelActive : null } key={type} onClick={() => selectType(type.toUpperCase())}>
            {type}
          </li>
        ))}
      </ul>

      <div className={styles.searchPart}>
        <div className={styles.iconContainer}><span className={styles.searchIcon}></span></div>
        <input
          type="text"
          placeholder="Search Cases..."
          onChange={(e) =>
            setFilters((state) => ({ ...state, searchQuery: e.target.value }))
          }
        />
      </div>
    </div>
  );
};

export default BoxFilters;
