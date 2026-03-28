<script setup lang="ts">
import { ref, reactive } from "vue";
import Layout from "@/components/layout/Layout.vue";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import CardTitle from "@/components/ui/CardTitle.vue";
import CardContent from "@/components/ui/CardContent.vue";
import Label from "@/components/ui/Label.vue";
import Button from "@/components/ui/Button.vue";
import Alert from "@/components/ui/Alert.vue";
import Badge from "@/components/ui/Badge.vue";
import { aiApi } from "@/api/ai";
import {
    EClimate,
    EOccasion,
    ESkinType,
    EComplimentDesire,
    ESeasonPreference,
    EPersona,
    ESensitivity,
} from "@/types/api";
import type { ExpertSystemResult } from "@/types/api";
import { 
    Sparkles, 
    Thermometer, 
    User, 
    Zap, 
    ChevronRight, 
    ChevronLeft, 
    CheckCircle2,
    ShieldAlert,
    Clock,
    Waves
} from "lucide-vue-next";

const currentStep = ref(1);
const totalSteps = 3;
const isLoading = ref(false);
const error = ref("");
const result = ref<ExpertSystemResult | null>(null);

const profile = reactive({
    climate: EClimate.Hot,
    occasion: EOccasion.Daily,
    skinType: ESkinType.Normal,
    compliment: EComplimentDesire.Neutral,
    seasonPreference: ESeasonPreference.AllYear,
    persona: EPersona.Minimalist,
    sensitivity: ESensitivity.None,
    wantsLongPerformance: false,
});

const nextStep = () => {
    if (currentStep.value < totalSteps) currentStep.value++;
};

const prevStep = () => {
    if (currentStep.value > 1) currentStep.value--;
};

const submitProfile = async () => {
    isLoading.value = true;
    error.value = "";
    result.value = null;

    try {
        const data = await aiApi.evaluateProfile(profile);
        result.value = data;
        currentStep.value = 4; // Result step
    } catch (err: any) {
        error.value = err?.message || "Failed to get recommendations. Please try again.";
    } finally {
        isLoading.value = false;
    }
};

const reset = () => {
    currentStep.value = 1;
    result.value = null;
    error.value = "";
};

// Enum Option Helpers
const climateOptions = [
    { label: "Hot", value: EClimate.Hot },
    { label: "Cold", value: EClimate.Cold },
    { label: "Humid", value: EClimate.Humid },
    { label: "Mixed", value: EClimate.Mixed },
];

const occasionOptions = [
    { label: "Office", value: EOccasion.Office },
    { label: "Formal", value: EOccasion.Formal },
    { label: "Date", value: EOccasion.Date },
    { label: "Nightlife", value: EOccasion.Nightlife },
    { label: "Sport", value: EOccasion.Sport },
    { label: "Daily", value: EOccasion.Daily },
    { label: "Gym", value: EOccasion.Gym },
];

const skinOptions = [
    { label: "Dry", value: ESkinType.Dry },
    { label: "Oily", value: ESkinType.Oily },
    { label: "Normal", value: ESkinType.Normal },
];

const seasonOptions = [
    { label: "Spring", value: ESeasonPreference.Spring },
    { label: "Summer", value: ESeasonPreference.Summer },
    { label: "Fall", value: ESeasonPreference.Fall },
    { label: "Winter", value: ESeasonPreference.Winter },
    { label: "All Year", value: ESeasonPreference.AllYear },
];

const complimentOptions = [
    { label: "Yes", value: EComplimentDesire.Yes },
    { label: "No", value: EComplimentDesire.No },
    { label: "Neutral", value: EComplimentDesire.Neutral },
];

const personaOptions = [
    { label: "Corporate", value: EPersona.Corporate },
    { label: "Sexy", value: EPersona.Sexy },
    { label: "Sporty", value: EPersona.Sporty },
    { label: "Artistic", value: EPersona.Artistic },
    { label: "Minimalist", value: EPersona.Minimalist },
    { label: "Rebellious", value: EPersona.Rebellious },
    { label: "Elegant", value: EPersona.Elegant },
    { label: "Youthful", value: EPersona.Youthful },
    { label: "Mature", value: EPersona.Mature },
    { label: "Mysterious", value: EPersona.Mysterious },
];

const sensitivityOptions = [
    { label: "None", value: ESensitivity.None },
    { label: "Migraine", value: ESensitivity.Migraine },
    { label: "Hates Sweet", value: ESensitivity.HatesSweet },
    { label: "Hates Spice", value: ESensitivity.HatesSpice },
    { label: "Hates Floral", value: ESensitivity.HatesFloral },
    { label: "Hates Fresh", value: ESensitivity.HatesFresh },
    { label: "Prefers Minimal", value: ESensitivity.PrefersMinimal },
];

const formatResult = (text: string) => {
    if (!text) return "";
    // Simple markdown-lite: **bold** to <b>, newlines to <br>
    return text
        .replace(/\*\*(.*?)\*\*/g, '<b class="text-primary font-bold">$1</b>')
        .replace(/\n/g, "<br>");
};
</script>

<template>
    <Layout page-title="AI Expert System">
        <div class="max-w-4xl mx-auto py-8">
            <div class="text-center mb-10 space-y-4">
                <div class="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2">
                    <Sparkles class="w-8 h-8 text-primary animate-pulse" />
                </div>
                <h1 class="text-4xl font-serif font-bold tracking-tight text-foreground">
                    Discover Your Olfactive Identity
                </h1>
                <p class="text-muted-foreground text-lg max-w-xl mx-auto">
                    Let our expert system curate the perfect fragrance profile based on your environment, personality, and desires.
                </p>
            </div>

            <!-- Multi-step Form -->
            <div v-if="currentStep <= totalSteps" class="space-y-8">
                <!-- Progress Header -->
                <div class="flex justify-center items-center gap-4 mb-8">
                    <div v-for="s in totalSteps" :key="s" class="flex items-center">
                        <div 
                            class="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                            :class="[
                                currentStep >= s ? 'bg-primary border-primary text-primary-foreground' : 'border-muted text-muted-foreground',
                                currentStep === s ? 'ring-4 ring-primary/20 scale-110' : ''
                            ]"
                        >
                            <span v-if="currentStep > s"><CheckCircle2 class="w-6 h-6" /></span>
                            <span v-else class="font-bold">{{ s }}</span>
                        </div>
                        <div v-if="s < totalSteps" class="w-12 h-1 bg-muted mx-2 rounded-full">
                            <div 
                                class="h-full bg-primary transition-all duration-500 rounded-full"
                                :style="{ width: currentStep > s ? '100%' : '0%' }"
                            ></div>
                        </div>
                    </div>
                </div>

                <Card class="border-primary/20 bg-card/50 backdrop-blur-sm shadow-2xl">
                    <CardHeader>
                        <CardTitle v-if="currentStep === 1" class="flex items-center gap-2">
                            <Thermometer class="w-5 h-5 text-primary" />
                            Environment & Usage
                        </CardTitle>
                        <CardTitle v-if="currentStep === 2" class="flex items-center gap-2">
                            <User class="w-5 h-5 text-primary" />
                            Personal Profile
                        </CardTitle>
                        <CardTitle v-if="currentStep === 3" class="flex items-center gap-2">
                            <Zap class="w-5 h-5 text-primary" />
                            Preferences & Needs
                        </CardTitle>
                    </CardHeader>
                    <CardContent class="p-8">
                        <div v-if="currentStep === 1" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <!-- Climate Selection -->
                            <div class="space-y-3">
                                <Label class="text-base">Current Climate</Label>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <button 
                                        v-for="opt in climateOptions" 
                                        :key="opt.value"
                                        @click="profile.climate = opt.value"
                                        type="button"
                                        class="p-4 rounded-xl border-2 transition-all hover:bg-primary/5 text-center"
                                        :class="profile.climate === opt.value ? 'border-primary bg-primary/10 shadow-lg scale-105' : 'border-muted'"
                                    >
                                        {{ opt.label }}
                                    </button>
                                </div>
                            </div>

                            <!-- Occasion Selection -->
                            <div class="space-y-3">
                                <Label class="text-base">Primary Occasion</Label>
                                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                                    <button 
                                        v-for="opt in occasionOptions" 
                                        :key="opt.value"
                                        @click="profile.occasion = opt.value"
                                        type="button"
                                        class="p-3 rounded-xl border-2 transition-all hover:bg-primary/5 text-sm"
                                        :class="profile.occasion === opt.value ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-muted'"
                                    >
                                        {{ opt.label }}
                                    </button>
                                </div>
                            </div>

                            <!-- Season Preference -->
                            <div class="space-y-3">
                                <Label class="text-base">Season Preference</Label>
                                <div class="flex flex-wrap gap-3">
                                    <button 
                                        v-for="opt in seasonOptions" 
                                        :key="opt.value"
                                        @click="profile.seasonPreference = opt.value"
                                        type="button"
                                        class="px-5 py-3 rounded-full border-2 transition-all hover:bg-primary/5"
                                        :class="profile.seasonPreference === opt.value ? 'border-primary bg-primary/10 text-primary font-semibold' : 'border-muted'"
                                    >
                                        {{ opt.label }}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div v-if="currentStep === 2" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <!-- Skin Type -->
                             <div class="space-y-3">
                                <Label class="text-base">Skin Type</Label>
                                <div class="grid grid-cols-3 gap-4">
                                    <button 
                                        v-for="opt in skinOptions" 
                                        :key="opt.value"
                                        @click="profile.skinType = opt.value"
                                        type="button"
                                        class="p-5 rounded-2xl border-2 transition-all hover:border-primary/50"
                                        :class="profile.skinType === opt.value ? 'border-primary bg-primary/10 shadow-inner' : 'border-muted'"
                                    >
                                        <div class="font-bold mb-1">{{ opt.label }}</div>
                                        <div class="text-xs text-muted-foreground">
                                            {{ opt.label === 'Dry' ? 'Fragrance fades faster' : opt.label === 'Oily' ? 'Fragrance lasts longer' : 'Standard performance' }}
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <!-- Persona -->
                            <div class="space-y-3">
                                <Label class="text-base">Style Persona</Label>
                                <div class="grid grid-cols-2 lg:grid-cols-5 gap-3">
                                    <button 
                                        v-for="opt in personaOptions" 
                                        :key="opt.value"
                                        @click="profile.persona = opt.value"
                                        type="button"
                                        class="px-3 py-4 rounded-xl border-2 transition-all text-xs lg:text-sm"
                                        :class="profile.persona === opt.value ? 'border-primary bg-primary/10 font-bold' : 'border-muted'"
                                    >
                                        {{ opt.label }}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div v-if="currentStep === 3" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <!-- Sensitivity -->
                             <div class="space-y-3">
                                <Label class="text-base">Sensitivity / Red Lines</Label>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <button 
                                        v-for="opt in sensitivityOptions" 
                                        :key="opt.value"
                                        @click="profile.sensitivity = opt.value"
                                        type="button"
                                        class="p-3 rounded-xl border-2 transition-all"
                                        :class="profile.sensitivity === opt.value ? 'border-destructive/50 bg-destructive/10 text-destructive font-bold' : 'border-muted'"
                                    >
                                        <ShieldAlert v-if="opt.value !== ESensitivity.None" class="w-4 h-4 mx-auto mb-1" />
                                        {{ opt.label }}
                                    </button>
                                </div>
                            </div>

                            <!-- Compliment Desire -->
                            <div class="space-y-3">
                                <Label class="text-base">Do you desire compliments?</Label>
                                <div class="flex gap-4">
                                    <button 
                                        v-for="opt in complimentOptions" 
                                        :key="opt.value"
                                        @click="profile.compliment = opt.value"
                                        type="button"
                                        class="flex-1 p-4 rounded-xl border-2 transition-all"
                                        :class="profile.compliment === opt.value ? 'border-primary bg-primary/10 font-bold' : 'border-muted'"
                                    >
                                        {{ opt.label }}
                                    </button>
                                </div>
                            </div>

                            <!-- Performance Hook -->
                            <div class="flex items-center justify-between p-6 bg-primary/5 rounded-2xl border border-primary/20 border-dashed">
                                <div class="space-y-1">
                                    <div class="text-lg font-bold">Long Performance?</div>
                                    <div class="text-sm text-muted-foreground">Select if you prioritize durability over subtle evolution.</div>
                                </div>
                                <button 
                                    @click="profile.wantsLongPerformance = !profile.wantsLongPerformance"
                                    class="w-16 h-8 rounded-full transition-all relative p-1"
                                    :class="profile.wantsLongPerformance ? 'bg-primary' : 'bg-muted'"
                                >
                                    <div 
                                        class="w-6 h-6 bg-white rounded-full shadow-md transition-all transform"
                                        :class="profile.wantsLongPerformance ? 'translate-x-8' : 'translate-x-0'"
                                    ></div>
                                </button>
                            </div>
                        </div>

                        <Alert v-if="error" variant="destructive" class="mt-6">
                            {{ error }}
                        </Alert>

                        <!-- Navigation Buttons -->
                        <div class="flex gap-4 mt-12 pt-8 border-t border-muted">
                            <Button 
                                v-if="currentStep > 1" 
                                variant="outline" 
                                @click="prevStep"
                                class="flex-1 py-6 rounded-xl"
                            >
                                <ChevronLeft class="mr-2" />
                                Back
                            </Button>
                            
                            <Button 
                                v-if="currentStep < totalSteps" 
                                @click="nextStep"
                                class="flex-1 py-6 rounded-xl text-lg font-bold shadow-xl shadow-primary/20"
                            >
                                Continue
                                <ChevronRight class="ml-2" />
                            </Button>

                            <Button 
                                v-if="currentStep === totalSteps" 
                                @click="submitProfile"
                                :disabled="isLoading"
                                class="flex-1 py-6 rounded-xl text-lg font-extrabold bg-gradient-to-r from-primary to-primary/80 shadow-2xl shadow-primary/30"
                            >
                                <span v-if="!isLoading">Reveal My Match</span>
                                <span v-else class="flex items-center gap-2">
                                    Consulting the Expert...
                                    <div class="animate-spin rounded-full h-4 w-4 border-2 border-white/50 border-t-white"></div>
                                </span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Results Section -->
            <div v-if="currentStep === 4 && result" class="animate-in zoom-in-95 duration-700">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Sidebar: Summary -->
                    <div class="lg:col-span-1 space-y-6">
                        <Card class="border-primary/30 bg-card">
                            <CardHeader class="pb-2">
                                <CardTitle class="text-lg">Your Profile Summary</CardTitle>
                            </CardHeader>
                            <CardContent class="space-y-4">
                                <div class="flex justify-between items-center py-2 border-b border-muted">
                                    <span class="text-muted-foreground text-sm">Target Sillage</span>
                                    <Badge variant="secondary">{{ result.sillage }}</Badge>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-muted">
                                    <span class="text-muted-foreground text-sm">Longevity</span>
                                    <Badge variant="secondary">{{ result.longevity }}</Badge>
                                </div>
                                <div class="space-y-2 pt-4">
                                    <span class="text-sm font-bold flex items-center gap-2">
                                        <CheckCircle2 class="w-4 h-4 text-primary" />
                                        Primary Accords
                                    </span>
                                    <div class="flex flex-wrap gap-2">
                                        <Badge v-for="tag in result.prefer" :key="tag" variant="outline" class="bg-primary/5 text-primary border-primary/20">
                                            {{ tag }}
                                        </Badge>
                                    </div>
                                </div>
                                <div v-if="result.avoid?.length" class="space-y-2 pt-4">
                                    <span class="text-sm font-bold flex items-center gap-2">
                                        <ShieldAlert class="w-4 h-4 text-destructive" />
                                        Avoid Notes
                                    </span>
                                    <div class="flex flex-wrap gap-2">
                                        <Badge v-for="tag in result.avoid" :key="tag" variant="destructive" class="opacity-80">
                                            {{ tag }}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Button variant="outline" class="w-full py-6 rounded-xl" @click="reset">
                            Start New Profiling
                        </Button>
                    </div>

                    <!-- Main: Detailed Recommendation -->
                    <div class="lg:col-span-2 space-y-8">
                        <Card class="border-primary/50 relative overflow-hidden group">
                            <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Sparkles class="w-24 h-24 text-primary" />
                            </div>
                            
                            <CardContent class="p-10 space-y-8 relative">
                                <div class="space-y-2">
                                    <h3 class="text-3xl font-serif font-bold text-foreground">The Alchemist's Verdict</h3>
                                    <div class="h-1 w-20 bg-primary rounded-full"></div>
                                </div>

                                <div class="prose prose-invert max-w-none">
                                    <p 
                                        class="text-xl text-muted-foreground leading-relaxed italic"
                                        v-html="formatResult(result.result || '')"
                                    ></p>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                                    <div class="space-y-4">
                                        <h4 class="font-bold text-primary flex items-center gap-2">
                                            <Waves class="w-5 h-5" />
                                            Why this works for you
                                        </h4>
                                        <ul class="space-y-3">
                                            <li v-for="(reason, idx) in result.reasons" :key="idx" class="flex items-start gap-3 text-sm text-foreground/80">
                                                <div class="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                                                {{ reason }}
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <div class="bg-primary/5 rounded-3xl p-8 border border-primary/10 flex flex-col justify-center items-center text-center space-y-4">
                                        <div class="p-4 bg-primary/20 rounded-full">
                                            <Clock class="w-8 h-8 text-primary" />
                                        </div>
                                        <div>
                                            <div class="text-2xl font-bold italic">{{ result.longevity }}</div>
                                            <div class="text-xs text-muted-foreground uppercase tracking-widest mt-1">Expected Performance</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<style scoped>
.font-serif {
    font-family: 'Playfair Display', Georgia, serif;
}

button {
    cursor: pointer;
}

@keyframes pulse-gentle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
}

.animate-pulse {
    animation: pulse-gentle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
