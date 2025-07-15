import type {CurrencyOption} from "@/store/context/CurrencyContext.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import CurrencyDropdown from "@/page/CurrencyConverterPage/componentes/CurrencyDropdown.tsx";
import type {FC} from "react";

export type CurrencyRowProps = {
  label: string;
  value: number,
  onValueChange: (newValue: number) => void,
  selectedCurrency: CurrencyOption | null,
  dropdownOptions: CurrencyOption[],
  onCurrencyChange: (currency: CurrencyOption) => void
};

export const CurrencyRow: FC<CurrencyRowProps> = ({
                                                    label,
                                                    value,
                                                    onValueChange,
                                                    selectedCurrency,
                                                    dropdownOptions,
                                                    onCurrencyChange,
                                                  }) => <div className='flex items-center gap-2'>
  <Label className='w-fit flex-1 '>{label}</Label>
  <Input className='flex-2' value={value.toString()} type="number"
         onChange={(event) => onValueChange(+event.target.value)}/>
  <CurrencyDropdown
    className='flex-2'
    value={selectedCurrency}
    options={dropdownOptions}
    onChange={onCurrencyChange}/>
</div>;