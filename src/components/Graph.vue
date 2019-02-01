<template>
  <div id="graph" @click.stop="closePage()">
    <a href="#" class="women"
      v-for="(d, i) in currentData"
      :style="dotPosition(i, d.age)"
      :class="{'open': isOpen(i)}"
      :key="i"
      :data-index="i"
      @mouseenter.stop="enter(i)"
      @mouseleave.stop="leave()"
      @click.stop.prevent="show(i, d)">
      <div class="dot ligthBlue" :class="{'all': getIsAll}" v-if="!showHover(i)">
        <div class="name libetypewriter has-color-ligthBlue" v-if="!getIsAll">{{d.name}}</div>
      </div>
      <div class="intro libetypewriter-underline has-color-ligthBlue" v-html="d.intro" v-if="showHover(i)"></div>
    </a>
    <div class="nav-months">
      <a href="#" class="nav-month has-color-ligthBlue is-uppercase"
        :class="{'ligthBlue': getIsAll, 'has-text-white': getIsAll}"
        @click.stop.prevent="showAll()"
        v-if="!isMobile">depuis janvier 2017</a>
      <a href="#" class="nav-month prev-month" @click.stop.prevent="changeMonth('prev')" v-if="!lastMonth">
        <span class="icon has-color-ligthBlue is-size-2">
          <i class="icon ion-ios-arrow-right"></i>
        </span>
      </a>
      <a href="#" class="nav-month is-current-month has-color-ligthBlue is-uppercase"
        :class="{'ligthBlue': !getIsAll, 'has-text-white': !getIsAll}"
        @click.stop.prevent="changeMonth()">{{getDate.month}} {{getDate.year}}</a>
      <a href="#" class="nav-month next-month" @click.stop.prevent="changeMonth('next')" v-if="!firstMonth">
        <span class="icon has-color-ligthBlue is-size-2">
          <i class="icon ion-ios-arrow-left"></i>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {scaleLinear, max, min} from 'd3'
import debounce from 'lodash/debounce'
import {TweenMax} from 'gsap'

export default {
  name: 'Graph',
  props: {
    currentData: {type: Array}
  },
  data () {
    return {
      margins: {
        top: 20,
        right: 120,
        bottom: 130,
        left: 120
      },
      width: 0,
      height: 0,
      scaleX: null,
      scaleY: null,
      currentId: -1,
      isMobile: true
    }
  },
  mounted () {
    window.addEventListener('resize', debounce(this.updateScale, 50))
    this.$nextTick(() => {
      this.updateScale()
      setTimeout(this.showAnim, 1500)
    })
  },
  computed: {
    ...mapGetters([
      'getIsAll',
      'getDate',
      'gateAllDate',
      'getCurrentIdDate',
      'getId',
      'getIsAll'
    ]),
    lastMonth () {
      return this.getCurrentIdDate === 0
    },
    firstMonth () {
      return this.getCurrentIdDate === this.gateAllDate.length - 1
    }
  },
  methods: {
    updateScale () {
      var graph = document.getElementById('graph')
      this.isMobile = graph.offsetWidth < 768
      if (this.isMobile) {
        this.margins.right = 80
        this.margins.bottom = 150
      }
      this.width = graph.offsetWidth
      this.height = graph.offsetHeight
    },
    dotPosition (i, d) {
      var scaleX = scaleLinear().range([this.margins.left, this.width - this.margins.right]).domain([0, this.$store.getters.getDataCount - 1])
      var scaleY = scaleLinear().range([this.margins.top, this.height - this.margins.bottom]).domain([max(this.$store.getters.getData.map(d => d.age)) + 5, min(this.$store.getters.getData.map(d => d.age)) - 5])
      if (this.isMobile) {
        scaleX = scaleLinear().range([0, this.width - this.margins.right]).domain([min(this.$store.getters.getData.map(d => d.age)) - 5, max(this.$store.getters.getData.map(d => d.age)) + 5])
        scaleY = scaleLinear().range([10, this.height - this.margins.bottom]).domain([0, this.$store.getters.getDataCount - 1])
        return {'left': scaleX(d) + 'px', 'top': scaleY(i) + 'px'}
      } else return {'left': scaleX(i) + 'px', 'top': scaleY(d) + 'px'}
    },
    isOpen (i) {
      return i === this.$store.getters.getId
    },
    enter (i) {
      if (!this.isMobile) this.currentId = i
    },
    leave () {
      this.currentId = -1
    },
    showHover (i) {
      return i === this.currentId
    },
    show (i) {
      this.$store.commit('putId', i)
      this.$store.commit('showSelected')
    },
    changeMonth (direction) {
      var dateId = this.$store.getters.getCurrentIdDate
      if (direction) {
        if (direction === 'next') dateId++
        else dateId--
        if (dateId > this.$store.getters.gateAllDate.length - 1) dateId = 0
        if (dateId < 0) dateId = this.$store.getters.gateAllDate.length - 1
      }
      this.$store.commit('hideAll')
      this.$store.commit('hideSelected')
      if (direction) {
        /*
        TweenMax.staggerTo('.women', 0.3, {opacity: 0}, 0.2, () => {
          this.$store.dispatch('changeMonth', this.getAllMonth[monthIndex])
          this.$nextTick(() => {
            this.showAnim(0.3, 0.2)
          })
        })
        */
        TweenMax.to('.women', 0.4, {opacity: 0,
          onComplete: () => {
            this.$store.dispatch('changeDate', dateId)
            this.$nextTick(() => {
              this.showAnim(0.3, 0.2)
            })
          }
        })
      } else {
        TweenMax.to('.women', 0, {opacity: 0})
        this.$store.dispatch('changeDate', dateId)
        this.$nextTick(() => {
          this.showAnim(0.3, 0.2)
        })
      }
    },
    showAnim (speed, delay) {
      TweenMax.to('.women, .name', 0, {opacity: 0})
      TweenMax.staggerTo('.women', speed, {opacity: 1}, delay, () => {
        if (!this.getIsAll) TweenMax.to('.name', 0.4, {opacity: 1})
      })
    },
    showAll () {
      this.$store.commit('hideSelected')
      this.$store.commit('putId', false)
      this.$store.commit('showAll')
      this.$nextTick(() => {
        this.showAnim(0.1, 0.05)
      })
    },
    closePage () {
      if (this.getId) {
        this.$store.commit('hideSelected')
        this.$store.commit('putId', false)
      }
    }
  }
}
</script>

<style scoped>
#graph {position: relative; float: left; width: 66%; height: 100%;}
.women {position: absolute; cursor: pointer;}
.dot {width: 10px; height: 10px; border-radius: 50%;}
.dot.all {width: 7px; height: 7px;}
.name {width: 120px; padding-top: 15px;}
.intro {position: relative; max-width: 200px; margin-left: -100px; font-size: 1.12em; font-weight: 400; text-align: center; z-index: 999;}

.women {opacity: 0;}
.women.open,
.women.open .dot .name,
.women .intro {color: #fff;}
.women.open .dot {background: #fff;}

.nav-months {position: absolute; bottom: 11px; right: 10px;}
.nav-months .nav-month {float: right; margin-left: 5px; padding: 8px; font-size: .9em; text-align: center; border: 1px solid #0083ca;}
.is-current-month {width: 160px; text-align: center;}
.nav-months .nav-month.next-month,
.nav-months .nav-month.prev-month {padding: 2px; margin-top: 3px; border: none;}
/*.for-each-dot-enter-active, .for-each-dot-leave-active {
  transition: all 1s;
}
.for-each-dot-move {
  transition: opacity 1s;
}
.for-each-dot-enter, .for-each-dot-leave-to {
  opacity: 0;
}*/

@media (max-width: 768px) {
  #graph {float: none; width: 100%; max-width: 100%;}
  .nav-months {width: 235px; right: 50%;
    -webkit-transform: translate(50%, 0);
    -moz-transform: translate(50%, 0);
    -ms-transform: translate(50%, 0);
    -o-transform: translate(50%, 0);
    transform: translate(50%, 0);
  }
}
</style>
