import { useState } from "react";

const Modal = ({ modalButtonRef, modalTitle, modalBody }) => {
  const [openModal, setOpenModal] = useState(false);
  
  return (
    <>
      <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        ref={modalButtonRef}
        onClick={() => setOpenModal(true)}
        style={{ display: "none" }}
      >
        Toggle modal
      </button>
      {openModal && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full z-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between rounded-t">
                <button
                  type="button"
                  className="text-gray-700 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:text-black m-3"
                  data-modal-hide="default-modal"
                  onClick={() => setOpenModal(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-xl font-semibold leading-relaxed text-black">
                  {modalTitle}
                </p>
                <p className="text-base leading-relaxed text-gray-600">
                  {modalBody}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
