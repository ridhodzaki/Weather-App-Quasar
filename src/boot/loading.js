import { boot } from 'quasar/wrappers'
import { QSpinnerPuff, Loading } from 'quasar'

export default boot(async ({ app }) => {
  const opt = {
    spinner: QSpinnerPuff,
    spinnerColor: 'primary',
    boxClass: 'bg-grey-2 text-grey-9',
    message: 'Please wait.......'
  }
  app.config.globalProperties.$showLoading = () => {
    return Loading.show(opt)
  }
  app.config.globalProperties.$hide = () => {
    return Loading.hide()
  }
})
