import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ListingDTO, propertyApi } from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Phone, Clock, MapPin, Info, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function PropertyDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [listing, setListing] = useState<ListingDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('ID topilmadi');
            setLoading(false);
            return;
        }

        const fetchListing = async () => {
            try {
                const data = await propertyApi.getPropertyById(Number(id));
                setListing(data);
            } catch (err) {
                setError('Ma\'lumotni yuklashda xatolik yuz berdi');
                toast({
                    title: 'Xatolik!',
                    description: 'Ma\'lumotni yuklashda muammo yuz berdi',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id, toast]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <Card className="w-full">
                        <CardContent className="p-6">
                            <Skeleton className="h-[300px] w-full mb-6" />
                            <Skeleton className="h-8 w-1/2 mb-4" />
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (error || !listing) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Alert variant="destructive" className="max-w-2xl mx-auto">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                        {error || 'Ma\'lumot topilmadi'}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Orqaga qaytish
                </Button>

                <Card>
                    <div className="relative aspect-video overflow-hidden">
                        <img
                            src={listing.imageUrl}
                            alt={listing.name}
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                            <span className={cn(
                                "px-3 py-1 rounded-full text-sm font-medium",
                                "bg-white/90 text-primary shadow-sm"
                            )}>
                                {listing.type}
                            </span>
                        </div>
                    </div>

                    <CardContent className="p-6 space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-4">
                                {listing.name}
                            </h1>
                        </div>

                        <div className="grid gap-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-5 w-5" />
                                <a
                                    href={`tel:${listing.phone}`}
                                    className="hover:text-primary transition-colors"
                                >
                                    {listing.phone}
                                </a>
                            </div>

                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-5 w-5" />
                                <span>{listing.openingHours}</span>
                            </div>

                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-5 w-5" />
                                <span>{listing.address}</span>
                            </div>
                        </div>

                        {listing.description && (
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Tavsif</h2>
                                <p className="text-muted-foreground whitespace-pre-line">
                                    {listing.description}
                                </p>
                            </div>
                        )}

                        {listing.latitude && listing.longitude && (
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Joylashuv</h2>
                                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden border bg-muted">
                                    <iframe
                                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${listing.longitude},${listing.latitude},${listing.longitude},${listing.latitude}&layer=mapnik&marker=${listing.latitude},${listing.longitude}`}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}