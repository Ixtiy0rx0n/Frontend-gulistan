import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ListingDTO {
  name: string;
  description: string;
  type: string;
  phone: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  openingHours: string;
  address: string;
  password: string;
}

export interface ListingShortDTO {
  name: string;
  type: string;
  phone: string;
  imageUrl: string;
  openingHours: string;
  address: string;
}

export interface PageableObject {
  offset: number;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  sort: SortObject;
  unpaged: boolean;
}

export interface SortObject {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageListingShortDTO {
  totalPages: number;
  totalElements: number;
  size: number;
  content: ListingShortDTO[];
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: PageableObject;
  sort: SortObject;
  empty: boolean;
}

export interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}

export enum PropertyType {
  MEHMONXONA = 'MEHMONXONA',
  RESTORAN = 'RESTORAN',
  KAFE = 'KAFE',
  FASTFOOD = 'FASTFOOD',
  AVTOXIZMAT = 'AVTOXIZMAT',
  POLYA = 'POLYA',
  EVAKUATOR = 'EVAKUATOR',
  OQUVMARKAZA = 'OQUVMARKAZA',
  DOKON = 'DOKON'
}

export const propertyApi = {
  // Barcha joylarni olish
  getAllProperties: async (pageable: Pageable): Promise<PageListingShortDTO> => {
    const response = await api.get('/listing/all', { params: pageable });
    return response.data;
  },

  // Type bo'yicha joylarni olish
  getPropertiesByType: async (type: string): Promise<PageListingShortDTO> => {
    const response = await api.get(`/type/${type}`);
    return response.data;
  },

  // ID bo'yicha joyni olish
  getPropertyById: async (id: number): Promise<ListingDTO> => {
    const response = await api.get(`/listing/${id}`);
    return response.data;
  },

  // Yangi joy qo'shish
  createProperty: async (property: ListingDTO): Promise<ListingDTO> => {
    const response = await api.post('/create', property);
    return response.data;
  }
};

export default api;