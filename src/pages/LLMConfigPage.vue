<template>
    <CrudLayout page-title="LLM Configuration">
        <div class="max-w-2xl mx-auto space-y-6">
            <div
                class="rounded-lg border border-gold-700 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 shadow-xl shadow-gold-500/20 p-8"
            >
                <h3 class="text-lg font-semibold text-gold-300 mb-6">
                    Language Model Configuration
                </h3>

                <form @submit.prevent="submitConfig" class="space-y-6">
                    <!-- LLM Provider Selection -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gold-300 mb-2"
                            >LLM Provider</label
                        >
                        <select
                            v-model="config.provider"
                            class="w-full px-4 py-2 border border-gold-700 bg-gold-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
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

                    <!-- Model Selection -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gold-300 mb-2"
                            >Model</label
                        >
                        <input
                            v-model="config.model"
                            type="text"
                            class="w-full px-4 py-2 border border-gold-700 bg-gold-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                            placeholder="e.g., gpt-4, claude-3-opus-20240229"
                            required
                        />
                    </div>

                    <!-- API Key -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gold-300 mb-2"
                            >API Key</label
                        >
                        <div class="relative">
                            <input
                                :type="showApiKey ? 'text' : 'password'"
                                v-model="config.apiKey"
                                class="w-full px-4 py-2 border border-gold-700 bg-gold-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 pr-10"
                                placeholder="sk-..."
                            />
                            <button
                                type="button"
                                @click="showApiKey = !showApiKey"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold-400 hover:text-gold-300"
                            >
                                {{ showApiKey ? "Hide" : "Show" }}
                            </button>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">
                            API key will be stored securely (hint: sk-...)
                        </p>
                    </div>

                    <!-- Temperature Slider -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gold-300 mb-2"
                        >
                            Temperature:
                            <span class="text-gold-400 font-semibold">{{
                                config.temperature
                            }}</span>
                        </label>
                        <input
                            v-model.number="config.temperature"
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            class="w-full"
                        />
                        <p class="text-xs text-gray-500 mt-1">
                            Lower = more deterministic, Higher = more creative
                            (0-2)
                        </p>
                    </div>

                    <!-- Max Tokens -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gold-300 mb-2"
                            >Max Tokens</label
                        >
                        <input
                            v-model.number="config.maxTokens"
                            type="number"
                            min="1"
                            max="4000"
                            class="w-full px-4 py-2 border border-gold-700 bg-gold-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                            placeholder="2000"
                        />
                        <p class="text-xs text-gray-500 mt-1">
                            Maximum tokens for generated responses
                        </p>
                    </div>

                    <!-- Top P (Nucleus Sampling) -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gold-300 mb-2"
                        >
                            Top P (Nucleus Sampling):
                            <span class="text-gold-400 font-semibold">{{
                                config.topP
                            }}</span>
                        </label>
                        <input
                            v-model.number="config.topP"
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            class="w-full"
                        />
                        <p class="text-xs text-gray-500 mt-1">
                            Controls diversity of output (0-1)
                        </p>
                    </div>

                    <!-- System Prompt -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gold-300 mb-2"
                            >System Prompt</label
                        >
                        <textarea
                            v-model="config.systemPrompt"
                            class="w-full px-4 py-2 border border-gold-700 bg-gold-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                            rows="4"
                            placeholder="Define the behavior and instructions for the LLM..."
                        ></textarea>
                    </div>

                    <!-- Status Message -->
                    <div
                        v-if="connectionStatus"
                        class="p-4 rounded-lg"
                        :class="
                            connectionStatus === 'connected'
                                ? 'bg-green-950 border border-green-700'
                                : 'bg-red-950 border border-red-800'
                        "
                    >
                        <p
                            :class="
                                connectionStatus === 'connected'
                                    ? 'text-green-400'
                                    : 'text-red-400'
                            "
                            class="font-medium"
                        >
                            {{
                                connectionStatus === "connected"
                                    ? "Connected"
                                    : "Connection Failed"
                            }}
                        </p>
                    </div>

                    <!-- Buttons -->
                    <div class="flex gap-4">
                        <button
                            type="button"
                            @click="testConnection"
                            :disabled="isLoading"
                            class="px-6 py-3 border border-gold-700 text-gold-400 font-medium rounded-lg hover:bg-gold-500 hover:bg-opacity-10 transition duration-300 disabled:opacity-50"
                        >
                            {{ isLoading ? "Testing..." : "Test Connection" }}
                        </button>
                        <button
                            type="submit"
                            :disabled="isLoading"
                            class="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-gray-900 font-medium rounded-lg hover:shadow-golden-glow transition duration-300 disabled:opacity-50"
                        >
                            {{ isLoading ? "Saving..." : "Save Configuration" }}
                        </button>
                        <button
                            type="button"
                            @click="resetConfig"
                            class="px-6 py-3 border border-gold-700 text-gold-400 font-medium rounded-lg hover:bg-gold-500 hover:bg-opacity-10 transition duration-300"
                        >
                            Reset
                        </button>
                    </div>

                    <!-- Success Message -->
                    <div
                        v-if="successMessage"
                        class="p-4 bg-green-950 border border-green-800 text-green-400 rounded-lg"
                    >
                        <p class="font-medium">{{ successMessage }}</p>
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
            </div>
        </div>
    </CrudLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import CrudLayout from "@/components/common/CrudLayout.vue";

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
        // Simulate connection test
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock success with 80% probability
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
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        successMessage.value = "Configuration saved successfully!";
        console.log("Configuration saved:", config);
    } catch (err: any) {
        error.value = err.message || "Failed to save configuration";
    } finally {
        isLoading.value = false;
    }
};
</script>
