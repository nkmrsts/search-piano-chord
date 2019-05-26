<template>
  <div class="container">
    <div class="container--head">
      <div class="keyboard">
        <Keyboard-panel class="keyboard_panel" :notes="joinNotes" />
        <keyboard-notes class="keyboard_notes" @onClick="updateSelectedNotes" />
      </div>
    </div>
    <div class="container--bottom">
      <ul class="reaults">
        <Results-item class="reaults__item"
           v-for="(result, key) in reaults" :key="key" :chordName="key" :chordCons="result" @addPin="addPin" />
      </ul>
      <PinnedBlock class="pinned" :pinned-list="pinnedChords" @deletePin="deletePin"/>
    </div>
  </div>
</template>

<script>
import PinnedBlock from './PinnedBlock.vue'
import KeyboardPanel from './KeyboardPanel.vue'
import KeyboardNotes from './KeyboardNotes.vue'
import PinnedNotes from './PinnedNotes.vue'
import ResultsItem from './ResultsItem.vue'
import { CHORD_PATTERNS, NOTES } from '../const/index.js'
export default {
  name: 'Page',
  components: {
    KeyboardPanel,
    KeyboardNotes,
    PinnedBlock,
    PinnedNotes,
    ResultsItem
  },
  data() {
    return {
      selectedNotes: [],
      reaults: {},
      pinnedChords: [],
      notes: NOTES,
      chordPatterns: CHORD_PATTERNS
    }
  },
  computed: {
    sortNotes() {
      return this.selectedNotes.slice().sort((a, b) => {
        a.octave = a.note.match( /[+-]?\d+/ )[0];
        b.octave = b.note.match( /[+-]?\d+/ )[0];
        if (a.octave < b.octave) return -1
        if (a.octave > b.octave) return 1
        if (a.noteNumber < b.noteNumber) return -1
        if (a.noteNumber > b.noteNumber) return 1
        return 0
      })
    },
    joinNotes() {
      return this.sortNotes
        .map(elm => {
          return this.notes[elm.noteNumber]
        })
        .join(',')
    }
  },
  methods: {
    addPin(chordName, chordChons) {
      this.pinnedChords.push({ chordName, chordChons })
    },
    deletePin(index) {
      this.pinnedChords.splice(index, 1)
    },
    updateSelectedNotes(note, noteNumber) {
      // 選択したnoteがselectedNotesに含まれていれば取り除く
      const foundIndex = this.selectedNotes.findIndex(elm => {
        return elm.note === note
      })
      foundIndex === -1
        ? this.selectedNotes.push({ note, noteNumber })
        : this.selectedNotes.splice(foundIndex, 1)
      this.findChord()
    },

    findChord() {
      this.reaults = {}
      if (this.selectedNotes.length === 1) {
        return false
      }
      // 1オクターブの音階分ループ
      this.notes.forEach((note, noteNum) => {
        // コードの組み合わせ(chordPatterns)分ループ
        Object.keys(this.chordPatterns).forEach(key => {
          // 音階に合わせた構成音の組み合わせ(chordCons)を作成
          const chordCons = this.chordPatterns[key].map(chordNoteNum => {
            if (chordNoteNum + noteNum > 24) {
              return chordNoteNum + noteNum - 24
            } else if (chordNoteNum + noteNum > 12) {
              return chordNoteNum + noteNum - 12
            } else {
              return chordNoteNum + noteNum
            }
          })

          this.selectedNotes.some((elm,i)=> {
            const noteNumber = elm.noteNumber + 1
            // 選択したNoteがchordConsに含まれていなければループを抜ける
            if (chordCons.indexOf(noteNumber) === -1) {
              return true
            }
            // selectedNotesの最後までループが回れば結果(this.reaults)にコード名、構成音を追加
            if (this.selectedNotes.length - 1 === i) {
              this.reaults[note + (key === 'Ma' ? '' : key)] = chordCons.map(
                x => this.notes[x - 1]
              )
            }
          })
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
}
.container--head {
  height: 40%;
}
.container--bottom {
  height: 60%;
  display: flex;
}
.keyboard {
  height: 100%;
  max-width: 1080px;
  margin: 0 auto;
  background: #e3e3de;
  &_panel {
    height: 20%;
    box-sizing: border-box;
  }
}
.keyboard_notes {
  height: 80%;
}
.reaults {
  width: 40%;
  height: 100%;
  margin: 0;
  list-style: none;
  overflow: scroll;
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  &__item {
    margin: 5px;
    padding: 5px 0;
    background-color: #e6e6e6;
    text-align: center;
    & span:first-child {
      font-size: 18px;
      font-weight: bold;
    }
  }
}
.pinned {
  width: 60%;
  height: 100%;
  overflow: scroll;
}
</style>
