import {useDebounce} from "react-use";
import {getConversionQuery} from "@/store/queryConfigs/getCurrenciesQuery";
import {useQuery} from "@tanstack/react-query";

export const useConversion = (amount: number, fromCurrency: string | null, toCurrency: string | null) => {
  useDebounce(async () => {
    if (amount <= 0 || !fromCurrency || !toCurrency) {
      return;
    }
    await refetch();

  }, 500, [amount, fromCurrency, toCurrency]);


  const {
    refetch,
    data,
  } = useQuery(getConversionQuery(amount, fromCurrency, toCurrency));
 
  return data || 0;
}


export const useConversionRate = (fromCurrency: string | null, toCurrency: string | null) => {
  return useConversion(1, fromCurrency, toCurrency);
}
