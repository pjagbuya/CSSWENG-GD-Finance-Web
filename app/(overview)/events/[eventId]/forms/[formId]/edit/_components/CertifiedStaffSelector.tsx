import { getUser } from '@/actions/account';
import { selectAllStaff } from '@/actions/staffs';
import { getStaffInfos } from '@/actions/utils';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

type StaffSelectorProps = {
  label: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
};

const StaffSelector = ({
  label,
  name,
  placeholder,
  value,
  onChange,
}: StaffSelectorProps) => {
  const [staffList, setStaffList] = useState<unknown[]>([]);

  useEffect(() => {
    const fetchStaffList = async () => {
      const response = await selectAllStaff();
      const list = (await getStaffInfos(response)) || [];

      setStaffList(list);
    };

    fetchStaffList();
  }, []);

  return (
    <>
      <Label htmlFor={name}>{label}</Label>

      <Select name={name} value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {staffList.map((staff: any) => (
            <SelectItem key={staff.staff_id} value={staff.staff_id}>
              {staff.user_first_name} {staff.user_last_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default StaffSelector;
