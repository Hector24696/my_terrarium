<template>
  <ion-page>
    <base-layout page-title="Actuadores">
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
const axios = require("axios").default;
export default {
  components: { IonLabel, IonPage, IonList, IonItem, IonCheckbox },
  data() {
    return {
      actuators: [],
    };
  },
  created() {
    this.getActuators();
  },
  methods: {
    getActuators() {
      axios
        .get("http://192.168.0.104:8080/get-actuators")
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
</style>
