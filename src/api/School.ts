import { request } from "./client";

export const getSchools = async (schoolLevel: string) => {
  try {
    const res = await request.get({
      url: `/v1/schools?schoolLevel=${schoolLevel}`,
      params: {},
    });
    console.log("학교 목록 조회 완료", res);
    return res;
  } catch (error) {
    console.error("학교 목록 조회 오류:", error);
    throw error;
  }
};
export const getSchoolsRank = async () => {
  try {
    const res = await request.get({
      url: `/v1/schools/rank`,
      params: {},
    });
    console.log("학교 랭킹 완료", res);
    return res;
  } catch (error) {
    console.error("학교 랭킹 오류:", error);
    throw error;
  }
};
