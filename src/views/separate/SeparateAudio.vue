<template>
   <v-col align-self="center" justify="start" offset="1">
                    <h2>음원 분리</h2>

            <fromLink v-if="separate_type === 'link'" @set-audio-link="setAudioUrl" />
            <searchLink v-if="separate_type === 'search'" @set-youtube-search="setAudioUrl" />
            <v-row v-if="!is_progress && !is_streaming">
                <v-col>
                    <v-switch v-model="is_sample_mode" :label="`샘플모드: ${is_sample_mode ? '활성화' : '비활성화'}`" color="info" hide-details />
                </v-col>
            </v-row>
            <v-row>
                <v-col align-self="center">
                    <v-btn prepend-icon="mdi-pencil" block :loading="is_progress" @click="startSeparate" :disabled="!is_enable_separate">
                        <template v-slot:prepend>
                            <v-icon color="success"></v-icon>
                        </template>

                        음원분리

                        <template v-slot:loader>
                            <v-progress-circular indeterminate color="success" />
                        </template>
                    </v-btn>
                </v-col>
            </v-row>
            <!-- <v-row v-if="streaming_waiting < 101 && is_progress">-->
            <!--     <v-col align-self="center">-->
            <!--         진행중...-->
            <!--         <v-progress-linear v-model="streaming_waiting" height="10" color="red-lighten-2" striped></v-progress-linear>-->
            <!--     </v-col>-->
            <!-- </v-row>-->
            <!-- <v-row v-if="is_streaming && streaming_waiting > 100">-->
            <!--     <v-col>-->
            <!--         <v-switch v-model="is_lyrics_input_mode" :label="`가사입력: ${is_lyrics_input_mode ? '활성화' : '비활성화'}`" color="info" hide-details />-->
            <!--     </v-col>-->
            <!-- </v-row>-->
            <!-- <v-row v-show="is_streaming && streaming_waiting > 100 && is_lyrics_input_mode">-->
            <!--     <v-col>-->
            <!--         <v-textarea label="가사 입력" auto-grow v-model="user_input_lyrics"></v-textarea>-->
            <!--     </v-col>-->
            <!-- </v-row>-->
            <v-row v-show="is_streaming && streaming_waiting > 100">
                <v-col cols="6" align-self="center">
                    <audio ref="streamAudio" controls @play="checkPlayAudio" @pause="pauseAudio"></audio>
                </v-col>
            </v-row>
            <v-row v-if="download_file_url && !is_progress">
                <v-col>
                    <v-btn block @click="downloadBlob"> 다운로드</v-btn>
                </v-col>
            </v-row>
            <!--  <v-row>-->
            <!--      <v-col>-->
            <!--          <lyrics-item v-for="(item, index) in audio_lyrics_model.text_list" :key="`${index}_lyrics`" :lyrics_item="item"></lyrics-item>-->
            <!--      </v-col>-->
            <!--  </v-row>-->
            <v-row v-if="is_enable_audio_info">
                <v-col>
                    <v-alert :text="info_message" />
                </v-col>
            </v-row>
            <v-row v-if="is_enable_audio_alert">
                <v-col>
                    <v-alert :text="error_message" />
                </v-col>
            </v-row>
        </v-col>
    
</template>

<script lang="ts">
import { defineComponent} from 'vue';

export default defineComponent({
    components: {
       
       
    }
})
</script>
