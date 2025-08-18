import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ListingShortDTO {
  name: string;
  type: string;
  phone: string;
  imageUrl?: string;
  openingHours?: string;
  address: string;
}

export interface ListingDTO {
  name: string;
  description: string;
  type: string;
  phone: string;
  latitude?: number;
  longitude?: string;
  imageUrl?: string;
  openingHours?: string;
  address: string;
  password: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const propertyApi = {
  // Barcha joylarni olish
  getAllProperties: async (page = 1, limit = 12): Promise<PaginatedResponse<ListingShortDTO>> => {
    const response = await api.get(`/listing/all?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Type bo'yicha joylarni olish
  getPropertiesByType: async (type: string, page = 1, limit = 12): Promise<PaginatedResponse<ListingShortDTO>> => {
    const response = await api.get(`/type/${type}?page=${page}&limit=${limit}`);
    return response.data;
  },

  // ID bo'yicha joyni olish
  getPropertyById: async (id: string): Promise<ListingShortDTO> => {
    const response = await api.get(`/listing/${id}`);
    return response.data;
  },

  // Yangi joy qo'shish
  createProperty: async (propertyData: ListingDTO): Promise<ListingShortDTO> => {
    const response = await api.post('/create', propertyData);
    return response.data;
  },
};

export default api;