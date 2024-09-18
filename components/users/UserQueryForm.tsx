"use client";
import React, { useState } from "react";
import DateRangePicker from "../ui/DateRangePicker";
import { addMonths } from "date-fns";
import { User } from "@/types/types";
import { userParams } from "@/service/userService";

type Props = {
  userList: any[];
  clickQueryUsers: (searchParams: userParams) => Promise<void>;
};

const UserQueryForm = ({ userList, clickQueryUsers }: Props) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [socialLogin, setSocialLogin] = useState("");
  const today = new Date();
  const oneMonthFromNow = addMonths(today, 1);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    oneMonthFromNow,
    today,
  ]);

  const handleSearch = () => {
    // Implement search functionality here
    console.log({ name, gender, birthDate, socialLogin });
    clickQueryUsers({});
  };

  const handleReset = () => {
    setName("");
    setGender("");
    setBirthDate("");
    setSocialLogin("");
    setDateRange([oneMonthFromNow, today]);
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">사용자 검색</h2>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Name */}
        <div className="form-control">
          <label className="label" htmlFor="name">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            id="name"
            className="input input-bordered"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* gender */}
        <div className="form-control">
          <label className="label" htmlFor="gender">
            <span className="label-text">Gender</span>
          </label>
          <select
            id="gender"
            className="select select-bordered"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Birth Date */}
        <div className="form-control">
          <label className="label" htmlFor="birthDate">
            <span className="label-text">Birth Date</span>
          </label>
          <input
            type="date"
            id="birthDate"
            className="input input-bordered"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        {/* Social Login */}
        <div className="form-control">
          <label className="label" htmlFor="socialLogin">
            <span className="label-text">Social Login</span>
          </label>
          <select
            id="socialLogin"
            className="select select-bordered"
            value={socialLogin}
            onChange={(e) => setSocialLogin(e.target.value)}
          >
            <option value="" disabled>
              Select social login
            </option>
            <option value="Naver">Naver</option>
            <option value="KakaoTalk">KakaoTalk</option>
            <option value="Google">Google</option>
          </select>
        </div>

        {/* Created Date */}
        <div className="form-control">
          <label className="label" htmlFor="createdDate">
            <span className="label-text">Created Date</span>
          </label>
          {/* <input
            type="date"
            id="createdDate"
            className="input input-bordered"
            value={createdDate}
            onChange={(e) => setCreatedDate(e.target.value)}
          /> */}
          <DateRangePicker
            startDate={today}
            endDate={oneMonthFromNow}
            setDateRange={setDateRange}
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default UserQueryForm;
