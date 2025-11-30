import { request } from "./client";

export const postRegister = async (data: {
  email: string;
  password: string;
  nickname: string;
  gender: "MALE" | "FEMALE";
  birthYear: string;
  level: "LEVEL1" | "LEVEL2";
  schoolId: string;
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
export const getUserCheckNickname = async (nickname: string) => {
  try {
    const res = await request.get({
      url: `/v1/user/checkNickname?nickname=${nickname}`,
      params: {},
    });
    console.log("닉네임 중복 검사 완료", res);
    return res;
  } catch (error) {
    console.error("닉네임 중복 검사 오류:", error);
    throw error;
  }
};
export const getUserCheckEmail = async (email: string) => {
  try {
    const res = await request.get({
      url: `/v1/user/checkEmail?email=${email}`,
      params: {},
    });
    console.log("이메일 중복 검사 완료", res);
    return res;
  } catch (error) {
    console.error("이메일 중복 검사 오류:", error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const res = await request.get({
      url: `/v1/user`,
      params: {},
    });
    console.log("유저 정보 조회 완료", res);
    return res;
  } catch (error) {
    console.error("유저 정보 조회 오류:", error);
    throw error;
  }
};
