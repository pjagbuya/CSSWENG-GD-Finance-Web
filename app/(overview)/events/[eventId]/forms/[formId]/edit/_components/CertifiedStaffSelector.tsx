import { getUser } from '@/actions/account';
import { selectAllStaff } from '@/actions/staffs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';

type StaffSelectorProps = {
  label: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
};

const StaffSelector = ({ label, name, placeholder, value, onChange }: StaffSelectorProps) => {
  const [staffList, setStaffList] = useState<unknown[]>([]);

  useEffect(() => {
    const fetchStaffList = async () => {
      const response = await selectAllStaff();
      const list = response.data || [];

      const joinedList = await Promise.all(list.map(async (staff: any) => {
        const user = await getUser(staff.user_id);
        return { ...staff, userInfo: user };
      }));

      setStaffList(joinedList);
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
              {staff.userInfo.user_first_name} {staff.userInfo.user_last_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> 
    </>      
  );
}
 
export default StaffSelector;