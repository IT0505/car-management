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
  res: NextApiResponse<BaseResponse<Car[] | string>>
) {
  if (req.method === 'GET') {
    const jsonData = await fsPromises.readFile(dataFilePath);
    const { cars }: CarJson = JSON.parse(jsonData.toString());
    const { x, y, n } = req.query;

    if (Number(n) < 0) {
      return res
        .status(500)
        .json({ message: 'N must be greater than 0', resource: '' });
    }

    const _cars = cars.map((it) => {
      return {
        ...it,
        distance: distance({ ...it }, { x: Number(x), y: Number(y) }),
      };
    });
    var topValues = _cars
      .sort((a, b) => a.distance - b.distance)
      .slice(0, Number(n));
    console.log(topValues);

    return res.status(200).json({ message: 'Success', resource: topValues });
  }
}
