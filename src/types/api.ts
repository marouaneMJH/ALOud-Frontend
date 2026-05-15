/**
 * ALOud REST API TypeScript Type Definitions
 *
 * This file contains all TypeScript interfaces for the ALOud REST API client.
 * Organized by domain and follows REST API structure.
 *
 * API Base URL: /api/v1
 * Authentication: JWT Bearer Token
 */

// =====================================================
// API RESPONSE WRAPPER TYPES
// =====================================================

/**
 * Standard API response wrapper for all endpoints
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: Record<string, string[]>;
    timestamp?: string;
}

/**
 * Paginated response wrapper for list endpoints
 */
export interface PaginatedResponse<T> {
    items: T[];
    pageIndex: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

/**
 * Helper type for extracting pagination meta from paginated response
 */
export type PaginationMeta = Omit<PaginatedResponse<any>, "items">;

// =====================================================
// DASHBOARD TYPES
// =====================================================

export interface DashboardStatsDto {
    totalPerfumes: number;
    totalBrands: number;
    totalFamilies: number;
    totalNotes: number;
    totalAccords: number;
    totalTags: number;
    totalSeasons: number;
    totalOccasions: number;
    topBrands: BrandStatsDto[];
    topFamilies: FamilyStatsDto[];
    recentPerfumes: RecentPerfumeDto[];
}

export interface BrandStatsDto {
    brandId: string;
    brandName: string;
    perfumeCount: number;
}

export interface FamilyStatsDto {
    familyId: string;
    familyName: string;
    perfumeCount: number;
}

export interface RecentPerfumeDto {
    perfumeId: string;
    perfumeName: string;
    brandName: string;
    genderProfile?: string;
    imageUrl?: string;
    createdAt: string;
}

// =====================================================
// BRAND TYPES
// =====================================================

export interface CreateBrandDto {
    name: string;
}

export interface UpdateBrandDto {
    id: string;
    name: string;
}

export interface BrandDto {
    id: string;
    name: string;
    perfumeCount?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface BrandSelectDto {
    id: string;
    name: string;
}

// =====================================================
// FAMILY TYPES
// =====================================================

export interface CreateFamilyDto {
    name: string;
    description?: string;
}

export interface UpdateFamilyDto {
    id: string;
    name: string;
    description?: string;
}

export interface FamilyDto {
    id: string;
    name: string;
    description?: string;
    perfumeCount?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface FamilySelectDto {
    id: string;
    name: string;
}

// =====================================================
// TAG TYPES
// =====================================================

export interface CreateTagDto {
    name: string;
    description?: string;
    color?: string;
    category?: string;
}

export interface UpdateTagDto {
    id: string;
    name: string;
    description?: string;
    color?: string;
    category?: string;
}

export interface TagDto {
    id: string;
    name: string;
    description?: string;
    color?: string;
    category?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface TagSelectDto {
    id: string;
    name: string;
    color?: string;
}

// =====================================================
// SEASON TYPES
// =====================================================

export interface CreateSeasonDto {
    name: string;
    description?: string;
}

export interface UpdateSeasonDto {
    id: string;
    name: string;
    description?: string;
}

export interface SeasonDto {
    id: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface SeasonSelectDto {
    id: string;
    name: string;
}

// =====================================================
// OCCASION TYPES
// =====================================================

export interface CreateOccasionDto {
    name: string;
    description?: string;
    recommendedSillage?: string;
    recommendedLongevity?: string;
}

export interface UpdateOccasionDto {
    id: string;
    name: string;
    description?: string;
    recommendedSillage?: string;
    recommendedLongevity?: string;
}

export interface OccasionDto {
    id: string;
    name: string;
    description?: string;
    recommendedSillage?: string;
    recommendedLongevity?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface OccasionSelectDto {
    id: string;
    name: string;
}

// =====================================================
// NOTE TYPES
// =====================================================

export interface CreateNoteDto {
    name: string;
    description?: string;
    noteType?: string;
    category?: string;
    intensity?: number;
    color?: string;
}

export interface UpdateNoteDto {
    id: string;
    name: string;
    description?: string;
    noteType?: string;
    category?: string;
    intensity?: number;
    color?: string;
}

export interface NoteDto {
    id: string;
    name: string;
    description?: string;
    noteType?: string;
    category?: string;
    intensity?: number;
    color?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface NoteSelectDto {
    id: string;
    name: string;
    category?: string;
}

/**
 * Note selection for perfume with level/position
 */
export interface PerfumeNoteSelectionDto {
    noteId: string;
    noteLevel?: "Top" | "Middle" | "Base";
}

export interface PerfumeNoteDto {
    noteId: string;
    noteName: string;
    noteLevel?: string;
    category?: string;
}

// =====================================================
// ACCORD TYPES
// =====================================================

export interface CreateAccordDto {
    name: string;
    description?: string;
    effect?: string;
    popularity?: number;
}

export interface UpdateAccordDto {
    id: string;
    name: string;
    description?: string;
    effect?: string;
    popularity?: number;
}

export interface AccordDto {
    id: string;
    name: string;
    description?: string;
    effect?: string;
    popularity?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface AccordSelectDto {
    id: string;
    name: string;
}

/**
 * Accord selection for perfume with intensity
 */
export interface PerfumeAccordSelectionDto {
    accordId: string;
    intensity?: "Strong" | "Medium" | "Light";
}

export interface PerfumeAccordDto {
    accordId: string;
    accordName: string;
    intensity?: "Strong" | "Medium" | "Light";
}

// =====================================================
// PERFUME TYPES
// =====================================================

export interface CreatePerfumeDto {
    name: string;
    brandId: string;
    price: number;
    stockQuantity: number;
    description?: string;
    imageUrl?: string;
    intensity?: string;
    longevity?: string;
    sillage?: string;
    genderProfile?: string;
    familyIds?: string[];
    noteSelections?: PerfumeNoteSelectionDto[];
    accordSelections?: PerfumeAccordSelectionDto[];
    tagIds?: string[];
    seasonIds?: string[];
    occasionIds?: string[];
}

export interface UpdatePerfumeDto {
    id: string;
    name: string;
    brandId: string;
    price: number;
    stockQuantity: number;
    description?: string;
    imageUrl?: string;
    intensity?: string;
    longevity?: string;
    sillage?: string;
    genderProfile?: string;
    familyIds?: string[];
    noteSelections?: PerfumeNoteSelectionDto[];
    accordSelections?: PerfumeAccordSelectionDto[];
    tagIds?: string[];
    seasonIds?: string[];
    occasionIds?: string[];
}

export interface PerfumeDto {
    id: string;
    name: string;
    brandId: string;
    brandName: string;
    price: number;
    stockQuantity: number;
    description?: string;
    imageUrl?: string;
    intensity?: string;
    longevity?: string;
    sillage?: string;
    genderProfile?: string;
    families?: FamilySelectDto[];
    tags?: TagSelectDto[];
    createdAt?: string;
    updatedAt?: string;
}

export interface PerfumeDetailsDto extends PerfumeDto {
    notes?: PerfumeNoteDto[];
    accords?: PerfumeAccordDto[];
    seasons?: SeasonSelectDto[];
    occasions?: OccasionSelectDto[];
}

export interface PerfumeSelectDto {
    id: string;
    name: string;
    brandName: string;
}

// =====================================================
// AUTHENTICATION TYPES
// =====================================================

export interface RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface LoginResponseDto {
    message: string;
    token: string;
    user: UserDto;
}

export interface UserDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isEmailVerified?: boolean;
    createdAt?: string;
}

export interface VerifyEmailDto {
    email: string;
    code: string;
}

export interface ResendVerificationDto {
    email: string;
}

// =====================================================
// AI EXPERT SYSTEM TYPES
// =====================================================

export enum EClimate {
    Hot,
    Cold,
    Humid,
    Mixed,
}
export enum EOccasion {
    Office,
    Formal,
    Date,
    Nightlife,
    Sport,
    Daily,
    Gym,
}
export enum ESkinType {
    Dry,
    Oily,
    Normal,
}
export enum EComplimentDesire {
    Yes,
    No,
    Neutral,
}
export enum ESeasonPreference {
    Spring,
    Summer,
    Fall,
    Winter,
    AllYear,
}
export enum EPersona {
    Corporate,
    Sexy,
    Sporty,
    Artistic,
    Minimalist,
    Rebellious,
    Elegant,
    Youthful,
    Mature,
    Mysterious,
}
export enum ESensitivity {
    None,
    Migraine,
    HatesSweet,
    HatesSpice,
    HatesFloral,
    HatesFresh,
    PrefersMinimal,
}
export enum EGender {
    Masculine,
    Feminine,
    Unisex,
}

export interface UserProfileDto {
    climate: EClimate;
    occasion: EOccasion;
    skinType: ESkinType;
    compliment: EComplimentDesire;
    seasonPreference: ESeasonPreference;
    persona: EPersona;
    sensitivity: ESensitivity;
    gender?: EGender;
    wantsLongPerformance: boolean;
}

export interface ProductRecommendation {
    name: string;
    brand: string;
    imageUrl?: string | null;
}

export interface RecommendationDto {
    prefer?: string[];
    avoid?: string[];
    sillage?: string | null;
    longevity?: string | null;
    reasons?: string[];
    result?: string;
    products?: ProductRecommendation[];
}

export interface ExpertSystemResult extends RecommendationDto {
    // result is the LLM explanation
}

// =====================================================
// API REQUEST/RESPONSE HELPERS
// =====================================================

/**
 * Helper type for extracting data from paginated response
 */
export type PaginatedData<T> = PaginatedResponse<T>["items"];
