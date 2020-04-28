<template>
  <canvas
    id="canvas"
    class="canvas"
    :width="canvasSize.width"
    :height="canvasSize.height"
  />
</template>

<script>
const TextareaPositionX = {
  right: 390,
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
    ctx: null
  }),
  computed: {
    canvasSize:() => ({
      width: 1280,
      height: 720
    }),
    nameStyle:() => ({
      fontSize: 24,
      fontColor: 'rgb(40, 40, 40)',
      position: {
        x: 10,
        y: 55
      }
    }),
    textareaStyle:() => ({
      fontSize: 16,
      fontColor: 'rgb(40, 40, 40)',
      position: {
        x: 10,
        y: 80
      },
      lineHeight: 1.5,
      width: 230
    })
  },
  mounted() {
    // able to access canvas DOM in mounted
    this.ctx = this.$el.getContext('2d')
    this.ctx.scale(2,2)
    // set initial position and color
    this.changeBackground({
      color: "rgb(49, 137, 248)"
    })
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
      this.changeBackground({
        color: this.formData.color
      })

      this.drawName(name)
      this.drawTextarea(text)
    },
    drawName(name) {
      this.ctx.beginPath()
      const { fontSize, fontColor } = this.nameStyle
      const x = this.nameStyle.position.x + TextareaPositionX[this.formData.side]
      const y = this.nameStyle.position.y

      this.ctx.font = `${fontSize}px Noto Sans JP`
      this.ctx.fillStyle = fontColor
      this.ctx.fillText(name, x, y)
    },
    drawTextarea(text) {
      this.ctx.beginPath()
      const { fontSize, lineHeight, fontColor } = this.textareaStyle
      const x = this.textareaStyle.position.x + TextareaPositionX[this.formData.side]
      const y = this.textareaStyle.position.y

      this.ctx.font = `lighter ${fontSize}px Noto Sans JP`
      this.ctx.fillStyle = fontColor

      // divide each line
      const lines = text.split('\n')
      lines.map((line, index) => {
        let addY = fontSize
        addY += fontSize * lineHeight * index
        this.ctx.fillText(line, x, y + addY)
      })
    },
    changeBackground({ color, side }) {
      // background
      this.ctx.beginPath()
      this.ctx.fillStyle = color
      this.ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height)

      // text area
      this.ctx.beginPath()
      this.ctx.fillStyle = "rgb(255, 255, 255)"
      this.ctx.fillRect(TextareaPositionX[this.formData.side], 20, this.textareaStyle.width, 320)
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