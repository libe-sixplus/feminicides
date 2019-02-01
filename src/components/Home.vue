<template>
  <div id="home" class="mainBackground" v-if="show">
    <div class="center">
      <div class="currentDate has-color-ligthBlue libe-black is-uppercase is-size-4">Meurtres conjugaux</div>
      <h1 class="libe-semicondensed is-uppercase is-size-1">des vies derrière les&nbsp;chiffres</h1>
      <p class="chapo">Chaque année, plus de cent femmes sont tuées par leur conjoint, leur mari ou leur ex. Derrière une statistique qui se répète froidement chaque année, il y a des prénoms, des histoires, des vies, des victimes collatérales.  Cette litanie funéraire égrène, mois après mois, les meurtres conjugaux depuis le 1er&nbsp;janvier&nbsp;2017.</p>
      <div class="start libe-black is-uppercase ligthBlue is-hidden-tablet" @click="show = false">VOIR</div>
      <div><a href="#" class="more is-uppercase" @click.prevent="showMore()">pour en savoir plus</a></div>
      <div class="author">PAR VIRGINIE BALLET ET TITIOU LECOQ<br>PRODUCTION LIBÉ LABO</div>
      <div class="sixplus">
        <a href="https://www.liberation.fr/data-nouveaux-formats-six-plus,100538">
          <img src="static/LOGO_SIXPLUS_BLANC_ROUGE.svg" alt="">
        </a>
      </div>
      <div class="share is-hidden-tablet">
        <span class="btn-share icon has-color-ligthBlue is-size-4" @click="shareFacebook()">
          <i class="icon ion-social-facebook"></i>
        </span>
        <span class="btn-share icon has-color-ligthBlue is-size-4" @click="shareTwitter()">
          <i class="icon ion-social-twitter"></i>
        </span>
      </div>
    </div>
    <div class="share is-hidden-mobile">
      <span class="btn-share icon has-color-ligthBlue is-size-4" @click="shareFacebook()">
        <i class="icon ion-social-facebook"></i>
      </span>
      <span class="btn-share icon has-color-ligthBlue is-size-4" @click="shareTwitter()">
        <i class="icon ion-social-twitter"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      show: true
    }
  },
  computed: {
    ...mapGetters([
      'getIsAll',
      'getDate',
      'gateFirstDate',
      'gateLastDate'
    ])
  },
  methods: {
    shareFacebook () {
      var url = encodeURIComponent(window.location.origin + window.location.pathname)
      var link = 'https://www.facebook.com/sharer/sharer.php?u=' + url
      window.open(link, '', 'width=575,height=400,menubar=no,toolbar=no')
    },
    shareTwitter () {
      var url = encodeURIComponent(window.location.origin + window.location.pathname)
      var text = 'Chaque année, plus de cent femmes sont tuées par leur conjoint, leur mari ou leur ex. Derrière une statistique qui se répète froidement chaque année, il y a des prénoms, des histoires, des vies, des victimes collatérales. ' + url + ' via @libe'
      var link = 'https://twitter.com/intent/tweet?original_referer=&text=' + text
      window.open(link, '', 'width=575,height=400,menubar=no,toolbar=no')
    },
    showMore () {
      this.$store.commit('showMore')
    }
  }
}
</script>

<style scoped>
#home {position: relative; float: left; padding: 1.5em; width: 34%; height: 100%; color: #fff; text-align: center;}
.currentDate, h1, .start {font-weight: 800;}
h1 {line-height: 1em; margin: 0.5em 0;}
.chapo {max-width: 300px; margin: 0 auto; margin-bottom: 3em;}
a.more {color: #0083ca !important; padding: 5px 15px; border: 1px solid #0083ca; font-size: .8em;}
.author {color: #fff !important; text-decoration: underline; margin: 1em 0; margin-bottom: 0; font-size: .8em; line-height: 1.6em;}
.sixplus {width: 80px; margin: 0 auto;}
.start {display: inline-block; padding: 10px 25px; margin: 0 auto; margin-bottom: 3em; background: #1D84C8; cursor: pointer;}
.share {position: absolute; bottom: 15px; left: 15px;}
.btn-share {cursor: pointer;}

@media (max-width: 768px) {
  #home {float: none; width: 100%; max-width: 100%; overflow-y: auto;}
  .chapo {max-width: 100%;}
  .sixplus {margin-top: .5em;}
  .share {position: relative; bottom: auto; left: auto;}
}
</style>
