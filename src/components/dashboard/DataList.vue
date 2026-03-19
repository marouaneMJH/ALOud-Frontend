<template>
    <div
        class="rounded-lg border border-border bg-gradient-to-br from-card via-card to-card p-6 shadow-lg overflow-hidden"
    >
        <h2 class="text-lg font-semibold text-foreground mb-6">{{ title }}</h2>

        <div v-if="loading" class="flex items-center justify-center h-80">
            <div class="text-muted-foreground">Loading data...</div>
        </div>

        <div v-else class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-border">
                        <th
                            v-for="col in columns"
                            :key="col"
                            class="text-left py-3 px-4 font-semibold text-foreground text-xs uppercase tracking-wider"
                        >
                            {{ col }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(row, idx) in items"
                        :key="idx"
                        class="border-b border-border hover:bg-muted/50 transition-colors duration-200"
                    >
                        <td
                            v-for="(col, colIdx) in columns"
                            :key="colIdx"
                            class="py-4 px-4 text-foreground"
                            :class="{
                                'text-foreground font-medium': colIdx === 0,
                            }"
                        >
                            {{
                                formatCellValue(
                                    row[col.toLowerCase().replace(/\s+/g, "_")],
                                )
                            }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title: string;
    columns: string[];
    items: any[];
    loading?: boolean;
}

defineProps<Props>();

const formatCellValue = (value: any) => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "object") return JSON.stringify(value);
    return value;
};
</script>
