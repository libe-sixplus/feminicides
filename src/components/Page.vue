<template>
  <div id="page" class="has-color-darkBlue animation" :class="{'open': open}">
    <div class="page-content">
      <h2 class="libetypewriter-underline is-size-2" v-html="intro"></h2>
      <div class="losange"></div>
      <p v-html="text"></p>
      <p>
        <a :href="link" target="_blank">Source</a>
      </p>
      <span class="btn-close icon has-color-darkBlue" @click="close()">
        <i class="icon ion-ios-close-empty"></i>
      </span>
    </div>
    <div class="nav mainBackground">
      <a href="#" class="prev is-size-5 libetypewriter has-color-ligthBlue" @click.stop.prevent="showPrev">{{prevName}}</a>
      <a href="#" class="next is-size-5 libetypewriter has-color-ligthBlue" @click.stop.prevent="showNext">{{nextName}}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page',
  props: {
    open: {type: Boolean},
    intro: {type: String},
    text: {type: String},
    link: {type: String},
    prevName: {type: String},
    nextName: {type: String}
  },
  methods: {
    showPrev () {
      this.$store.commit('prevId')
    },
    showNext () {
      this.$store.commit('nextId')
    },
    close () {
      this.$store.commit('hideSelected')
      this.$store.commit('putId', false)
    }
  }
}
</script>

<style scoped>
#page {position: absolute; top: 0; left: 0; padding: 50px 0 0; width: 34%; height: 100%; background: #fff; text-align: center; overflow-y: auto;
-webkit-transform: translate(-100%, 0);
-moz-transform: translate(-100%, 0);
-ms-transform: translate(-100%, 0);
-o-transform: translate(-100%, 0);
transform: translate(-100%, 0);
display: flex;
flex-direction: column;
}
#page.open {
-webkit-transform: translate(0, 0);
-moz-transform: translate(0, 0);
-ms-transform: translate(0, 0);
-o-transform: translate(0, 0);
transform: translate(0, 0);
}
#page .page-content {width: 100%; max-width: 500px; margin: 0 auto; padding: 0 2em; flex: 1 0 auto;}
#page p {margin-bottom: 1em; text-align: left; word-break: normal; font-weight: 800;
-webkit-hyphens: auto;
-moz-hyphens: auto;
-ms-hyphens: auto;
-o-hyphens: auto;
hyphens: auto;}
#page p a {font-weight: normal;}
#page p a {text-decoration: underline;}
.btn-close {position: absolute; top: 10px; right: 10px; font-size: 4rem; cursor: pointer;}
.nav {width: 100%; padding: 15px 10px;}
a.prev, a.next {
color: #0083ca !important;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
}
.prev {position: relative; float: left; padding-left: 15px;}
.prev:before {display: block; content: ''; position: absolute; top: 6px; left: 0; width: 10px; height: 10px; background: #0083ca; border-radius: 50%;}
.next {position: relative; float: right; padding-right: 15px;}
.next:before {display: block; content: ''; position: absolute; top: 6px; right: 0; width: 10px; height: 10px; background: #0083ca; border-radius: 50%;}
a.prev:hover,
a.next:hover {color: #fff !important;}
.prev:hover:before,
.next:hover:before {background: #fff;}

@media (max-width: 1440px) {
  .page-content h2 {font-size: 2em !important;}
}

@media (max-width: 1024px) {
  .page-content h2 {font-size: 1.6em !important;}
}

@media (max-width: 768px) {
  #page {width: 100%; max-width: 100%; z-index: 19;}
  .page-content h2 {font-size: 1.8em !important;}
  .nav {position: relative; left: auto; bottom: auto;}
}
</style>
