
import { ShieldCheck,ShieldAlert,ShieldX } from "lucide-react";
const statusTypeMapping = {
    pending: <ShieldAlert size={25}/>,
    active: <ShieldCheck size={25}/>,
    inactive: <ShieldX size={25}/>,
};

  
  
// คอมโพเนนต์สำหรับแสดงไอคอนตามประเภทวิชา
const StatusIcon: React.FC<{ statusType: keyof typeof statusTypeMapping }> = ({ statusType }) => {
    const Icon = statusTypeMapping[statusType] || <span>No Icon Available</span>;

    return (
        <div>
            {Icon}
        </div>
    );
};

export { statusTypeMapping, StatusIcon };