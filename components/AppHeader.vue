<template>
  <div class="app_title">
    <div class="flex flex-col items-center">
      <h1 class="text-xl md:text-3xl lg:text-4xl">Zoom 自己紹介背景メーカー</h1>
    </div>
  </div>
</template>

<script>
import IconGithub from '~/components/icons/IconGithub'
import IconTwitter from '~/components/icons/IconTwitter'

export default {
  name: 'AppHeader',
  components: {
    IconGithub,
    IconTwitter
  }
}
</script>