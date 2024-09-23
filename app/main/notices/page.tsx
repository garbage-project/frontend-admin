"use client";
import React, { useState, ChangeEvent, MouseEvent } from "react";
import Pagination from "@/components/ui/Pagination";
import CustomTable from "@/components/ui/CustomTable";
import { useRouter } from "next/navigation";
import NoticeQueryForm from "@/components/notice/NoticeQueryForm";
import NoticeAddModal from "@/components/notice/NoticeAddModal";
import useSWR from "swr";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

type Notice = {
  id: string;
  [key: string]: any;
};

const initialNotices: Notice[] = [
  {
    id: "1",
    title: "title",
    noticeContent: "공지 내용",
    isActive: "N",
    createdDate: "2024-01-01",
  },
];

const columns = [
  { id: "title", label: "제목" },
  { id: "noticeContent", label: "공지 내용" },
  { id: "isActive", label: "게시 상태" },
  { id: "createdDate", label: "생성일" },
  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete" },
];

const rowsPerPageOptions = [
  { value: 10, label: 10 },
  { value: 25, label: 25 },
  { value: 50, label: 50 },
  { value: 100, label: 100 },
];

const ReportPage = () => {
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedNotices, setSelectedNotices] = useState<string[]>([]);
  const [isAddNoticeModalOpen, setIsAddNoticeModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data, error } = useSWR("/api/notices");

  const handleChangeResolvedType = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);

    // setResolvedType(event.target.value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage - 1);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = notices.map((item) => item.id);
      setSelectedNotices(newSelected);
      return;
    }
    setSelectedNotices([]);
  };

  const handleClick = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const selectedIndex = selectedNotices.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedNotices, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedNotices.slice(1));
    } else if (selectedIndex === selectedNotices.length - 1) {
      newSelected = newSelected.concat(selectedNotices.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedNotices.slice(0, selectedIndex),
        selectedNotices.slice(selectedIndex + 1)
      );
    }

    setSelectedNotices(newSelected);
  };

  const handleDelete = () => {
    console.log(selectedNotices);
    // setNotices(notices.filter((item) => !selectedNotices.includes(item.id)));
    // setSelectedNotices([]);
  };

  const handleClickNotice = (item: Notice) => {
    console.log("click ", item);
  };

  const handleClickEdit = (item: Notice) => {
    console.log("click edit", item);
    router.push(`/main/notices/${item.id}`);
  };

  const handleClickItemDelete = (item: Notice) => {
    console.log("delete notice item");
    setIsDeleteModalOpen(true);
  };

  const filteredReports = notices.filter((item) =>
    Object.entries(item).some((value) =>
      value[0].toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredReports.length / rowsPerPage);

  return (
    <div className="container mx-auto px-4 py-4">
      <NoticeQueryForm />
      <div className="mt-4 bg-base-100 shadow-lg rounded-lg">
        <div className="flex justify-between items-center p-4">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="input input-bordered w-1/3"
          />
          <div className="flex items-end">
            <button
              className="btn btn-sm  btn-info mt-4"
              onClick={() => setIsAddNoticeModalOpen(true)}
            >
              추가
            </button>
            <button
              className="btn btn-sm  btn-error mt-4 ml-2"
              onClick={() => setIsDeleteModalOpen(true)}
              disabled={selectedNotices.length === 0}
            >
              삭제
            </button>

            <div className="form-control ml-4">
              <div className="label pb-0">
                <span className="label-text">페이지 당 개수</span>
              </div>
              <select
                className="select select-bordered select-sm"
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
              >
                {rowsPerPageOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.value === 0}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <CustomTable
          columns={columns}
          data={filteredReports}
          selectedRows={selectedNotices}
          rowsPerPage={rowsPerPage}
          page={page}
          onSelectAll={handleSelectAllClick}
          onSelectRow={handleClick}
          onEdit={handleClickEdit}
          onItemClick={handleClickNotice}
          onDelete={handleClickItemDelete}
          handleChangeResolvedType={handleChangeResolvedType}
        />

        <div className="flex justify-center items-center p-4">
          <Pagination
            currentPage={page + 1} // Adjusting for one-based index
            totalPages={totalPages}
            onPageChange={handleChangePage}
          />
        </div>

        {isAddNoticeModalOpen && (
          <NoticeAddModal
            isOpen={isAddNoticeModalOpen}
            handleCloseModal={() => setIsAddNoticeModalOpen(false)}
          />
        )}

        {isDeleteModalOpen && (
          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            onConfirm={handleDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
            message="삭제하시겠습니까?"
          />
        )}
      </div>
    </div>
  );
};

export default ReportPage;
