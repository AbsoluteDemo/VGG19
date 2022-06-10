<template>
  <div id="app" v-loading="this.$store.state.loading">
    <img
      v-if="this.$store.state.flag2"
      :src="this.$store.state.src2"
      width="400px"
      height="400px"
    />
    <img
      v-if="!this.$store.state.flag1"
      :src="this.$store.state.src1"
      width="400px"
      height="400px"
    />
    <img
      v-if="!this.$store.state.flag"
      :src="this.$store.state.src"
      width="400px"
      height="400px"
    />
    <edit-image></edit-image>
  </div>
</template>

<script>
import EditImage from "./views/editImage.vue";
export default {
  name: "app",
  components: {
    EditImage,
  },
};
</script>

<style>
#app {
  text-align: center;
}
img {
  margin: 10px;
  padding: 100px 0 0 0;
}
</style>
