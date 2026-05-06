import { useState } from 'react'
import './App.css'
import { createWorker } from "tesseract.js";
import ResultModal from './components/ResultModal';
import { toast } from 'react-toastify';
import Loader from './components/Loader';
// import { XMarkIcon } from "@heroicons/react/20/solid";

function App() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      // if (file.type !== "image/jpeg") {
      //   alert("Only JPG images are allowed. Please select a valid file.");
      //   return;
      // }
      const url = URL.createObjectURL(file);
      console.log("Selected image URL:", url);
      (async () => {
        
      })();
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const excractText = async () => {
    if (!imagePreview) {
      toast.error("Please select an image first.");
      return;
    }
    setIsPending(true);
      const worker = await createWorker("eng");
      const ret = await worker.recognize(imagePreview!);
      setExtractedText(ret.data.text);
      setOpen(true);
      // console.log(ret.data.text);
      await worker.terminate();
      setIsPending(false);
  }

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <h1 className="sm:text-3xl text-xl font-bold">
        Optical Character Recognition
      </h1>
      <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
            className="aspect-577/310 w-144.25 bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
            className="aspect-577/310 w-144.25 bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm/6 text-gray-900">
            <strong className="font-semibold">OCR 2026</strong>
            <svg
              viewBox="0 0 2 2"
              aria-hidden="true"
              className="mx-2 inline size-0.5 fill-current"
            >
              <circle r={1} cx={1} cy={1} />
            </svg>
            Transform Visual Content into Text Within Seconds.
          </p>
        </div>
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            className="-m-3 p-3 focus-visible:-outline-offset-4"
          >
            <span className="sr-only">Dismiss</span>
            {/* <XMarkIcon aria-hidden="true" className="size-5 text-gray-900" /> */}
          </button>
        </div>
      </div>
      <div className="w-full p-10 flex items-center justify-center">
        <div
          className={`bg-black bg-opacity-70 rounded-lg sm:w-2/3 w-10/12 sm:p-10 p-3 `}
        >
          <div className="py-10 w-full h-full border-2 border-dashed border-gray-100 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="cursor-pointer">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Selected"
                    className="max-w-full max-h-80 rounded-lg"
                  />
                </div>
              ) : (
                <>
                  {/* <i className="fa fa-download text-green-500 text-3xl"></i>
                   */}
                  <p className="sm:text-2xl text-lg text-gray-400 my-4">
                    Drag&Drop Document here
                  </p>
                  <p>Or</p>
                  <button
                    className="bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-80 hover:opacity-100 text-white px-6 py-3 rounded-lg shadow-lg mt-4 sm:text-lg text-[0.675rem]"
                    onClick={() => {
                      if (document) {
                        document?.getElementById("image-input")?.click();
                      }
                    }}
                  >
                    <i className="fa fa-paperclip" aria-hidden="true"></i>{" "}
                    Choose File
                  </button>
                  <input
                    id="image-input"
                    type="file"
                    accept="image/*"
                    // accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-x-6 pb-10">
        <a
          href="#"
          className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          onClick={excractText}
        >
          Extract Text <span aria-hidden="true">&rarr;</span>
        </a>
        <a
          href="#"
          className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          onClick={() => {
            setImagePreview(null);
            setExtractedText(null);
          }}
        >
          Reset <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <ResultModal
        open={open}
        setOpen={() => {
          setOpen(false);
        }}
        content={extractedText || "No text extracted"}
      />
    </>
  );
}

export default App
