<template>
  <div class="selectedNotes">
   <p>{{ notes }}</p>
  </div>
</template>

<script>
export default {
  name: 'KeyboardPanel',
  props: {
    notes: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.selectedNotes {
  font-size: 24px;
  width: 30%;
  padding: 10px 25px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  & p {
    width: 100%;
    height: 100%;
    background: #738171;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: scroll;
  }
}
</style>
