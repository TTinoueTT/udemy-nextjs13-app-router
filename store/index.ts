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
};

/**
 * ストアの作成を行う関数
 */
const useStore = create<State>((set) => ({
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
}));
export default useStore;
