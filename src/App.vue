<template>
  <div id="app" class="mainBackground">
    <home></home>
    <page :open="getSelected"
      :intro="getWomen.intro"
      :text="getWomen.text"
      :link="getWomen.link"
      :prevName="getPrev.name"
      :nextName="getNext.name"></page>
    <graph :currentData="getData"></graph>
    <more v-if="getIsMore"></more>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Home from './components/Home'
import Graph from './components/Graph'
import Page from './components/Page'
import More from './components/More'

export default {
  name: 'App',
  beforeCreate () {
    this.$store.dispatch('loadData')
  },
  computed: {
    ...mapGetters([
      'getSelected',
      'getData',
      'getWomen',
      'getPrev',
      'getNext',
      'getIsMore'
    ])
  },
  components: {Home, Graph, Page, More}
}
</script>
