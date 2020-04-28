<template>
  <div class="canvas_wrapper">
    <div class="image_preview_wrapper flex justify-center items-center relative">
      <label for="color">
        <app-canvas
          class="image_preview border border-gray-200"
          :form-data="formData"
          :update-canvas="updateCanvas"
        />
        <img
          class="person_img absolute bottom-0 my-0 mx-auto"
          src="~/assets/image/person.svg"
        >
      </label>
      <input
        v-model="formData.color"
        class="color_input w-24 h-8"
        id="color"
        type="color"
      >
    </div>
  </div>
</template>

<script>
import AppCanvas from '~/components/AppCanvas'

export default {
  name: 'CanvasWrapper',
  components: {
    AppCanvas
  },
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    updateCanvas: {
      type: Function,
      default: () => {}
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

</style>