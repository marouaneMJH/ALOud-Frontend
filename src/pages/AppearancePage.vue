<script setup lang="ts">
import Layout from "@/components/layout/Layout.vue";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import CardTitle from "@/components/ui/CardTitle.vue";
import CardDescription from "@/components/ui/CardDescription.vue";
import CardContent from "@/components/ui/CardContent.vue";
import Label from "@/components/ui/Label.vue";
import { useThemeStore, themes } from "@/stores/theme";
import { Check, Moon, Sun, Palette } from "lucide-vue-next";

const themeStore = useThemeStore();

const selectTheme = (themeId: string) => {
    themeStore.setTheme(themeId);
};
</script>

<template>
    <Layout page-title="Appearance">
        <div class="max-w-5xl mx-auto space-y-8">
            <div class="space-y-1">
                <h2 class="text-2xl font-bold tracking-tight">Theme Preferences</h2>
                <p class="text-muted-foreground">
                    Customize how ALOud Admin looks on your device. Selections are applied immediately and saved to your profile.
                </p>
            </div>

            <div class="grid gap-8">
                <!-- Theme Selection -->
                <section class="space-y-4">
                    <div class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        <Palette class="w-4 h-4" />
                        Theme Mode
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <button
                            v-for="theme in themes"
                            :key="theme.id"
                            @click="selectTheme(theme.id)"
                            class="group relative flex flex-col items-start gap-2 p-1 rounded-xl transition-all hover:ring-2 hover:ring-primary/20"
                            :class="themeStore.currentThemeId === theme.id ? 'ring-2 ring-primary' : 'ring-1 ring-border'"
                        >
                            <div 
                                class="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-border"
                                :style="{ backgroundColor: `hsl(${theme.colors.background})` }"
                            >
                                <!-- Mock UI Preview -->
                                <div class="absolute inset-x-2 top-2 h-3 rounded-sm opacity-20" :style="{ backgroundColor: `hsl(${theme.colors.foreground})` }"></div>
                                <div class="absolute left-2 top-7 w-8 h-20 rounded-sm opacity-10" :style="{ backgroundColor: `hsl(${theme.colors.foreground})` }"></div>
                                <div class="absolute left-12 top-7 right-2 bottom-2 rounded-sm border border-dashed border-border/50 bg-card/40 backdrop-blur-sm">
                                    <div class="p-2 space-y-2">
                                        <div class="h-2 w-1/2 rounded-full" :style="{ backgroundColor: `hsl(${theme.colors.primary})` }"></div>
                                        <div class="flex gap-1">
                                            <div class="h-4 w-4 rounded-sm" :style="{ backgroundColor: `hsl(${theme.colors.accent})` }"></div>
                                            <div class="h-4 w-4 rounded-sm" :style="{ backgroundColor: `hsl(${theme.colors.secondary})` }"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Active Indicator -->
                                <div 
                                    v-if="themeStore.currentThemeId === theme.id"
                                    class="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg animate-in zoom-in duration-300"
                                >
                                    <Check class="w-4 h-4" />
                                </div>
                            </div>

                            <div class="px-2 py-1 text-left">
                                <span class="text-sm font-bold flex items-center gap-2">
                                    {{ theme.name }}
                                    <Moon v-if="theme.isDark" class="w-3 h-3 text-muted-foreground" />
                                    <Sun v-else class="w-3 h-3 text-muted-foreground" />
                                </span>
                                <p class="text-[10px] text-muted-foreground leading-tight mt-0.5">
                                    {{ theme.description }}
                                </p>
                            </div>
                        </button>
                    </div>
                </section>


            </div>
        </div>
    </Layout>
</template>
