import Api from '@/services/Api';

export interface User {
  name: string;
  email: string;
  age: number;
  password: string;
}

export default {
  postRegister(newUser: User) {
    return Api().post('/api/register', newUser);
  },
  postLogin(email: string, password: string) {
    return Api().post('/api/login', {email, password});
  },
  getLogout() {
    return Api().get('/api/logout');
  },
};

