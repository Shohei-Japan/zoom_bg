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
    inputText: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    ctx: null
  }),
  watch: {
    inputText: {
      handler: function(val) {
        this.draw(this.inputText)
        const canvas = document.getElementById('canvas')
        this.$emit('changeCanvas', canvas)
      },
      deep: true
    }
  },
  methods: {
    draw(inputText) {
      const { name, text } = inputText
      this.ctx.clearRect(0, 0, canvas.width, canvas.height)
      this.drawName(name)
      this.drawText(text)
    },
    drawName(name) {
      this.ctx.beginPath()
      const fontSize = 36
      this.ctx.font = `bold ${fontSize}px sans-serif`
      this.ctx.fillText(name, 10, 40)
    },
    drawText(text) {
      this.ctx.beginPath()
      const lines = text.split('\n')
      const fontSize = 24
      const lineHeight = 1.2
      const positionX = 10
      const positionY = 70

      this.ctx.font = `bold ${fontSize}px sans-serif`

      // divide each line
      lines.map((line, index) => {
        let addY = fontSize
        addY += fontSize * lineHeight * index
        this.ctx.fillText(line, positionX, positionY + addY)
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