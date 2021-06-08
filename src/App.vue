<template>
  <ion-app>
    <ion-split-pane content-id="menu">
      <ion-menu side="start" menu-id="first" content-id="menu">
        <ion-header>
          <ion-toolbar mode="ios" color="primary">
            <ion-buttons>
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item router-link="/my_terrarium">
              <ion-icon slot="start" :icon="home"></ion-icon>
              <ion-label>Inicio</ion-label>
            </ion-item>

            <ion-item router-link="/parameter_historics">
              <ion-icon slot="start" :icon="newspaper"></ion-icon>
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
      <ion-router-outlet id="menu" />
    </ion-split-pane>
  </ion-app>
</template>

<script>
import {
  IonApp,
  IonRouterOutlet,
  IonList,
  IonItem,
  IonMenu,
  IonIcon,
  IonLabel,
  IonSplitPane,
  IonMenuButton,
  IonButtons,
  IonToolbar,
  IonHeader,
  IonFooter,
  IonContent,
  IonTitle
} from "@ionic/vue";
import { defineComponent } from "vue";

import { home, newspaper, arrowBack } from "ionicons/icons";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    IonList,
    IonItem,
    IonMenu,
    IonIcon,
    IonLabel,
    IonSplitPane,
    IonMenuButton,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonFooter,
    IonContent,
    IonTitle
  },

  data() {
    return { home, newspaper, arrowBack };
  },
});
</script>
