<template>
  <ion-page>
    <base-layout
      :page-title="'Histórico ' + id.charAt(0).toUpperCase() + id.slice(1)"
    >
      <div id="buttonGroup">
        <ion-button id="iconButton" @click="getDataFromDb()">
          <ion-icon :icon="refresh"></ion-icon>
        </ion-button>
        <ion-button id="iconButton" @click="deleteHistoric()">
          <ion-icon :icon="trashOutline"></ion-icon>
        </ion-button>
      </div>
      <ion-list lines="full">
        <ion-list-header>
          <ion-label id="listTitle">
            {{ "Valor " + simbolo }}
          </ion-label>
          <ion-label id="listTitle">
            Fecha
          </ion-label>
        </ion-list-header>
        <div id="listStyle">
          <ion-item v-for="parameter in parameters" :key="parameter">
            <ion-label id="items"> {{ parameter.value }} </ion-label>
            <ion-label id="items">
              {{ parseDate(parameter.created_at) }}
            </ion-label>
          </ion-item>
        </div>
      </ion-list>
    </base-layout>
  </ion-page>
</template>
<script>
import {
  IonLabel,
  IonPage,
  IonList,
  IonListHeader,
  IonItem,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { useRoute } from "vue-router";
import { trashOutline, refresh } from "ionicons/icons";

const axios = require("axios").default;
export default {
  components: {
    IonLabel,
    IonPage,
    IonList,
    IonListHeader,
    IonItem,
    IonButton,
    IonIcon,
  },
  computed: {
    id() {
      return useRoute().params.id;
    },
    simbolo() {
      if (this.id === "temperatura") {
        return "ºC";
      } else {
        return "%";
      }
    },
  },

  data() {
    return {
      parameters: [],
      trashOutline,
      refresh,
    };
  },

  updated() {
    this.getDataFromDb();
  },
  methods: {
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

        return (
          day +
          "-" +
          month +
          "-" +
          date.getFullYear() +
          " " +
          hour +
          ":" +
          minute
        );
      } else {
        return "N/A";
      }
    },
    getDataFromDb() {
      axios
        .get("http://api_terrarium.test:8080/get-historic?parametro=" + this.id)
        .then((data) => {
          console.log(data);
          this.parameters = data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteHistoric() {
      console.log(this.id);
      axios
        .delete(
          "http://api_terrarium.test:8080/delete-historic?parametro=" + this.id
        )
        .then((data) => {
          console.log(data);
          this.parameters = [];
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
#listTitle {
  text-align: center;
  font-size: 130%;
  font: bolder;
}
ion-list-header {
  padding-left: 10%;
  padding-right: 10%;
}
ion-list {
  padding-right: 5%;
  padding-left: 5%;
}
#listStyle {
  background-color: #348954;
  padding: 2px;
  margin-bottom:10%;
}
#items {
  text-align: center;
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
