<template>
  <ion-menu side="start" menu-id="first" content-id="menu">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons>
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-icon slot="start" :icon="home"></ion-icon>
          <ion-label>Inicio</ion-label>
        </ion-item>
        <ion-item>
          <ion-icon slot="start" :icon="thermometer">Temp</ion-icon>
          <ion-label>Histórico Temperatura</ion-label>
        </ion-item>
        <ion-item>
          <ion-icon slot="start" :icon="water"></ion-icon>
          <ion-label>Histórico Humedad</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-title id="footerTitle"></ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-menu>
  <ion-page id="menu">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script>
import {
  IonList,
  IonItem,
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonToolbar,
  IonMenu,
  IonIcon,
  IonFooter,
  IonButtons,
  IonMenuButton,
  IonLabel
} from "@ionic/vue";
import { home, thermometer, water } from "ionicons/icons";

export default {
  props: ["page-title"],
  components: {
    IonList,
    IonItem,
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonToolbar,
    IonMenu,
    IonIcon,
    IonFooter,
    IonButtons,
    IonMenuButton,
    IonLabel

  },
  data() {
    return { home, thermometer, water };
  },
};
</script>

<style scoped>
ion-content {
  margin: 10px;
}
ion-menu-button {
  color: black;
}
ion-label {
  color: black;
  font: bold;
}
#footerTitle{
  background-color: #348954;
}
ion-title {
  background-color: darkgoldenrod;
}


.toolbar-background{
  background-color: #348954 !important;
}
</style>
