<template>
  <v-content>
    <v-container fluid>
      <v-layout column fill-height>
        <v-flex xs1 grow>
          <div
            class="keyboard__button"
            @click="playChord(orderedSelectedNotes)"
          >
            play
          </div>
          {{ orderedSelectedNotes }}
        </v-flex>
        <v-flex xs3 grow>
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
                  v-for="(result, index) in foundChords"
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
import { mapGetters } from 'vuex'
import Tone from 'tone'
import PinnedBlock from './PinnedBlock.vue'
import Keyboard from './Keyboard/Keyboard.vue'
import ResultsItem from './ResultsItem.vue'
import { CHORD_PATTERNS, NOTE_NAMES } from '../const/index.js'
export default {
  name: 'Page',
  components: {
    Keyboard,
    PinnedBlock,
    ResultsItem
  },
  data() {
    return {
      reaults: [],
      pinnedChords: [],
      noteNames: NOTE_NAMES,
      chordPatterns: CHORD_PATTERNS
    }
  },
  computed: {
    ...mapGetters(['orderedSelectedNotes', 'foundChords'])
  },
  methods: {
    // C,E,G => C3,E3,G3に
    addOctaveNotename(chrodsArray) {
      let startOctave = 3
      let prevNoteIndex = 0
      return chrodsArray.map(v => {
        const noteIndex = this.noteNames.findIndex(noteValue => {
          return v === noteValue
        })
        if (noteIndex < prevNoteIndex) {
          startOctave += 1
        }
        prevNoteIndex = noteIndex
        return v + startOctave
      })
    },

    // Tone.js 音を鳴らす
    playPinnedChord(index) {
      const noteArray = this.addOctaveNotename(
        this.pinnedChords[index].chordCons
      )
      this.playChord(noteArray)
    },
    playResultChord(index) {
      const noteArray = this.addOctaveNotename(
        this.foundChords[index].chordCons
      )
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

    // ピンどめ
    addPin(chordName, chordCons) {
      const addOctaveCons = this.addOctaveNotename(chordCons)
      this.pinnedChords.push({ chordName, chordCons, addOctaveCons })
    },
    deletePin(index) {
      this.pinnedChords.splice(index, 1)
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
