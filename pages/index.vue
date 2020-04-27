<template>
  <div class="flex mb-4">
    
    <div
      class="w-2/3 bg-gray-400 h-auto"
    >
      <div class="image_preview_wrapper flex justify-center relative ">
        <image-preview
          class="image_preview"
          :text="text"
          @changeCanvas="changeCanvas"
        />
        <img
          class="person_img absolute bottom-0 my-0 mx-auto"
          src="~/assets/image/person.svg"
        >
      </div>
    </div>
    <div class="w-1/3 bg-gray-500 h-auto">
      <textarea
        v-model="text"
      />
      <button @click="download">button</button>
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
    radius: 50,
    canvasData: null,
    text: ''
  }),
  methods: {
    changeCanvas(canvasData) {
      this.canvasData = canvasData
    },
    download() {
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
