import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type TFilterSelectProps = {
  value: string;
  setValue: (data: string) => void;
  label: string;
  options: { label: string; value: string }[];
};

export default function FormSelect({
  value,
  setValue,
  label,
  options,
}: TFilterSelectProps) {
  return (
    <Select value={value} onValueChange={(value) => setValue(value)}>
      <SelectTrigger className='w-full  dark:text-stone-400 dark:bg-secondary-color'>
        <SelectValue className='' placeholder={`Filter by ${label}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          <SelectItem className='cursor-pointer' value='all'>
            All
          </SelectItem>
          {options?.map((option) => (
            <SelectItem
              className='cursor-pointer'
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
