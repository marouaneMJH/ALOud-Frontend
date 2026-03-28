import { apiClient } from "./client";
import type { UserProfileDto, ExpertSystemResult, RecommendationDto } from "@/types/api";

export const aiApi = {
    /**
     * Evaluate a user profile using the expert system
     */
    evaluateProfile: async (profile: UserProfileDto): Promise<ExpertSystemResult> => {
        return await apiClient.post<ExpertSystemResult>("/ai/expert-system/test", profile);
    },

    /**
     * Evaluate a recommendation using the hybrid expert system (LLM explanation)
     */
    hybridEvaluate: async (recommendation: RecommendationDto): Promise<{ result: string }> => {
        return await apiClient.post<{ result: string }>("/ai/expert-system/evaluate", recommendation);
    }
};
