<template>
    <CrudLayout page-title="Expert System">
        <div class="max-w-2xl mx-auto space-y-6">
            <div
                class="rounded-lg border border-border bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 shadow-xl shadow-primary/20 p-8"
            >
                <h3 class="text-lg font-semibold text-muted-foreground mb-6">
                    Perfume Recommendation Engine
                </h3>

                <form @submit.prevent="submitQuery" class="space-y-6">
                    <!-- Query Input -->
                    <div>
                        <label
                            class="block text-sm font-medium text-muted-foreground mb-2"
                            >Perfume Query</label
                        >
                        <textarea
                            v-model="queryForm.query"
                            class="w-full px-4 py-3 border border-border bg-slate-700 text-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            rows="4"
                            placeholder="e.g., I'm looking for a fresh, citrusy fragrance suitable for summer..."
                            required
                        ></textarea>
                    </div>

                    <!-- Query Parameters -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-muted-foreground mb-2"
                                >Gender Profile</label
                            >
                            <select
                                v-model="queryForm.genderProfile"
                                class="w-full px-4 py-2 border border-border bg-slate-700 text-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">Any</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-muted-foreground mb-2"
                                >Price Range</label
                            >
                            <select
                                v-model="queryForm.priceRange"
                                class="w-full px-4 py-2 border border-border bg-slate-700 text-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">Any</option>
                                <option value="$">Budget ($)</option>
                                <option value="$$">Mid-Range ($$)</option>
                                <option value="$$$">Premium ($$$)</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-muted-foreground mb-2"
                                >Intensity</label
                            >
                            <select
                                v-model="queryForm.intensity"
                                class="w-full px-4 py-2 border border-border bg-slate-700 text-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">Any</option>
                                <option value="Light">Light</option>
                                <option value="Medium">Medium</option>
                                <option value="Strong">Strong</option>
                            </select>
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-muted-foreground mb-2"
                                >Longevity</label
                            >
                            <select
                                v-model="queryForm.longevity"
                                class="w-full px-4 py-2 border border-border bg-slate-700 text-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">Any</option>
                                <option value="Short">Short (1-3 hours)</option>
                                <option value="Medium">
                                    Medium (4-6 hours)
                                </option>
                                <option value="Long">Long (7+ hours)</option>
                            </select>
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="flex gap-4">
                        <button
                            type="submit"
                            :disabled="isLoading"
                            class="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-slate-900 font-medium rounded-lg hover:shadow-md transition duration-300 disabled:opacity-50"
                        >
                            {{
                                isLoading
                                    ? "Processing..."
                                    : "Get Recommendations"
                            }}
                        </button>
                        <button
                            type="button"
                            @click="resetForm"
                            class="px-6 py-3 border border-border text-muted-foreground font-medium rounded-lg hover:bg-primary hover:bg-opacity-10 transition duration-300"
                        >
                            Clear
                        </button>
                    </div>

                    <!-- Error Message -->
                    <div
                        v-if="error"
                        class="p-4 bg-red-950 border border-red-800 text-red-200 rounded-lg"
                    >
                        <p class="font-medium">Error</p>
                        <p>{{ error }}</p>
                    </div>
                </form>

                <!-- Results Section -->
                <div v-if="results.length > 0" class="mt-12">
                    <h4 class="text-lg font-semibold text-muted-foreground mb-6">
                        Recommended Perfumes
                    </h4>
                    <div class="space-y-4">
                        <div
                            v-for="(result, index) in results"
                            :key="index"
                            class="p-4 border border-border rounded-lg bg-slate-700 hover:shadow-md transition"
                        >
                            <div class="flex justify-between items-start mb-2">
                                <h5 class="text-lg font-semibold text-muted-foreground">
                                    {{ result.name }}
                                </h5>
                                <span
                                    class="px-3 py-1 bg-primary text-slate-900 text-sm font-medium rounded-full"
                                >
                                    {{ Math.round(result.score * 100) }}% Match
                                </span>
                            </div>
                            <p class="text-muted-foreground mb-3">
                                {{ result.description }}
                            </p>
                            <div
                                class="grid grid-cols-2 gap-2 text-sm text-muted-foreground"
                            >
                                <div>
                                    <strong class="text-muted-foreground"
                                        >Brand:</strong
                                    >
                                    {{ result.brandName }}
                                </div>
                                <div>
                                    <strong class="text-muted-foreground"
                                        >Price:</strong
                                    >
                                    ${{ result.price }}
                                </div>
                                <div>
                                    <strong class="text-muted-foreground"
                                        >Intensity:</strong
                                    >
                                    {{ result.intensity }}
                                </div>
                                <div>
                                    <strong class="text-muted-foreground"
                                        >Longevity:</strong
                                    >
                                    {{ result.longevity }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- No Results -->
                <div
                    v-if="
                        submitted &&
                        results.length === 0 &&
                        !isLoading &&
                        !error
                    "
                    class="mt-8 p-6 bg-slate-900 border border-border rounded-lg"
                >
                    <p class="text-muted-foreground">
                        No perfumes matched your criteria. Try adjusting your
                        preferences.
                    </p>
                </div>
            </div>
        </div>
    </CrudLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import CrudLayout from "@/components/common/CrudLayout.vue";

const isLoading = ref(false);
const error = ref("");
const submitted = ref(false);
const results = ref<any[]>([]);

const queryForm = reactive({
    query: "",
    genderProfile: "",
    priceRange: "",
    intensity: "",
    longevity: "",
});

const resetForm = () => {
    queryForm.query = "";
    queryForm.genderProfile = "";
    queryForm.priceRange = "";
    queryForm.intensity = "";
    queryForm.longevity = "";
    results.value = [];
    error.value = "";
    submitted.value = false;
};

const submitQuery = async () => {
    if (!queryForm.query.trim()) {
        error.value = "Please enter a query";
        return;
    }

    isLoading.value = true;
    error.value = "";
    submitted.value = true;

    try {
        // Simulate expert system processing
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock recommendations based on query
        const mockRecommendations = [
            {
                name: "Acqua di Gio",
                brandName: "Giorgio Armani",
                description:
                    "A fresh aquatic fragrance inspired by the Mediterranean coast",
                price: 85,
                intensity: "Light",
                longevity: "4 hours",
                score: 0.95,
            },
            {
                name: "Bleu de Chanel",
                brandName: "Chanel",
                description:
                    "A fresh and aromatic woody composition with a modern masculine appeal",
                price: 120,
                intensity: "Medium",
                longevity: "6 hours",
                score: 0.88,
            },
            {
                name: "La Vie Est Belle",
                brandName: "Lancôme",
                description:
                    "A sweet and delicate floral fragrance with gourmand accords",
                price: 95,
                intensity: "Medium",
                longevity: "6 hours",
                score: 0.82,
            },
        ];

        results.value = mockRecommendations;
    } catch (err: any) {
        error.value = err.message || "Failed to get recommendations";
    } finally {
        isLoading.value = false;
    }
};
</script>
