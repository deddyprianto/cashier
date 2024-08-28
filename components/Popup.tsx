'use client';
import React, { Fragment, ReactNode, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface PopupProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  children: ReactNode;
  fullScreen: boolean;
}
export function Popup({ setIsOpen, isOpen, children, fullScreen }: PopupProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div
            className={`flex ${
              fullScreen && 'h-screen'
            } items-center justify-center p-4 text-center`}
          >
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transhtmlForm overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all h-full'>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
