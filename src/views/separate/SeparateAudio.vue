<template>
    <div class="bg-gray-100 flex flex-col items-center p-6">
      <header class="text-center mb-8">
        <img src="https://via.placeholder.com/100x50" alt="Logo" class="header-logo mx-auto">
        <h1 class="text-4xl font-bold mt-4">음색 합성</h1>
        <p class="text-lg mt-2">Creative Audio Solutions</p>
      </header>
      <main class="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <p class="text-center text-xl font-bold mb-6">AnAI의 기술을 사용해 사용자의 음원에 음색을 더해줍니다.</p>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="model" class="block mb-2">음색 모델을 골라주세요.</label>
            <select id="model" v-model="selectedModel" class="input-box">
              <option value="PTH">PTH Model</option>
              <!-- Add more options as needed -->
            </select>
          </div>
          <div class="mb-4">
            <label for="algorithm" class="block mb-2">알고리즘을 골라주세요.</label>
            <select id="algorithm" v-model="selectedAlgorithm" class="input-box">
              <option value="Algorithm1">Algorithm 1</option>
              <!-- Add more options as needed -->
            </select>
          </div>
          <div class="mb-4">
            <label for="file" class="block mb-2">음원파일을 선택하세요.</label>
            <input type="file" id="file" @change="handleFileUpload" class="upload-box" aria-label="파일을 업로드해주세요.">
          </div>
          <div class="text-center">
            <button type="submit" class="btn">음색 합성 시작</button>
          </div>
        </form>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedModel: 'PTH',
        selectedAlgorithm: 'Algorithm1',
        selectedFile: null
      };
    },
    methods: {
      handleFileUpload(event) {
        this.selectedFile = event.target.files[0];
      },
      submitForm() {
        // Handle form submission logic here
        console.log('Selected Model:', this.selectedModel);
        console.log('Selected Algorithm:', this.selectedAlgorithm);
        console.log('Selected File:', this.selectedFile);
  
        // Add the necessary logic to process the form data
      }
    }
  };
  </script>
  
  <style scoped>
  body {
    font-family: 'Nanum Gothic', sans-serif;
  }
  .header-logo {
    width: 100px;
  }
  .input-box {
    border: 2px solid #000;
    padding: 10px;
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
  }
  .upload-box {
    border: 2px solid #000;
    padding: 10px;
    margin-bottom: 20px;
    text-align: center;
  }
  .btn {
    background-color: #000;
    color: #fff;
    padding: 10px 20px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
  }
  </style>
  