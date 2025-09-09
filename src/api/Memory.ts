import { request } from "./client";

export const getArticleMemory = async (date: string) => {
  try {
    const res = await request.get({
      url: `/v1/article/memory?date=${date}`,
      params: {},
    });
    console.log("뉴스메모리 제목 리스트(날짜) 완료", res);
    return res;
  } catch (error) {
    console.error("뉴스메모리 제목 리스트(날짜) 오류:", error);
    throw error;
  }
};
export const getArticleMemoryDetail = async (id: number) => {
  try {
    const res = await request.get({
      url: `/v1/article/memory/${id}`,
      params: {},
    });
    console.log("뉴스메모리 상세 조회 완료", res);
    return res;
  } catch (error) {
    console.error("뉴스메모리 상세 조회 오류:", error);
    throw error;
  }
};
export const getArticleMemoryCalender = async (yearMonth: string) => {
  try {
    const res = await request.get({
      url: `/v1/article/memory/calender?yearMonth=${yearMonth}`,
      params: {},
    });
    console.log("뉴스메모리 날짜 완료", res);
    return res;
  } catch (error) {
    console.error("뉴스메모리 날짜 오류:", error);
    throw error;
  }
};
