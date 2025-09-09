// context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../api/User";

// 유저 정보 확장 (MyPage에서 사용하는 필드 포함)
export interface UserInfo {
  nickname: string;
  email: string;
  level: string; // LEVEL1 | LEVEL2 | LEVEL3
  reward: number;
  readCnt: number;
  consecutiveAttendanceDays: number;
}

interface UserContextType {
  user: UserInfo | null;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>; // 직접 업데이트 가능
  refreshUser: () => void; // 상태 갱신 함수
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  const fetchUser = async () => {
    try {
      const res = await getUser();
      if (res?.isSuccess && res.data) {
        setUser({
          nickname: res.data.nickname,
          email: res.data.email,
          level: res.data.level,
          reward: res.data.reward,
          readCnt: res.data.readCnt ?? 0,
          consecutiveAttendanceDays: res.data.consecutiveAttendanceDays ?? 0,
        });
      }
    } catch (e) {
      console.error("유저 정보 불러오기 실패", e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
