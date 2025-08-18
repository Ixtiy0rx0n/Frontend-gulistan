import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListingShortDTO, PropertyType, PageResponse, api } from '@/services/api';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyFilter } from '@/components/PropertyFilter';
import { Button } from '@/components/ui/button';
import { Loader2, Search, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Pagination } from '@/components/ui/pagination';

export default function PropertyList() {
    const [listings, setListings] = useState<ListingShortDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState<PropertyType | null>(null);
    const [pageData, setPageData] = useState<PageResponse<ListingShortDTO>>({
        content: [],
        totalPages: 0,
        totalElements: 0,
        size: 10,
        number: 0,
        first: true,
        last: true,
        numberOfElements: 0,
        empty: true,
        pageable: {
            offset: 0,
            pageNumber: 0,
            pageSize: 10,
            paged: true,
            sort: { empty: true, sorted: false, unsorted: true },
            unpaged: false
        },
        sort: { empty: true, sorted: false, unsorted: true }
    });
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { toast } = useToast();

    const fetchListings = async (type: PropertyType | null = selectedType, page: number = pageData.number) => {
        setLoading(true);
        setError(null);

        try {
            let response: PageResponse<ListingShortDTO>;

            if (type) {
                response = await api.getListingsByType(type, page, pageData.size);
            } else {
                response = await api.getAllListings({
                    page,
                    size: pageData.size,
                    sort: ['name']
                });
            }

            setListings(response.content);
            setPageData(response);
        } catch (error) {
            setError('Ma\'lumotlarni yuklashda xatolik yuz berdi');
            toast({
                title: 'Xatolik!',
                description: 'Ma\'lumotlarni yuklashda muammo yuz berdi. Iltimos, qayta urinib ko\'ring.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    const handleTypeChange = (type: PropertyType | null) => {
        setSelectedType(type);
        fetchListings(type, 0);
    };

    const handlePageChange = (page: number) => {
        fetchListings(selectedType, page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleViewDetails = (id: string) => {
        navigate(`/listing/${id}`);
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-hero">
                <div className="container mx-auto px-4 py-8">
                    <Alert className="max-w-2xl mx-auto">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="flex items-center justify-between">
                            <span>{error}</span>
                            <Button onClick={() => fetchListings()} variant="outline" size="sm">
                                Qayta urinish
                            </Button>
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-hero">
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                        Gulistan Life
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Gulistan shahridagi eng yaxshi joylar
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-8">
                    <PropertyFilter
                        selectedType={selectedType}
                        onTypeChange={handleTypeChange}
                        types={Object.values(PropertyType)}
                    />
                </div>

                {/* Listings Grid */}
                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : listings.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-lg text-muted-foreground">Hech qanday ma'lumot topilmadi</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listings.map((listing) => (
                                <PropertyCard
                                    key={listing.name}
                                    listing={listing}
                                    onClick={() => handleViewDetails(listing.name)}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {pageData.totalPages > 1 && (
                            <div className="mt-8 flex justify-center">
                                <Pagination
                                    currentPage={pageData.number}
                                    totalPages={pageData.totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}