/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import { useEffect } from 'react';

export const SuccessNotification: React.FC<{ hash: string | undefined }> = ({
  hash,
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => setShow(true), [hash]);

  return (
    <>
      <Transition
        show={show}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="mt-8 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircleIcon
                  className="h-6 w-6 text-green-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">
                  Transaction submitted!
                </p>
                <a
                  className="mt-1 text-sm text-gray-500"
                  href={`https://etherscan.io/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Etherscan
                </a>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export const ErrorNotification: React.FC<{ message: string }> = ({
  message,
}) => {
  const [show, setShow] = useState(true);

  return (
    <>
      {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
      <Transition
        show={show}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="mt-8 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <XCircleIcon
                  className="h-6 w-6 text-red-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">
                  Error processing transaction
                </p>
                <p className="mt-1 text-sm text-red-500">{message}</p>
              </div>
              {/* <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};
