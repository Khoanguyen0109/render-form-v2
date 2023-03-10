import { useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useController } from 'react-hook-form';
import Tooltip from './Tooltip';

export default function Select(props) {
  const { label, control, options, rules, name, multiple } = props;
  const {
    field: { ref, onBlur, ...mainProps },
    fieldState,
  } = useController({
    name,
    control,
    rules,
  });
  const [selected, setSelected] = useState(
    mainProps.value ? mainProps.value : multiple ? [] : null
  );
  return (
    <div className=' w-full lg:w-80  mb-6 '>
      <Listbox
        value={selected}
        onChange={(e) => {
          mainProps.onChange(e);
          setSelected(e);
        }}
        multiple={multiple}
      >
        <Tooltip message={label}>
          <Listbox.Label
            style={{
              overflow: 'hidden',
              display: '-webkit-box',
              '-webkit-line-clamp': '2',
              '-webkit-box-orient': 'vertical',
            }}
            className='block lg:h-10 text-gray-500 sm:text-3xl lg:text-sm font-bold mb-2'
          >
            {label}
          </Listbox.Label>
        </Tooltip>

        <div className='  relative'>
          <Listbox.Button className='sm:h-20 lg:h-9 w-full relative cursor-default rounded-lg bg-white sm:py-6 lg:py-2 pl-3 pr-10 text-left shadow-lg focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-3xl lg:text-sm'>
            <span className='block font-light truncate'>{selected?.label}</span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute mt-1 z-50 max-h-60 w-full lg:w-80  overflow-auto rounded-md bg-white sm:py-6 lg:py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-3xl lg:text-sm'>
              {options.map((option, index) => {
                return (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => {
                      return (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {option.label}
                          </span>
                          {selected ? (
                            <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600'>
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      );
                    }}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {fieldState.error?.type === 'required' && (
        <p className='text-red-500'>This field is required</p>
      )}
    </div>
  );
}
