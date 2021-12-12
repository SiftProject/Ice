import styles from "../styles/boxes.module.sass";


const Boxes = ({ data }) => {
  return (
    <div className={styles.pinky}>
      <h1>Boxes go here</h1>;
    </div>
  );
};

//  const getServerSideProps = async (ctx) => {
//   const rawCase = await Cases.find();
//   const readyCase = rawCase.map(
//     ({ _id, caseName, price, content, caseImage }) => {
//       return {
//         id: _id,
//         caseName,
//         price,
//         items: content,
//         caseImage,
//       };
//     }
//   );
//   return {
//     props: {
//       data: readyCase,
//     },
//   };
// };
export default Boxes;
