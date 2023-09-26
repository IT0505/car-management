import { BaseResponse, Car, CarJson } from '@/services/type';
import type { NextApiRequest, NextApiResponse } from 'next';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'json/car-data.json');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BaseResponse<Car | string>>
) {
  if (req.method === 'POST') {
    const jsonData = await fsPromises.readFile(dataFilePath);
    const { cars, index }: CarJson = JSON.parse(jsonData.toString());

    if (cars.find((it) => it.licensePlate === req.body.licensePlate)) {
      return res
        .status(500)
        .json({ message: 'License Plate cannot be duplicate', resource: '' });
    }

    const newItem = { ...req.body, id: index + 1 };

    const newData: CarJson = {
      cars: [...cars, newItem],
      index: index + 1,
    };

    const updatedData = JSON.stringify(newData);
    await fsPromises.writeFile(dataFilePath, updatedData);

    return res.status(200).json({ message: 'Success', resource: newItem });
  }
}
