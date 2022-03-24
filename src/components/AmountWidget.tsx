export default function AmountWidget(amount: number) {
  return (
    <div>
      {/* Render only with 2 digits */}
      {amount.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}
    </div>
  );
}
