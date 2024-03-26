import { create } from 'zustand'; //状態管理パッケージ

/**
 * タスク編集時の状態管理
 */
type EditedTask = {
    id: string;
    title: string | null;
};

/**
 * ログイン状態を管理
 */
type LoginUser = {
    id: string | undefined;
    email: string | undefined;
};

/**
 *
 */
type State = {
    editedTask: EditedTask;
    updateEditedTask: (payload: EditedTask) => void;
    resetEditedTask: () => void;
    loginUser: LoginUser;
    updateLoginUser: (payload: LoginUser) => void;
    resetLoginUser: () => void;
    count: number;
    increase: () => void;
    decrease: () => void;
    reset: () => void;
};

/**
 * ストアの作成を行う関数
 */
const useStore = create<State>((set, get) => ({
    editedTask: { id: '', title: '' },
    updateEditedTask: (payload) =>
        set({
            editedTask: payload,
        }),
    resetEditedTask: () => set({ editedTask: { id: '', title: '' } }),

    loginUser: { id: '', email: '' },
    updateLoginUser: (payload) =>
        set({
            loginUser: payload,
        }),
    resetLoginUser: () => set({ loginUser: { id: '', email: '' } }),

    count: 1,
    increase: () => set({ count: get().count + 1 }),
    decrease: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
}));

export default useStore;
