<template>
    <v-row>
        <v-col align-self="center">
            <v-text-field
                v-model="audio_file_url"
                label="Youtube 링크를 입력해주세요."
                :hint="hint_text"
                prepend-inner-icon="mdi-map-marker"
                hide-details="auto"
                persistent-hint
                clearable
                @click:clear="clearText" />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent({
    setup(_, { emit }) {
        const audio_file_url = ref<string>();

        const hint_text = computed(() => {
            return 'example: https://youtu.be/it0haqiAC-o?si=Wh1n34ZVzB0MmxC3';
        });

        function clearText() {
            audio_file_url.value = '';
        }

        watch(audio_file_url, (new_url) => {
            const reg = /^http(s?):\/\/((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\\-]+\?v=|embed\/|v\/)?)([\w\\-]+)(\S+)?$/;
            if (new_url && reg.test(new_url)) emit('setAudioLink', new_url);
            else emit('setAudioLink', '');
        });

        return {
            audio_file_url,
            hint_text,
            clearText,
        };
    },
    emits: ['setAudioLink'],
});
</script>
