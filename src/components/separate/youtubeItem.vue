<template>
    <tr>
        <td>
            <v-img :width="100" aspect-ratio="16/9" cover :src="item.thumbnail_url" />
        </td>
        <td>{{ title_text }}</td>
        <td>
            <v-btn @click="movePage(item.watch_url)">보러가기</v-btn>
        </td>
        <td>
            <v-btn @click="selectList(item.watch_url)"> 선택</v-btn>
        </td>
    </tr>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType, ref } from 'vue';
import { YoutubeResponse } from '@/models/YoutubeResponse';

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<YoutubeResponse>,
            default: () => {},
        },
    },
    setup(props, { emit }) {
        const selected_url = ref<string>();

        function movePage(url: string) {
            if (!url) return;
            window.open(url);
        }

        function selectList(url: string) {
            selected_url.value = url;
            emit('setYoutubeLink', url);
        }

        const title_text = computed(() => {
            return props.item.title.length > 10 ? `${props.item.title.slice(0, 7)}...` : props.item.title;
        });

        return {
            movePage,
            selectList,
            title_text,
        };
    },
    emits: ['setYoutubeLink'],
});
</script>
