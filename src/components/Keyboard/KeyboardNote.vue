<template>
  <div class="keyboard-note--container">
    <button
      type="button"
      class="keyboard-note__button"
      :class="color === 'white' ? 'button--white' : 'button--black'"
      :value="note"
      aria-pressed="false"
      @click="clickKey($event, note)"
    >
      <span class="note-name">{{ this.removeNoteNumber(note) }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'KeyboardNote',
  props: {
    color: {
      type: String,
      default: 'white'
    },
    note: {
      type: String,
      required: true
    }
  },
  methods: {
    clickKey(event, note) {
      if (event.currentTarget.getAttribute('aria-pressed') === 'false') {
        event.currentTarget.setAttribute('aria-pressed', true)
        this.$store.dispatch('addNote', note)
      } else {
        event.currentTarget.setAttribute('aria-pressed', false)
        this.$store.dispatch('removeNote', note)
      }
    },
    removeNoteNumber(str) {
      return str.replace(/[+-]?\d+/g, '')
    }
  }
}
</script>

<style scoped lang="scss">
.keyboard-note--container {
  width: 100%;
  height: 100%;
  display: block;
}

.keyboard-note__button {
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
  border: 2px solid #e0e0e0;
  box-sizing: border-box;
  padding: 0;
  outline: none;
  transition: background-color 0.2s;
  position: relative;
  color: transparent;
  &.button--white {
    color: #212121;
  }
  &.button--black {
    background-color: #333;
    color: #fafafa;
  }
  &[aria-pressed='true'] > .note-name {
    border: 2px solid #f44336;
    background-color: rgba(244, 67, 54, 0.2);
    border-radius: 50%;
  }
}
.note-name {
  position: absolute;
  bottom: 5%;
  left: 0;
  right: 0;
  width: 50%;
  margin: auto;
  border: 2px solid transparent;
}
</style>
