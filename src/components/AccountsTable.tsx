import Table from "react-bootstrap/Table";
import { Money } from "./Money";
import {map} from "react-bootstrap/ElementChildren";

interface Cell {
  text?: string;
}
interface Totals {
  account: Money[];
  ticket: Money[];
  total: Money;
}

interface GetTableResponse {
  accounts: string[];
  tickets: string[];
  data: Money[][];
  totals: Totals;
}
export let columns: Cell[][] = [
  [
    { text: "Account" },
    { text: "TicketA" },
    { text: "TicketB" },
    { text: "TicketC" },
    { text: "Currency:CAD" },
    { text: "Currency:USD" },
    { text: "Total" },
  ],
];

let testCellInterface: Cell[][] = [
  [
    { text: "C1" },
    { text: "6.29 CAD" },
    { text: "5 USD" },
    { text: "" },
    { text: "10 CAD" },
    { text: "7.96 USD" },
    { text: "10 CAD" },
  ],
  [
    { text: "C2" },
    { text: "12.57 CAD" },
    { text: "5 USD" },
    { text: "4.60 EUR" },
    { text: "20 CAD" },
    { text: "7.96 USD" },
    { text: "20 CAD" },
  ],
  [
    { text: "C3" },
    { text: "6.29 CAD" },
    { text: "5 USD" },
    { text: "" },
    { text: "10 CAD" },
    { text: "7.96 USD" },
    { text: "10 CAD" },
  ],
  [
    { text: "C4" },
    { text: "6.29 CAD" },
    { text: "5 USD" },
    { text: "" },
    { text: "10 CAD" },
    { text: "7.96 USD" },
    { text: "10 CAD" },
  ],
  [
    { text: "Total" },
    { text: "31.44 CAD" },
    { text: "20 USD" },
    { text: "4.60 EUR" },
    { text: "50 CAD" },
    { text: "39.78 USD" },
    { text: "50 CAD" },
  ],
];

function GenerateMatrix(tableResponse: GetTableResponse): Cell[][] {
  let result: Cell[][] = [];
  let rows = tableResponse.accounts.length + 2;
  let columns = tableResponse.tickets.length + 2;
  for (let i = 0; i < rows; i++) {
    result[i] = [];
    for (let j = 0; j < columns; j++) {
      result[i][j] = undefined;
    }
  }
  result[0].push({text:"Account"})
  tableResponse.tickets.forEach((ticket)=>result[0].push({text:ticket}))
  result[0].push({text:"Total"})

  return result;
}


function RenderTable(data: Cell[][]) {
  return (
    <Table responsive striped bordered hover size="sm">
      <tbody>
        {data.map((cellList, x, cellMatrix) => RenderRows(cellMatrix[x]))}
      </tbody>
    </Table>
  );
}
function RenderCell(cell: Cell) {
  return <td>{cell.text}</td>;
}

function RenderRows(cells: Cell[]) {
  return (
    <tr className="border border-dark text-nowrap">
      {cells.map((cell) => RenderCell(cell))}
    </tr>
  );
}

export default function AccountsTable() {
  let tableResponse: GetTableResponse = {
    accounts: [],
    tickets: [],
    data: [],
    totals: { account: [], ticket: [], total: { amount: 0, currency: "cad" } },
  };
  console.log(GenerateMatrix(tableResponse))
  return RenderTable(testCellInterface);
}
