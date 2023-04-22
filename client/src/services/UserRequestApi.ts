import Api from '@/services/Api';

export interface Muscle {
	id: number;
  name: string;
}
export interface Trainer {
	id: number;
	  name: string;
  muscles_id:number[];
}
export interface New_Request {
	username: string;
  muscles_id:number[];
  hour:string;
  minute: string;
  description : string;
}

export default {
  getMuscles() {
    return Api().get('/api/muscles');
  },
	getTrainers() {
    return Api().get('/api/trainer');
  },
	getRequests() {
    return Api().get('/api/requests');
  },
	postRequests(newUser: New_Request) {
    return Api().post('/api/requests', newUser);
  },
};
