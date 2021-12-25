import connectdb from "../../../utils/connectdb";
import cases from "../../../models/casesModel";


export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getcases(req, res);
      break;
  }
};

const getcases = async (req, res) => {
  try {
    connectdb();
    const rawCase = await cases.find();
    const readyCase = rawCase.map(
      ({ caseid, caseName, casePrice, caseItems, caseImage, isHot, caseType}) => {
        return {
          caseid: caseid,
          caseName,
          casePrice,
          isHot,
          caseType: caseType,
          caseItems: caseItems,
          caseImage,
        };
      }
    );

    res.send(readyCase);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
