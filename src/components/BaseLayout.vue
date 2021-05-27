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
          <ion-icon slot="start" :icon="newspaper">Hist</ion-icon>
          <ion-label>Históricos</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar color="primary">
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-menu>
  <ion-page id="menu">
    <ion-header>
      <ion-toolbar mode="ios" color="secondary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title id="pageTitle" slot ="start" >{{ pageTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
    <ion-footer>
      <ion-toolbar color="secondary">
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
import { home, thermometer, water, newspaper } from "ionicons/icons";

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
    return { home, thermometer, water,newspaper };
  },
};
</script>

<style scoped>
  #pageTitle{
    font:bolder;
    font-size:120%
  }
</style>
