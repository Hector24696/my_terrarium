<template>
  <ion-header>
    <ion-toolbar mode="ios" color="secondary">
      <ion-title id="pageTitle" slot="start">Añadir Configuración</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <form v-on:submit.prevent="onSubmit" name="temperature">
      <ion-item id="inserted" style="margin-top: 10%" lines="none">
        <div style="width:40%">
          <ion-label>Nombre:</ion-label>
        </div>
        <div>
          <ion-input
            v-model="name"
            type="text"
            id="tmp"
            required="true"
          ></ion-input>
        </div>
      </ion-item>
      <ion-item id="inserted" style="margin-top: 10%" lines="none">
        <div style="width:40%">
          <ion-label>Temperatura (ºC):</ion-label>
        </div>
        <div>
          <ion-input
            v-model="temperature"
            id="tmp"
            required="true"
            type="number"
            min="15"
            max="50"
          ></ion-input>
        </div>
      </ion-item>
      <ion-item id="inserted" style="margin-top: 10%" lines="none">
        <div style="width:40%">
          <ion-label>Humedad (%):</ion-label>
        </div>
        <div>
          <ion-input
            v-model="humidity"
            id="tmp"
            required="true"
            type="number"
            min="20"
            max="80"
          ></ion-input>
        </div>
      </ion-item>
      <div id="boton">
        <button class="botones" @click="addConfig()">Aceptar</button>
      </div>
    </form>
    <div id="boton">
      <button class="botones" @click="modalClose(false)">Cancelar</button>
    </div>
  </ion-content>
  <ion-footer>
    <ion-toolbar id="footer" color="secondary">
      <ion-title></ion-title>
    </ion-toolbar>
  </ion-footer>
</template>

<script>
import {
  IonItem,
  IonLabel,
  IonInput,
  modalController,
  IonFooter,
  IonHeader,
  IonContent,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
const axios = require("axios").default;
export default defineComponent({
  name: "Modal",
  props: {
    title: { type: String, default: "Super Modal" },
  },
  data() {
    return {
      content: "Content",
      temperature: 0,
      humidity: 0,
      name: "",
    };
  },
  components: {
    IonItem,
    IonLabel,
    IonInput,
    IonFooter,
    IonHeader,
    IonContent,
    IonTitle,
    IonToolbar,
  },
  methods: {
    compare() {
      if (this.temperature > 50 || this.temperature < 15) {
        return false;
      } else {
        if (this.humidity > 80 || this.humidity < 20) {
          return false;
        }
      }
      return true;
    },
    addConfig() {
      if (this.compare()) {
        axios
          .post("http://api_terrarium.test:8080/add-config", {
            name: this.name,
            temperature: this.temperature.slice(-2),
            humidity: this.humidity.slice(-2),
          })
          .then((data) => {
            console.log(data);
            this.temperature = 0;
            this.humidity = 0;
            this.name = "";
            this.modalClose(true);
          })
          .catch((error) => {
            console.log(error);
            this.modalClose(false, error);
          });
      }
    },
    modalClose(success, error = null) {
      let response = {
        success,
        error,
      };
      modalController.dismiss(response);
    },
  },
});
</script>
<style scoped>
ion-input {
  text-align: center;
  align-self: right;
  background-color: lavender;
  margin-top: 5%;
  margin-bottom: 5%;
  margin-right: 20%;
}
.botones {
  color: white;
  border-radius: 8px;
  background-color: #348954;
  padding: 10px 24px;
  margin-top: 10%;
}
#boton {
  text-align: center;
  right: 0;
  margin: 5%;
}
#inserted {
  margin: 5%;
}
#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 4%;
}
</style>
