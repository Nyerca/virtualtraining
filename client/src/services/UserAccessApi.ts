import Api from '@/services/Api';

export default {
  postRegister() {
    return Api().get('/api/register');
  },
};
