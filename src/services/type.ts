export type BaseResponse<T> = { message: string; resource: T };
export type BaseErrorResponse = {
  statusCode: number;
  errors: BaseResponse<any>;
};

export type Car = {
  id: number;
  licensePlate: string;
  name: string;
  birthday: string;
} & Axis;

export type CarJson = {
  cars: Car[];
  index: number;
};

export type Axis = {
  x: number;
  y: number;
};

export type FindNearbyParams = {
  n: number;
} & Axis;

export type NearbyCar = {
  id: number;
  licensePlate: string;
  distance: number;
};
