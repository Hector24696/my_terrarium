<template>
  <ion-page>
    <base-layout page-title="My Terrarium">
      <div id="genericButton">
        <ion-button color="secondary" @click="refreshTable()">
          <ion-icon :icon="refresh" ></ion-icon>
        </ion-button>
      </div>

      <table id="tabla">
        <tr id="tituloTabla">
          <th class="param">Parámetro</th>
          <th>Introducido</th>
          <th>Obtenido</th>
        </tr>
        <tr>
          <td class="param">Temperatura</td>
          <td class="elem">{{ temperatura }} ºC</td>
          <td class="elem">{{ temperaturaSensor }} ºC</td>
        </tr>
        <tr>
          <td class="param">Humedad</td>
          <td class="elem">{{ humedad }} %</td>
          <td class="elem">{{ humedadSensor }} %</td>
        </tr>
      </table>

      <div id="genericButton">
        <ion-button color="secondary" @click="getGraphData()">
          <ion-icon :icon="refresh"></ion-icon>
        </ion-button>
        <ion-button color="secondary" @click="deleteAllHistorics()">
          <ion-icon :icon="trashOutline"></ion-icon>
        </ion-button>
      </div>
      <ion-card id="firstCard">
        <ion-card-header>
          <ion-item>
            <div>
              <ion-card-subtitle>Últimos 15 registros de</ion-card-subtitle>
              <ion-card-title>Temperatura</ion-card-title>
            </div>
            <div item-right id="boton">
              <ion-button @click="getTemperatureGraph()">
                <ion-icon :icon="refresh"></ion-icon>
              </ion-button>
              <ion-button @click="deleteTmpHistoric()">
                <ion-icon :icon="trashOutline"></ion-icon>
              </ion-button>
            </div>
          </ion-item>
        </ion-card-header>
        <ion-card-content>
          <GraphCharts
            v-if="stateTmp.isLoaded"
            v-bind:chartData="stateTmp.chartData"
            v-bind:chartOptions="fillOptions()"
          />
        </ion-card-content>
      </ion-card>
      <ion-card id="lastCard">
        <ion-card-header>
          <ion-item>
            <div>
              <ion-card-subtitle>Últimos 15 registros de</ion-card-subtitle>
              <ion-card-title>Humedad</ion-card-title>
            </div>
            <div item-right id="boton">
              <ion-button id="iconButton" @click="getHumidityGraph()">
                <ion-icon :icon="refresh"></ion-icon>
              </ion-button>
              <ion-button id="iconButton" @click="deleteHumHistoric()">
                <ion-icon :icon="trashOutline"></ion-icon>
              </ion-button>
            </div>
          </ion-item>
        </ion-card-header>
        <ion-card-content>
          <GraphCharts
            v-if="stateHum.isLoaded"
            v-bind:chartData="stateHum.chartData"
            v-bind:chartOptions="fillOptions()"
          />
        </ion-card-content>
      </ion-card>
    </base-layout>
  </ion-page>
</template>

<script>
import { refresh, trashOutline } from "ionicons/icons";
import {
  IonPage,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";
import GraphCharts from "../components/GraphCharts.vue";
const axios = require("axios").default;
export default defineComponent({
  components: {
    IonPage,
    IonItem,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    GraphCharts,
    IonButton,
    IonIcon,
  },

  updated() {
    this.getTemperatureFromDb();
    this.getHumidityFromDb();
    this.getTemperatureFromSensor();
    this.getHumidityFromSensor();
  },
  beforeMount() {
    this.getGraphData();
  },

  data() {
    return {
      trashOutline,
      refresh,
      temperature: 0,
      humidity: 0,
      temperatura: 0,
      humedad: 0,
      temperaturaSensor: 0,
      humedadSensor: 0,
      stateTmp: {
        isLoaded: false,
        chartData: null,
      },
      stateHum: {
        isLoaded: false,
        chartData: null,
      },
    };
  },
  methods: {
    fillData(graphParameter, data) {
      return {
        labels: this.timeToArray(data),
        datasets: [
          {
            label: graphParameter,
            data: this.dataToArray(data),
            backgroundColor: "rgba(255,255,255, 0.3)",
            borderColor: "#348954",
            borderWidth: 3,
          },
        ],
      };
    },
    fillOptions() {
      return {
        responsive: true,
        lineTension: 1,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 1,
                beginAtZero: false,
                padding: 20,
              },
            },
          ],
        },
      };
    },
    refreshTable(){
      this.getTemperatureFromDb();
      this.getHumidityFromDb();
      this.getTemperatureFromSensor();
      this.getHumidityFromSensor();
    },
    getGraphData() {
      this.getTemperatureGraph();
      this.getHumidityGraph();
    },
    deleteAllHistorics() {
      this.deleteTmpHistoric();
      this.deleteHumHistoric();
    },
    timeToArray(temperatureGraph) {
      console.log(temperatureGraph.map((a) => this.parseDate(a.updated_at)));
      return temperatureGraph.map((a) => this.parseDate(a.updated_at));
    },
    dataToArray(temperatureGraph) {
      console.log(temperatureGraph.map((a) => a.value));
      return temperatureGraph.map((a) => a.value);
    },
    parseDate(fecha) {
      var date = new Date(fecha);
      if (!isNaN(date.getTime())) {
        let month = date.getMonth();
        month = date.getMonth() + 1;
        let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        month = month > 9 ? month : "0" + month;
        let hour =
          date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
        let minute =
          date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
        let second =
          date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();

        return day + "/" + month + " " + hour + ":" + minute + ":" + second;
      } else {
        return "N/A";
      }
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

    getTemperatureFromSensor() {
      axios
        .get("http://api_terrarium.test:8080/get-sensor-value?name=temperature")
        .then((data) => {
          console.log("temp");
          console.log(data);
          this.temperaturaSensor = data.data.value;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getHumidityFromSensor() {
      axios
        .get("http://api_terrarium.test:8080/get-sensor-value?name=humidity")
        .then((data) => {
          console.log("hum");
          console.log(data);
          this.humedadSensor = data.data.value;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getTemperatureGraph() {
      this.stateTmp.isLoaded = false;
      axios
        .get("http://api_terrarium.test:8080/get-graphs?name=temperature")
        .then((data) => {
          console.log(data);
          this.stateTmp.chartData = this.fillData("Temperatura", data.data);
          this.stateTmp.isLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getHumidityGraph() {
      this.stateHum.isLoaded = false;
      axios
        .get("http://api_terrarium.test:8080/get-graphs?name=humidity")
        .then((data) => {
          console.log(data);
          this.stateHum.chartData = this.fillData("Humedad", data.data);
          this.stateHum.isLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteTmpHistoric() {
      console.log(this.id);
      axios
        .delete(
          "http://api_terrarium.test:8080/delete-historic?parametro=temperatura"
        )
        .then((data) => {
          console.log(data);
          this.parameters = [];
          this.getTemperatureGraph();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteHumHistoric() {
      console.log(this.id);
      axios
        .delete("http://api_terrarium.test:8080/delete-historic?parametro=humedad")
        .then((data) => {
          console.log(data);
          this.parameters = [];
          this.getHumidityGraph();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style scoped>
#iconButton {
  text-align: right;
}
#lastCard {
  margin-bottom: 10%;
}

#boton {
  position: absolute;
  right: 0;
  margin: 5%;
}
#genericButton {
  margin: 5%;
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
  margin-top: 5%;
  margin-bottom: 5%;
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
</style>
