import type {CurrencyOption} from "@/store/context/CurrencyContext.tsx";
import type {FC} from "react";
import Dropdown from "@/components/inputs/Dropdown.tsx";

export type CurrencyDropdownProps = {
  value: CurrencyOption | null;
  options: CurrencyOption[]
  onChange: (value: CurrencyOption) => void;
  className?: string;
}
const CurrencyDropdown: FC<CurrencyDropdownProps> = ({value, options, onChange, className}) => {
  const optionsTransformed = options.map(option => ({
    value: option.short_code,
    label: `${option.name} - ${option.short_code}`
  }));

  const onValueChange = (value: string) => {
    const currency = options.find(option => option.short_code === value);
    if (currency) {
      onChange(currency);
    }
  }

  return <Dropdown className={className} value={value?.short_code} options={optionsTransformed}
                   onChange={onValueChange}/>
}

export default CurrencyDropdown;