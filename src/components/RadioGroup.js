import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { useController } from 'react-hook-form';
import Tooltip from './Tooltip';

const plans = [
  {
    name: 'Startup',
    ram: '12GB',
    cpus: '6 CPUs',
    disk: '160 GB SSD disk',
  },
  {
    name: 'Business',
    ram: '16GB',
    cpus: '8 CPUs',
    disk: '512 GB SSD disk',
  },
  {
    name: 'Enterprise',
    ram: '32GB',
    cpus: '12 CPUs',
    disk: '1024 GB SSD disk',
  },
  {
    name: 'Enterprise',
    ram: '32GB',
    cpus: '12 CPUs',
    disk: '1024 GB SSD disk',
  },
];

export default function RadioGroupCustom(props) {
  const { label, control, options, rules, name } = props;
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const [selected, setSelected] = useState(
    options.find((op) => parseInt(op.value) == parseInt(field.value?.value))
  );

  return (
    <div className='w-full  mb-6'>
      <div className='mx-auto w-full'>
        <Tooltip message={label}>
          <label
            className='block lg:h-10 text-gray-500 sm:text-3xl lg:text-sm font-bold mb-2'
            style={{
              overflow: 'hidden',
              display: '-webkit-box',
              '-webkit-line-clamp': '2',
              '-webkit-box-orient': 'vertical',
            }}
            htmlFor={name}
          >
            {label}
          </label>
        </Tooltip>
        <RadioGroup
          value={selected}
          onChange={(e) => {
            setSelected(e);
            field.onChange(e);
          }}
        >
          <RadioGroup.Label className='sr-only'>Server size</RadioGroup.Label>
          <div class='grid sm:grid-cols-1 md:grid-cols-2  gap-4'>
            {options.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                     flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className='flex w-full items-center justify-between'>
                      <div className='flex items-center'>
                        <div className='sm:text-3xl lg:text-sm'>
                          <RadioGroup.Label
                            as='p'
                            className={`font-normal  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {option.label}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as='span'
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>{option.description}</span>{' '}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className='shrink-0 text-white'>
                          <CheckIcon className='h-6 w-6' />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      {error?.type === 'required' && (
        <p className='text-red-500'>This field is required</p>
      )}
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox='0 0 24 24' fill='none' {...props}>
      <circle cx={12} cy={12} r={12} fill='#fff' opacity='0.2' />
      <path
        d='M7 13l3 3 7-7'
        stroke='#fff'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
