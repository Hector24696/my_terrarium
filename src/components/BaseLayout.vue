<template>
    <ion-header>
      <ion-toolbar mode="ios" color="secondary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title id="pageTitle" slot="start">{{ pageTitle }}</ion-title>

        <ion-buttons id="backIcon" slot="end">
          <ion-back-button
            v-if="pageTitle != 'my_terrarium'"
            defaultHref="/"
            text=""
          ></ion-back-button>
        </ion-buttons>
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
</template>

<script>
import {
  IonHeader,
  IonTitle,
  IonContent,
  IonToolbar,
  IonFooter,
  IonButtons,
  IonMenuButton,
  IonBackButton
  
} from "@ionic/vue";


export default {
  props: ["page-title"],
  components: {
    IonHeader,
    IonTitle,
    IonContent,
    IonToolbar,
    IonFooter,
    IonButtons,
    IonMenuButton,
    IonBackButton
  },
  
};
</script>

<style scoped>
#pageTitle {
  font: bold;
  font-size: 110%;
}
#backIcon {
  margin-right: 1%;
}
</style>
