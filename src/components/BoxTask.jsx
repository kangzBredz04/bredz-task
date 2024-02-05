import { FaTrashAlt } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";

function BoxTask({ title, onChange, onDelete, onEdit, task, icon }) {
  return (
    <div
      className={`flex justify-between h-10 !text-black ${
        task.finish
          ? "!bg-gray-200 !text-gray-500 hover:!bg-gray-300 line-through"
          : "!bg-white-200 hover:!bg-gray-100"
      }`}
    >
      <div className="flex items-center">
        <div onClick={() => onChange(task)}>{icon}</div>
        <h1>{title}</h1>
      </div>
      <div className="flex flex-row w-20 gap-5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
        >
          <RiPencilFill size={18} color="gray" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task);
          }}
        >
          <FaTrashAlt size={18} color="gray" />
        </button>
      </div>
    </div>
  );
}

export default BoxTask;
