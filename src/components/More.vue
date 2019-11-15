<template>
  <div id="more" class="section">
    <div class="columns is-centered">
      <div class="column is-two-thirds has-color-darkBlue">
        <h2 class="libe-black is-size-5 is-uppercase">La méthode :</h2>
        <p>Cette liste macabre n’est pas exhaustive. Elle s’appuie sur les cas qui ont été mentionnés dans la presse nationale ou locale depuis janvier 2017. Outre les cas qui ont pu nous échapper, par précaution, nous avons préféré ne pas intégrer certaines affaires pour lesquelles l’enquête n’était pas suffisamment avancée. Ne sont pas non plus comptabilisés les meurtres par «dépit amoureux», si les personnes n'ont jamais été en couple.</p>
        <p>Nous avons également choisi de ne pas inclure ce qu’on appelle les «suicides altruistes», ces couples où la femme est malade, par exemple atteinte d’Alzheimer, et où le mari la tue pour mettre fin à sa souffrance, ou parce que, lui-même malade, il sait qu’il ne pourra plus s’occuper d’elle.</p>
        <p>Les survivantes, parfois très gravement blessées, ne sont pas non plus intégrées au décompte.</p>
        <p>Quand les enfants sont aussi victimes (13 morts dans notre recension de l'année 2017), nous le mentionnons dans chaque article, tout comme les autres victimes (amant, nouveau conjoint, entourage).<span class="losange"></span></p>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-two-thirds has-color-darkBlue">
        <h2 class="libe-semicondensed has-color-ligthBlue is-size-5 is-uppercase">À LIRE AUSSI :</h2>
        <ul>
          <li class="libe-black">
            <a href="https://www.liberation.fr/france/2019/11/01/feminicides-conjugaux-de-l-importance-de-compter-et-de-raconter_1760197" class="has-color-darkBlue">
              <span class="has-color-libePink libe-semicondensed">BILLET</span>
              Féminicides conjugaux : de l'importance de compter… et de raconter
            </a>
          </li>
          <li class="libe-black">
            <a href="https://www.liberation.fr/france/2019/09/02/lutte-contre-les-feminicides-l-obligation-de-resultats_1748870" class="has-color-darkBlue">
              <span class="has-color-libePink libe-semicondensed">RÉCIT</span>
              Lutte contre les féminicides : l’obligation de résultats
            </a>
          </li>
          <li class="libe-black">
            <a href="https://www.liberation.fr/france/2019/02/01/feminicide-tout-mais-pas-lui-donner-un-centime_1706947" class="has-color-darkBlue">
              <span class="has-color-libePink libe-semicondensed">TÉMOIGNAGE</span>
              «Tout, mais pas lui donner un centime»
            </a>
          </li>
          <li class="libe-black">
            <a href="https://www.liberation.fr/france/2019/07/03/feminicide-comme-s-il-avait-voulu-la-faire-souffrir-jusqu-au-bout_1737842" class="has-color-darkBlue">
              <span class="has-color-libePink libe-semicondensed">TÉMOIGNAGE</span>
              «Comme s’il avait voulu la faire souffrir jusqu’au bout»
            </a>
          </li>
          <li class="libe-black">
            <a href="https://www.liberation.fr/france/2019/07/03/feminicide-aissatou-etait-une-pipelette-mais-sur-ce-sujet-elle-etait-fuyante_1737855" class="has-color-darkBlue">
              <span class="has-color-libePink libe-semicondensed">TÉMOIGNAGE</span>
              «Aïssatou était une pipelette, mais sur ce sujet, elle était fuyante»
            </a>
          </li>
          <li class="libe-black">
            <a href="https://www.liberation.fr/apps/2017/06/220-femmes-tuees-conjoints-ignorees-societe/" class="has-color-darkBlue">
              <span class="has-color-libePink libe-semicondensed">ENQUÊTE</span>
              Notre plein écran : Tuées par leur conjoint, ignorées par la société, enquête sur un meurtre de masse
            </a>
          </li>
          <li class="libe-black">
            <a href="https://www.liberation.fr/france/2017/06/30/elle-s-appelait-aurelie-elle-avait-34-ans-il-lui-a-tire-dessus-au-fusil-de-chasse-une-annee-de-meurt_1580445" class="has-color-darkBlue">
              <span class="has-color-libePink libe-semicondensed">#DÉJÀMORTES</span>
              2017, un an de meurtres conjugaux
            </a>
          </li>
          <li class="libe-black">
            <a href="https://www.liberation.fr/france/2018/01/08/feminicides-conjugaux-encore-trop-de-violences-et-trop-peu-de-moyens_1620635" class="has-color-darkBlue">
              <span class="has-color-libePink libe-semicondensed">VIOLENCES</span>
              Notre décryptage : pourquoi le chiffre des victimes ne baisse pas
            </a>
          </li>
          <li class="libe-black">
            <a href="https://www.liberation.fr/debats/2017/11/23/feminicide-pas-francais_1612057" class="has-color-darkBlue">
              <span class="has-color-libePink libe-semicondensed">RÉCIT</span>
              Faut-il utiliser le mot «féminicide» ?
            </a>
          </li>
        </ul>
      </div>
    </div>
    <span class="btn-close icon has-color-ligthBlue" @click="close()">
      <i class="icon ion-ios-close-empty"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'More',
  methods: {
    close () {
      this.$store.commit('hideMore')
    }
  }
}
</script>

<style scoped>
#more {position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding-top: 50px; background: #fff; overflow-y: auto;}
p {font-weight: 600;}
.losange {display: inline-block; margin: 0; margin: 0 5px;
-moz-transform: scale(1.2);
-webkit-transform: scale(1.2);
-o-transform: scale(1.2);
-ms-transform: scale(1.2);
transform: scale(1.2);
}
ul li {padding: 15px 0; border-top: 1px solid #0083ca;}
ul li:first-child {margin-top: 1em;}
ul li:last-child {border-bottom: 1px solid #0083ca;}
ul li span {margin-right: 5px;}
.btn-close {position: absolute; top: 10px; right: 10px; font-size: 4rem; cursor: pointer;}
</style>
