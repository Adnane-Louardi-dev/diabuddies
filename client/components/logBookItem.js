import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const LogBookItem = ({ props }) => {
  const rows = {
    implicit: {
      time: "22:30",
      meal: "Dinner",
      carbs: "25g",
      FastActingInsulinUnits: "10ui",
      glucose: 90,
    },
    explicit: [
      {
        name: "Glucose(mg/dl)",
        value: 90,
      },
      {
        name: "Novorapid(ui)",
        value: 10,
      },
      {
        name: "calories(kcal)",
        value: 250,
      },
      {
        name: "Carbs(g)",
        value: 25,
      },
      {
        name: "Protein(g)",
        value: 15,
      },
      {
        name: "Fat(g)",
        value: 25,
      },
    ],
  };
  const [data, setData] = useState(props);

  return (
    <Accordion
      className="my-3 px-none border-none rounded-xl"
      sx={{
        "&:before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary className="border-none rounded-xl" expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <div className="flex justify-around w-full rounded-xl py-3">
          <div className="justify-self-start self-center">
            <p className="font-inter text-sm text-diaGray">{data.implicit.time}</p>
            <p className="font-inter text-md text-semibold">{data.implicit.meal}</p>
          </div>
          {/* <div className="grid place-items-center px-2  rounded-2xl  bg-diaOrange">
                  <p className="font-poppin p-3 text-white w-full truncate">
                    <span className="font-bold">90g </span>
                  </p>
                </div> */}
          <div className="rounded-2xl p-3 bg-diaBlue">
            <p className="font-inter text-white text-xl">{data.implicit.carbs}</p>
          </div>
          <div className="rounded-2xl p-3 bg-diaOrange">
            <p className="font-inter text-white text-xl">{data.implicit.FastActingInsulinUnits}</p>
          </div>
          <div className="rounded-2xl p-3 bg-diaGreen">
            <p className="font-inter text-white text-xl">{data.implicit.glucose}</p>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails className="rounded-xl">
        <TableContainer component={Paper} className="shadow-none">
          <Table aria-label="simple table" className="border-separate border-spacing-y-3">
            <TableBody className="">
              {data.explicit.map((row) => (
                <TableRow key={row.name} className=" rounded-lg" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row" className="border-2 border-diaBlue border-r-0 rounded-xl rounded-r-none font-poppins">
                    {row.name}
                  </TableCell>
                  <TableCell align="right" className="border-2 border-diaBlue border-l-0 rounded-xl rounded-l-none font-inter font-semibold">
                    {row.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default LogBookItem;
