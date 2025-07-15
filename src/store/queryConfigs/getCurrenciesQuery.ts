import type {QueryKey, UseQueryOptions} from "@tanstack/react-query";
import {currencyValidator} from "@/validators";
import z from "zod";
import type {Currency} from "@/types";

export const getCurrenciesQuery: () => UseQueryOptions<Currency[], Error, Currency[], QueryKey> = () => ({
  queryKey: ["currencies"],
  queryFn: async () => {
    const url = `${import.meta.env.VITE_API_URL}/currencies?api_key=${import.meta.env.VITE_CURRENCY_BEACON_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("getCurrenciesQuery: Error", {cause: response.statusText});
    }
    const parsedResponse = await response.json();
    return z.array(currencyValidator).parse(parsedResponse.response) as Currency[];
  },
})


export const getConversionQuery: (amount: number, fromCurrency: string | null, toCurrency: string | null) => UseQueryOptions<number, Error, number, QueryKey> =
  (amount: number, fromCurrency: string | null, toCurrency: string | null) => ({
    queryKey: ["conversion", amount, fromCurrency, toCurrency],
    queryFn: async () => {
      if (fromCurrency === toCurrency) {
        return amount;
      }
      if (amount <= 0 || !fromCurrency || !toCurrency) {
        return 0;
      }
      
      console.log("getConversionQuery: Fetching conversion for", amount, fromCurrency, toCurrency);
      const url = `${import.meta.env.VITE_API_URL}/convert?api_key=${import.meta.env.VITE_CURRENCY_BEACON_API_KEY}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("getConversionQuery: Error", {cause: response.statusText});
      }
      const parsedResponse = await response.json();
      return z.number().parse(parsedResponse.value);
    },
    refetchOnWindowFocus: false,
    enabled: false
  });