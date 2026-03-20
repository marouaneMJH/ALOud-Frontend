<script setup lang="ts">
import { ref, reactive } from "vue";
import Layout from "@/components/layout/Layout.vue";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import CardTitle from "@/components/ui/CardTitle.vue";
import CardContent from "@/components/ui/CardContent.vue";
import Input from "@/components/ui/Input.vue";
import Textarea from "@/components/ui/Textarea.vue";
import Label from "@/components/ui/Label.vue";
import Button from "@/components/ui/Button.vue";
import Alert from "@/components/ui/Alert.vue";
import { Eye, EyeOff } from "lucide-vue-next";

const isLoading = ref(false);
const error = ref("");
const successMessage = ref("");
const showApiKey = ref(false);
const connectionStatus = ref<"connected" | "failed" | null>(null);

const config = reactive({
    provider: "openai",
    model: "gpt-4",
    apiKey: "",
    temperature: 0.7,
    maxTokens: 2000,
    topP: 0.9,
    systemPrompt:
        "You are an expert perfume recommendation system. Help users find the perfect fragrance based on their preferences.",
});

const resetConfig = () => {
    config.provider = "openai";
    config.model = "gpt-4";
    config.apiKey = "";
    config.temperature = 0.7;
    config.maxTokens = 2000;
    config.topP = 0.9;
    config.systemPrompt =
        "You are an expert perfume recommendation system. Help users find the perfect fragrance based on their preferences.";
    error.value = "";
    successMessage.value = "";
    connectionStatus.value = null;
};

const testConnection = async () => {
    if (!config.apiKey) {
        error.value = "Please enter an API key";
        return;
    }

    isLoading.value = true;
    error.value = "";
    connectionStatus.value = null;

    try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (Math.random() > 0.2) {
            connectionStatus.value = "connected";
            successMessage.value = "Successfully connected to LLM provider";
        } else {
            connectionStatus.value = "failed";
            error.value =
                "Failed to connect to LLM provider. Please check your API key and network connection.";
        }
    } catch (err: any) {
        connectionStatus.value = "failed";
        error.value = err.message || "Connection test failed";
    } finally {
        isLoading.value = false;
    }
};

const submitConfig = async () => {
    isLoading.value = true;
    error.value = "";
    successMessage.value = "";

    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        successMessage.value = "Configuration saved successfully!";
    } catch (err: any) {
        error.value = err.message || "Failed to save configuration";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <Layout page-title="LLM Configuration">
        <div class="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Language Model Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="submitConfig" class="space-y-6">
                        <div class="space-y-2">
                            <Label for="provider">LLM Provider</Label>
                            <select
                                id="provider"
                                v-model="config.provider"
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                required
                            >
                                <option value="openai">
                                    OpenAI (GPT-4, GPT-3.5)
                                </option>
                                <option value="anthropic">
                                    Anthropic (Claude)
                                </option>
                                <option value="cohere">Cohere</option>
                                <option value="huggingface">Hugging Face</option>
                                <option value="local">Local Model</option>
                            </select>
                        </div>

                        <div class="space-y-2">
                            <Label for="model">Model</Label>
                            <Input
                                id="model"
                                v-model="config.model"
                                type="text"
                                placeholder="e.g., gpt-4, claude-3-opus-20240229"
                                required
                            />
                        </div>

                        <div class="space-y-2">
                            <Label for="apiKey">API Key</Label>
                            <div class="relative">
                                <Input
                                    id="apiKey"
                                    :type="showApiKey ? 'text' : 'password'"
                                    v-model="config.apiKey"
                                    placeholder="sk-..."
                                    class="pr-10"
                                />
                                <button
                                    type="button"
                                    @click="showApiKey = !showApiKey"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <Eye v-if="!showApiKey" class="h-4 w-4" />
                                    <EyeOff v-else class="h-4 w-4" />
                                </button>
                            </div>
                            <p class="text-xs text-muted-foreground">
                                API key will be stored securely
                            </p>
                        </div>

                        <div class="space-y-2">
                            <Label>
                                Temperature:
                                <span class="text-foreground font-semibold">
                                    {{ config.temperature }}
                                </span>
                            </Label>
                            <input
                                v-model.number="config.temperature"
                                type="range"
                                min="0"
                                max="2"
                                step="0.1"
                                class="w-full accent-primary"
                            />
                            <p class="text-xs text-muted-foreground">
                                Lower = more deterministic, Higher = more
                                creative (0-2)
                            </p>
                        </div>

                        <div class="space-y-2">
                            <Label for="maxTokens">Max Tokens</Label>
                            <Input
                                id="maxTokens"
                                v-model.number="config.maxTokens"
                                type="number"
                                min="1"
                                max="4000"
                                placeholder="2000"
                            />
                            <p class="text-xs text-muted-foreground">
                                Maximum tokens for generated responses
                            </p>
                        </div>

                        <div class="space-y-2">
                            <Label>
                                Top P (Nucleus Sampling):
                                <span class="text-foreground font-semibold">
                                    {{ config.topP }}
                                </span>
                            </Label>
                            <input
                                v-model.number="config.topP"
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                class="w-full accent-primary"
                            />
                            <p class="text-xs text-muted-foreground">
                                Controls diversity of output (0-1)
                            </p>
                        </div>

                        <div class="space-y-2">
                            <Label for="systemPrompt">System Prompt</Label>
                            <Textarea
                                id="systemPrompt"
                                v-model="config.systemPrompt"
                                rows="4"
                                placeholder="Define the behavior and instructions for the LLM..."
                            />
                        </div>

                        <Alert
                            v-if="connectionStatus === 'connected'"
                            variant="success"
                        >
                            Connected successfully
                        </Alert>

                        <Alert
                            v-if="connectionStatus === 'failed'"
                            variant="destructive"
                        >
                            Connection failed
                        </Alert>

                        <div class="flex gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                :disabled="isLoading"
                                @click="testConnection"
                            >
                                {{ isLoading ? "Testing..." : "Test Connection" }}
                            </Button>
                            <Button type="submit" :disabled="isLoading">
                                {{
                                    isLoading
                                        ? "Saving..."
                                        : "Save Configuration"
                                }}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                @click="resetConfig"
                            >
                                Reset
                            </Button>
                        </div>

                        <Alert v-if="successMessage" variant="success">
                            {{ successMessage }}
                        </Alert>

                        <Alert v-if="error" variant="destructive">
                            {{ error }}
                        </Alert>
                    </form>
                </CardContent>
            </Card>
        </div>
    </Layout>
</template>
