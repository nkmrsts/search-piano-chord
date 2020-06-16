<template>
  <div class="keyboard-octave--container">
    <div class="white-notes">
      <KeyboardNote
        class="keyboard-note"
        v-for="note in notes"
        :note="note + octave"
        :key="note"
        color="white"
      />
    </div>
    <div class="black-notes">
      <KeyboardNote
        class="keyboard-note"
        v-for="note in notes"
        :note="note === 'E' || note === 'B' ? '' : note + '#' + octave"
        :key="note"
        color="black"
      />
    </div>
  </div>
</template>

<script>
import KeyboardNote from './KeyboardNote'

export default {
  name: 'KeyboardOctave',
  components: {
    KeyboardNote
  },
  props: {
    octave: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    }
  }
}
</script>

<style scoped lang="scss">
.keyboard-octave--container {
  display: block;
  position: relative;
  height: 100%;
  width: 100%;
}
.white-notes {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .keyboard-note {
    background-color: #fafafa;
    //background-color: #aaa;
  }
}
.black-notes {
  position: absolute;
  top: 0;
  left: 7%;
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 55%;

  .keyboard-note:nth-child(3),
  .keyboard-note:nth-child(7) {
    pointer-events: none;
    opacity: 0;
  }
}

.keyboard-note {
  order: 0;
  flex-grow: 1;
}
</style>
