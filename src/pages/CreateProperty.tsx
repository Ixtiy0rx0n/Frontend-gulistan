import { useNavigate } from 'react-router-dom';
import { PropertyForm } from '@/components/PropertyForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CreateProperty() {
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-hero">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/')}
                        className="mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Bosh sahifaga qaytish
                    </Button>

                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                            Yangi joy qo'shish
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Yangi ko'chmas mulk ob'ektini qo'shish uchun quyidagi formani to'ldiring.
                            Barcha majburiy maydonlarni to'ldirish talab etiladi.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <PropertyForm onSuccess={handleSuccess} />
            </div>
        </div>
    );
}