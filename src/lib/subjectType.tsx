import { Palette, Languages, SquareSigma, Group, Cpu, SquareActivity, Factory, Bolt } from "lucide-react";

const subjectTypeMapping = {
    Linguistics: <Languages size={25}/>,
    MathematicsAndScience: <SquareSigma size={25}/>,
    SocialSciences: <Group size={25}/>,
    ArtsAndDesign: <Palette size={25}/>,
    OccupationalAndTechnologyStudies: <Cpu size={25}/>,
    HealthAndPhysicalEducation: <SquareActivity size={25}/>,
    BusinessAndEconomics: <Factory size={25}/>,
    Other: <Bolt size={25}/>,
};

// คอมโพเนนต์สำหรับแสดงไอคอนตามประเภทวิชา
const SubjectIcon: React.FC<{ subjectType: keyof typeof subjectTypeMapping }> = ({ subjectType }) => {
    const Icon = subjectTypeMapping[subjectType] || <span>No Icon Available</span>;

    return (
        <div>
            {Icon}
        </div>
    );
};

export { subjectTypeMapping, SubjectIcon };
