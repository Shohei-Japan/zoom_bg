<template>
  <div class="input_wrapper">
    <div class="px-4 flex justify-center flex-col">
      <label>
        <span>名前</span>
        <input
          v-model="formData.name"
          placeholder="名前を入力"
          class="inline-block w-full border border-gray-500 rounded mb-2 p-2"
        >
      </label>
      <div class="mb-4">
        <span>自己紹介</span>
        <textarea
          v-model="formData.text"
          class="block w-full h-48 border border-gray-500 rounded p-2"
          :placeholder="textareaPlaceholder"
        />
        <p
          v-if="errorMessage"
          class="text-red-600 bold"
        >
          {{ errorMessage }}
        </p>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded"
        @click="downloadImage"
      >
        画像ダウンロード
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputWrapper',
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    errorMessage: {
      type: String,
      default: ''
    },
    textareaPlaceholder: {
      type: String,
      default: ''
    },
    downloadImage: {
      type: Function,
      default: () => {}
    }
  }
}
</script>