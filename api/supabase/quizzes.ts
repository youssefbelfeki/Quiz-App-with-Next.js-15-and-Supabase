/* eslint-disable prefer-const */
import { supabase } from "@/lib/supabase";
import type { Quiz } from "@/lib/types";

export const getQuizzes = async (
  page = 1,
  pageSize = 9,
  searchTerm: string
): Promise<{ data: Quiz[]; total: number }> => {
  // Calculate the range for pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  try {
    // First get the total count
    let countQuery = supabase
      .from("quizzes")
      .select("*", { count: "exact", head: true })
      .order("created_at", { ascending: true });

    // If it's a public route, only show published quizzes

    const { count, error: countError } = await countQuery;

    if (countError) {
      console.error("Error counting quizzes:", countError);
      throw countError;
    }

    // Then get the paginated data
    let dataQuery = supabase
      .from("quizzes")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);
    if (searchTerm) {
      dataQuery = dataQuery.ilike("title", `%${searchTerm}%`);
    }

    // If it's a public route, only show published quizzes

    const { data, error } = await dataQuery;

    if (error) {
      console.error("Error fetching quizzes:", error);
      throw error;
    }

    return {
      data: data || [],
      total: count || 0,
    };
  } catch (error) {
    console.error("Error in getQuizzes:", error);
    return { data: [], total: 0 };
  }
};