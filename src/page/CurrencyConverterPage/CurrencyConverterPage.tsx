/**
 * Created by dylagadrian on 15.07.2025
 */
import {type FC, use, useEffect, useState} from 'react';
import {CurrencyContext} from "@/store/context/CurrencyContext.tsx";
import {useConversion, useConversionRate} from "@/hooks/useConversionFromValue.ts";
import Layout from "@/components/layouts/Layout.tsx";
import {Card} from "@/components/ui/card.tsx";
import {ConversionRate} from "@/page/CurrencyConverterPage/componentes/ConversionRate.tsx";
import {CurrencyRow} from "@/page/CurrencyConverterPage/componentes/CurrencyRow.tsx";


export const CurrencyConverterPage: FC = () => {
  const context = use(CurrencyContext);
  const [fromValueInput, setFromInputValue] = useState<number>(context?.fromValue ?? 0);
  const [toValueInput, setToInputValue] = useState<number>(context?.toValue ?? 0);


  const conversionRate = useConversionRate(context?.fromCurrency?.short_code ?? '', context?.toCurrency?.short_code ?? '');
  const fromConverted = useConversion(context?.fromValue ?? 0, context?.fromCurrency?.short_code ?? '', context?.toCurrency?.short_code ?? '');
  const toConverted = useConversion(context?.toValue ?? 0, context?.toCurrency?.short_code ?? '', context?.fromCurrency?.short_code ?? '');

  useEffect(() => {
    setFromInputValue(toConverted);
  }, [toConverted]);

  useEffect(() => {
    setToInputValue(fromConverted);
  }, [fromConverted]);

  if (!context) {
    return <div>Loading...</div>;
  }
  const {
    currenciesOptions,
    setToValue,
    setFromValue,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
  } = context;

  const onFromValueChange = (newValue: number) => {
    setFromInputValue(newValue);
    setFromValue(newValue);
  }
  const onToValueChange = (newValue: number) => {
    setToInputValue(newValue);
    setToValue(newValue);
  }

  return (
    <Layout>
      <div className='h-full w-full flex items-center justify-center'>
        <Card className='flex h-fit w-fit flex-col items-center justify-center gap-4 p-4'>
          <h1 className='text-2xl font-bold'>Currency Converter</h1>
          <ConversionRate fromCurrency={fromCurrency} toCurrency={toCurrency} conversionRate={conversionRate}/>
          <div className='flex gap-2 flex-col w-full'>
            <CurrencyRow
              label='From'
              value={fromValueInput}
              selectedCurrency={fromCurrency}
              dropdownOptions={currenciesOptions}
              onValueChange={onFromValueChange}
              onCurrencyChange={setFromCurrency}
            />
            <CurrencyRow
              label='To'
              value={toValueInput}
              selectedCurrency={toCurrency}
              dropdownOptions={currenciesOptions}
              onValueChange={onToValueChange}
              onCurrencyChange={setToCurrency}
            />
          </div>
        </Card>
      </div>
    </Layout>
  );
}

