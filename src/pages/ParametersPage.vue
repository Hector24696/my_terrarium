<template>
  <ion-page>
    <base-layout page-title="Configuración del Terrario">
      <div id="formularios">
        <form v-on:submit.prevent="onSubmit" name="temperature">
          <ion-item style="margin-top: 10%" lines="none">
            <div style="width:40%">
              <ion-label>Temperatura (ºC)</ion-label>
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
            <div id="boton">
              <button class="botones" @click="sendTemperature(temperature)">
                Enviar
              </button>
            </div>
          </ion-item>
        </form>
        <form v-on:submit.prevent="onSubmit" name="humidity">
          <ion-item lines="none">
            <div style="width:40%">
              <ion-label>Humedad (%)</ion-label>
            </div>
            <div>
              <ion-input
                v-model="humidity"
                id="humidity"
                required="true"
                type="number"
                min="20"
                max="80"
              ></ion-input>
            </div>
            <div id="boton">
              <button class="botones" @click="sendHumidity(humidity)">
                Enviar
              </button>
            </div>
          </ion-item>
        </form>
      </div>
      <div id="allItems">
        <ion-item position="stacked" lines="none" id="datosSeleccionados">
          <ion-label class="actualData">Temperatura Seleccionada</ion-label>
          <ion-label class="datos" position="fixed"
            >{{ temperatura }} ºC</ion-label
          >
        </ion-item>

        <ion-item position="stacked" lines="none" id="datosSeleccionados">
          <ion-label class="actualData">Humedad Seleccionada</ion-label>
          <ion-label class="datos" position="fixed">{{ humedad }} %</ion-label>
        </ion-item>
      </div>
    </base-layout>
  </ion-page>
</template>

<script>
import { IonItem, IonInput, IonLabel, IonPage } from "@ionic/vue";
const axios = require("axios").default;
export default {
  components: {
    IonItem,
    IonInput,
    IonLabel,
    IonPage
  },
  data() {
    return {
      temperature: 0,
      humidity: 0,
      temperatura: 0,
      humedad: 0,
    };
  },
  created() {
    this.getTemperatureFromDb();
    this.getHumidityFromDb();
  },
  methods: {
    sendTemperature(t) {
      t = t.slice(-2);
      if (t <= 50 && t >= 15) {
        this.temperatura = t;
        this.sendTemperatureToDb();
      } else {
        this.temperatura;
      }
    },
    sendHumidity(h) {
      h = h.slice(-2);
      if (h <= 80 && h >= 20) {
        this.humedad = h;
        this.sendHumidityToDb();
      } else {
        this.humedad;
      }
    },
    sendTemperatureToDb() {
      axios
        .post("http://192.168.0.104:8080/add-new-parameter", {
          value: this.temperatura,
          name: "temperature",
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendHumidityToDb() {
      axios
        .post("http://192.168.0.104:8080/add-new-parameter", {
          value: this.humedad,
          name: "humidity",
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getTemperatureFromDb() {
      axios
        .get("http://192.168.0.104:8080/get-parameter?name=temperature")
        .then((data) => {
          console.log(data);
          this.temperatura = data.data[0].value;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getHumidityFromDb() {
      axios
        .get("http://192.168.0.104:8080/get-parameter?name=humidity")
        .then((data) => {
          console.log(data);
          this.humedad = data.data[0].value;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
ion-input {
  text-align: center;
  align-self: left;
  background-color: lavender;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 20px;
}
#boton {
  position: absolute;
  right: 0;
  margin: 20px;
}

#datosSeleccionados {
  margin-top: 40px;
}
.actualData {
  font: bolder;
  width: 100%;
  margin: 5px;
}
.botones {
  color: white;
  border-radius: 8px;
  background-color: #348954;
  padding: 10px 24px;
}

ion-item {
  margin: 10px;
}
#allItems {
  margin-left: 20px;
}
.datos {
  text-align: center;
  background-color: lavender;
  padding: 10px;
}
</style>
