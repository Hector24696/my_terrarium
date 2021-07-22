<script>
import { defineComponent } from 'vue'
import { Line } from 'vue3-chart-v2'


export default defineComponent({
  name: 'GraphCharts',
  extends: Line,
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      required: false
    },
  },
  mounted () {
    console.log(this.chartOptions);
    this.renderChart(this.chartData, this.chartOptions)
  }
})
</script>