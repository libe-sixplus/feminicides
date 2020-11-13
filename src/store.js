import Vue from 'vue'
import Vuex from 'vuex'
import {request, csvParse} from 'd3'
import uniqBy from 'lodash/uniqBy'

Vue.use(Vuex)

const spreadsheet = window.location.host.match('liberation.fr')
  ? 'https://proxydata.liberation.fr/proxy/spreadsheets/1LPl70M2dQSg1TR0bdMu2FUF-GQf2FeZdY8CkCpOsDJ0?out=csv'
  : 'http://localhost:3004/proxy/spreadsheets/1LPl70M2dQSg1TR0bdMu2FUF-GQf2FeZdY8CkCpOsDJ0?out=csv'

var monthFr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
var now = new Date()
var currentYear = now.getFullYear().toString()
var prevMonth = now.getMonth() === 0 ? monthFr[11] : monthFr[now.getMonth() - 1]

var nonBreakable = (string) => {
  var characters = ['?', '!', ':', ';']
  var i
  for (i = 0; i < characters.length; ++i) {
    string = string.replace(new RegExp('\\s+[' + characters[i] + ']', 'g'), '&nbsp;' + characters[i])
  }
  string = string.replace(/\b ans/g, '&nbsp;' + 'ans')
  return string
}

export const store = new Vuex.Store({
  state: {
    all: [],
    allDate: [{year: currentYear, month: prevMonth}],
    currentIdDate: 0,
    currentId: false,
    currentData: [],
    isAll: false,
    isSelected: false,
    isMore: false
  },
  mutations: {
    putAll (state, array) {
      state.all = array
    },
    putAllDate (state) {
      var allDate = state.all.map(d => { return {month: d.month, year: d.year} })
      state.allDate = uniqBy(allDate, (d) => d.month + d.year)
    },
    putDate (state, id) {
      state.currentIdDate = id
    },
    putId (state, id) {
      state.currentId = id
    },
    prevId (state) {
      if ((state.currentId - 1) < 0) state.currentId = state.currentData.length - 1
      else state.currentId--
    },
    nextId (state) {
      if ((state.currentId + 1) > (state.currentData.length - 1)) state.currentId = 0
      else state.currentId++
    },
    putData (state) {
      var currentDate = state.allDate[state.currentIdDate]
      state.currentData = state.all.filter(d => d.year === currentDate.year && d.month === currentDate.month)
    },
    showAll (state) {
      state.isAll = true
      state.currentData = state.all
    },
    hideAll (state) {
      state.isAll = false
    },
    showSelected (state) {
      state.isSelected = true
    },
    hideSelected (state) {
      state.isSelected = false
    },
    showMore (state) {
      state.isMore = true
    },
    hideMore (state) {
      state.isMore = false
    }
  },
  getters: {
    getAll: state => state.all,
    getIsAll: state => state.isAll,
    gateAllDate: state => state.allDate,
    gateFirstDate: state => state.allDate[state.allDate.length - 1],
    gateLastDate: state => state.allDate[0],
    getCurrentIdDate: state => state.currentIdDate,
    getDate: state => state.allDate[state.currentIdDate],
    getId: state => state.currentId,
    getData: state => state.currentData,
    getDataCount: (state, getters) => getters.getData.length,
    getWomen: (state, getters) => state.currentId !== false ? getters.getData[state.currentId] : {},
    getPrev: (state, getters) => {
      if (state.currentId !== false) {
        if ((state.currentId - 1) < 0) return getters.getData[getters.getDataCount - 1]
        else return getters.getData[state.currentId - 1]
      } else return {}
    },
    getNext: (state, getters) => {
      if (state.currentId !== false) {
        if ((state.currentId + 1) > (getters.getDataCount - 1)) return getters.getData[0]
        else return getters.getData[state.currentId + 1]
      } else return {}
    },
    getSelected: (state) => state.isSelected,
    getIsMore: (state) => state.isMore
  },
  actions: {
    loadData (context) {
      window.fetch(spreadsheet)
        .then(res => res.text())
        .then(res => doStuff(res))
        .catch(err => console.log(err))
      function doStuff (input) {
        var data = csvParse(input, d => {
          const undefKeys = Object.keys(d).map(key => d[key]).filter(val => val === undefined)
          if (undefKeys.length) {
            console.log(d)
            return { ok: false }
          }
          var intro = [d.texte.split('.')[0], d.texte.split('.')[1]].join('.') + '.'
          var text = d.texte.replace(intro + ' ', '')
          return {
            ok: d.publication === 'ok',
            year: d.annee,
            month: d.mois,
            age: isNaN(parseInt(d.age)) ? 14 : parseInt(d.age),
            name: d.prenom === '?' ? 'Nom inconnu' : d.prenom,
            text: nonBreakable(text),
            intro: nonBreakable(intro),
            link: d.lien,
            open: false
          }
        })
        data = data.filter(d => d.ok)
        context.commit('putAll', data.reverse())
        context.commit('putAllDate')
        context.commit('putData')
      }
    },
    changeDate (context, id) {
      context.commit('putDate', id)
      context.commit('putData')
      context.commit('putId', false)
    }
  },
  strict: true
})
