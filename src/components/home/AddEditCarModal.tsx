import { Alert, Button, Input, Modal } from 'antd';
import { ChangeEvent, FormEvent, useEffect, useState, useContext } from 'react';
import { BaseErrorResponse, Car } from '@/services/type';
import { CarApi } from '@/services/api/car';
import { defaultCar } from '@/utils/mock-data';
import { getAge } from '@/utils/common';
import { NotificationContext } from '@/contexts/NotificationContext';

var regexName = /^[a-zA-Z ]{2,30}$/;

interface AddEditCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  cars: Car[];
  setCars: (val: Car[]) => void;
  selectedCar?: Car;
}

type ErrorMessage = {
  licensePlate?: string;
  name?: string;
  birthday?: string;
  x?: string;
  y?: string;
};
const AddEditCarModal = ({
  isOpen,
  onClose,
  cars,
  setCars,
  selectedCar,
}: AddEditCarModalProps) => {
  const [inputFields, setInputFields] = useState<Car>({
    ...defaultCar,
    id: -1,
  });
  const [errors, setErrors] = useState<ErrorMessage>({});
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    setInputFields(selectedCar ?? { ...defaultCar, id: -1 });
  }, [selectedCar]);

  const validateValues = (inputValues: Car) => {
    let errors: ErrorMessage = {};
    if (!inputValues.licensePlate) {
      errors.licensePlate = 'License Plate is required';
    }
    if (!inputValues.name) {
      errors.name = 'Name is required';
    } else {
      if (!regexName.test(inputValues.name)) {
        errors.name = 'Name is invalid';
      }
    }
    if (!inputValues.birthday) {
      errors.birthday = 'Birthday is required';
    } else {
      if (getAge(inputValues.birthday) < 15) {
        errors.birthday = 'At least 15 years old';
      }
    }
    return errors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmitAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const _errors = validateValues(inputFields);
    setErrors(_errors);
    if (Object.keys(_errors).length === 0) {
      try {
        const res = await CarApi.add(inputFields);
        setCars([...cars, res.resource]);
        onClose();
        showNotification({
          message: 'Add Success',
          description: res.message,
          type: 'success',
        });
      } catch (error) {
        console.log(error);
        showNotification({
          message: 'Add Error',
          description: (error as BaseErrorResponse).errors.message,
          type: 'error',
        });
      }
    }
  };

  const handleSubmitEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const _errors = validateValues(inputFields);
    setErrors(_errors);
    if (Object.keys(_errors).length === 0) {
      try {
        const res = await CarApi.edit(inputFields);
        const _cars = cars.map((it) =>
          it.id !== inputFields.id ? it : inputFields
        );
        setCars(_cars);
        onClose();
        showNotification({
          message: 'Update Success',
          description: res.message,
          type: 'success',
        });
      } catch (error) {
        console.log(error);
        showNotification({
          message: 'Update Error',
          description: (error as BaseErrorResponse).errors.message,
          type: 'error',
        });
      }
    }
  };

  return (
    <Modal
      title={selectedCar ? 'Edit car with id: ' + selectedCar.id : 'Add car'}
      open={isOpen}
      onCancel={onClose}
      footer={<></>}
    >
      <form onSubmit={selectedCar ? handleSubmitEdit : handleSubmitAdd}>
        <div className='mb-4'>
          <p>License Plate</p>
          <Input
            name='licensePlate'
            value={inputFields.licensePlate}
            onChange={handleChange}
          />
          {errors.licensePlate && (
            <Alert
              message={errors.licensePlate}
              type='error'
              showIcon
              className='mt-2'
            />
          )}
        </div>
        <div className='mb-4'>
          <p>Name</p>
          <Input name='name' value={inputFields.name} onChange={handleChange} />
          {errors.name && (
            <Alert
              message={errors.name}
              type='error'
              showIcon
              className='mt-2'
            />
          )}
        </div>
        <div className='mb-4'>
          <p>Birthday</p>
          <Input
            type='date'
            name='birthday'
            value={inputFields.birthday}
            onChange={handleChange}
          />
          {errors.birthday && (
            <Alert
              message={errors.birthday}
              type='error'
              showIcon
              className='mt-2'
            />
          )}
        </div>
        <div className='mb-4'>
          <p>X-axis</p>
          <Input
            name='x'
            type='number'
            value={inputFields.x}
            onChange={handleChange}
          />
          {errors.x && (
            <Alert message={errors.x} type='error' showIcon className='mt-2' />
          )}
        </div>
        <div className='mb-4'>
          <p>Y-axis</p>
          <Input
            name='y'
            type='number'
            value={inputFields.y}
            onChange={handleChange}
          />
          {errors.y && (
            <Alert message={errors.y} type='error' showIcon className='mt-2' />
          )}
        </div>
        <div className='flex justify-end'>
          <Button onClick={onClose}>Cancel</Button>
          <Button htmlType='submit' className='ml-2'>
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditCarModal;
