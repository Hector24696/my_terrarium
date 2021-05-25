<template>
  <base-layout page-title="my_terrarium">
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
    <ion-item lines="none" id="datosSeleccionados">
      <ion-label id="actualData" position="stacked"
        >Temperatura Seleccionada</ion-label
      >
      <ion-label position="stacked">{{ temperatura }}</ion-label>
    </ion-item>
    <ion-item lines="none" id="datosSeleccionados">
      <ion-label id="actualData" position="stacked"
        >Humedad Seleccionada</ion-label
      >
      <ion-label position="stacked">{{ humedad }}</ion-label>
    </ion-item>
  </base-layout>
</template>

<script>
import { IonItem, IonInput, IonLabel } from "@ionic/vue";
const axios = require('axios').default;
export default {
  components: {
    IonItem,
    IonInput,
    IonLabel,
  },
  data() {
    return {
      temperature: 0,
      humidity: 0,
      temperatura: 0,
      humedad: 0,
    };
  },
  created(){
    this.getTemperatureFromDb();
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
      } else {
        this.humedad;
      }
    },
    sendTemperatureToDb(){
      axios.post('http://api_terrarium.test/add-new-temperature', {temperature : this.temperatura})
        .then(data=>{console.log(data)})
        .catch(error=>{console.log(error)})
    },
    getTemperatureFromDb(){
      axios.get('http://api_terrarium.test/get-temperature')
        .then(data=>{
          console.log(data);
          this.temperatura=data.data[0].temperature
        })
        .catch(error=>{console.log(error)})
    }
  },
};
</script>

<style scoped>
ion-input {
  text-align: center;
  align-self: left;
  background-color: lavender;
  margin: 5px;
}

#boton {
  position: absolute;
  right: 0;
  margin: 20px;
}
ion-item {
  padding: 5px;
}
#datosSeleccionados {
  text-align: center;
  margin-top: 40px;
}
#actualData {
  font: bold;
}
.botones {
  color: white;
  border-radius: 8px;
  background-color: #348954;
  padding: 10px 24px;
}
</style>
