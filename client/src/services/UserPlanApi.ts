import Api from '@/services/Api';

export interface Plan {
	id: number;
  trainer: string;
 card_id:number[];
}
export interface Exercise {

  name: string;
  times: string;
  time: boolean;
}
export interface Card {
	id: number;
  exercises:Exercise[];
}


export default {
  getPlan() {
    return Api().get('/api/plan');
  },
	getCard() {
    return Api().get('/api/card');
  },
};
