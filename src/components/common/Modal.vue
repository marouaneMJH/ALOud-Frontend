<script setup lang="ts">
import { computed } from "vue";
import Dialog from "@/components/ui/Dialog.vue";
import DialogHeader from "@/components/ui/DialogHeader.vue";
import DialogTitle from "@/components/ui/DialogTitle.vue";
import DialogContent from "@/components/ui/DialogContent.vue";

interface Props {
    isOpen?: boolean;
    title: string;
}

const props = withDefaults(defineProps<Props>(), {
    isOpen: false,
});

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
    <Dialog :open="props.isOpen" @update:open="handleOpenChange">
        <DialogHeader>
            <DialogTitle>{{ title }}</DialogTitle>
        </DialogHeader>
        <DialogContent>
            <slot />
        </DialogContent>
    </Dialog>
</template>
