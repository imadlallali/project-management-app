import { useRef, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Modal from "./Modal";
import { Save, AlertTriangle, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function NewProject({ onAdd, onCancel }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const [showModal, setShowModal] = useState(false);

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      setShowModal(true);
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });

    // Show success toast
    toast.success("Project created successfully!", {
      icon: <CheckCircle className="w-4 h-4" />,
    });

    // Clear the form
    title.current.value = "";
    description.current.value = "";
    dueDate.current.value = "";

    // Navigate back immediately
    onCancel();
  }

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">
          Create New Project
        </h1>
        <p className="text-slate-600">
          Set up your project details and start organizing your work
          efficiently.
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6">
        <Input
          type="text"
          ref={title}
          label="Project Title"
          placeholder="Enter a descriptive project name..."
        />
        <Input
          ref={description}
          label="Description"
          textarea
          placeholder="Describe your project goals and objectives..."
        />
        <Input type="date" ref={dueDate} label="Due Date" />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 pt-8 border-t border-slate-200/50">
        <Button onClick={onCancel} variant="secondary" className="px-6 py-3">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="primary" className="px-8 py-3">
          <span className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Project
          </span>
        </Button>
      </div>

      {/* Error Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        buttonCaption="OK"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Missing Information
          </h3>
          <p className="text-sm text-slate-600">
            Please fill out all fields before creating your project.
          </p>
        </div>
      </Modal>
    </div>
  );
}
