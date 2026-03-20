<script setup lang="ts">
import { computed, ref } from "vue";
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
import { Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-vue-next";

interface Column {
    key: string;
    label: string;
}

interface Props {
    items: any[];
    columns: Column[];
    entityName: string;
    isLoading?: boolean;
    hasError?: boolean;
    error?: string;
}

const props = withDefaults(defineProps<Props>(), {
    isLoading: false,
    hasError: false,
    error: "",
});

defineEmits<{
    create: [];
    edit: [item: any];
    delete: [id: string];
}>();

const searchQuery = ref("");
const currentPage = ref(1);
const pageSize = 10;

const filteredItems = computed(() => {
    let filtered = props.items;

    if (searchQuery.value) {
        filtered = filtered.filter((item) =>
            JSON.stringify(item)
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase())
        );
    }

    return filtered.slice(
        (currentPage.value - 1) * pageSize,
        currentPage.value * pageSize
    );
});

const totalPages = computed(() =>
    Math.ceil(props.items.length / pageSize)
);
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
            <Button @click="$emit('create')">
                <Plus class="h-4 w-4 mr-2" />
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
                        <TableHead v-for="col in columns" :key="col.key">
                            {{ col.label }}
                        </TableHead>
                        <TableHead class="w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="item in filteredItems" :key="item.id">
                        <TableCell v-for="col in columns" :key="col.key">
                            {{ item[col.key] }}
                        </TableCell>
                        <TableCell>
                            <div class="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    class="h-8 w-8"
                                    @click="$emit('edit', item)"
                                >
                                    <Pencil class="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    class="h-8 w-8 text-destructive hover:text-destructive"
                                    @click="$emit('delete', item.id)"
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
                <div
                    class="rounded-full bg-muted p-3 mb-4"
                >
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

        <!-- Pagination -->
        <div
            v-if="items.length > pageSize"
            class="flex justify-between items-center"
        >
            <p class="text-sm text-muted-foreground">
                Page {{ currentPage }} of {{ totalPages }}
            </p>
            <div class="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    :disabled="currentPage === 1"
                    @click="currentPage--"
                >
                    <ChevronLeft class="h-4 w-4 mr-1" />
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    :disabled="currentPage >= totalPages"
                    @click="currentPage++"
                >
                    Next
                    <ChevronRight class="h-4 w-4 ml-1" />
                </Button>
            </div>
        </div>
    </div>
</template>
