export default function MoneyWidget(amount: number) {
  return amount.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
}
