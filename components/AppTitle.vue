<template>
  <div class="app_title">
    <div class="flex flex-col items-center">
      <h1 class="text-5xl">Zoom 自己紹介背景メーカー</h1>
      <div class="flex items-center">
        <span class="inline-block mr-2">
          created by show60
        </span>
        <a
          class="mr-1"
          href="https://twitter.com/show60"
          target="_blank"
        >
          <icon-twitter class="fill-current text-blue-500 hover:text-blue-400 cursor-pointer duration-200 inline-block h-6 w-6"/>
        </a>
        <a
          href="https://github.com/Shohei-Japan/self_introduction_bg"
          target="_blank"
        >
          <icon-github class="fill-current text-purple-500 hover:text-purple-400 cursor-pointer duration-200 inline-block h-6 w-6"/>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import IconGithub from '~/components/icons/IconGithub'
import IconTwitter from '~/components/icons/IconTwitter'

export default {
  components: {
    IconGithub,
    IconTwitter
  }
}
</script>