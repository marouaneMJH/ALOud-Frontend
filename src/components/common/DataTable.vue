<script setup lang="ts">
import { ref, watch } from "vue";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Card from "@/components/ui/Card.vue";
import Table from "@/components/ui/Table.vue";
import TableHeader from "@/components/ui/TableHeader.vue";
import TableBody from "@/components/ui/TableBody.vue";
import TableRow from "@/components/ui/TableRow.vue";
import TableHead from "@/components/ui/TableHead.vue";
import TableCell from "@/components/ui/TableCell.vue";
import Alert from "@/components/ui/Alert.vue";
import {
    Plus,
    Pencil,
    Trash2,
    Search,
    ChevronLeft,
    ChevronRight,
} from "lucide-vue-next";

interface Column {
    key: string;
    label: string;
}

import type { PaginationMeta } from "@/types/api";

interface Props {
    items: any[];
    columns: Column[];
    entityName: string;
    pagination?: PaginationMeta | null;
    isLoading?: boolean;
    hasError?: boolean;
    error?: string;
}

const props = withDefaults(defineProps<Props>(), {
    isLoading: false,
    hasError: false,
    error: "",
    pagination: null,
});

const emit = defineEmits<{
    create: [];
    edit: [item: any];
    delete: [item: any];
    pageChange: [page: number];
    search: [query: string];
}>();

const searchQuery = ref("");

// Debounce search — emit to parent who calls the API
let searchTimeout: ReturnType<typeof setTimeout>;
watch(searchQuery, (val) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        emit("search", val);
    }, 400);
});
</script>

<template>
    <div class="space-y-4">
        <!-- Toolbar -->
        <div class="flex justify-between items-center gap-4">
            <div class="relative flex-1 max-w-sm">
                <Search
                    class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                />
                <Input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search..."
                    class="pl-9"
                />
            </div>
            <Button 
                @click="$emit('create')" 
                variant="default"
                class="px-6 py-5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 active:scale-95"
            >
                <Plus class="h-5 w-5 mr-2" />
                New {{ entityName }}
            </Button>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center items-center py-20">
            <div class="flex flex-col items-center gap-4">
                <div
                    class="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"
                />
                <p class="text-sm text-muted-foreground">
                    Loading {{ entityName }}s...
                </p>
            </div>
        </div>

        <!-- Error State -->
        <Alert v-else-if="hasError" variant="destructive">
            <p class="font-medium">Error loading data</p>
            <p class="text-sm mt-1">{{ error }}</p>
        </Alert>

        <!-- Table -->
        <Card v-else class="overflow-hidden">
            <Table v-if="items.length > 0">
                <TableHeader>
                    <TableRow>
                        <TableHead 
                            v-for="col in columns" 
                            :key="col.key"
                        >
                            {{ col.label }}
                        </TableHead>
                        <TableHead class="w-25">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="item in items" :key="item.id">
                        <TableCell 
                            v-for="col in columns" 
                            :key="col.key"
                        >
                            {{ item[col.key] }}
                        </TableCell>
                        <TableCell>
                            <div class="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    class="h-9 w-9 border-muted-foreground/20 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300"
                                    @click="$emit('edit', item)"
                                    title="Edit"
                                >
                                    <Pencil class="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    class="h-9 w-9 border-muted-foreground/20 hover:border-destructive hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
                                    @click="$emit('delete', item)"
                                    title="Delete"
                                >
                                    <Trash2 class="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <!-- Empty State -->
            <div
                v-if="items.length === 0"
                class="flex flex-col items-center justify-center py-12 text-center"
            >
                <div class="rounded-full bg-muted p-3 mb-4">
                    <Search class="h-6 w-6 text-muted-foreground" />
                </div>
                <p class="text-sm font-medium text-foreground mb-1">
                    No {{ entityName }}s found
                </p>
                <p class="text-xs text-muted-foreground">
                    Click "New {{ entityName }}" to create your first entry
                </p>
            </div>
        </Card>

        <!-- Pagination — driven entirely by backend metadata -->
        <div
            v-if="pagination && pagination.totalPages > 1"
            class="flex justify-between items-center"
        >
            <p class="text-sm text-muted-foreground">
                Page {{ pagination.pageIndex }} of {{ pagination.totalPages }}
                <span class="ml-1 opacity-60"
                    >({{ pagination.totalCount }} total)</span
                >
            </p>
            <div class="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    :disabled="!pagination.hasPreviousPage"
                    @click="$emit('pageChange', pagination.pageIndex - 1)"
                >
                    <ChevronLeft class="h-4 w-4 mr-1" />
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    :disabled="!pagination.hasNextPage"
                    @click="$emit('pageChange', pagination.pageIndex + 1)"
                >
                    Next
                    <ChevronRight class="h-4 w-4 ml-1" />
                </Button>
            </div>
        </div>
    </div>
</template>
