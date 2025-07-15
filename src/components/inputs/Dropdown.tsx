import type {FC} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";

export type DropdownProps = {
  value: string | undefined;
  options: { value: string, label: string }[]
  onChange: (value: string) => void;
  className?: string;
}

const Dropdown: FC<DropdownProps> = ({value, options, onChange, className}) => {

  return <Select onValueChange={onChange} value={value}>
    <SelectTrigger className={className + " w-[180px]"}>
      <SelectValue placeholder="Select currency"/>
    </SelectTrigger>
    <SelectContent className="max-h-60 overflow-y-auto">
      {options.map((option) => <SelectItem value={option.value}>{option.label}</SelectItem>)}
    </SelectContent>
  </Select>
}

export default Dropdown;

