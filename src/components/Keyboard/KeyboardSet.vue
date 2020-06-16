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
        v-for="note in blackNotes"
        :note="note + '#' + octave"
        :key="note"
        color="black"
      />
    </div>
  </div>
</template>

<script>
import KeyboardNote from './KeyboardNote'

export default {
  name: 'KeyboardSet',
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
  },
  computed: {
    blackNotes() {
      return this.notes.filter(note => note !== 'E' && note !== 'B')
    }
  }
}
</script>

<style scoped lang="scss">
.keyboard-octave--container {
  display: block;
  position: relative;
  height: 100%;
}
.white-notes {
  height: 100%;
  display: grid;
  grid-auto-flow: column;
  .keyboard-note {
    background-color: #fafafa;
  }
}
.black-notes {
  position: absolute;
  top: 0;
  left: 7%;
  width: 100%;
  height: 55%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  .keyboard-note:nth-child(3) {
    grid-column: 4 / 4;
  }
}
</style>
