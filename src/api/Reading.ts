import { request } from "./client";

export const putArticleReward = async (
  correctCnt: number,
  totalCnt: number
) => {
  try {
    const res = await request.put({
      url: `/v1/article/reward?correctCnt=${correctCnt}&totalCnt=${totalCnt}`,
      params: {},
    });
    console.log("리워드 추가 성공", res);
    return res;
  } catch (error) {
    console.error("리워드 추가 오류:", error);
    throw error;
  }
};
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
export const getArticleFeedback = async (
  answer: string,
  sessionId: string,
  forTest: boolean
) => {
  try {
    const res = await request.get({
      url: `/v1/article/thinking-question-feedback?answer=${answer}&sessionId=${sessionId}&forTest=${forTest}`,
      params: {},
    });
    console.log("생각해보기 피드백 조회 성공", res);
    return res;
  } catch (error) {
    console.error("생각해보기 피드백 조회 오류:", error);
    throw error;
  }
};
export const getArticleRecommend2 = async () => {
  try {
    const res = await request.get({
      url: `/v1/article/recommendation/recommend-history`,
      params: {},
    });
    console.log("메인 추천기사 조회 성공", res);
    return res;
  } catch (error) {
    console.error("메인 추천기사 조회 오류:", error);
    throw error;
  }
};
export const getArticleRecommend1 = async (previousTopic: string) => {
  try {
    const res = await request.get({
      url: `/v1/article/recommendation/recommend-previous-topic?previousTopic=${previousTopic}`,
      params: {},
    });
    console.log("뒤로가기 추천기사 조회 성공", res);
    return res;
  } catch (error) {
    console.error("뒤로가기 추천기사 조회 오류:", error);
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
export const getArticleIssues = async (category: string) => {
  try {
    const res = await request.get({
      url: `/v1/article/issues?category=${category}&date=2025-10-30`,
      params: {},
    });
    console.log("카테고리별 이슈 목록 성공", res);
    return res;
  } catch (error) {
    console.error("카테고리별 이슈 목록 오류:", error);
    throw error;
  }
};
