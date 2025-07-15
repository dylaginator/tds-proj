import {createContext, type FC, type PropsWithChildren, useMemo, useState} from "react";
import {type Currency} from "@/types";
import {useQuery} from "@tanstack/react-query";
import {getCurrenciesQuery} from "@/store/queryConfigs/getCurrenciesQuery";

export type CurrencyOption = Pick<Currency, "id" | "name" | "short_code">;

export type CurrencyContext = {
  fromCurrency: CurrencyOption | null;
  toCurrency: CurrencyOption | null;
  fromValue: number;
  toValue: number;
  setFromCurrency: (currency: CurrencyOption) => void;
  setToCurrency: (currency: CurrencyOption) => void;
  setFromValue: (amount: number) => void;
  setToValue: (amount: number) => void;
  currenciesOptions: CurrencyOption[];
};
const CurrencyContext = createContext<CurrencyContext | undefined>(undefined);

const CurrencyContextProvider: FC<PropsWithChildren> = ({children}) => {

    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(0);
    const [fromCurrency, setFromCurrency] = useState<CurrencyOption | null>(null);
    const [toCurrency, setToCurrency] = useState<CurrencyOption | null>(null);

    const {data} = useQuery({
      ...getCurrenciesQuery(),
    });

    const currenciesOptions = useMemo<CurrencyOption[]>(() => {
      return data ? data.map(currency => (
        {
          short_code: currency.short_code,
          name: currency.name,
          id: currency.id
        })).sort((a, b) => a.name.localeCompare(b.name)) : [];
    }, [data]);

    return (
      <CurrencyContext.Provider
        value={{
          currenciesOptions,
          setToValue,
          setFromValue,
          fromValue,
          toValue,
          fromCurrency,
          setFromCurrency,
          toCurrency,
          setToCurrency,
        }}>
        {children}
      </CurrencyContext.Provider>
    );
  }
;

export {CurrencyContext, CurrencyContextProvider};