import { request } from "./client";

export const postRegister = async (data: {
  email: string;
  password: string;
  nickname: string;
  gender: "MALE" | "FEMALE";
  birthYear: string;
  level: "LEVEL1" | "LEVEL2";
}) => {
  try {
    const res = await request.post({
      url: `/v1/user/register`,
      data: data,
    });
    console.log("일반 회원가입 성공", res);
    return res;
  } catch (error) {
    console.error("일반 회원 가입 오류:", error);
    throw error;
  }
};

export const postLogin = async (data: { email: string; password: string }) => {
  try {
    const res = await request.post({
      url: `/v1/user/login/normal`,
      data: data,
    });
    console.log("일반 로그인 완료", res);
    return res;
  } catch (error) {
    console.error("일반 로그인 오류:", error);
    throw error;
  }
};
