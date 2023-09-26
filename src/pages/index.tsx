import { Inter } from 'next/font/google';
import { Button, Popconfirm, Input, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { BaseErrorResponse, Car } from '@/services/type';
import AddEditCarModal from '@/components/home/AddEditCarModal';
import { CarApi } from '@/services/api/car';
import { NotificationContext } from '@/contexts/NotificationContext';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car>();
  const { showNotification } = useContext(NotificationContext);

  const columns: ColumnsType<Car> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'License Plate',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
    },
    {
      title: 'Owner',
      children: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Birthday',
          dataIndex: 'birthday',
          key: 'birthday',
        },
      ],
    },
    {
      title: 'Axis',
      children: [
        {
          title: 'X-axis',
          dataIndex: 'x',
          key: 'x',
        },
        {
          title: 'Y-axis',
          dataIndex: 'y',
          key: 'y',
        },
      ],
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) =>
        cars.length >= 1 ? (
          <>
            <Popconfirm
              title='Sure to delete?'
              onConfirm={() => handleDelete(record.id)}
              okType='danger'
            >
              <Button type='link' danger size='small'>
                Delete
              </Button>
            </Popconfirm>
            <Button
              type='link'
              size='small'
              onClick={() => {
                setSelectedCar(record);
                showModal();
              }}
              className='ml-2'
            >
              Edit
            </Button>
          </>
        ) : null,
    },
  ];

  const handleDelete = async (id: number) => {
    try {
      const res = await CarApi.delete(id);
      const _cars = cars.filter((it) => it.id !== id);
      setCars(_cars);
      showNotification({
        message: 'Delete Success',
        description: res.message,
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      showNotification({
        message: 'Unknown error',
        description: (error as BaseErrorResponse).errors.message,
        type: 'success',
      });
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getData = async () => {
    try {
      const res = await CarApi.getAll();
      setCars(res.resource);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const [axisInputs, setAxisInput] = useState({
    x: 0,
    y: 0,
  });

  const handleFilter = async () => {
    try {
      const res = await CarApi.getNearby(axisInputs);
      setCars(res.resource);
      showNotification({
        message: 'Filter Success',
        description: res.message,
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      showNotification({
        message: 'Unknown error',
        description: (error as BaseErrorResponse).errors.message,
        type: 'success',
      });
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAxisInput({ ...axisInputs, [e.target.name]: e.target.value });
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <div className='flex mb-5 justify-between md:flex-row flex-col items-center'>
        <Button
          onClick={() => {
            showModal();
            setSelectedCar(undefined);
          }}
        >
          + Add car
        </Button>
        <div className='flex mx-5 my-2'>
          <Input
            name='x'
            type='number'
            value={axisInputs.x}
            onChange={handleChange}
            addonBefore='x'
          />
          <Input
            name='y'
            type='number'
            value={axisInputs.y}
            onChange={handleChange}
            className='mx-1'
            addonBefore='y'
          />
          <Button onClick={() => handleFilter()}>Filter</Button>
        </div>

        <Button onClick={() => getData()}>Reload</Button>
      </div>
      <Table
        columns={columns}
        dataSource={cars}
        bordered
        rowKey={'id'}
        className='w-full'
        scroll={{ x: 680 }}
      />
      <AddEditCarModal
        isOpen={isModalOpen}
        onClose={closeModal}
        cars={cars}
        setCars={setCars}
        selectedCar={selectedCar}
      />
    </main>
  );
}
