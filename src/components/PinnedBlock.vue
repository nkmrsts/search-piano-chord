<template>
  <div class="pinned">
    <ul class="pinned-list">
      <li v-for="(item, index) in pinnedList" :key="index">
        <div class="pinned__head">
          <h3 class="pinned__name">{{ item.chordName }}</h3>
          <p class="pinned__cons">{{ item.chordCons }}</p>
          <div class="delete-button" @click="onClickDelete(index)">×</div>
          <div class="play-button" @click="onClickPlay(index)">play</div>
        </div>
        <Pinned-notes
          :chord-cons="item.chordCons"
          :add-octave-cons="item.addOctaveCons"
          :index="index"
          class="pinned-notes"
        />
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
    onClickPlay(index) {
      this.$emit('playChord', index)
    },
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
  margin-bottom: 0;
  margin-left: 40px;

  li {
    display: flex;
    justify-content: space-between;
    margin-top: 22px;
    &:first-child {
      margin-top: 0;
    }
    @media screen and (max-width: 780px) {
      display: block;
    }
  }
}
.pinned__head {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 25%;
  @media screen and (max-width: 780px) {
    width: 100%;
    flex-direction: row;
  }
}
.pinned__name {
  font-size: 21px;
  margin: 0;
}
.pinned__cons {
  font-size: 12px;
  margin: 0;
  text-align: left;
  @media screen and (max-width: 780px) {
    margin: auto 5px;
  }
}
.delete-button {
  cursor: pointer;
  margin: 0;
  @media screen and (max-width: 780px) {
    margin: auto 5px;
  }
}
.pinned-notes {
  width: 75%;
  height: 120px;
  max-width: 575px;
  margin-right: auto;
  @media screen and (max-width: 780px) {
    width: 100%;
  }
}
.play-button {
  cursor: pointer;
  @media screen and (max-width: 780px) {
    margin: auto 5px;
  }
}
</style>
