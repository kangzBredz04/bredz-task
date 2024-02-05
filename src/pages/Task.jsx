import { useEffect } from "react";
import { useState } from "react";
// import { MdOutlineAddTask } from "react-icons/md";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import BoxTask from "../components/BoxTask";

const initialTask = [
  {
    id: 1,
    title: "Sholat Subuh",
    finish: false,
  },
  {
    id: 2,
    title: "Membaca Al-Quran",
    finish: false,
  },
  {
    id: 3,
    title: "Ngoding Java",
    finish: false,
  },
  {
    id: 4,
    title: "Mandi Pagi",
    finish: false,
  },
  {
    id: 5,
    title: "Sholat Dhuha",
    finish: false,
  },
  {
    id: 6,
    title: "Ngoding React Js",
    finish: false,
  },
  {
    id: 7,
    title: "Sarapan",
    finish: false,
  },
  {
    id: 8,
    title: "Kuliah",
    finish: false,
  },
  {
    id: 9,
    title: "Sholat Dzuhur",
    finish: false,
  },
  {
    id: 10,
    title: "Tidur Siang",
    finish: false,
  },
];

const saveTask = localStorage.getItem("myTask");

function Task() {
  const [dataTask, setDataTask] = useState(
    saveTask ? JSON.parse(saveTask) : initialTask
  );
  const [editTask, setEditTask] = useState();
  const [idTask, setIdTask] = useState(dataTask.length + 1);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("asc");
  const [finish, setFinish] = useState("Semua");
  // const [sortBy, setSortBy] = useState("")

  const filterData = dataTask
    .toSorted((a, b) => {
      if (order === "asc") {
        return a.title < b.title ? -1 : 1;
      } else {
        return a.title > b.title ? -1 : 1;
      }
    })
    .filter(
      (t) =>
        t.title.toLowerCase().includes(keyword) &&
        (finish === "Semua"
          ? finish === "Semua"
          : finish === "Selesai"
          ? t.finish === true
          : t.finish === false)
    );

  function handleTask(task) {
    setDataTask(
      dataTask.map((t) =>
        t.id === task.id
          ? {
              ...t,
              finish: !t.finish,
            }
          : t
      )
    );
  }

  function handleDelete(task) {
    if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      setDataTask(dataTask.filter((t) => t.id !== task.id));
    }
  }

  function handleEdit(task) {
    setEditTask(task);
  }

  useEffect(() => {
    localStorage.setItem("myTask", JSON.stringify(dataTask));
  }, [dataTask]);

  return (
    <div className="p-2">
      <header className="flex flex-col gap-5 mb-4">
        <div
          className="cursor-pointer bg-[#63acff] p-2 rounded-lg"
          onClick={() => setEditTask({ finish: false })}
        >
          <h1 className="text-center font-bold text-black">Tambah Tugas</h1>
        </div>
        <div className="flex gap-3 items-center">
          <label className="flex items-center gap-1 grow">
            <h1 className="font-bold">Cari:</h1>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="h-9 w-full p-2 text-sm rounded-lg outline-blue-400 border-2 border-solid border-gray-500"
            />
          </label>
          <label className="flex items-center gap-1 grow">
            <select
              value={finish}
              onChange={(e) => setFinish(e.target.value)}
              className="h-9 w-full text-sm rounded-lg outline-blue-400 border-2 border-solid border-gray-500 font-bold"
            >
              <option value="Semua">Semua</option>
              <option value="Selesai">Selesai</option>
              <option value="Belum Selesai">Belum Selesai</option>
            </select>
          </label>
          <div
            className="grow flex items-center justify-around h-9 text-sm rounded-lg outline-blue-400 border-2 border-solid border-gray-500 font-bold cursor-pointer"
            onClick={() =>
              order === "asc" ? setOrder("desc") : setOrder("asc")
            }
          >
            <h1>Sorting</h1>
            {order === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
          </div>
        </div>
      </header>
      <main className="overflow-y-auto grow flex flex-col  divide-gray-400 [&>*]:flex-1 [&>*]:flex [&>*]:flex-col [&>*]:divide-y [&>*]:divide-gray-400">
        <section>
          {filterData.length > 0
            ? filterData
                .toSorted((a, b) =>
                  a.finish === b.finish ? 0 : a.finish ? 1 : -1
                )
                .map((task) => (
                  <BoxTask
                    key={task.id}
                    task={task}
                    title={task.title}
                    finish={task.finish}
                    onChange={handleTask}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    icon={
                      task.finish === false ? (
                        <MdOutlineRadioButtonUnchecked />
                      ) : (
                        <IoIosCheckmarkCircle />
                      )
                    }
                  />
                ))
            : "Data tidak ditemukan..."}
        </section>
      </main>
      {editTask && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <form
            className="bg-white w-1/3 h-[160px] p-4 rounded-lg flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (editTask.id) {
                setDataTask(
                  dataTask.map((t) => (t.id === editTask.id ? editTask : t))
                );
              } else {
                setDataTask([...dataTask, { id: idTask, ...editTask }]);
                setIdTask(idTask + 1);
              }
              setEditTask(undefined);
            }}
          >
            <div className="flex flex-col grow gap-4">
              <h1 className="text-xl font-bold text-center">
                {editTask.id ? "Edit" : "Tambah"} Tugas
              </h1>
              <input
                id="name"
                type="text"
                value={editTask.title}
                onChange={(e) =>
                  setEditTask({ ...editTask, title: e.target.value })
                }
                className="h-9 w-full p-2 text-sm rounded-lg outline-blue-400 border-2 border-solid border-gray-500"
                autoFocus
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setEditTask()}
                type="reset"
                className="bg-red-600 text-white px-5 h-8 rounded-lg font-bold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 h-8 rounded-lg font-bold"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Task;
