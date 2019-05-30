<template>
  <v-content>
    <v-container fluid>
      <v-layout column fill-height>
        <v-flex xs4 grow>
          <!--
          <div class="keyboard">
            <div class="keyboard__button" @click="playSelectedNotes">play</div>
            <Keyboard-panel class="keyboard_panel" :notes="joinNotes" />
            <keyboard-notes
              class="keyboard_notes"
              @onClick="updateSelectedNotes"
            />
          </div>
          -->
          <Keyboard :rootOctave="2" :octaves="3" />
        </v-flex>
        <v-flex xs8 class="pt-4" style="max-height: 66.6666%;">
          <v-layout row fill-height>
            <v-flex xs4 style="overflow: scroll;">
              <ul class="reaults">
                <Results-item
                  class="reaults__item"
                  v-for="(result, index) in reaults"
                  :key="index"
                  :chordName="result.chordName"
                  :chordCons="result.chordCons"
                  @addPin="addPin"
                  @playChord="playResultChord(index)"
                />
              </ul>
            </v-flex>
            <v-flex xs8 style="overflow: scroll;">
              <PinnedBlock
                class="pinned"
                :pinned-list="pinnedChords"
                @deletePin="deletePin"
                @playChord="playPinnedChord"
              />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Tone from 'tone'
import PinnedBlock from './PinnedBlock.vue'
import Keyboard from './Keyboard/Keyboard.vue'
import ResultsItem from './ResultsItem.vue'
import { CHORD_PATTERNS, NOTES } from '../const/index.js'
export default {
  name: 'Page',
  components: {
    Keyboard,
    PinnedBlock,
    ResultsItem
  },
  data() {
    return {
      selectedNotes: [],
      reaults: [],
      pinnedChords: [],
      notes: NOTES,
      chordPatterns: CHORD_PATTERNS
    }
  },
  computed: {
    sortNotes() {
      return this.selectedNotes.slice().sort((a, b) => {
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
    addOctaveChordname(chrodsArray) {
      let startOctave = 3
      let prevNoteIndex = 0
      return chrodsArray.map(v => {
        const noteIndex = this.notes.findIndex(noteValue => {
          return v === noteValue
        })
        if (noteIndex < prevNoteIndex) {
          startOctave += 1
        }
        prevNoteIndex = noteIndex
        return v + startOctave
      })
    },

    playPinnedChord(index) {
      const noteArray = this.addOctaveChordname(
        this.pinnedChords[index].chordCons
      )
      this.playChord(noteArray)
    },
    playResultChord(index) {
      const noteArray = this.addOctaveChordname(this.reaults[index].chordCons)
      this.playChord(noteArray)
    },
    playSelectedNotes() {
      const noteArray = this.selectedNotes.map(v => v.note)
      this.playChord(noteArray)
    },
    playChord(arr) {
      var synth = new Tone.PolySynth(6, Tone.Synth).toMaster()
      synth.triggerAttackRelease(arr, '4n')
    },

    addPin(chordName, chordCons) {
      const addOctaveCons = this.addOctaveChordname(chordCons)
      this.pinnedChords.push({ chordName, chordCons, addOctaveCons })
    },
    deletePin(index) {
      this.pinnedChords.splice(index, 1)
    },

    updateSelectedNotes(note, noteNumber, octave) {
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
      this.reaults = []
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

          this.selectedNotes.some((elm, i) => {
            const noteNumber = elm.noteNumber + 1
            // 選択したNoteがchordConsに含まれていなければループを抜ける
            if (chordCons.indexOf(noteNumber) === -1) {
              return true
            }
            // selectedNotesの最後までループが回れば結果(this.reaults)にコード名、構成音を追加
            if (this.selectedNotes.length - 1 === i) {
              this.reaults.push({
                chordName: note + (key === 'Ma' ? '' : key),
                chordCons: chordCons.map(x => this.notes[x - 1])
              })
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
  height: 35%;
}
.container--bottom {
  height: 75%;
  display: flex;
}
.keyboard {
  height: 100%;
  max-width: 1080px;
  margin: 0 auto;
  background: #e3e3de;
  &_panel {
    height: 25%;
    box-sizing: border-box;
  }
}
.keyboard_notes {
  height: 75%;
}
.keyboard__button {
  position: absolute;
}
.reaults {
  margin: 0;
  list-style: none;
  padding: 0;
  text-align: left;
  &__item {
    margin-top: 5px;
    padding: 5px 0;
    background-color: #e6e6e6;
    text-align: center;
    &:first-child {
      margin-top: 0;
    }
    & span:first-child {
      font-size: 18px;
      font-weight: bold;
    }
  }
}
.pinned {
}
</style>
