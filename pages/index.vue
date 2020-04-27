<template>
  <div class="flex mt-12 px-12">
    <div
      class="w-2/3 h-auto mr-2"
    >
      <div class="image_preview_wrapper flex justify-center items-center relative mb-4">
        <image-preview
          class="image_preview border border-gray-200"
          :form-data="formData"
          @changeCanvas="changeCanvas"
        />
        <img
          class="person_img absolute bottom-0 my-0 mx-auto"
          src="~/assets/image/person.svg"
        >
      </div>

      <div class="toggle_wrapper pl-5">
        <input
          id="toggle"
          class="toggle_input"
          type='checkbox'
          @change="changeSide"
        />
        <label
          for="toggle"
          class="toggle_label"
        />
      </div>
    </div>

    <div class="w-1/3 h-auto">
      <div class="px-4 flex justify-center flex-col">
        <label>
          <span>Name</span>
          <input
            v-model="formData.name"
            class="inline-block w-full border border-gray-500 rounded mb-2 p-2"
          >
        </label>
        <div>
          <span>Text</span>
          <textarea
            v-model="formData.text"
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
    formData: {
      name: '',
      text: '',
      side: 'left',
      color: ''
    },
    canvasData: null,
    errorMessage: null,
  }),
  watch: {
    // delete error message if text is filled.
    formData: {
      handler: function() {
        if (this.formData.name && this.formData.text) {
          this.errorMessage = null
        }
      },
      deep: true
    }
  },
  methods: {
    changeSide() {
      if (this.formData.side === 'left') {
        this.formData.side = 'right'
      } else {
        this.formData.side = 'left'
      }
    },
    changeCanvas(canvasData) {
      this.canvasData = canvasData
    },
    download() {
      if (!this.formData.name || !this.formData.text) {
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

.toggle_input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;

  &:checked + .toggle_label{
    background-color: #3182ce;
    &:after{
      left: 29px;
    }
  }
}

.toggle_label {
  width: 56px;
  height: 28px;
  background: #38a169;
  position: relative;
  display: inline-block;
  border-radius: 46px;
  transition: 0.4s;
  box-sizing: border-box;
  
  &:after {
    content: '';
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    left: 0;
    top: 0;
    z-index: 2;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transition: 0.4s;
  }
}
</style>
