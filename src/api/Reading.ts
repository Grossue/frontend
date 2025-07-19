import { request } from "./client";

export const getArticle = async (
  topic: string,
  articleType: string,
  level: string,
  forTest: boolean
) => {
  try {
    const res = await request.get({
      url: `/v1/article?topic=${topic}&articleType=${articleType}&level=${level}&forTest=${forTest}`,
      params: {},
    });
    console.log("기사 생성 성공", res);
    return res;
  } catch (error) {
    console.error("기사 생성 오류:", error);
    throw error;
  }
};

export const getArticleQna = async (sessionId: string, question: string) => {
  try {
    const res = await request.get({
      url: `/v1/article/qna?sessionId=${sessionId}&question=${question}`,
      params: {},
    });
    console.log("챗봇 성공", res);
    return res;
  } catch (error) {
    console.error("챗봇 오류:", error);
    throw error;
  }
};
