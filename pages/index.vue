<template>
  <div class="p-8 max-w-screen-lg my-0 mx-auto">
    <div class="flex flex-col items-center mb-12">
      <h1 class="text-5xl">Zoom 自己紹介背景メーカー</h1>
      <span>
        created by 
        <a
          href="https://twitter.com/show60"
          target="_blank"
          class="text-indigo-600 hover:text-indigo-800"
        >
          show60
        </a>
      </span>
    </div>
    <div class="flex">
      <div
        class="w-2/3 h-auto mr-2"
      >
        <div class="image_preview_wrapper flex justify-center items-center relative">
          <label for="color">
            <image-preview
              class="image_preview border border-gray-200"
              :form-data="formData"
              @changeCanvas="changeCanvas"
            />
            <img
              class="person_img absolute bottom-0 my-0 mx-auto"
              src="~/assets/image/person.svg"
            >
          </label>
        </div>

        <input
          v-model="formData.color"
          class="color_input w-24 h-8"
          id="color"
          type="color"
        >

        <div class="flex items-center">
          <div class="toggle_wrapper pl-5">
            <input
              id="toggle"
              class="toggle_input"
              type='checkbox'
              :checked="this.formData.side === 'right' ? 'checked' : ''"
              @change="changeSide"
            />
            <label
              for="toggle"
              class="toggle_label"
            />
          </div>
        </div>
      </div>

      <div class="w-1/3 h-auto">
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
            @click="download"
          >
            画像ダウンロード
          </button>
        </div>
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
      color: 'rgb(49, 137, 248)'
    },
    canvasData: null,
    errorMessage: null,
  }),
  mounted() {
    const localStorageData = localStorage.getItem('zoom-bg-maker')
    if (localStorageData) {
      this.formData = JSON.parse(localStorageData)
    }
  },
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
  computed: {
    textareaPlaceholder() {
      return '・職業\n・趣味\n・好きな音楽\n・犬派？猫派？'
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
        this.errorMessage = '名前と自己紹介を入力してください'
        return
      }
      
      localStorage.setItem('zoom-bg-maker', JSON.stringify(this.formData))
      const link = document.createElement('a')
      link.href = this.canvasData.toDataURL('image/png')
      link.download = 'bg.png'
      link.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.color_input {
  width: 0;
  height: 0;
  opacity: 0;
}

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
