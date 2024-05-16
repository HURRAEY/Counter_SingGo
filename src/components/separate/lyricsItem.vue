<template>
    <span :class="lyrics_item?.show_underline ? 'lyrics_underline' : ''" v-html="lyrics_item.lyrics_text"> </span>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { LyricsTextModel } from '@/models/LyricsModel';

export default defineComponent({
    name: 'lyricsItem',
    props: {
        lyrics_item: {
            type: Object as PropType<LyricsTextModel>,
            default: () => {},
        },
    },
});
</script>

<style scoped>
.lyrics_underline {
    text-decoration: underline;
}
</style>
