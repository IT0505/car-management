import { BaseResponse, Car, CarJson } from '@/services/type';
import type { NextApiRequest, NextApiResponse } from 'next';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'json/car-data.json');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BaseResponse<Car[]>>
) {
  if (req.method === 'GET') {
    const jsonData = await fsPromises.readFile(dataFilePath);
    const { cars }: CarJson = JSON.parse(jsonData.toString());

    return res.status(200).json({ message: 'Success', resource: cars });
  }
}
