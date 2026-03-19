# ALOud Frontend - Backend Integration Guide

## Quick Start

### Step 1: Ensure Backend is Running

Your .NET backend should be running on `http://localhost:5000` with the following endpoints:

```
GET    /api/v1/brands
POST   /api/v1/brands
PUT    /api/v1/brands/:id
DELETE /api/v1/brands/:id

GET    /api/v1/perfumes
POST   /api/v1/perfumes
PUT    /api/v1/perfumes/:id
DELETE /api/v1/perfumes/:id

GET    /api/v1/families
POST   /api/v1/families
PUT    /api/v1/families/:id
DELETE /api/v1/families/:id

GET    /api/v1/notes
POST   /api/v1/notes
PUT    /api/v1/notes/:id
DELETE /api/v1/notes/:id

GET    /api/v1/accords
POST   /api/v1/accords
PUT    /api/v1/accords/:id
DELETE /api/v1/accords/:id

GET    /api/v1/tags
POST   /api/v1/tags
PUT    /api/v1/tags/:id
DELETE /api/v1/tags/:id

GET    /api/v1/seasons
POST   /api/v1/seasons
PUT    /api/v1/seasons/:id
DELETE /api/v1/seasons/:id

GET    /api/v1/occasions
POST   /api/v1/occasions
PUT    /api/v1/occasions/:id
DELETE /api/v1/occasions/:id

GET    /api/v1/admin/dashboard/stats
```

### Step 2: Update Frontend Configuration

Create `.env.local` in the frontend root directory:

```env
# Use your actual backend URL
VITE_API_URL=http://localhost:5000/api/v1

# Disable mock mode
VITE_MOCK_MODE=false

# Your environment
VITE_ENV=development
```

### Step 3: Restart Frontend Dev Server

```bash
npm run dev
```

The frontend will now use your real backend API!

## Environment Variables

### Development (.env.local)
```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_MOCK_MODE=false
VITE_ENV=development
VITE_LOG_LEVEL=debug
```

### Staging (.env.staging)
```env
VITE_API_URL=https://api-staging.aloud.dev/api/v1
VITE_MOCK_MODE=false
VITE_ENV=staging
VITE_LOG_LEVEL=info
```

### Production (.env.production)
```env
VITE_API_URL=https://api.aloud.dev/api/v1
VITE_MOCK_MODE=false
VITE_ENV=production
VITE_LOG_LEVEL=error
```

## API Response Format Requirements

### Paginated Responses (List endpoints)

All list endpoints must return paginated data:

```json
{
  "data": [
    { "id": "1", "name": "Item 1" },
    { "id": "2", "name": "Item 2" }
  ],
  "page": 1,
  "pageSize": 10,
  "total": 156,
  "totalPages": 16
}
```

**Expected Query Parameters:**
- `page` - Current page (1-indexed)
- `pageSize` - Items per page (default: 10)

### Single Item Responses

```json
{
  "id": "uuid-string",
  "name": "Item Name",
  "description": "Optional description",
  "createdAt": "2024-03-19T10:00:00Z",
  "updatedAt": "2024-03-19T10:00:00Z"
}
```

### Error Responses

All error responses should include status code and message:

```json
{
  "error": "Item not found",
  "statusCode": 404,
  "message": "The requested item does not exist"
}
```

## TypeScript Type Definitions

All API responses are typed using interfaces in `src/types/api.ts`. The frontend will validate responses against these types.

### Key Types

```typescript
// Dashboard
interface DashboardStatsDto {
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

// Brands
interface BrandDto {
  id: string;
  name: string;
  perfumeCount: number;
}

// Perfumes
interface PerfumeDto {
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

// Families
interface FamilyDto {
  id: string;
  name: string;
  description?: string;
  perfumeCount: number;
}

// Notes
interface NoteDto {
  id: string;
  name: string;
  description?: string;
  noteType?: string;
  category?: string;
  intensity?: number;
  color?: string;
  synonyms?: string;
}

// Accords
interface AccordDto {
  id: string;
  name: string;
  description?: string;
  compositionNotes?: string[];
  effect?: string;
  popularity?: number;
}

// Tags
interface TagDto {
  id: string;
  name: string;
  description?: string;
  color?: string;
  category?: string;
}

// Seasons
interface SeasonDto {
  id: string;
  name: string;
  description?: string;
  temperatureRange?: string;
  recommendedNotes?: string[];
  color?: string;
}

// Occasions
interface OccasionDto {
  id: string;
  name: string;
  description?: string;
  timeOfDay?: string;
  genderPreference?: string;
  sillage?: string;
  longevity?: string;
  color?: string;
}
```

See `src/types/api.ts` for complete type definitions.

## CORS Configuration

If running frontend and backend on different origins, your .NET backend needs CORS enabled:

```csharp
// In Startup.cs or Program.cs

services.AddCors(options => {
    options.AddPolicy("AllowFrontend", builder => {
        builder
            .WithOrigins("http://localhost:5173", "http://localhost:5174", "http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

app.UseCors("AllowFrontend");
```

## Authentication

### Token Storage

Auth tokens are stored in localStorage under the key `authToken`:

```javascript
// In your login response handler
localStorage.setItem('authToken', response.token);
```

### Token Injection

The frontend automatically adds the token to all API requests:

```javascript
Authorization: Bearer <token>
```

### Logout on 401

When the backend returns 401 (Unauthorized), the frontend automatically:
1. Clears the token from localStorage
2. Redirects to `/login` page

### Implementing Login Page

Create `src/pages/LoginPage.vue` with:

```vue
<template>
  <form @submit.prevent="login">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiClient } from '../api/client';

const router = useRouter();
const email = ref('');
const password = ref('');

const login = async () => {
  try {
    const response = await apiClient.post<{ token: string }>('/auth/login', {
      email: email.value,
      password: password.value,
    });
    
    localStorage.setItem('authToken', response.token);
    router.push('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>
```

## API Debugging

### Enable Debug Logging

Set environment variable:

```env
VITE_LOG_LEVEL=debug
```

This will log all API calls to the browser console.

### Use Browser DevTools

1. Open DevTools → Network tab
2. Filter for `xhr` or `fetch`
3. Click on API requests to see details
4. Check headers and response body

### Mock Mode vs Real API

To verify which mode you're running:

```javascript
// In browser console
import { CONFIG } from '/src/api/client.js';
console.log(CONFIG);
```

Output will show:
- `mockMode: true` - Using mock data
- `mockMode: false` - Using real backend
- `apiUrl` - Backend URL being used
- `environment` - Current environment

## Switching Between Mock and Real API

### Option 1: Environment Variable

Create `.env.local`:
```env
VITE_MOCK_MODE=true   # Use mock data
# or
VITE_MOCK_MODE=false  # Use real API
```

### Option 2: At Runtime (Development Only)

Open browser console:

```javascript
// View current configuration
import { CONFIG } from '/src/api/client.js';
console.log(CONFIG.mockMode); // true or false
```

Note: Runtime changes require modifying the source code - environment variables are bundled at build time.

## Testing API Integration

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { brandsApi } from '../api/brands';

describe('Brands API', () => {
  it('should fetch brands list', async () => {
    const result = await brandsApi.getBrands(1, 10);
    
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('page');
    expect(result).toHaveProperty('total');
    expect(Array.isArray(result.data)).toBe(true);
  });

  it('should create a brand', async () => {
    const newBrand = await brandsApi.createBrand({ name: 'New Brand' });
    
    expect(newBrand).toHaveProperty('id');
    expect(newBrand.name).toBe('New Brand');
  });
});
```

## Integration Checklist

Before going to production, ensure:

- [ ] Backend running on correct URL
- [ ] All endpoints implemented according to spec
- [ ] CORS enabled on backend
- [ ] Response format matches TypeScript types
- [ ] Pagination working (page, pageSize parameters)
- [ ] Error responses follow expected format
- [ ] Authentication token flow working
- [ ] `VITE_MOCK_MODE=false` in environment
- [ ] Frontend successfully fetches real data
- [ ] All CRUD operations working (Create, Read, Update, Delete)
- [ ] Forms submit data correctly
- [ ] Error messages display properly
- [ ] Pagination controls work
- [ ] Search/filtering works (if implemented)

## Troubleshooting

### CORS Errors

**Error:** `Access to XMLHttpRequest at 'http://localhost:5000/api/v1/...' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Solution:** Enable CORS on your .NET backend (see CORS Configuration section above)

### 401 Unauthorized

**Error:** Login works but subsequent requests return 401

**Possible causes:**
- Token expired
- Token not being sent correctly
- Backend not recognizing token format

**Debug:**
```javascript
console.log(localStorage.getItem('authToken'));
```

### API Not Found (404)

**Error:** `GET http://localhost:5000/api/v1/... 404 (Not Found)`

**Solution:**
1. Verify backend is running: `curl http://localhost:5000/api/v1/brands`
2. Check URL matches endpoint (should include `/api/v1`)
3. Verify .NET controller routes are correct

### Timeout

**Error:** `Network timeout` or `Request timeout`

**Solution:**
1. Check if backend is running
2. Increase timeout in `src/api/client.ts`
3. Check for long-running database queries

### Type Errors

**Error:** TypeScript compilation errors about response types

**Solution:**
1. Update `src/types/api.ts` to match backend DTOs
2. Ensure response JSON keys match TypeScript interface properties
3. Check for null/undefined fields

## Support

For integration support:

1. Check `API_INTEGRATION_GUIDE.md` for API contract
2. Review mock data in `src/api/*.ts` for expected formats
3. Check browser console for error messages
4. Review backend logs for server-side errors
5. Verify environment variables are set correctly

## Next Steps

After successful backend integration:

1. ✅ Implement login page
2. ✅ Add session management
3. ✅ Add proper error handling and user notifications
4. ✅ Implement advanced search and filtering
5. ✅ Add analytics and logging
6. ✅ Performance optimization
7. ✅ Security hardening
