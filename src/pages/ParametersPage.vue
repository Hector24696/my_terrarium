<template>
  <ion-page>
    <base-layout page-title="Configuración del Terrario">
      <div id="formularios">
        <form v-on:submit.prevent="onSubmit" name="temperature">
          <ion-item id="inserted" style="margin-top: 10%" lines="none">
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
          <ion-item id="inserted" lines="none">
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
        <table id="tabla">
          <tr id="tituloTabla">
            <th class="param">Parámetro</th>
            <th>Seleccionado</th>
          </tr>
          <tr>
            <td class="param">Temperatura</td>
            <td class="elem">{{ temperatura }} ºC</td>
          </tr>
          <tr>
            <td class="param">Humedad</td>
            <td class="elem">{{ humedad }} %</td>
          </tr>
        </table>
      </div>
      <div id="genericButton">
        <ion-button color="secondary" @click="openModal()" :disabled="count===5">
          <ion-icon :icon="add"></ion-icon>
        </ion-button>
        <ion-label id="counter">({{ count }}/5)</ion-label>
      </div>
      <div id="cards">
        <ion-card
          id="configCard"
          v-for="config in configurations"
          :key="config"
        >
          <ion-card-header>
            <ion-item>
              <div>
                <ion-card-title>{{ config.name }}</ion-card-title>
              </div>
              <div item-right id="boton">
                <ion-button
                  color="primary"
                  item-right
                  @click="sendConfig(config.temperature, config.humidity)"
                >
                  <ion-icon :icon="arrowUp"></ion-icon>
                </ion-button>
                <ion-button color="primary" @click="deleteConfig(config.name)">
                  <ion-icon :icon="trashOutline"></ion-icon>
                </ion-button>
              </div>
            </ion-item>
          </ion-card-header>
          <ion-card-content id="cardContent">
            <ion-item lines="none">
              <div>
                <ion-label>Temperatura: {{ config.temperature }}ºC</ion-label>
                <ion-label>Humedad: {{ config.humidity }}%</ion-label>
              </div>
            </ion-item>
          </ion-card-content>
        </ion-card>
      </div>
    </base-layout>
  </ion-page>
</template>

<script>
import {
  IonItem,
  IonInput,
  IonLabel,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonButton,
  IonIcon,
  modalController,
} from "@ionic/vue";
import { trashOutline, add, arrowUp } from "ionicons/icons";
import Modal from "../components/Modal.vue";
const axios = require("axios").default;
export default {
  components: {
    IonItem,
    IonInput,
    IonLabel,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonButton,
    IonIcon,
  },
  data() {
    return {
      temperature: 0,
      humidity: 0,
      temperatura: 0,
      humedad: 0,
      trashOutline,
      configurations: [],
      add,
      arrowUp,
      
    };
  },
  computed:{
    count(){
      return this.configurations.length;
    },

  },
  created() {
    this.getTemperatureFromDb();
    this.getHumidityFromDb();
    this.getConfigurations();
  },
  methods: {
    async openModal() {
      let modal = await modalController.create({
        component: Modal,
        componentProps: {
          propsData: {
            timeStamp: new Date(),
          },
        },
      });
      await modal.present();
      let modalResponse = await modal.onDidDismiss();
      modalResponse.data && this.modalCloseHandler({ ...modalResponse.data });
    },
    modalCloseHandler(_value) {
      console.log("modal-closed", _value);

      if (_value.success) {
        this.getConfigurations();
      } else {
        if (_value.error !== null) {
          alert(_value.error);
        }
      }
    },
    sendConfig(temp, humd) {
      this.temperatura = temp;
      this.humedad = humd;
      this.sendTemperatureToDb();
      this.sendHumidityToDb();
    },
    getConfigurations() {
      axios
        .get("http://api_terrarium.test:8080/get-config")
        .then((data) => {
          console.log(data);
          this.configurations = data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteConfig(elem) {
      console.log(this.id);
      axios
        .delete("http://api_terrarium.test:8080/delete-config?name=" + elem)
        .then((data) => {
          console.log(data);
          this.getConfigurations();
          
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendTemperature(t) {
      t = t.slice(-2);
      if (t <= 50 && t >= 15) {
        this.temperatura = t;
        this.sendTemperatureToDb();
        document.getElementById("tmp").value = "0";
      } else {
        this.temperatura;
      }
    },
    sendHumidity(h) {
      h = h.slice(-2);
      if (h <= 80 && h >= 20) {
        this.humedad = h;
        this.sendHumidityToDb();
        document.getElementById("humidity").value = "0";
      } else {
        this.humedad;
      }
    },
    sendTemperatureToDb() {
      axios
        .post("http://api_terrarium.test:8080/add-new-parameter", {
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
        .post("http://api_terrarium.test:8080/add-new-parameter", {
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
        .get("http://api_terrarium.test:8080/get-parameter?name=temperature")
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
        .get("http://api_terrarium.test:8080/get-parameter?name=humidity")
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
#counter {
  font-size: 120%;
  position: absolute;
  right: 0;
  margin: 5%;
}
#selector {
  align-content: center;
  margin: 5%;
}
ion-input {
  text-align: center;
  align-self: left;
  background-color: lavender;
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 20%;
}
#boton {
  position: absolute;
  right: 0;
  margin: 5%;
}

#datosSeleccionados {
  margin-top: 2%;
}
.actualData {
  font: bolder;
  width: 100%;
  margin: 2%;
}
.botones {
  color: white;
  border-radius: 8px;
  background-color: #348954;
  padding: 10px 24px;
}

#allItems {
  margin-left: 5%;
}
.datos {
  text-align: center;
  background-color: lavender;
  padding: 2%;
}
#configCard {
  margin-top: 5%;
}
table,
th,
td {
  border: 1px solid white;
  border-collapse: collapse;
  padding: 2%;
  color: white;
}
#tabla {
  background-color: #348954;
  width: 75%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
  margin-bottom: 10%;
  padding: 5%;
}
#tr {
  font: bolder;
}
.param {
  text-align: left !important;
}
.elem {
  background-color: #44ae6d;
}
#boton {
  position: absolute;
  right: 0;
  margin: 5%;
}

#genericButton {
  margin: 5%;
}
#cardContent {
  padding-left: 10%;
}
#inserted {
  margin: 5%;
}
#cards {
  margin-bottom: 12%;
}
</style>
