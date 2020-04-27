<template>
  <div class="flex mt-12 px-12">
    <div
      class="w-2/3 h-auto mr-2"
    >
      <div class="image_preview_wrapper flex justify-center items-center relative">
        <image-preview
          class="image_preview border border-gray-200"
          :input-text="inputText"
          @changeCanvas="changeCanvas"
        />
        <img
          class="person_img absolute bottom-0 my-0 mx-auto"
          src="~/assets/image/person.svg"
        >
      </div>
    </div>

    <div class="w-1/3 h-auto">
      <div class="px-4 flex justify-center flex-col">
        <label>
          <span>Name</span>
          <input
            v-model="inputText.name"
            class="inline-block w-full border border-gray-500 rounded mb-2 p-2"
          >
        </label>
        <div>
          <span>Text</span>
          <textarea
            v-model="inputText.text"
            class="block w-full h-48 border border-gray-500 rounded mb-4 p-2"
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
          @click="download"
        >
          画像ダウンロード
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ImagePreview from '~/components/ImagePreview'

export default {
  components: {
    ImagePreview
  },
  data: () => ({
    inputText: {
      name: '',
      text: ''
    },
    canvasData: null,
    errorMessage: null,
  }),
  watch: {
    // delete error message if text is filled.
    'text'() {
      if (this.text) {
        this.errorMessage = null
      }
    }
  },
  methods: {
    changeCanvas(canvasData) {
      this.canvasData = canvasData
    },
    download() {
      if (!this.text) {
        this.errorMessage = 'テキストを入力してください'
        return
      }
      const link = document.createElement('a')
      link.href = this.canvasData.toDataURL('image/png')
      link.download = 'bg.png'
      link.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.person_img {
  height: 90%;

  left: 50%;
  transform: translateX(-50%);
}

</style>
