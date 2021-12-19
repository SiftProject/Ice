import styles from "../components/_boxes/boxes.module.sass";
import { get } from "axios";
import SingleBox from "../components/_boxes/single-box";
import { useState } from "react";
import BoxFilters from "../components/_boxes/filters";
import Head from 'next/head'

const Boxes = ({ data }) => {
  const defaultFilters = {
    searchQuery: "",
    order: false,
    type: '',
  };
  const [filters, setFilters] = useState(defaultFilters);
  return (
    <div>
      <Head>
        <title>IceCase | Home</title>
      </Head>
      <div>
        <h1 className={styles.boxesHeaderText}>Mystery Cases</h1>
        <BoxFilters setFilters={setFilters} tag={filters.type} />
        <div className={styles.boxesContainer}>
          {data.map((box) => {
            if (
              box.caseName
                .toLowerCase()
                .indexOf(filters.searchQuery.toLowerCase()) !== -1
            )
              return <SingleBox props={box} key={box.caseId} />;
          })}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const data = (await get("http://localhost:8080/boxes")).data;
  return {
    props: {
      data: data,
    },
  };
};
export default Boxes;
