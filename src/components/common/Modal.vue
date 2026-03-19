<script setup lang="ts">
import Dialog from "@/components/ui/Dialog.vue";
import DialogHeader from "@/components/ui/DialogHeader.vue";
import DialogTitle from "@/components/ui/DialogTitle.vue";
import DialogContent from "@/components/ui/DialogContent.vue";

interface Props {
    title: string;
}

defineProps<Props>();

const emit = defineEmits<{
    close: [];
}>();

const handleOpenChange = (open: boolean) => {
    if (!open) {
        emit("close");
    }
};
</script>

<template>
    <Dialog :open="true" @update:open="handleOpenChange">
        <DialogHeader>
            <DialogTitle>{{ title }}</DialogTitle>
        </DialogHeader>
        <DialogContent>
            <slot />
        </DialogContent>
    </Dialog>
</template>
