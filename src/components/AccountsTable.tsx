import Table from "react-bootstrap/Table";
import { Money } from "components/Money";

interface Cell {
  text?: string;
}
interface Totals {
  accounts: Money[];
  tickets: Money[];
  total: Money;
}

export interface GetTableResponse {
  accounts: string[];
  tickets: string[];
  data: Money[][];
  totals: Totals;
}

function StringToCell(string: string): Cell {
  return { text: string };
}

function MoneyToCell(money: Money): Cell {
  return { text: money.amount + " " + money.currency };
}

function replaceCellsHorizontal(
  matrix: Cell[][],
  i: number,
  j: number,
  cells: Cell[]
) {
  for (let k = 0; k < cells.length; k++) {
    matrix[i][j + k] = cells[k];
  }
}

function replaceCellsVertical(
  matrix: Cell[][],
  i: number,
  j: number,
  cells: Cell[]
) {
  for (let k = 0; k < cells.length; k++) {
    matrix[i + k][j] = cells[k];
  }
}

function GenerateMatrix(tableResponse: GetTableResponse): Cell[][] {
  let result: Cell[][] = [];

  if (!tableResponse) {
    return result;
  }

  let rows: number = tableResponse.accounts.length + 2;
  let columns: number = tableResponse.tickets.length + 2;

  for (let i = 0; i < rows; i++) {
    result[i] = [];
    for (let j = 0; j < columns; j++) {
      result[i][j] = undefined;
    }
  }

  // Ticket headers
  replaceCellsHorizontal(result, 0, 1, tableResponse.tickets.map(StringToCell));

  // Money in each account per ticket
  for (let i = 0; i < tableResponse.accounts.length; i++) {
    replaceCellsHorizontal(
      result,
      i + 1,
      1,
      tableResponse.data[i].map(MoneyToCell)
    );
  }

  // Accounts
  result[0][0] = StringToCell("Account");
  replaceCellsVertical(result, 1, 0, tableResponse.accounts.map(StringToCell));

  // Total in each account
  result[0][columns - 1] = StringToCell("Total");
  replaceCellsVertical(
    result,
    1,
    columns - 1,
    tableResponse.totals.accounts.map(MoneyToCell)
  );

  // Total total
  result[rows - 1][0] = StringToCell("Total");
  replaceCellsHorizontal(
    result,
    rows - 1,
    1,
    tableResponse.totals.tickets.map(MoneyToCell)
  );
  result[rows - 1][columns - 1] = MoneyToCell(tableResponse.totals.total);

  return result;
}

function RenderTable(data: Cell[][]) {
  console.log("data: ", data);
  return (
    <Table responsive striped bordered hover size="sm">
      <tbody>
        {data.map((cellList, x, cellMatrix) => RenderRows(cellMatrix[x]))}
      </tbody>
    </Table>
  );
}
function RenderCell(cell: Cell) {
  if (!cell) {
    return <td />;
  }
  return <td>{cell.text}</td>;
}

function RenderRows(cells: Cell[]) {
  return (
    <tr className="border border-dark text-nowrap">
      {cells.map((cell) => RenderCell(cell))}
    </tr>
  );
}

export default function AccountsTable({ table }) {
  return RenderTable(GenerateMatrix(table));
}
