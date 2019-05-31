import Vue from 'vue'
import Vuex from 'vuex'
import { NOTES, CHORD_PATTERNS } from './const/index.js'

Vue.use(Vuex)
// note: C3表記のこと。変数名、単語整理する
// 音階名,key,note,noteName, noteNumber,octave

// C3 => 3を抜き出す
const sliceOctave = note => note.match(/[+-]?\d+/g)

// C3 => Cを抜き出す
const sliceNoteName = note => {
  return note.match(/^[A-Z]?#*/g)[0]
}

// C => 0, D => 2に置き換え
const noteNameToNumber = note => {
  return NOTES.indexOf(note)
}

// C4 = 48
// C=0 + オクターブ4 * 12
//
// midi ノート番号の場合は-1はじまりでC4:60
const noteOctaveNumber = note => {
  return noteNameToNumber(sliceNoteName(note)) + sliceOctave(note) * 12
}

export default new Vuex.Store({
  state: {
    selectedNotes: [],
    foundChords: []
  },
  getters: {
    orderedSelectedNotes: state => {
      return state.selectedNotes.slice().sort((a, b) => {
        const aNumber = noteOctaveNumber(a)
        const bNumber = noteOctaveNumber(b)
        if (aNumber < bNumber) return -1
        if (aNumber > bNumber) return 1
        return 0
      })
    },
    foundChords: state => state.foundChords
  },
  mutations: {
    updateSelectNotes(state, selectedNotes) {
      state.selectedNotes = selectedNotes
    },
    updateFoundChords(state, foundChords) {
      state.foundChords = foundChords
    }
  },
  actions: {
    addNote(context, note) {
      context.commit('updateSelectNotes', [note, ...this.state.selectedNotes])
      context.dispatch('findChord')
    },
    removeNote(context, note) {
      context.commit(
        'updateSelectNotes',
        this.state.selectedNotes.filter(value => value !== note)
      )
      context.dispatch('findChord')
    },
    findChord({ commit, getters }) {
      const foundChords = []

      if (getters.orderedSelectedNotes.length === 1) {
        commit('updateFoundChords', foundChords)
        return false
      }

      // 1オクターブの音階分ループ
      NOTES.forEach((note, noteNum) => {
        // コードの組み合わせ(chordPatterns)分ループ
        Object.keys(CHORD_PATTERNS).forEach(key => {
          // 音階に合わせた構成音の組み合わせ(chordCons)を作成
          const chordCons = CHORD_PATTERNS[key].map(chordNoteNum => {
            if (chordNoteNum + noteNum > 24) {
              return chordNoteNum + noteNum - 24
            } else if (chordNoteNum + noteNum > 12) {
              return chordNoteNum + noteNum - 12
            } else {
              return chordNoteNum + noteNum
            }
          })

          const selectedNoteNames = getters.orderedSelectedNotes.map(v =>
            sliceNoteName(v)
          )

          selectedNoteNames.some((elm, i) => {
            const noteNumber = noteNameToNumber(elm) + 1
            // 選択したNoteがchordConsに含まれていなければループを抜ける
            if (chordCons.indexOf(noteNumber) === -1) {
              return true
            }

            // selectedNotesの最後までループが回れば結果(this.reaults)にコード名、構成音を追加
            if (selectedNoteNames.length - 1 === i) {
              foundChords.push({
                chordName: note + (key === 'Ma' ? '' : key),
                chordCons: chordCons.map(x => NOTES[x - 1])
              })
            }
          })
        })
      })
      commit('updateFoundChords', foundChords)
    }
  }
})
