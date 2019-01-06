<template>
  <div class="keyboardNotes">
    <template v-for="index in 2">
      <button
        type="button"
        class="keyboardNotes_note"
        v-for="(note, noteNumber) in notes"
        :key="note + index"
        :value="note"
        aria-pressed="false"
        @click="clickKey($event, noteNumber, index)"
      >
        <span>{{ note }}</span>
      </button>
    </template>
  </div>
</template>

<script>
import { NOTES } from '../const/index.js'
export default {
  name: 'KeyboardNotes',
  data() {
    return {
      notes: NOTES
    }
  },
  methods: {
    clickKey(event, noteNumber, index) {
      event.currentTarget.getAttribute('aria-pressed') === 'false'
        ? event.currentTarget.setAttribute('aria-pressed', true)
        : event.currentTarget.setAttribute('aria-pressed', false)
      this.$emit('onClick', event.currentTarget.value, noteNumber, index)
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
  //height: 410px;
  height: 70%;
  &_note {
    background-color: white;
    width: calc(100% / 14); //白鍵の数 14
    padding: 0;
    border-radius: 4px;
    border-top: none;
    border-bottom: none;
    box-shadow: #575757 0 3px 3px -1px;
    position: relative;
    transition-property: background-color, box-shadow;
    transition-duration: 0.2s;
    font-size: 22px;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    padding-bottom: 1rem;
    &:focus {
      outline: none;
    }
    &:active {
      background-color: #fafafa;
      box-shadow: grey 0 1px 3px -1px;
    }
    & > span {
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
    &[aria-pressed='true'] > span {
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
      font-size: 16px;
      color: #fff;
      &:active {
        background-color: #292929;
        box-shadow: grey 0 3px 3px -1px, #fafafa 0 0 3px 0 inset;
      }
    }
  }
}
</style>
