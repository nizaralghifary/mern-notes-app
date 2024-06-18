import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar/Navbar.jsx";
import NoteCard from "../../components/Cards/NoteCard.jsx";
import AddEditNotes from "../../pages/Home/AddEditNotes.jsx";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../utils/axiosInstance.js";
import Toast from "../../components/ToastMessage/Toast.jsx";
import EmptyCard from "../../components/EmptyCard/EmptyCard.jsx";
import addNote from "../../assets/icons/add-note.svg";
import noData from "../../assets/icons/no-data.svg";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add"
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isSearch, setIsSearch] = useState(false); 

  const navigate = useNavigate();

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
      type: "add"
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        console.error("Error fetching user info:", error);
        setError("Gagal mengambil informasi pengguna");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
        setIsSearch(false); 
      } else {
        setError("Gagal mengambil catatan.");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("Kesalahan tidak terduga terjadi. Harap coba lagi.");
    }
  };

  const searchNotes = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      
      if (response.data && response.data.notes) {
        setIsSearch(true); 
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (note) => {
    const noteId = note._id;

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      console.log("Delete response:", response.data);  

      if (response.data && !response.data.error) {
        getAllNotes();
        showToastMessage("Catatan Telah Dihapus", "delete");
      } else {
        console.error("Delete error response:", response.data.error);
        setError("Gagal menghapus catatan.");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      setError("Kesalahan tidak terduga terjadi. Harap coba lagi");
    }
  };
  
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
        isPinned: !noteData.isPinned,
      });
      
      if (response.data && response.data.note) {
        showToastMessage("Catatan Telah Diedit", "edit");
        getAllNotes();
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  const handleEditNote = (note) => {
    setOpenAddEditModal({
      isShown: true,
      type: 'edit',
      data: note,
    });
  };

  const handleSearchNote = (query) => {
    if (query.trim() === "") {
      getAllNotes(); 
    } else {
      searchNotes(query); 
    }
  };
  
  const handleClearSearch = () => {
    setIsSearch(false)
    getAllNotes()
  }

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={handleSearchNote} handleClearSearch={handleClearSearch} />
      <div className="container mx-auto">
        {error && <p className="text-red-500">{error}</p>}
        {allNotes.length > 0 ? ( 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {allNotes.map((item) => (
              <NoteCard 
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEditNote(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard imgSrc={isSearch ? noData : addNote} message={isSearch ? `Oops! Tidak ada catatan yang kamu cari` : `Coba Buat Catatan Pertama Kamu Dengan Klik Tombol +`}/>
        )}
        <button
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-6 bottom-10"
          onClick={() => {
            setOpenAddEditModal({
              isShown: true,
              type: 'add',
              data: null,
            });
          }}
        >
          <MdAdd className="text-[32px] text-white"/> 
        </button>
      </div>
      
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setOpenAddEditModal({
            isShown: false,
            type: 'add',
            data: null,
          });
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Add/Edit Note Modal"
        className="w-[70%] md:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false, 
              type: 'add',
              data: null,
            });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;