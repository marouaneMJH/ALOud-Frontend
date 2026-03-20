<script setup lang="ts">
import { ref, reactive } from "vue";
import Layout from "@/components/layout/Layout.vue";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import CardTitle from "@/components/ui/CardTitle.vue";
import CardContent from "@/components/ui/CardContent.vue";
import Textarea from "@/components/ui/Textarea.vue";
import Label from "@/components/ui/Label.vue";
import Button from "@/components/ui/Button.vue";
import Alert from "@/components/ui/Alert.vue";
import Badge from "@/components/ui/Badge.vue";

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
        await new Promise((resolve) => setTimeout(resolve, 1500));

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

<template>
    <Layout page-title="Expert System">
        <div class="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Perfume Recommendation Engine</CardTitle>
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="submitQuery" class="space-y-6">
                        <div class="space-y-2">
                            <Label for="query">Perfume Query</Label>
                            <Textarea
                                id="query"
                                v-model="queryForm.query"
                                rows="4"
                                placeholder="e.g., I'm looking for a fresh, citrusy fragrance suitable for summer..."
                                required
                            />
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <Label for="gender">Gender Profile</Label>
                                <select
                                    id="gender"
                                    v-model="queryForm.genderProfile"
                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <option value="">Any</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Unisex">Unisex</option>
                                </select>
                            </div>

                            <div class="space-y-2">
                                <Label for="price">Price Range</Label>
                                <select
                                    id="price"
                                    v-model="queryForm.priceRange"
                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <option value="">Any</option>
                                    <option value="$">Budget ($)</option>
                                    <option value="$$">Mid-Range ($$)</option>
                                    <option value="$$$">Premium ($$$)</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <Label for="intensity">Intensity</Label>
                                <select
                                    id="intensity"
                                    v-model="queryForm.intensity"
                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <option value="">Any</option>
                                    <option value="Light">Light</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Strong">Strong</option>
                                </select>
                            </div>

                            <div class="space-y-2">
                                <Label for="longevity">Longevity</Label>
                                <select
                                    id="longevity"
                                    v-model="queryForm.longevity"
                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <option value="">Any</option>
                                    <option value="Short">
                                        Short (1-3 hours)
                                    </option>
                                    <option value="Medium">
                                        Medium (4-6 hours)
                                    </option>
                                    <option value="Long">Long (7+ hours)</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex gap-3">
                            <Button type="submit" :disabled="isLoading">
                                {{
                                    isLoading
                                        ? "Processing..."
                                        : "Get Recommendations"
                                }}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                @click="resetForm"
                            >
                                Clear
                            </Button>
                        </div>

                        <Alert v-if="error" variant="destructive">
                            {{ error }}
                        </Alert>
                    </form>

                    <!-- Results Section -->
                    <div v-if="results.length > 0" class="mt-8 space-y-4">
                        <h4 class="text-lg font-semibold text-foreground">
                            Recommended Perfumes
                        </h4>
                        <div class="space-y-4">
                            <Card
                                v-for="(result, index) in results"
                                :key="index"
                            >
                                <CardContent class="pt-6">
                                    <div
                                        class="flex justify-between items-start mb-2"
                                    >
                                        <h5
                                            class="text-base font-semibold text-foreground"
                                        >
                                            {{ result.name }}
                                        </h5>
                                        <Badge>
                                            {{ Math.round(result.score * 100) }}%
                                            Match
                                        </Badge>
                                    </div>
                                    <p
                                        class="text-sm text-muted-foreground mb-3"
                                    >
                                        {{ result.description }}
                                    </p>
                                    <div
                                        class="grid grid-cols-2 gap-2 text-sm text-muted-foreground"
                                    >
                                        <div>
                                            <span class="font-medium"
                                                >Brand:</span
                                            >
                                            {{ result.brandName }}
                                        </div>
                                        <div>
                                            <span class="font-medium"
                                                >Price:</span
                                            >
                                            ${{ result.price }}
                                        </div>
                                        <div>
                                            <span class="font-medium"
                                                >Intensity:</span
                                            >
                                            {{ result.intensity }}
                                        </div>
                                        <div>
                                            <span class="font-medium"
                                                >Longevity:</span
                                            >
                                            {{ result.longevity }}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
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
                        class="mt-8 p-6 bg-muted rounded-lg text-center"
                    >
                        <p class="text-muted-foreground">
                            No perfumes matched your criteria. Try adjusting
                            your preferences.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </Layout>
</template>
