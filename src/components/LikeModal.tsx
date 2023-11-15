import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function LikeModal(props:any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 bg-green-100">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-6 w-6 text-green-700"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
            </div>
            <div className="text-center sm:text-left">
              <h2
                id="radix-:r1u:"
                // as="h3"
                className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
              >
                Provide additional feedback
              </h2>
            </div>
          </div>
          <button onClick={props.onHide} className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </Modal.Header>
      <Modal.Body style={{ borderBottom:"none" }}>
        <form>
          <textarea
            id="feedback-other"
            placeholder="What do you like about the response?"
            rows={3}
            className="mb-1 mt-4 w-full rounded-md dark:bg-gray-800 border outline-none p-2 dark:focus:border-white dark:focus:ring-white"
            style={{ height: '89.6px', overflowY: 'hidden' }}
          ></textarea>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-secondary"} onClick={props.onHide} className="btn btn-outline-primary">
          Submit Feedback
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
