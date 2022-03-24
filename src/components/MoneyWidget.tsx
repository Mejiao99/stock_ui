import { Money } from "components/Money";

export default function MoneyWidget(money: Money) {
  return (
    money.amount.toLocaleString(undefined, { maximumFractionDigits: 2 }) +
    " $" +
    money.currency
  );
}
