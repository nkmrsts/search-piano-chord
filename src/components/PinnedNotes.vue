<template>
  <div class="keyboardNotes">
    <template v-for="index in octave">
      <p
        type="button"
        class="keyboardNotes_note"
        v-for="(note) in notes"
        :class="{ included: isIncluded(note + (index + 1)) }"
        :key="note + (index + 1)"
        :value="note"
        :data-note="note + (index + 1)"
      >
        <span>{{ note }}</span>
      </p>
    </template>
  </div>
</template>

<script>
import { NOTES } from '../const/index.js'
export default {
  name: 'PinnedNotes',
  data() {
    return {
      notes: NOTES
    }
  },
  props: {
    octave: {
      type: Number,
      default: 2
    },
    cons: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    consOctave() {
      let octave = 2
      let prevNoteIndex = 0
      return this.cons.map(v => {
        const noteIndex = this.notes.findIndex(noteValue => {
          return v === noteValue
        })
        if (noteIndex < prevNoteIndex) {
          octave += 1
        }
        prevNoteIndex = noteIndex
        return v + octave
      })
    }
  },
  methods: {
    isIncluded(note) {
      const index = this.consOctave.findIndex(element => {
        return element === note
      })
      return index > -1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.keyboardNotes {
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  background: #222;
  height: 150px;
  &_note {
    background-color: white;
    width: calc(100% / 14); //白鍵の数 14
    padding: 0;
    border-radius: 4px;
    border-top: none;
    border-bottom: none;
    box-shadow: #575757 0 3px 3px -1px;
    position: relative;
    font-size: 12px;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    margin: 5px 0;
    & > span {
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
    &.included > span {
      border: 2px solid red;
      border-radius: 2rem;
    }
    &[value*='#'] {
      background-color: #2e2e2e;
      z-index: 2;
      box-shadow: grey 0 3px 3px 0, #fafafa 0 0 3px 0 inset;
      margin-left: calc(-60% / 14);
      width: calc(60% / 14);
      height: 65%;
      left: calc(30% / 14);
      margin-top: -5px;
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>
