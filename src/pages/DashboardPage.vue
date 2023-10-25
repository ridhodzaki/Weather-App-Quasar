<template>
  <q-layout view="lHh Lpr lFf" class="text-grey-10">
    <q-header class="bg-white text-grey-8">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        />
      <div class="flex flex-center col q-mr-lg">
        Weather App
      </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :show-if-above="this.$q.screen.xl || this.$q.screen.lg || this.$q.screen.md"
      :width="200"
      :breakpoint="400"
      class="text-grey-8"
      :overlay="this.$q.screen.xs ? true : false"
      :behavior="this.$q.screen.xs ? 'mobile' : 'desktop'"
    >
      <q-scroll-area style="height: calc(100% - 180px); margin-top: 180px; border-right: 1px solid #ddd">
        <q-list padding>
          <template
            v-for="(drawer, i) in listDrawer"
            :key="i">
            <q-item
              :to="{ name: drawer.to }"
              clickable
              v-ripple
              exact
              class="item"
              active-class="item-active">
              <q-item-section avatar>
                <q-icon :name="drawer.icon" />
              </q-item-section>

              <q-item-section>
                {{ drawer.name }}
              </q-item-section>
            </q-item>

            <q-item
              to="dashboard"
              clickable
              v-ripple
              exact
              class="item absolute-bottom q-mb-md"
              style="margin-bottom: 20px">
              <q-item-section avatar>
                <q-icon name="mdi-account" />
              </q-item-section>

              <q-item-section>
                About Author
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>

      <div class="absolute-top q-pa-md" style="height: 180px; width: 100%">
        <div class="absolute-bottom bg-transparent q-pa-md">
          <div class="column">
            <span class="text-weight-bold text-body1">Creator</span>
          </div>
          <div class="flex flex-center">
            <q-avatar size="80px" class="q-mb-sm">
              <img src="img/avatar.jpg">
            </q-avatar>
          </div>
          <div class="column">
            <span class="text-weight-bold text-body1">Riki</span>
            <span class="text-subtitle">@ridhodzaki</span>
          </div>
        </div>
      </div>
    </q-drawer>
    <q-page-container>
      <q-page class="column">
        <div class="row">
          <div class="col-md-4 col-sm-6 col-xs-12 q-px-lg" :style="`height: ${this.$q.screen.height - 50}px`">
            <q-input
              outlined
              dense
              color="white"
              v-model="search"
              @keyup.enter="getLocationbyCity()"
              placeholder="Search for city...">
              <template v-slot:before>
                <q-btn @click="getLocation()" icon="mdi-crosshairs-gps" flat dense />
              </template>
              <template v-slot:append>
                <q-btn @click="getLocationbyCity()" icon="search" flat dense color="grey-8" />
              </template>
            </q-input>
            <div v-if="weather !== null" class="">
              <div class="row justify-center" :style="`height: ${this.$q.screen.height - 420}px`">
                <div class="col-auto column flex flex-center">
                  <img
                    :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`"
                    style="width: 80%"/>
                    <span class="text-h5">{{ capitalizeEveryWord(weather.weather[0].description) }}</span>
                    <q-btn v-if="this.$q.screen.xs" @click="detail = !detail" label="Detail" color="grey-8" no-caps class="q-mt-xl" rounded padding="xs xl"/>
                </div>
              </div>
              <div class="column q-my-md">
                <span class="text-body"> {{ weather.name }} </span>
                <span class="text-h2 text-weight-medium q-mt-md"> {{ Math.round(weather.main.temp - 273.15) }}&deg;<span class="text-weight-medium absolute" style="margin-top: -12px;">c</span></span>
                <div class="row q-gutter-sm">
                  <span class="text-h6">{{ this.$parseDate(weather.dt).date }}</span>
                  <span class="text-h6 text-grey-8">{{ this.$parseDate(weather.dt).time }}</span>
                </div>
              </div>
              <q-separator/>
              <div class="q-pt-md column text-h5 text-weight-regular">
                <span>It's</span>
                <span> {{ weather.weather[0].main }} </span>
              </div>
              <div class="row">
                <div class="col-auto q-py-sm q-mr-sm">
                  <div class="row items-center">
                    <div class="col-auto q-mr-sm">
                      <q-icon name="mdi-weather-windy" size="sm"/>
                    </div>
                    <div class="col-auto">
                      <div class="q-pr-sm column" style="border-radius: 5px">
                        <span class="text-body text-grey-6">Wind</span>
                        <span class="text-body1 text-grey-9">{{ weather.wind.speed }} m/s</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-auto q-py-sm  q-ml-sm">
                  <div class="row items-center">
                      <div class="col-auto">
                        <q-icon name="mdi-umbrella-outline" size="sm"/>
                      </div>
                      <div class="col-auto">
                        <div class="q-pl-sm column" style="border-radius: 5px">
                          <span class="text-body text-grey-6">Humidity</span>
                          <span class="text-body1 text-grey-9">{{ weather.main.humidity }} %</span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="column flex flex-center text-center" :style="`height: ${this.$q.screen.height - 90}px`">
              <div class="column text-h2 text-weight-medium">
                <span>Quasar</span>
                <span>Weather</span>
              </div>
              <span class="q-mt-lg text-center" style="width: 75%; font-size: 12px">Aplikasi Weather menggunakan framework Quasar dengan OpenWeatherMap.</span>
              <q-separator color="grey-9" class="q-my-sm" style="width: 100%;"/>
              <span class="text-center" style="width: 75%; font-size: 12px">Untuk Memulainya, anda dapat meng-klik tombol cari lokasi atau memasukan nama kota anda</span>
            </div>
          </div>
          <div v-if="this.$q.screen.xl || this.$q.screen.lg || this.$q.screen.md || this.$q.screen.sm" class="col-md-8 col-sm-6 bg-grey-2" :style="`height: ${this.$q.screen.height - 50}px`">
            <div class="column">
              <div class="q-mt-sm q-pa-md column">
                <span class="text-h5 text-weight-bold">Weather Forecast</span>
              </div>
              <q-scroll-area :style="`height: ${ this.$q.screen.sm ? '200' :'200' }px`">
                <div class="row no-wrap" v-if="this.weather !== null">
                  <div
                    v-for="(weather, i) in data.list"
                    :key="i"
                    :class="`col-md-2 col-sm-4 bg-white q-pa-sm q-ma-sm ${this.$parseDate(weather.dt).day === 'Today' ? 'bg-orange-9 text-white' : ''}`" style="border-radius: 10px">
                    <div class="flex flex-center column">
                      <span class="text-body1">{{ this.$parseDate(weather.dt).day }}</span>
                      <!-- <span class="text-body1">{{ this.$parseDate(weather.dt).time }}</span> -->
                      <img :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`" style="width: 80%">
                      <span class="text-body1 text-weight-medium ">
                        {{ Math.round(weather.main.temp - 273.15) }}&deg;
                        <span class="absolute" style="margin-top: -2px;">c</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="q-pa-sm" v-else>
                  <div class="bg-white q-pa-sm col-12 text-center flex flex-center" style="border-radius: 10px; height: 180px">
                    <span class="text-h6">Anda belum memulai aplikasi ini</span>
                  </div>
                </div>
              </q-scroll-area>
              <div class="q-mt-sm q-pa-md column">
                <span class="text-h5 text-weight-bold">Today's Highlights</span>
              </div>
              <q-scroll-area :style="`height: ${ this.$q.screen.height - 400}px`">
                <div class="row q-mt-md" v-if="this.weather !== null">
                  <div class="col-md-4 col-sm-12 col-xs-12 q-pa-sm">
                    <div class="bg-white q-pa-md" style="border-radius: 5px; height: 100%">
                      <span class="text-grey-5">Sunrise & Sunset</span>
                      <div class="row q-mt-sm items-center flex flex-center">
                        <div class="col-4">
                          <q-icon name="mdi-arrow-up-circle-outline" color="orange-9" size="lg"/>
                        </div>
                        <div class="col q-ml-sm column">
                          <span class="text-h6">{{ this.$parseDate(weather.sys.sunrise).time }}</span>
                          <!-- <span class="text-grey-5" style="font-size: 12px">{{ this.$difference(weather.sys.sunrise, weather.dt) }}</span> -->
                        </div>
                      </div>
                      <div class="row q-mt-sm items-center">
                        <div class="col-4">
                          <q-icon name="mdi-arrow-down-circle-outline" color="orange-9" size="lg"/>
                        </div>
                        <div class="col q-ml-sm column">
                          <span class="text-h6">{{ this.$parseDate(weather.sys.sunset).time }}</span>
                          <!-- <span class="text-grey-5" style="font-size: 12px">{{ this.$difference(weather.sys.sunset, weather.dt) }}</span> -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12 col-xs-12 q-pa-sm">
                    <div class="bg-white q-pa-md" style="border-radius: 5px; height: 100%">
                      <span class="text-grey-5">Temperature</span>
                      <div class="row items-center justify-evenly q-mt-md">
                        <div class="col-auto column">
                          <span class="text-h3 text-weight-medium q-mt-md"> {{ Math.round(weather.main.temp - 273.15) }}&deg;</span>
                          <span class="text-grey-6">Celcius</span>
                        </div>
                        <div class="col-auto column">
                          <div class="col-auto ">
                            <div class="row item-center flex flex-center">
                              <div class="col-auto">
                                <q-icon name="mdi-menu-up" color="negative" size="md"/>
                              </div>
                              <div class="col-auto">
                                <span class="text-grey-5">{{ Math.round(weather.main.temp_max - 273.15) }}</span>
                              </div>
                            </div>
                          </div>
                          <div class="col-auto ">
                            <div class="row item-center flex flex-center">
                              <div class="col-auto">
                                <q-icon name="mdi-menu-down" color="positive" size="md"/>
                              </div>
                              <div class="col-auto">
                                <span class="text-grey-5">{{ Math.round(weather.main.temp_max - 273.15) }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12 col-xs-12 q-pa-sm">
                    <div class="bg-white q-pa-md" style="border-radius: 5px; height: 100%">
                      <span class="text-grey-5">Visibility</span>
                      <div class="items-center flex flex-center text-center q-mt-lg">
                        <span class="text-h3 text-weight-medium"> {{ Math.round(weather.visibility / 1000) }}
                          <span class="text-grey-5">Km</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="q-mt-md row" v-else>
                  <div class="col-md-4 col-sm-12 col-xs-12 q-pa-sm">
                    <div class="bg-white q-pa-md" style="border-radius: 5px; height: 100%">
                      <span class="text-grey-5">Sunrise & Sunset</span>
                      <div class="row q-mt-sm items-center flex flex-center">
                        <div class="col-4">
                          <q-icon name="mdi-arrow-up-circle-outline" color="orange-9" size="lg"/>
                        </div>
                        <div class="col q-ml-sm column">
                          <span class="text-h6">0</span>
                          <!-- <span class="text-grey-5" style="font-size: 12px">{{ this.$difference(weather.sys.sunrise, weather.dt) }}</span> -->
                        </div>
                      </div>
                      <div class="row q-mt-sm items-center">
                        <div class="col-4">
                          <q-icon name="mdi-arrow-down-circle-outline" color="orange-9" size="lg"/>
                        </div>
                        <div class="col q-ml-sm column">
                          <span class="text-h6">0</span>
                          <!-- <span class="text-grey-5" style="font-size: 12px">{{ this.$difference(weather.sys.sunset, weather.dt) }}</span> -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12 col-xs-12 q-pa-sm">
                    <div class="bg-white q-pa-md" style="border-radius: 5px; height: 100%">
                      <span class="text-grey-5">Temperature</span>
                      <div class="row items-center justify-evenly q-mt-md">
                        <div class="col-auto column">
                          <span class="text-h3 text-weight-medium q-mt-md"> 0&deg;</span>
                          <span class="text-grey-6">Celcius</span>
                        </div>
                        <div class="col-auto column">
                          <div class="col-auto ">
                            <div class="row item-center flex flex-center">
                              <div class="col-auto">
                                <q-icon name="mdi-menu-up" color="negative" size="md"/>
                              </div>
                              <div class="col-auto">
                                <span class="text-grey-5">0</span>
                              </div>
                            </div>
                          </div>
                          <div class="col-auto ">
                            <div class="row item-center flex flex-center">
                              <div class="col-auto">
                                <q-icon name="mdi-menu-down" color="positive" size="md"/>
                              </div>
                              <div class="col-auto">
                                <span class="text-grey-5">0</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12 col-xs-12 q-pa-sm">
                    <div class="bg-white q-pa-md" style="border-radius: 5px; height: 100%">
                      <span class="text-grey-5">Visibility</span>
                      <div class="items-center flex flex-center text-center q-mt-lg">
                        <span class="text-h3 text-weight-medium">0
                          <span class="text-grey-5">Km</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </q-scroll-area>
            </div>
          </div>
        </div>
        <q-dialog
          v-model="detail"
          persistent
          maximized
          transition-show="slide-left"
          transition-hide="slide-right"
        >
          <q-card class="bg-grey-2 text-grey-8">
            <div class="bg-grey-2 row q-pt-md q-pr-md">
              <q-space />
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
            </div>

            <q-card-section>
              <div class="column">
                <div class="q-mt-sm q-pa-md column">
                  <span class="text-h5 text-weight-bold">Weather Forecast</span>
                </div>
                <q-scroll-area :style="`height: ${ this.$q.screen.sm ? '200' :'200' }px`">
                  <div class="row no-wrap">
                    <div
                      v-for="(weather, i) in data.list"
                      :key="i"
                      :class="`col-md-2 col-sm-4 col-xs-4 bg-white q-pa-sm q-ma-sm ${this.$parseDate(weather.dt).day === 'Today' ? 'bg-orange-9 text-white' : ''}`" style="border-radius: 10px">
                      <div class="flex flex-center column">
                        <span class="text-body1">{{ this.$parseDate(weather.dt).day }}</span>
                        <!-- <span class="text-body1">{{ this.$parseDate(weather.dt).time }}</span> -->
                        <img :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`" style="width: 80%">
                        <span class="text-body1 text-weight-medium ">
                          {{ Math.round(weather.main.temp - 273.15) }}&deg;
                          <span class="absolute" style="margin-top: -2px;">c</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </q-scroll-area>
                <div class="q-mt-md q-pa-md column" v-if="data !== null">
                  <q-scroll-area :style="`height: ${ this.$q.screen.height - 370}px`">
                    <span class="text-h5 text-weight-bold">Today's Highlights</span>
                    <div class="row q-mt-md">
                      <div class="col-md-4 col-sm-12 col-xs-12 q-pa-sm">
                        <div class="bg-white q-pa-md" style="border-radius: 5px; height: 100%">
                          <span class="text-grey-5">Sunrise & Sunset</span>
                          <div class="row q-mt-sm items-center flex flex-center">
                            <div class="col-4">
                              <q-icon name="mdi-arrow-up-circle-outline" color="orange-9" size="lg"/>
                            </div>
                            <div class="col q-ml-sm column">
                              <span class="text-h6">{{ this.$parseDate(weather.sys.sunrise).time }}</span>
                              <!-- <span class="text-grey-5" style="font-size: 12px">{{ this.$difference(weather.sys.sunrise, weather.dt) }}</span> -->
                            </div>
                          </div>
                          <div class="row q-mt-sm items-center">
                            <div class="col-4">
                              <q-icon name="mdi-arrow-down-circle-outline" color="orange-9" size="lg"/>
                            </div>
                            <div class="col q-ml-sm column">
                              <span class="text-h6">{{ this.$parseDate(weather.sys.sunset).time }}</span>
                              <!-- <span class="text-grey-5" style="font-size: 12px">{{ this.$difference(weather.sys.sunset, weather.dt) }}</span> -->
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-12 col-xs-12 q-pa-sm">
                        <div class="bg-white q-pa-md" style="border-radius: 5px; height: 100%">
                          <span class="text-grey-5">Temperature</span>
                          <div class="row items-center justify-evenly q-mt-md">
                            <div class="col-auto column">
                              <span class="text-h3 text-weight-medium q-mt-md"> {{ Math.round(weather.main.temp - 273.15) }}&deg;</span>
                              <span class="text-grey-6">Celcius</span>
                            </div>
                            <div class="col-auto column">
                              <div class="col-auto ">
                                <div class="row item-center flex flex-center">
                                  <div class="col-auto">
                                    <q-icon name="mdi-menu-up" color="negative" size="md"/>
                                  </div>
                                  <div class="col-auto">
                                    <span class="text-grey-5">{{ Math.round(weather.main.temp_max - 273.15) }}</span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-auto ">
                                <div class="row item-center flex flex-center">
                                  <div class="col-auto">
                                    <q-icon name="mdi-menu-down" color="positive" size="md"/>
                                  </div>
                                  <div class="col-auto">
                                    <span class="text-grey-5">{{ Math.round(weather.main.temp_max - 273.15) }}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-12 col-xs-12 q-pa-sm">
                        <div class="bg-white q-pa-md" style="border-radius: 5px; height: 100%">
                          <span class="text-grey-5">Visibility</span>
                          <div class="items-center flex flex-center text-center q-mt-lg">
                            <span class="text-h3 text-weight-medium"> {{ Math.round(weather.visibility / 1000) }}
                              <span class="text-grey-5">Km</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </q-scroll-area>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      search: '',
      lat: 0,
      lng: 0,
      drawer: false,
      detail: false,
      listDrawer: [
        {
          to: 'dashboard',
          icon: 'mdi-monitor-dashboard',
          name: 'Dashboard'
        }
      ],
      data: {
        list: []
      },
      weather: null
    }
  },
  created () {
    console.log(this.data)
  },
  methods: {
    async getLocationbyCity () {
      this.$showLoading()
      this.$apiOpenWeather.get('weather', {
        params: {
          q: this.search,
          appid: this.$keyOpenWeather
        }
      }).finally(() => this.$hide())
        .then((res) => {
          console.log(res)
          this.lat = res.data.coord.lat
          this.lng = res.data.coord.lon
          this.weather = res.data
          this.getList()
        })
        .catch((err) => {
          console.log(err)
          Swal.fire({
            title: 'Error!',
            text: 'Kota tidak ditemukan',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        })
    },
    async getLocation () {
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

              // console.log(position.coords.accuracy)

              // Periksa akurasi, jika lebih dari 30, panggil getLocation kembali
              if (position.coords.accuracy >= 8000) {
                recursiveGetLocation() // Coba lagi
              } else {
                this.$hide()
                this.getData()
                this.getList()
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
      this.$apiOpenWeather.get('weather', {
        params: {
          lat: this.lat,
          lon: this.lng,
          appid: this.$keyOpenWeather
        }
      }).finally(() => this.$hide())
        .then((res) => {
          const weatherData = res.data
          this.weather = weatherData
          console.log(this.weather)
          // if (weatherData && weatherData.dt) {
          // const timestamp = weatherData.dt
          // const date = new Date(timestamp * 1000)

          //   console.log('Tanggal cuaca:', date)
          // } else {
          //   console.error('Data cuaca tidak lengkap')
          // }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getList () {
      this.$showLoading()
      this.$apiOpenWeather.get('forecast', {
        params: {
          lat: this.lat,
          lon: this.lng,
          appid: this.$keyOpenWeather
        }
      }).finally(() => this.$hide())
        .then((res) => {
          const data = res.data
          // console.log(data.list)
          const newData = data.list.filter((weatherData) => weatherData.dt_txt.endsWith('12:00:00'))
          data.list = newData
          // console.log(data)
          this.data = data
          // console.log(this.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    capitalizeEveryWord (sentence) {
      return sentence.replace(/\b\w/g, char => char.toUpperCase())
    }
  }
}
</script>
