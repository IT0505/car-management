import http from '../http';
import { Axis, BaseResponse, Car, NearbyCar } from '../type';
import { API_URL } from './urls';

export const CarApi = {
  getAll: async function (): Promise<BaseResponse<Car[]>> {
    return await http.get(API_URL.carGetAll);
  },
  delete: async function (id: number): Promise<BaseResponse<string>> {
    return await http.delete(API_URL.carDelete, { data: id });
  },
  add: async function (car: Car): Promise<BaseResponse<Car>> {
    return await http.post(API_URL.carAdd, car);
  },
  edit: async function (car: Car): Promise<BaseResponse<Car>> {
    return await http.put(API_URL.carEdit, car);
  },
  getNearby: async function (axis: Axis): Promise<BaseResponse<NearbyCar[]>> {
    return await http.get(API_URL.carGetNearby, { params: { ...axis } });
  },
};
