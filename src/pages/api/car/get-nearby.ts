import { Axis, BaseResponse, Car, CarJson } from '@/services/type';
import type { NextApiRequest, NextApiResponse } from 'next';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'json/car-data.json');

const distance = (axis1: Axis, axis2: Axis) => {
  const y = axis2.x - axis1.x;
  const x = axis2.y - axis1.y;

  return Math.sqrt(x * x + y * y);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BaseResponse<Car[]>>
) {
  if (req.method === 'GET') {
    const jsonData = await fsPromises.readFile(dataFilePath);
    const { cars }: CarJson = JSON.parse(jsonData.toString());

    const _cars = cars.map((it) => {
      return {
        ...it,
        //@ts-ignore
        distance: distance({ ...it }, req.query),
      };
    });
    var topValues = _cars.sort((a, b) => a.distance - b.distance).slice(0, 5);
    console.log(topValues);

    return res.status(200).json({ message: 'Success', resource: topValues });
  }
}
