import connectdb from "../../../utils/connectdb";
import Cases from "../../../models/casesModel";

 connectdb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getcases(req, res);
      break;
  }
};

const getcases = async (req, res) => {
  try {
    const rawCase = await Cases.find();
    const readyCase = rawCase.map(
      ({ _id, caseName, price, content, caseImage }) => {
        return {
          id: _id,
          caseName,
          price,
          items: content,
          caseImage,
        };
      }
    );

    res.send(readyCase);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
