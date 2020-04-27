<template>
  <canvas
    id="canvas"
    class="canvas"
    width="1280"
    height="720"
  />
</template>

<script>
export default {
  name: 'ImagePreview',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    ctx: null
  }),
  watch: {
    text() {
      this.draw(this.text)
      const canvas = document.getElementById('canvas')
      this.$emit('changeCanvas', canvas)
    }
  },
  methods: {
    draw(text) {
      const lines = text.split('\n')
      const fontSize = 36
      const lineHeight = 1.2

      // this.ctx.beginPath()
      this.ctx.font = `bold ${fontSize}px sans-serif`
      this.ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 改行処理
      lines.map((line, index) => {
        let addY = fontSize
        addY += fontSize * lineHeight * index
        this.ctx.fillText(line, 10, 10 + addY)
      })
    }
  },
  mounted() {
    // mounted 以降で canvas の DOM にアクセスできる
    this.ctx = this.$el.getContext('2d')
    this.ctx.scale(2,2)
  }
}
</script>

<style scoped>
.canvas {
  width: 640px;
  height: 360px;
}
</style>