import Api from '@/services/Api';

export default {
  postRegister() {
    return Api().post('/api/register');
  },
};
