import { apiClient } from "./client";
import { BrandDto, CreateBrandDto, UpdateBrandDto } from "../types/api";
import { PaginatedResponse } from "../types/api";


export const brandsApi = {
    async getBrands(
        params: { pageIndex?: number; pageSize?: number; query?: string } = {},
    ): Promise<PaginatedResponse<BrandDto>> {
        const { pageIndex = 1, pageSize = 10, query = "" } = params;
        const queryParams = [`pageIndex=${pageIndex}`, `pageSize=${pageSize}`];
        if (query) queryParams.push(`query=${encodeURIComponent(query)}`);
        return apiClient.get<PaginatedResponse<BrandDto>>(
            `/admin/brands?${queryParams.join("&")}`,
        );
    },

    async getBrand(id: string): Promise<BrandDto> {
        return apiClient.get<BrandDto>(`/admin/brands/${id}`);
    },

    async createBrand(data: CreateBrandDto): Promise<BrandDto> {
        return apiClient.post<BrandDto>("/admin/brands", data);
    },

    async updateBrand(id: string, data: UpdateBrandDto): Promise<BrandDto> {
        return apiClient.put<BrandDto>(`/admin/brands/${id}`, data);
    },

    async deleteBrand(id: string): Promise<void> {
        return apiClient.delete<void>(`/admin/brands/${id}`);
    },
};
