<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Table from "@/components/ui/Table.vue";
import TableHeader from "@/components/ui/TableHeader.vue";
import TableBody from "@/components/ui/TableBody.vue";
import TableRow from "@/components/ui/TableRow.vue";
import TableHead from "@/components/ui/TableHead.vue";
import TableCell from "@/components/ui/TableCell.vue";

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
                .includes(searchQuery.value.toLowerCase()),
        );
    }

    return filtered.slice(
        (currentPage.value - 1) * pageSize,
        currentPage.value * pageSize,
    );
});
</script>

<template>
    <div class="space-y-6">
        <!-- Toolbar -->
        <div class="flex justify-between items-center gap-4">
            <div class="flex-1 flex gap-2">
                <Input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search..."
                    class="flex-1 max-w-md"
                />
            </div>
            <Button @click="$emit('create')" class="gap-2">
                <span>+</span>
                <span>New {{ entityName }}</span>
            </Button>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center items-center py-20">
            <div class="flex flex-col items-center gap-4">
                <div
                    class="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"
                ></div>
                <p class="text-muted-foreground">Loading {{ entityName }}s...</p>
            </div>
        </div>

        <!-- Error State -->
        <div
            v-else-if="hasError"
            class="bg-red-100 border border-red-300 rounded-lg p-4 text-red-800"
        >
            <p class="font-semibold mb-1">Error</p>
            <p class="text-sm">{{ error }}</p>
        </div>

        <!-- Table -->
        <div
            v-else
            class="rounded-lg border border-border bg-white shadow-sm overflow-hidden"
        >
            <Table v-if="items.length > 0">
                <TableHeader>
                    <TableRow>
                        <TableHead v-for="col in columns" :key="col.key">
                            {{ col.label }}
                        </TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow
                        v-for="item in filteredItems"
                        :key="item.id"
                        class="transition-colors hover:bg-muted"
                    >
                        <TableCell v-for="col in columns" :key="col.key">
                            {{ item[col.key] }}
                        </TableCell>
                        <TableCell>
                            <div class="flex gap-3">
                                <Button
                                    @click="$emit('edit', item)"
                                    variant="ghost"
                                    size="sm"
                                    class="text-primary hover:text-primary/80"
                                >
                                    Edit
                                </Button>
                                <Button
                                    @click="$emit('delete', item.id)"
                                    variant="ghost"
                                    size="sm"
                                    class="text-red-600 hover:text-red-800"
                                >
                                    Delete
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <!-- Empty State -->
            <div
                v-if="items.length === 0"
                class="text-center py-16 text-muted-foreground"
            >
                <p class="mb-2">No {{ entityName }}s found</p>
                <p class="text-xs text-muted-foreground">
                    Click "New {{ entityName }}" to create your first entry
                </p>
            </div>
        </div>

        <!-- Pagination -->
        <div
            v-if="items.length > 0"
            class="flex justify-between items-center mt-6"
        >
            <p class="text-sm text-muted-foreground">
                Showing {{ (currentPage - 1) * pageSize + 1 }} to
                {{ Math.min(currentPage * pageSize, items.length) }} of
                {{ items.length }}
            </p>
            <div class="flex gap-2">
                <Button
                    :disabled="currentPage === 1"
                    @click="currentPage--"
                    variant="outline"
                    size="sm"
                >
                    Previous
                </Button>
                <Button
                    :disabled="currentPage * pageSize >= items.length"
                    @click="currentPage++"
                    variant="outline"
                    size="sm"
                >
                    Next
                </Button>
            </div>
        </div>
    </div>
</template>
