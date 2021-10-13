<template>
  <ion-page>
    <base-layout page-title="Actuadores">
     <div id="buttonGroup">
        <ion-button  id="iconButton" @click="getActuators()">
          <ion-icon :icon="refresh"></ion-icon>
        </ion-button>
      </div>
      <ion-list lines="full">
        <ion-item v-for="actuator in actuators" :key="actuator">
          <ion-label id="actuador">
            {{ actuator.val }}
          </ion-label>
          <ion-checkbox
            slot="end"
            color="primary"
            disabled="disabled"
            :checked= actuator.st
          >
          </ion-checkbox>
        </ion-item>
      </ion-list>
    </base-layout>
  </ion-page>
</template>
<script>
import { IonLabel, IonPage, IonList, IonItem, IonCheckbox } from "@ionic/vue";
import {  refresh } from "ionicons/icons";
const axios = require("axios").default;
export default {
  components: { IonLabel, IonPage, IonList, IonItem, IonCheckbox },
  data() {
    return {
      actuators: [], refresh,
    };
  },
  updated() {
    this.getActuators();
  },
  methods: {
    getActuators() {
      axios
        .get("http://api_terrarium.test:8080/get-actuators")
        .then((data) => {
          console.log(data);
          this.actuators = data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  
  },
};
</script>
<style scoped>
#actuador {
  text-align: left;
  padding-left: 20%;
}

ion-checkbox.checkbox-disabled {
  opacity: 1 !important;
}
ion-label {
  opacity: 1 !important;
}
ion-list {
  padding-left: 10%;
  padding-right: 10%;
}
#iconButton {
  margin-top: 4%;
  margin-bottom: 2%;
}
#buttonGroup {
  text-align: right;
  margin-right: 5%;
}
</style>
