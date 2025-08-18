import { PropertyType } from '@/services/api';
import { Button } from '@/components/ui/button';

interface PropertyFilterProps {
    selectedType: PropertyType | null;
    onTypeChange: (type: PropertyType | null) => void;
    types: PropertyType[];
}

export const PropertyFilter = ({ selectedType, onTypeChange, types }: PropertyFilterProps) => {
    return (
        <div className="flex flex-wrap gap-2">
            <Button
                variant={selectedType === null ? "default" : "outline"}
                onClick={() => onTypeChange(null)}
            >
                Barchasi
            </Button>
            {types.map((type) => (
                <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    onClick={() => onTypeChange(type)}
                >
                    {type}
                </Button>
            ))}
        </div>
    );
};