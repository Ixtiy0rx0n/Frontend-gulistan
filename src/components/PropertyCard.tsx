import { ListingShortDTO } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Clock, MapPin } from 'lucide-react';

interface PropertyCardProps {
    listing: ListingShortDTO;
    onClick?: () => void;
}

export const PropertyCard = ({ listing, onClick }: PropertyCardProps) => {
    return (
        <Card
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-gradient-card"
            onClick={onClick}
        >
            <div className="aspect-video relative overflow-hidden">
                <img
                    src={listing.imageUrl}
                    alt={listing.name}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 right-2">
                    {listing.type}
                </Badge>
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl line-clamp-1">{listing.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{listing.phone}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{listing.openingHours}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{listing.address}</span>
                </div>
            </CardContent>
        </Card>
    );
};