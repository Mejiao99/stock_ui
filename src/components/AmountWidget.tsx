export default function AmountWidget(amount: number) {
  return amount.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
}
