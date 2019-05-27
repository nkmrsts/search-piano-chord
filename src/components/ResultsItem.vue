<template>
  <li class="reaults__item">
    <span class="chord-name">{{ chordName }}</span
    ><span class="chord-cons">{{ joinChordCons }}</span>
    <span @click="clickPin" class="pinned">pinned</span>
    <span @click="clickPlay" class="pinned">play</span>
  </li>
</template>

<script>
export default {
  name: 'Results',
  props: {
    chordName: String,
    chordCons: Array
  },
  computed: {
    joinChordCons() {
      return this.chordCons.join(',')
    }
  },
  methods: {
    clickPin() {
      this.$emit('addPin', this.chordName, this.chordCons)
    },
    clickPlay(){
      this.$emit('playChord')
    }
  }
}
</script>

<style scoped lang="scss">
.chord-name {
  display: inline-block;
  font-weight: bold;
  margin-right: 2px;
}
.chord-cons {
  display: inline-block;
  margin-left: 2px;
}
.pinned {
  display: inline-block;
  margin-left: 10px;
  background-color: #555;
  padding: 0 5px;
  color: #fff;
  cursor: pointer;
}
</style>
