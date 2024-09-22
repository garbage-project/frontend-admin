// import apiClient from "@/utils/apiClient";
"use server";
import axios from "axios";
import { UserParams } from "@/types/types";

const baseUrl = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

type UserSlugProps = {
  slug: string;
};

export async function getUserBySlug({ slug }: UserSlugProps) {
  console.log(slug);
}

// Type for query parameters

export const getUsers = async (params: UserParams) => {
  try {
    const queryString = new URLSearchParams(
      params as Record<string, string>
    ).toString();

    // Make GET request with query parameters
    const response = await baseUrl.get(`/members?${queryString}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
