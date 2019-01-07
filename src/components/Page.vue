<template>
  <div class="container">
    <ul class="foundChord">
      <li
        class="foundChord__item"
        v-for="(value, key) in foundChord"
        :key="key"
      >
        <span>{{ key }}</span
        >:<span>{{ value }}</span>
      </li>
    </ul>
    <div class="keyboard">
      <div class="keyboard_panel">
        <div class="keyboard_panel__selectedNotes">
          <div>{{ joinNotes }}</div>
        </div>
      </div>
      <keyboard-notes @onClick="updateSelectedNotes" />
    </div>
  </div>
</template>

<script>
import KeyboardNotes from './KeyboardNotes.vue'
import { CHORD_PETTERN, NOTES } from '../const/index.js'
export default {
  name: 'Page',
  components: { KeyboardNotes },
  data() {
    return {
      selectedNotes: [],
      foundChord: {},
      notes: NOTES,
      chordPattern: CHORD_PETTERN
    }
  },
  computed: {
    sortedNotes() {
      return this.selectedNotes.slice().sort((a, b) => {
        if (a.interval < b.interval) return -1
        if (a.interval > b.interval) return 1

        if (a.noteNumber < b.noteNumber) return -1
        if (a.noteNumber > b.noteNumber) return 1
        return 0
      })
    },
    joinNotes() {
      return this.sortedNotes
        .map(elm => {
          return elm.note
        })
        .join(',')
    },
    extractNoteNumber() {
      return this.selectedNotes.map(elm => {
        return elm.noteNumber + 1 // 1加算
      })
    }
  },
  methods: {
    updateSelectedNotes(note, noteNumber, index) {
      const interval = index + 1 // 中央のCをC3としたいので1加算
      const foundIndex = this.selectedNotes.findIndex(elm => {
        return elm.note === note && elm.interval === interval
      })
      foundIndex !== -1
        ? this.selectedNotes.splice(foundIndex, 1)
        : this.selectedNotes.push({ note, noteNumber, interval })
      this.findChord()
    },

    findChord() {
      this.foundChord = {}
      if (this.selectedNotes.length === 1) {
        // return false
      }

      this.notes.forEach((note, index) => {
        Object.keys(this.chordPattern).forEach(key => {
          // chordCons
          const chordCons = this.chordPattern[key].map(x => {
            if (x + index > 24) {
              return x + index - 24
            } else if (x + index > 12) {
              return x + index - 12
            } else {
              return x + index
            }
          })

          this.extractNoteNumber.some((noteNumber, i) => {
            if (chordCons.indexOf(noteNumber) === -1) {
              return true
            }
            if (this.extractNoteNumber.length - 1 === i) {
              this.foundChord[note + (key === 'Ma' ? '' : key)] = chordCons
                .map(x => {
                  return this.notes[x - 1]
                })
                .join(',')
            }
          })
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  height: 100vh;
}
.keyboard {
  height: 50%;
  max-width: 1080px;
  margin: 0 auto;
  background: #e3e3de;
  &_panel {
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    &__selectedNotes {
      font-size: 24px;
      width: 30%;
      padding: 20px 25px;
      background: #222;
      margin: 0 auto;
      & div {
        background: #738171;
        width: 100%;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.foundChord {
  height: 50%;
  margin: 0;
  list-style: none;
  overflow: scroll;
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(9, 1fr);
  //grid-auto-flow: column;
  &__item {
    margin: 5px;
    background-color: #e6e6e6;
    text-align: center;
    & span:first-child {
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
