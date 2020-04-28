<template>
  <div class="input_switch_side">
    <div class="toggle_wrapper pl-12 lg:pl-5">
      <input
        id="toggle"
        class="toggle_input"
        type='checkbox'
        :checked="checked ? 'checked' : ''"
        @change="changeSide"
      />
      <label
        for="toggle"
        class="toggle_label"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputSwitchSide',
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    changeSide: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.toggle_input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;

  &:checked + .toggle_label{
    background-color: #3182ce;
    &:after{
      left: 29px;
    }
  }
}

.toggle_label {
  width: 56px;
  height: 28px;
  background: #38a169;
  position: relative;
  display: inline-block;
  border-radius: 46px;
  transition: 0.4s;
  box-sizing: border-box;
  
  &:after {
    content: '';
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    left: 0;
    top: 0;
    z-index: 2;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transition: 0.4s;
  }
}
</style>
