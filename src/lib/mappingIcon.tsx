import { ShieldBan,
    ShieldQuestion,
    ShieldCheck,
    Languages,
    SquareSigma,
    Handshake,
    Palette,
    Cpu,
    SquareActivity,
    Factory,
    Bolt, 

} from 'lucide-react';

export const statusMappingIcon: Record<string, JSX.Element> = {
    Inactive: <ShieldBan className="text-primary/60"/>,
    Pending: <ShieldQuestion className="text-primary/60"/>,
    Active: <ShieldCheck className="text-primary/60"/>,
};

export const subjectTypeMappingIcon: Record<string, JSX.Element> = {
    Linguistics: <Languages className="text-primary/60"/>,
    MathematicsAndScience: <SquareSigma className="text-primary/60"/>,
    SocialSciences: <Handshake className="text-primary/60"/>,
    ArtsAndDesign: <Palette className="text-primary/60"/>,
    OccupationalAndTechnologyStudies: <Cpu className="text-primary/60"/>,
    HealthAndPhysicalEducation: <SquareActivity className="text-primary/60"/>,
    BusinessAndEconomics: <Factory className="text-primary/60"/>,
    Other: <Bolt className="text-primary/60"/>,
};

// colors.ts
export const colorMapping: Record<string, string> = {
    Gray: 'bg-gray-600',
    Orange: 'bg-orange-600',
    Amber: 'bg-amber-600',
    Yellow: 'bg-yellow-600',
    Lime: 'bg-lime-600',
    Green: 'bg-green-600',
    Emerald: 'bg-emerald-600',
    Teal: 'bg-teal-600',
    Cyan: 'bg-cyan-600',
    Sky: 'bg-sky-600',
    Blue: 'bg-blue-600',
    Indigo: 'bg-indigo-600',
    Violet: 'bg-violet-600',
    Purple: 'bg-purple-600',
    Fuchsia: 'bg-fuchsia-600',
    Pink: 'bg-pink-600',
    Rose: 'bg-rose-600',
    Red: 'bg-red-600',
};
