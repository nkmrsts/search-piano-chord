<template>
  <div class="keyboardNotes">
    <template v-for="index in octave">
      <!-- 中央のCをC4としたいためindex+2してる マジックナンバーどうにかする-->
      <p
        type="button"
        class="keyboardNotes_note"
        v-for="note in noteNames"
        :class="{ included: isIncluded(note + (index + 2)) }"
        :key="note + (index + 2)"
        :value="note"
        :data-note="note + (index + 2)"
      >
        <span>{{ note }}</span>
      </p>
    </template>
  </div>
</template>

<script>
import { NOTE_NAMES } from '../const/index.js'
export default {
  name: 'PinnedNotes',
  data() {
    return {
      noteNames: NOTE_NAMES
    }
  },
  props: {
    octave: {
      type: Number,
      default: 2
    },
    chordCons: {
      type: Array,
      required: true
    },
    addOctaveCons: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    isIncluded(note) {
      const index = this.addOctaveCons.findIndex(element => {
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
  padding: 0 5px;
  box-sizing: border-box;
  display: flex;
  background: #222;
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
      width: 1.6rem;
      height: 1.6rem;
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
      top: 5px;
      left: calc(30% / 14);
      margin-top: -5px;
      font-size: 12px;
      color: #fff;
      appearance: none;
    }
  }
}
</style>
