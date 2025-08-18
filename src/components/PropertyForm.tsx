import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyType, api } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus } from 'lucide-react';

const propertyTypes = Object.values(PropertyType).map(type => ({
    value: type,
    label: type
}));

const formSchema = z.object({
    name: z.string().min(2, 'Nom kamida 2 ta belgidan iborat bo\'lishi kerak'),
    description: z.string().min(10, 'Tavsif kamida 10 ta belgidan iborat bo\'lishi kerak'),
    type: z.nativeEnum(PropertyType),
    phone: z.string().min(9, 'Telefon raqam kamida 9 ta raqamdan iborat bo\'lishi kerak'),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    imageUrl: z.string().url('Yaroqli rasm URL manzilini kiriting'),
    openingHours: z.string().min(2, 'Ish vaqtini kiriting'),
    address: z.string().min(5, 'Manzil kamida 5 ta belgidan iborat bo\'lishi kerak'),
    password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak'),
});

type FormData = z.infer<typeof formSchema>;

interface PropertyFormProps {
    onSuccess?: () => void;
}

export const PropertyForm = ({ onSuccess }: PropertyFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            type: PropertyType.MEHMONXONA,
            phone: '',
            latitude: 0,
            longitude: 0,
            imageUrl: '',
            openingHours: '',
            address: '',
            password: '',
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            await api.createListing(data);
            toast({
                title: 'Muvaffaqiyat!',
                description: 'Yangi joy muvaffaqiyatli qo\'shildi.',
            });
            form.reset();
            onSuccess?.();
        } catch (error) {
            toast({
                title: 'Xatolik!',
                description: 'Joy qo\'shishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto bg-gradient-card shadow-elegant">
            <CardHeader className="bg-gradient-hero">
                <CardTitle className="flex items-center gap-2 text-foreground">
                    <Plus className="w-5 h-5"/>
                    Yangi joy qo'shish
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Joy nomi *</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="type"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Joy turi *</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Joy turini tanlang" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {propertyTypes.map((type) => (
                                                    <SelectItem
                                                        key={type.value}
                                                        value={type.value}
                                                    >
                                                        {type.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Telefon *</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="tel" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="openingHours"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Ish vaqti *</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="09:00 - 18:00" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Manzil *</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Rasm URL *</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="url" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="latitude"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Latitude</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" step="0.000001" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="longitude"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Longitude</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" step="0.000001" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Parol *</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Tavsif *</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            className="min-h-[100px]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Saqlash
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
