import { getUser } from "@/actions/account";
import { selectAllStaff } from "@/actions/staffs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

type StaffMultiSelectorProps = {
  label: string;
  name: string;
  placeholder: string;
  value: any[];
  // label="Noted By"
  // name="noted_staff_list_ids"
  // placeholder="Noted By"
  // value={values.noted_staff_list_ids}
  // onChange={(v) => setValues({ ...values, noted_staff_list_ids: v })}
};

const StaffMultiSelector = ({ label, value }: StaffMultiSelectorProps) => {
  const [staffList, setStaffList] = useState<unknown[]>([
    { staff_name: 'asdfa', user_id: 'adf'},
    { staff_name: 'asdfab', user_id: 'adg' },
    { staff_name: 'asdfac', user_id: 'adh' },
  ]);

  // useEffect(() => {
  //   const fetchStaffList = async () => {
  //     const response = await selectAllStaff();
  //     const list = response.data || [];

  //     const joinedList = await Promise.all(list.map(async (staff: any) => {
  //       const user = await getUser(staff.user_id);
  //       return { ...staff, userInfo: user };
  //     }));

  //     setStaffList(joinedList);
  //   };

  //   fetchStaffList();
  // }, []);
  
  return (
    <>
      <Label>{label}</Label>

      {staffList.map((obj: any) => (
        <div className="flex gap-2 items-center">
          <Checkbox checked={value.some((v: any) => v.user_id === obj.user_id)} />
          {obj.staff_name}
        </div>
      ))}
    </>
  );
};

export default StaffMultiSelector;