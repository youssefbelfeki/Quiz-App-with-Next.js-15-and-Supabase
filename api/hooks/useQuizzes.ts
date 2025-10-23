"use client";

import { useQuery } from "@tanstack/react-query";
import { getQuizzes } from "@/api/supabase/quizzes";
import { useAuth } from "@/lib/auth";

export const useQuizzes = (
  page = 1,
  pageSize = 9,
  isPublicRoute = false,
  searchTerm: string
) => {
  const { user } = useAuth();
  console.log(searchTerm);

  return useQuery({
    queryKey: ["quizzes", page, pageSize, searchTerm],
    queryFn: () => getQuizzes(page, pageSize, searchTerm),
    enabled: !!user || isPublicRoute, // Only fetch if user is authenticated or it's a public route
  });
};
