<template>
  <div class="max-w-screen-lg mt-6 mx-auto p-8">
    <app-title class="mb-12" />

    <div class="grid grid-cols-3 grid-rows-2 gap-2">
      <canvas-wrapper
        class="col-span-3 lg:col-span-2 row-start-1"
        :form-data="formData"
        :update-canvas="updateCanvas"
      />

      <input-switch-side
        class="col-span-1 lg:col-start-1"
        :checked="formData.side === 'right'"
        :change-side="changeSide"
      />

      <input-wrapper
        class="col-span-2 lg:row-start-1"
        :form-data="formData"
        :error-message="errorMessage"
        :textarea-place-holder="textareaPlaceholder"
        :download-image="downloadImage"
      />
    </div>
  </div>
</template>

<script>
import AppTitle from '~/components/AppTitle'
import CanvasWrapper from '~/components/CanvasWrapper'
import InputWrapper from '~/components/InputWrapper'
import InputSwitchSide from '~/components/InputSwitchSide'

export default {
  components: {
    AppTitle,
    CanvasWrapper,
    InputWrapper,
    InputSwitchSide
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
    updateCanvas(canvasData) {
      this.canvasData = canvasData
    },
    downloadImage() {
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
