import React, { useState } from "react";
function SkinListApp() {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showChecked, setShowChecked] = useState(false);
  const [filterList, setFilterList] = useState("All");

  const addItem = (newItem) => {
    // Mengecek apakah item sudah ada dalam daftar belanjaan sebelumnya
    const isDuplicate = items.some(
      (item) =>
        item.name.trim().toLowerCase() === newItem.name.trim().toLowerCase()
    ); // Membandingkan itemname dengan newitem (yang mau ditambahkan)
    //trim untuk menghapus spasi di depan sebelum dibandingkan
    if (isDuplicate) {
      // Jika ditemukan item dengan nama yang sama, munculkan alert
      alert("Skin ini sudah ada, coba input yang lain!");
      return;
    }

    // Jika newItem kosong (hanya spasi), tampilkan alert
    else if (newItem.name.trim() === "") {
      alert("Belum isi apapun nih. Isi Dulu!");
      return; // Hentikan penambahan jika input kosong
    }

    // Tambahkan newItem ke dalam daftar belanjaan
    setItems([...items, newItem]);
  };
  const editItem = (index, updatedItem) => {
    const isDuplicate = items.some(
      (item) =>
        item.name.trim().toLowerCase() === updatedItem.name.trim().toLowerCase()
    );
    if (isDuplicate) {
      // Jika ditemukan item dengan nama yang sama, munculkan alert
      alert("Skin ini sudah ada, coba input yang lain!");
      return;
    }
    const updatedItems = [...items];
    updatedItems[items?.findIndex((item) => item.id === index)] = updatedItem;
    setItems(updatedItems);
    setEditIndex(null); // tambahkan setEditIndex(null) untuk menghentikan mode edit setelah diedit
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const removeItem = (index) => {
    setItems(items.filter((item, i) => item.id !== index));
  };
  const handleCheckboxChange = (index) => {
    console.log("index ", index);
    const updatedItems = [...items];
    const indexItem = items?.findIndex((item) => item.id === index);
    updatedItems[indexItem].checked = !updatedItems[indexItem].checked;
    setItems(updatedItems);
  };

  const removeCheckedItems = () => {
    setItems(items.filter((item) => !item.checked));
  };

  const removeAllitems = () => {
    setItems([]);
  };
  const showCheckedItems = () => {
    setShowChecked(true);
    setFilterList("Done");
  };

  const showAllItems = () => {
    setShowChecked(false);
    setFilterList("All");
  };

  const showUncheckedItems = () => {
    setShowChecked(false);
    setFilterList("Todo");
  };

  console.log("data", items);
  return (
    <div
      className="flex flex-col h-fit "
      style={{
        // Mengatur background image dengan URL gambar
        backgroundImage: `url('https://insider-gaming.com/wp-content/uploads/2022/11/valorant-consoles.jpg')`,
        // Menyesuaikan ukuran background image
        backgroundSize: "cover",
        // Membuat background image berulang
        backgroundRepeat: "no-repeat",
        // Pusatkan background image
        backgroundPosition: "center",
      }}
    >
      <h1 className=" font-bold text-5xl text-center text-white mb-10 hover:text-red-600">
        Welcome to my Valorant Skin Collection App
      </h1>
      <h1 className="text-2xl text-white font-bold text-center mb-2 hover:text-red-600">
        Search Skin
      </h1>
      <div className="flex flex-col mx-auto border-2 shadow-2xl border-fuchsia-600 hover:border-fuchsia-800 p-10 mb-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newItemName = e.target.itemName.value;

            addItem({
              id: Date.now(),
              name: newItemName,
              checked: false,
            });
            e.target.reset();
          }}
        >
          <input
            className="hover:placeholder:text-red-600 hover:bg-slate-400 py-2 px-8 mr-2 rounded-sm"
            type="text"
            name="itemName"
            placeholder="Skin Name"
          />

          <button
            className="border-2 bg-green-400 hover:bg-green-700 font-bold text-white hover:text-blue-500 py-2 px-8"
            type="submit"
          >
            Add Skin
          </button>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className=" flex mt-4 rounded-md border-2 border-gray-950 hover:bg-gray-400 hover:placeholder:text-red-600 py-2 px-8  "
          />
        </form>
      </div>
      <div className="flex flex-col mx-auto border-2 border-fuchsia-600 hover:border-fuchsia-800 shadow-2xl p-10 h-screen">
        <div className="text-2xl text-white font-bold text-center hover:text-red-600">
          Skin List
        </div>
        <div className="flex gap-10 mt-10">
          <button
            className="text-2xl mx-auto font-semibold border-2 rounded-md p-4 bg-indigo-600 text-red-500 hover:bg-blue-700 hover:text-blue-500 w-60"
            onClick={showAllItems}
          >
            All
          </button>
          <button
            className="text-2xl mx-auto font-semibold border-2 rounded-md p-4 bg-indigo-600 text-red-500 hover:bg-blue-700 hover:text-blue-500 w-60"
            onClick={showCheckedItems}
          >
            Done
          </button>
          <button
            className="text-2xl mx-auto font-semibold border-2 rounded-md p-4 bg-indigo-600 text-red-500 hover:bg-blue-700 hover:text-blue-500 w-60 "
            onClick={showUncheckedItems}
          >
            Todo
          </button>
        </div>
        <ul className="mt-5">
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter((e) => {
              if (filterList === "All") {
                return e;
              } else if (filterList === "Done") {
                return e.checked;
              } else if (filterList === "Todo") {
                return !e.checked;
              }
            })
            // .filter((item) => (showChecked ? item.checked : !items.checked))
            .map((item, index) => (
              <li className="flex justify-center gap-4 " key={item.id}>
                {editIndex === item?.id ? (
                  <>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                    <button
                      className="bg-green-500 hover:bg-green-600 p-2 rounded-lg text-white mx-2 hover:text-red-600"
                      onClick={() => {
                        editItem(item?.id, {
                          ...item,
                          name: editedName,
                        });
                        setEditedName(""); // Mengosongkan setelah diedit
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 p-2 rounded-lg text-white mx-2 "
                      onClick={() => {
                        setEditIndex(null); // Mengosongkan editIndex untuk membatalkan edit
                        setEditedName(""); // Mengosongkan nilai editedName
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span className=" font-bold text-white text-lg py-2">
                      {item.name}
                    </span>
                    <input
                      checked={item?.checked}
                      type="checkbox"
                      className="w-5 "
                      onChange={() => handleCheckboxChange(item?.id)}
                    ></input>
                    <button
                      className="border-2 bg-sky-200 font-semibold rounded-md hover:border-red-700 p-1 hover:text-red-600"
                      onClick={() => setEditIndex(item?.id)}
                    >
                      Edit
                    </button>
                  </>
                )}
                <button
                  className="border-2 bg-sky-200 font-semibold rounded-md hover:border-red-700 p-1 hover:text-red-600"
                  onClick={() => removeItem(item?.id)}
                >
                  Remove
                </button>
              </li>
            ))}
        </ul>
        <div className="flex justify-center gap-5 mt-5">
          <button
            className="border-2 rounded-md p-4 text-white font-semibold bg-indigo-600  hover:bg-fuchsia-600 hover:text-red-600 w-60"
            onClick={removeCheckedItems}
          >
            Delete Existing Skin
          </button>
          <button
            className="border-2 rounded-md p-4 text-white font-semibold bg-indigo-600  hover:bg-fuchsia-600 hover:text-red-600 w-60"
            onClick={removeAllitems}
          >
            Delete All Skin
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkinListApp;
