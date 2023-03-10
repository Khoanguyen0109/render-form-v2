import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { groupBy, mapValues } from 'lodash';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import SkeletonForm from '../components/SkeletonForm';
import Tabs from '../components/Tab';
import qs from 'qs';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function FormDetail(props) {
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading } = props;
  const [formData, setFormData] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const formFields = data.filter((item) => item.idform === params.formId);
  const formName = formFields[0]?.name_form;
  const onBack = () => {
    navigate('/');
  };
  var grouped = mapValues(groupBy(formFields, 'steps'), (clist) => clist);
  //   var grouped = mapValues(groupBy(formFields, 'steps'), (clist) =>
  //   clist.map((item) => mapValues(groupBy(item, 'name_field'), (item) => item))
  // );

  const groupByField = Object.values(grouped).map((item) =>
    groupBy(item, 'name_field')
  );

  const { control, handleSubmit } = useForm({});

  const onSubmit = async () => {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(formData),
      url: 'https://script.google.com/macros/s/AKfycbwc6zsfumMrVjMwaSnku8NZxL2t5WJjtBK2LlXSkzx1CGptTvtjc4EBl5sBxnYqXJdgXQ/exec',
    };
    console.log('options :>> ', options);
    await axios(options);
    setFormData({});
    enqueueSnackbar('Send form successfull', { variant: 'success' });
    navigate('/');
  };
  const onSaveData = (value) => {
    setFormData({ ...value, ...formData });
  };

  const renderForm = () => {};
  return loading ? (
    <SkeletonForm />
  ) : (
    <>
      <div className='flex items-start'>
        <button className='bg-transparent font-semibold ' onClick={onBack}>
          <ArrowLeftIcon className='h-6 w-6 text-black' />
        </button>
        <div className='mx-auto max-w-2xl lg:text-center'>
          <p className='lg:mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            {formName}
          </p>
        </div>
      </div>
      <Tabs
        tabs={groupByField}
        formData={formData}
        onSaveData={onSaveData}
        onSubmit={onSubmit}
      />
      {/* <Select />
        <Input />

        <Tabs />
        <RadioGroupCustom />
        <DateInput /> */}
    </>
  );
}

export default FormDetail;
