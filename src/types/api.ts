// Dashboard Types
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

// Brand Types
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
  perfumeCount: number;
}

export interface BrandSelectDto {
  id: string;
  name: string;
}

// Family Types
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
  perfumeCount: number;
}

export interface FamilySelectDto {
  id: string;
  name: string;
}

// Perfume Types
export interface PerfumeNoteSelectionDto {
  noteId: string;
  noteLevel?: 'Top' | 'Middle' | 'Base';
}

export interface PerfumeAccordSelectionDto {
  accordId: string;
  intensity?: 'Strong' | 'Medium' | 'Light';
}

export interface CreatePerfumeDto {
  name: string;
  intensity?: string;
  longevity?: string;
  sillage?: string;
  genderProfile?: string;
  priceRange?: string;
  price: number;
  stockQuantity: number;
  description?: string;
  imageUrl?: string;
  brandId: string;
  familyIds: string[];
  noteSelections: PerfumeNoteSelectionDto[];
  accordSelections: PerfumeAccordSelectionDto[];
  tagIds: string[];
  seasonIds: string[];
  occasionIds: string[];
}

export interface UpdatePerfumeDto extends CreatePerfumeDto {
  id: string;
}

export interface PerfumeDto {
  id: string;
  name: string;
  intensity?: string;
  longevity?: string;
  sillage?: string;
  genderProfile?: string;
  priceRange?: string;
  price: number;
  stockQuantity: number;
  description?: string;
  imageUrl?: string;
  brandId: string;
  brandName: string;
  families: string[];
  createdAt: string;
}

export interface PerfumeDetailsDto extends PerfumeDto {
  notes: PerfumeNoteDto[];
  accords: PerfumeAccordDto[];
  tags: string[];
  seasons: string[];
  occasions: string[];
}

export interface PerfumeNoteDto {
  noteId: string;
  noteName: string;
  noteLevel?: string;
}

export interface PerfumeAccordDto {
  accordId: string;
  accordName: string;
  intensity?: string;
}

// Note Types
export interface CreateNoteDto {
  name: string;
  description?: string;
  noteType?: string;
  category?: string;
  intensity?: number;
  color?: string;
  synonyms?: string;
}

export interface UpdateNoteDto extends CreateNoteDto {
  id: string;
}

export interface NoteDto {
  id: string;
  name: string;
  description?: string;
  noteType?: string;
  category?: string;
  intensity?: number;
  color?: string;
  synonyms?: string;
}

// Accord Types
export interface CreateAccordDto {
  name: string;
  description?: string;
  compositionNotes?: string[];
  effect?: string;
  popularity?: number;
}

export interface UpdateAccordDto extends CreateAccordDto {
  id: string;
}

export interface AccordDto {
  id: string;
  name: string;
  description?: string;
  compositionNotes?: string[];
  effect?: string;
  popularity?: number;
}

// Tag Types
export interface CreateTagDto {
  name: string;
  description?: string;
  color?: string;
  category?: string;
}

export interface UpdateTagDto extends CreateTagDto {
  id: string;
}

export interface TagDto {
  id: string;
  name: string;
  description?: string;
  color?: string;
  category?: string;
}

// Season Types
export interface CreateSeasonDto {
  name: string;
  description?: string;
  recommendedNotes?: string[];
  colorTheme?: string;
  temperatureRange?: string;
}

export interface UpdateSeasonDto extends CreateSeasonDto {
  id: string;
}

export interface SeasonDto {
  id: string;
  name: string;
  description?: string;
  recommendedNotes?: string[];
  colorTheme?: string;
  temperatureRange?: string;
}

// Occasion Types
export interface CreateOccasionDto {
  name: string;
  description?: string;
  recommendedSillage?: string;
  recommendedLongevity?: string;
  timeOfDay?: string[];
  gender?: string[];
}

export interface UpdateOccasionDto extends CreateOccasionDto {
  id: string;
}

export interface OccasionDto {
  id: string;
  name: string;
  description?: string;
  recommendedSillage?: string;
  recommendedLongevity?: string;
  timeOfDay?: string[];
  gender?: string[];
}

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
