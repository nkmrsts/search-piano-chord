<template>
  <div class="pinned">
    <ul class="pinned-list">
      <li v-for="(item,index) in pinnedList" :key="index">
        <div class="pinned__head">
          <h3 class="pinned__name">{{item.chordName}}</h3>
          <p class="pinned__cons">{{item.chordChons}}</p>
          <div class="delete-button" @click="onClickDelete(index)">×</div>
        </div>
        <Pinned-notes :cons="item.chordChons" :index="index"/>
      </li>
    </ul>
  </div>
</template>

<script>
import PinnedNotes from './PinnedNotes.vue'
export default {
  name: 'PinnedBlock',
  components: { PinnedNotes },
  props: {
    pinnedList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    onClickDelete(index) {
      this.$emit('deletePin', index)
    }
  }
}
</script>

<style scoped lang="scss">
.pinned-list {
  list-style-type: none;
  padding: 0;
}
.pinned__head {
  display: flex;
  align-items: center;
}
.pinned__name {
  font-size: 21px;
}
.pinned__cons {
  margin-left: 15px;
}
.delete-button {
  cursor: pointer;
  margin-left: 10px;
}
</style>
