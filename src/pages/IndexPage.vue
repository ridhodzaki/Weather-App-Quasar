<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      lat: 0,
      lng: 0
    }
  },
  created () {
    this.getLocation()
  },
  methods: {
    getLocation () {
      this.$showLoading()

      if ('geolocation' in navigator) {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }

        // Fungsi rekursif untuk terus mencoba mendapatkan lokasi
        const recursiveGetLocation = () => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.lat = position.coords.latitude
              this.lng = position.coords.longitude

              // Periksa akurasi, jika lebih dari 30, panggil getLocation kembali
              if (position.coords.accuracy >= 30) {
                recursiveGetLocation() // Coba lagi
              } else {
                this.$hide()
                this.getData()
              }
            },
            (error) => {
              this.$hide()
              console.error('Error getting location:', error)
              this.isLoading = false
              this.$q.notify({
                message: 'Gagal Mendapatkan Lokasi, Coba lagi nanti',
                color: 'negative'
              })
            },
            options
          )
        }

        // Mulai mencoba mendapatkan lokasi
        recursiveGetLocation()
      } else {
        console.error('Geolocation is not available in this browser.')
        this.isLoading = false
      }
    },
    getData () {
      this.$showLoading()
      this.$api.get('timelines', {
        params: {
          location: `${this.lat}, ${this.lng}`,
          fields: 'temperature',
          timesteps: '1d',
          units: 'metric',
          apikey: this.$key
        }
      }).finally(() => this.$hide())
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
