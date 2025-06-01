import { request } from "./client";

export const getDictionary = async (keyword: string) => {
  try {
    const res = await request.get({
      url: `/v1/dictionary/word?keyword=${keyword}`,
      params: {},
    });
    console.log("사전 검색 완료", res);
    return res;
  } catch (error) {
    console.error("사전 검색 오류:", error);
    throw error;
  }
};

export const postDictionary = async () => {
  try {
    const res = await request.post({
      url: `/v1/dictionary/word`,
      params: {},
    });
    console.log("단어장 - 단어 추가 성공", res);
    return res;
  } catch (error) {
    console.error("단어장 - 단어 추가 오류:", error);
    throw error;
  }
};

export const deleteDictionary = async (targetCode: string) => {
  try {
    const res = await request.delete({
      url: `/v1/dictionary/word?targetCode=${targetCode}`,
      params: {},
    });
    console.log("단어장 - 단어 삭제 완료", res);
    return res;
  } catch (error) {
    console.error("단어장 - 단어 삭제 오류:", error);
    throw error;
  }
};

export const getDictionaryList = async () => {
  try {
    const res = await request.get({
      url: `/v1/dictionary/word`,
      params: {},
    });
    console.log("단어장 - 단어 리스트 완료", res);
    return res;
  } catch (error) {
    console.error("단어장 - 단어 리스트 오류:", error);
    throw error;
  }
};
