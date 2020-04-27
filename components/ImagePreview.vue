<template>
  <canvas
    id="canvas"
    class="canvas"
    width="1280"
    height="720"
  />
</template>

<script>
const textareaPositionX = {
  right: 400,
  left: 20
}

export default {
  name: 'ImagePreview',
  props: {
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    ctx: null,
    nameStyle: {
      fontSize: 24,
      position: {
        x: 10,
        y: 55
      }
    },
    textareaStyle: {
      fontSize: 18,
      position: {
        x: 10,
        y: 80
      },
      lineHeight: 1.5
    },
    initBackgroundColor: "rgb(49, 137, 248)"
  }),
  mounted() {
    // able to access canvas DOM in mounted
    this.ctx = this.$el.getContext('2d')
    this.ctx.scale(2,2)
    // set initial color
    this.changeBackgroundColor("rgb(49, 137, 248)")
  },
  watch: {
    formData: {
      handler: function() {
        this.draw(this.formData)
        const canvas = document.getElementById('canvas')
        this.$emit('changeCanvas', canvas)
      },
      deep: true
    }
  },
  methods: {
    draw(formData) {
      const { name, text } = formData
      this.ctx.clearRect(0, 0, canvas.width, canvas.height)
      // call methods adjusting styles
      this.changeBackgroundColor(this.formData.color || this.initBackgroundColor)

      this.drawName(name)
      this.drawTextarea(text)
    },
    drawName(name) {
      this.ctx.beginPath()
      const fontSize = this.nameStyle.fontSize
      this.ctx.font = `bold ${fontSize}px sans-serif`
      this.ctx.fillStyle = "rgb(40, 40, 40)"

      const x = this.nameStyle.position.x + textareaPositionX[this.formData.side]
      const y = this.nameStyle.position.y

      this.ctx.fillText(name, x, y)
    },
    drawTextarea(text) {
      this.ctx.beginPath()
      const lines = text.split('\n')
      const { fontSize, lineHeight } = this.textareaStyle
      const x = this.textareaStyle.position.x + textareaPositionX[this.formData.side]
      const y = this.textareaStyle.position.y

      this.ctx.font = `${fontSize}px sans-serif`
      this.ctx.fillStyle = "rgb(40, 40, 40)"

      // divide each line
      lines.map((line, index) => {
        let addY = fontSize
        addY += fontSize * lineHeight * index
        this.ctx.fillText(line, x, y + addY)
      })
    },
    changeBackgroundColor(color) {
      // background
      this.ctx.beginPath()
      this.ctx.fillStyle = color
      this.ctx.fillRect(0, 0, 1280, 720)

      // text area
      this.ctx.beginPath()
      this.ctx.fillStyle = "rgb(255, 255, 255)"
      this.ctx.fillRect(textareaPositionX[this.formData.side], 20, 220, 320)
    }
  }
}
</script>

<style scoped>
.canvas {
  width: 640px;
  height: 360px;
}
</style>