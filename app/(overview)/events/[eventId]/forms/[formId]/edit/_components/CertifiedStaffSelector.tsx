import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type StaffSelectorProps = {
  label: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
};

const StaffSelector = ({ label, name, placeholder, value, onChange }: StaffSelectorProps) => {
  return (
    <>    
      <Label htmlFor={name}>{label}</Label>

      <Select name={name} value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        {/* TODO */}
        <SelectContent>
        </SelectContent>
      </Select> 
    </>      
  );
}
 
export default StaffSelector;