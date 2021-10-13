<template>
  <ion-header>
    <ion-toolbar mode="ios" color="secondary">
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-title id="pageTitle" slot="start">{{ pageTitle }}</ion-title>
      
      <ion-buttons id="backIcon" slot="end">
        <ion-button router-link="/parameter_historics">
          <ion-icon
            v-if="
              pageTitle == 'Histórico Temperatura' ||
                pageTitle == 'Histórico Humedad'
            "
            :icon="chevronBackOutline"
          ></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <slot />
  </ion-content>
  <ion-footer>
    <ion-toolbar id="footer" color="secondary">
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
  IonIcon,
  IonButton
} from "@ionic/vue";
import { chevronBackOutline } from "ionicons/icons";

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
    IonIcon,
    IonButton
  },

  data() {
    return {
      chevronBackOutline,
    };
  },
  computed: {
    condition() {
      return "My Terrarium && Históricos && Actuadores";
    },
  },
  methods: {
    back() {
      this.route.navigate(['/parameter_historics/']);
    },
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
#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 4%;
}
</style>
