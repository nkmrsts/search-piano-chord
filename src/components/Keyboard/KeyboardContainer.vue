<template>
  <div class="keyboard--container">
    <KeyboardSet
      v-for="octave in octaves"
      :key="octave"
      :octave="rootOctave + octave - 1"
      class="keyboard-octave"
    />
  </div>
</template>

<script>
import KeyboardSet from './KeyboardSet'

export default {
  name: 'KeyboardContainer',
  components: {
    KeyboardSet
  },
  props: {
    rootOctave: {
      type: Number
    },
    octaves: {
      type: Number
    }
  }
}
</script>

<style scoped lang="scss">
.keyboard--container {
  display: flex;
  background-color: white;
  background-color: #e0e0e0;
  height: 280px;
  max-width: 1200px;
  margin: 0 auto;
}
.keyboard-octave {
  flex-grow: 1;
}
</style>
