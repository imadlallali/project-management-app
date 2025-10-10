import { useRef, useState } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ onAdd, onCancel }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      setIsModalOpen(true);
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });

    // Show success notification
    setShowNotification(true);
    setIsExiting(false);

    // Clear the form
    title.current.value = "";
    description.current.value = "";
    dueDate.current.value = "";

    // Start fade out after 2.5 seconds
    setTimeout(() => {
      setIsExiting(true);
      // Hide notification and navigate after fade-out completes
      setTimeout(() => {
        setShowNotification(false);
        onCancel(); // Navigate back to project list
      }, 500); // Wait for fade-out animation to complete
    }, 1000);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  console.log(isModalOpen);

  return (
    <>
      <Modal buttonCaption="Okay" open={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold text-stone-700 mb-4">Invalid input</h2>
        <p className="text-stone-600 mb-4">
          Please fill out all fields before saving the project.
        </p>
      </Modal>

      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-200 text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" />
          <Input ref={description} label="Description" textarea />
          <Input type="date" ref={dueDate} label="Due Date" />
        </div>
        {/* Success Toast Notification */}
        {showNotification && (
          <div
            className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-500 ease-in-out ${
              isExiting
                ? "opacity-0 translate-y-2"
                : "opacity-100 translate-y-0 animate-pulse"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>✅</span>
              <span className="font-medium">Project created successfully!</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
