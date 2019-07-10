import Api from '@/services/Api'

export default {
  getTrainers () {
    return Api().get('/api/trainers')
  }
}
