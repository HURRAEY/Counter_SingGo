<template>
    <v-row>
        <v-col cols="12" xs="12" sm="12" md="8" lg="6" xl="6" xxl="6" offset-xxl="3" offset-xl="3" offset-lg="3" offset-md="2" offset-sm="0" offset-xs="0">
            <v-row>
                <v-col cols="2">
                    <img alt="Vue logo" class="logo" src="@/assets/anai_logo_square.png" width="100" />
                </v-col>
                <v-col align-self="center" justify="start" offset="1">
                    <h2>음색 합성</h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col> AnAI의 기술을 사용해 사용자의 음원에 음색을 더해줍니다.</v-col>
            </v-row>

            <v-row>
                <v-col>
                    <!-- 음색합성모델 추가 -->
                    음색모델을 골라주세요.
                    <v-select label="PTH Model" variant="solo" :items="timbre_model_list">
                        <template v-slot:item="{ props, item }">
                            <v-list-item v-bind="props" :subtitle="item.raw.size"></v-list-item>
                        </template>
                    </v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <!-- 음색합성모델 추가 -->
                    알고리즘을 골라주세요.
                    <v-select label="Algorithm" variant="solo" :items="timbre_algorithm_list" v-model="selected_timbre_algorithm"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <!-- 음원 모델 -->
                    음원 파일을 선택하새요.
                    <fileUpload @fileUpload="fileUploadResult" @select-upload-file="setSelectedFile" :api_url="`${timbre_api_url}/file`" :show_upload_button="false" />
                </v-col>
            </v-row>
            <v-row>
                <v-col align-self="center">
                    <v-btn prepend-icon="mdi-pencil" block :loading="is_progress" @click="startTimbreSynthesis">
                        <template v-slot:prepend>
                            <v-icon color="success"></v-icon>
                        </template>

                        {{ synthesis_button_text }}

                        <template v-slot:loader>
                            <v-progress-circular indeterminate color="success" />
                        </template>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-if="info_message">
                <v-col>
                    <v-alert :text="info_message" />
                </v-col>
            </v-row>
            <v-row v-if="download_file_url">
                <v-col>
                    <v-btn block @click="downloadBlob"> 다운로드</v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import fileUpload from '@/components/common/fileUpload.vue';
import axios from 'axios';
import { onMounted } from 'vue';
import type { TimbreModel } from '@/models/TimbreModel';
import { useFileUpload } from '@/composables/useFileUpload';

export default defineComponent({
    components: { fileUpload },
    setup() {
        const timbre_api_url = import.meta.env.VITE_API_URL + '/timbre';

        const timbre_synthesis_list = ref<string[]>([]); // 음색합성모델 목록

        const is_progress = ref(false);
        const error_message = ref('');
        const info_message = ref('');
        const selected_file_name = ref('');

        const is_enable_synthesis = ref(false);

        function fileUploadResult(upload_result: { result: boolean; file_name: string }) {
            is_enable_synthesis.value = upload_result.result;
            selected_file_name.value = upload_result.file_name;
        }

        /** 타입 선택 시 초기화 내용 추가 */
        watch(timbre_synthesis_list, () => {
            clearSetting();
        });

        function clearSetting() {
            is_progress.value = false;
            error_message.value = '';
            info_message.value = '';
        }

        onMounted(async () => {
            await getTimbreModelList();
        });

        const timbre_model_list = ref<TimbreModel[]>([]);

        /** 음색합성 모델 목록 가져오기 */
        async function getTimbreModelList() {
            const result = await axios.get<TimbreModel[]>(`${timbre_api_url}/timbre`, {});
            if (!result.data) return;
            timbre_model_list.value = result.data;
        }

        const synthesis_button_text = computed(() => {
            return '음색합성 시작';
        });

        const selected_file = ref<File | null>();

        function setSelectedFile(file: File) {
            selected_file.value = file;
        }

        /** 음색 합성 및 파일 다운로드 */
        async function startTimbreSynthesis() {
            if (!selected_file.value) {
                alert('음색을 입힐 음원 파일을 선택해주세요.');
                return;
            }

            is_progress.value = !is_progress.value;
            const begin = new Date().getTime(); // 측정 시작
            const uploadResult = await useFileUpload(`${timbre_api_url}/file`, selected_file.value);
            fileUploadResult(uploadResult);
            if (!uploadResult.result) return;

            const result = await axios.get(`${timbre_api_url}/synthesis?file=${selected_file_name.value}&algorithm=${selected_timbre_algorithm.value}`, {
                responseType: 'blob',
            });
            if (!result.data) return;
            download_file_url.value = URL.createObjectURL(new Blob([result.data]));
            is_progress.value = !is_progress.value;
            const end = new Date().getTime(); // 측정 종료

            const time = (end - begin) / 1000;
            info_message.value = `${time}초가 소요되었습니다.`;
            console.log(`${time} ms`);
        }

        /** 다운로드 할 Blob 파일 URL */
        const download_file_url = ref('');

        /** Blob 파일 다운로드 */
        function downloadBlob() {
            if (!download_file_url.value) {
                alert('다운로드 할 파일이 존재하지 않습니다.');
                return;
            }

            const a = document.createElement('a');
            a.href = download_file_url.value;
            a.download = 'timbre_synthesis.wav';
            document.body.appendChild(a); // append the element to the dom
            a.click();
            a.remove(); // afterward, remove the element
        }

        /** 음색합성 알고리즘 관련 */
        // const timbre_algorithm_list = ref<string[]>(['pm', 'harvest', 'dio', 'crepe', 'crepe-tiny', 'mangio-crepe', 'mangio-crepe-tiny', 'rmvpe']);
        const timbre_algorithm_list = ref<string[]>(['pm', 'harvest', 'crepe']);
        const selected_timbre_algorithm = ref<string>('harvest');

        return {
            timbre_api_url,
            error_message,
            info_message,
            is_progress,
            is_enable_synthesis,
            fileUploadResult,
            timbre_model_list,
            synthesis_button_text,
            /** 음색 합성 후 파일 다운로드 */
            startTimbreSynthesis,
            /** Blob 파일 다운로드 */
            downloadBlob,
            setSelectedFile,
            download_file_url,
            /** 알고리즘 관련 */
            timbre_algorithm_list,
            selected_timbre_algorithm,
        };
    },
});
</script>
