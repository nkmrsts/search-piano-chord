<template>
  <div class="keyboard--container">
    <KeyboardOctave
      v-for="octave in octaves"
      :key="octave"
      :octave="rootOctave + octave - 1"
      class="keyboard-octave"
    />
  </div>
</template>

<script>
import KeyboardOctave from './KeyboardOctave'

export default {
  name: 'Keyboard',
  components: {
    KeyboardOctave
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
