<template>
<ion-page>
  <base-layout page-title="parameter_historics">
    <ion-list>
      <ion-list-header>
        <ion-label id="list-title">
            Históricos
        </ion-label>
      </ion-list-header>
      <ion-item router-link="/parameter_historics/temperatura">
        <ion-icon slot="start" :icon="thermometer"></ion-icon>
        <ion-label>Histórico de Temperatura</ion-label>
      </ion-item>
      <ion-item router-link="/parameter_historics/humedad">
        <ion-icon slot="start" :icon="water"></ion-icon>
        <ion-label>Histórico de Humedad</ion-label>
      </ion-item>
    </ion-list>
  </base-layout>
  </ion-page>
  
</template>
<script>
import {IonListHeader, IonLabel,IonIcon,IonList,IonItem, IonPage,} from "@ionic/vue";
import { thermometer, water } from "ionicons/icons";

export default {
  components: {IonListHeader,IonLabel, IonIcon,IonList,IonItem,IonPage,},
  data() {
    return { thermometer, water };
  },
};
</script>
<style scoped>
ion-item{
    margin-right:10%;
}
ion-list-header{
    padding-left:10%;
    padding-right:10%;
}
#list-title{
    text-align: center;
    font-size: 130%;
    font: bold;
}

</style>
