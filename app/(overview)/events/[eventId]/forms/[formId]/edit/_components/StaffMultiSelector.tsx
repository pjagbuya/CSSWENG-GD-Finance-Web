import { getUser } from "@/actions/account";
import { selectWhereStaffInstanceValidation } from "@/actions/staff_instances";
import { selectAllStaff, selectWhereStaffValidation } from "@/actions/staffs";
import { getStaffInfos } from "@/actions/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

type StaffMultiSelectorProps = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
};

const StaffMultiSelector = ({ label, value }: StaffMultiSelectorProps) => {
  const [staffList, setStaffList] = useState<unknown[]>([]);
  const [includedStaffIds, setIncludedStaffIds] = useState<unknown[]>([]);

  useEffect(() => {
    const fetchStaffList = async () => {
      const response = await selectAllStaff();
      const list = await getStaffInfos(response) || []
      
      setStaffList(list);
    };

    fetchStaffList();
  }, []);

  useEffect(() => {
    fetchData();

    async function fetchData() {
      const data = await selectWhereStaffInstanceValidation(value, 'staff_instance_id');
      const staffInstances = data!.data!;
      
      console.log(value, staffInstances)

      const result = await Promise.all(staffInstances
        .filter((staffInstance: any) => staffInstance.staff_list_id === value)
        .map(async (staffInstance: any) => {
          const info = await selectWhereStaffValidation(staffInstance.staff_id, 'staff_id');
          
          return {
            ...staffInstance,
            ...(info.data)
          };
        }));

      setIncludedStaffIds(result);
    }
  }, [value]);
  
  return (
    <>
      <Label>{label}</Label>

      {staffList.map((obj: any) => (
        <div className="flex gap-2 items-center" key={obj.staff_id}>
          <Checkbox 
            checked={includedStaffIds.includes(obj.staff_id)} 
            name={`noted_staff_list_id-${obj.staff_id}`}
            onCheckedChange={(v: boolean) => {
              if (v) {
                setIncludedStaffIds(includedStaffIds.concat(obj.staff_id));
                setStaffList(staffList)
              } else {
                setIncludedStaffIds(includedStaffIds.filter(x => x !== obj.staff_id));
                setStaffList(staffList)
              }
            }}
          />
          {obj.user_first_name} {obj.user_last_name}
        </div>
      ))}
    </>
  );
};

export default StaffMultiSelector;