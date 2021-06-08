<template>
  <ion-page>
    <base-layout page-title="historic_parameter_data">
      <ion-list lines="inset">
        <ion-list-header>
          <ion-label id="listTitle">
            {{ id.charAt(0).toUpperCase() + id.slice(1) }} 
          </ion-label>
        </ion-list-header>
        <ion-list-header>
          <ion-label id="listTitle">
            Valor
          </ion-label>
          <ion-label id="listTitle">
            Fecha
          </ion-label>
        </ion-list-header>
        <div id="listStyle">
          <ion-item>
            <ion-label id="items">Pokémon </ion-label>
            <ion-label id="items"> Yellow</ion-label>
          </ion-item>
        </div>
      </ion-list>
    </base-layout>
  </ion-page>
</template>
<script>
import { IonLabel, IonPage, IonList, IonListHeader, IonItem } from "@ionic/vue";
import { useRoute } from "vue-router";

export default {
  components: { IonLabel, IonPage, IonList, IonListHeader, IonItem },
  computed: {
    id() {
      return useRoute().params.id;
    },
  },
};
</script>
<style scoped>
#listTitle {
  text-align: center;
  font-size: 130%;
  font: bold;
}
ion-list-header{
    padding-left:10%;
    padding-right:10%;
}
ion-list {
  padding-right: 5%;
  padding-left:5%;
}
#listStyle {
  background-color: #348954;
  padding: 2px;
}
#items {
  text-align: center;
  
}
</style>
