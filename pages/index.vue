<template>
  <div class="max-w-screen-lg mt-6 mx-auto p-8">
    <app-title class="mb-12" />

    <div class="flex mb-2">
      <canvas-wrapper
        class="w-2/3 h-auto mr-2"
        :form-data="formData"
        :update-canvas="updateCanvas"
      />

      <input-wrapper
        class="w-1/3 h-auto"
        :form-data="formData"
        :error-message="errorMessage"
        :textarea-place-holder="textareaPlaceholder"
        :download-image="downloadImage"
      />
    </div>

    <input-switch-side
      class="flex items-center"
      :side="formData.side"
      :change-side="changeSide"
    />
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

<style lang="scss" scoped>
</style>
