import { boot } from 'quasar/wrappers'
import { date } from 'quasar'

function getDayName (index) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days[index]
}
// const listMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// const optionDate = {
//   weekday: 'long', // Hari dalam bentuk teks lengkap (contoh: "Senin")
//   day: '2-digit', // Tanggal dalam bentuk dua digit
//   month: 'short', // Bulan dalam bentuk teks singkat (contoh: "Jan")
//   year: 'numeric' // Tahun dalam bentuk empat digit (contoh: "2023")
// }
// const optionTime = {
//   hour: '2-digit', // Jam dalam bentuk dua digit
//   minute: '2-digit' // Menit dalam bentuk dua digit
// }

function toDate (forecastTimestamp) {
  const now = new Date()
  const timeStamp = new Date(forecastTimestamp * 1000)
  const today = new Date(now)
  const yesterday = new Date(now)
  const tomorrow = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  tomorrow.setDate(now.getDate() + 1)
  let resultDay = ''

  if (timeStamp.toDateString() === today.toDateString()) {
    resultDay = 'Today'
  } else if (timeStamp.toDateString() === yesterday.toDateString()) {
    resultDay = 'Yesterday'
  } else if (timeStamp.toDateString() === tomorrow.toDateString()) {
    resultDay = 'Tomorrow'
  } else {
    resultDay = getDayName(timeStamp.getDay())
  }
  // console.log(timeStamp.toLocaleString('id-ID', optionDate))
  const respon = {
    day: resultDay,
    date: date.formatDate(timeStamp, 'dddd, DD MMMM'),
    // date: timeStamp.toLocaleString('id-ID', optionDate),
    time: date.formatDate(timeStamp, 'HH:mm')
    // time: timeStamp.toLocaleString('id-ID', optionTime)
  }
  return respon
}

function difference (time, dt) {
  if (time !== undefined && dt !== undefined) {
    const dateOld = new Date(time * 1000)
    const dateHours = dateOld.getUTCHours()
    const dateMinutes = dateOld.getUTCMinutes()
    const now = new Date(dt * 1000)
    const nowHour = now.getUTCHours()
    const nowMinute = now.getUTCMinutes()
    let hour = nowHour - dateHours
    let min = nowMinute - dateMinutes
    console.log('before')
    console.log(`${nowHour} - ${dateHours}`)
    console.log(`${nowMinute} - ${dateMinutes}`)
    console.log(`${hour} - ${min}`)
    if (hour < 0) {
      hour += 24
    }

    if (min < 0) {
      hour -= 1
      min += 60
    }
    console.log('after')
    console.log(`${nowHour} - ${dateHours}`)
    console.log(`${nowMinute} - ${dateMinutes}`)
    console.log(`${hour} - ${min}`)
    console.log('end')
    // const timeDifferenceInMilliseconds = now - dateOld
    // console.log(timeDifferenceInMilliseconds)
    // return timeDifferenceInMilliseconds.toLocaleString('id-ID', optionTime)
    // const result = date.formatDate(timeDifferenceInMilliseconds, 'HH mm').split(' ')
    return `${hour}h ${min}m`
  }
}

export default boot(async ({ app }) => {
  app.config.globalProperties.$parseDate = toDate
  app.config.globalProperties.$difference = difference
  app.config.globalProperties.$getDayName = getDayName
})
