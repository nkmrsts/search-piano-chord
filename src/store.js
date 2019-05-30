import Vue from 'vue'
import Vuex from 'vuex'
import { NOTES } from './const/index.js'

Vue.use(Vuex)
// note: C3表記のこと。変数名、単語整理する
// 音階名,key,note,noteNumber,octave

// C3 => 3を抜き出す
const sliceOctave = note => note.match(/[+-]?\d+/g)

// C3 => Cを抜き出して
// C => 0, D => 2に置き換え
const noteNumber = note => {
  return NOTES.indexOf(note.match(/^[A-Z]?#*/g)[0])
}
// C4 = 48
// C=0 + オクターブ4 * 12
//
// midi ノート番号の場合は-1はじまりでC4:60
const noteOctaveNumber = note => {
  return noteNumber(note) + sliceOctave(note) * 12
}

export default new Vuex.Store({
  state: {
    selectedNotes: []
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
    }
  },
  mutations: {
    updateSelectNotes(state, selectedNotes) {
      state.selectedNotes = selectedNotes
    }
  },
  actions: {
    addNote(context, note) {
      context.commit('updateSelectNotes', [note, ...this.state.selectedNotes])
    },
    removeNote(context, note) {
      console.log(note, this.state.selectedNotes[0])
      context.commit(
        'updateSelectNotes',
        this.state.selectedNotes.filter(value => value !== note)
      )
    }
  }
})
