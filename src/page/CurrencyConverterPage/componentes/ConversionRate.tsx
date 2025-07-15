import type {CurrencyOption} from "@/store/context/CurrencyContext.tsx";
import type {FC} from "react";

export type ConversionRateProps = {
  fromCurrency: CurrencyOption | null,
  toCurrency: CurrencyOption | null,
  conversionRate: number
};
export const ConversionRate: FC<ConversionRateProps> = ({fromCurrency, conversionRate, toCurrency}) => <>
  {fromCurrency?.short_code && fromCurrency?.short_code ?
    <div>Current
      rate: {fromCurrency?.short_code} to {toCurrency?.short_code}: {conversionRate?.toFixed(4)}</div>
    : <div className="text-red-500">Please select currencies</div>}
</>;