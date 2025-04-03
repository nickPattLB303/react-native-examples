/**
 * @fileoverview Zustand store for managing user profile data.
 */
import { create } from "zustand";
import { UserProfile } from "../types";

/**
 * Interface for the UserProfile store state and actions.
 * @interface UserProfileState
 */
interface UserProfileState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
}

/**
 * Zustand store hook for user profile.
 * @param {Function} set - Zustand setter function.
 * @returns {UserProfileState} The store state and actions.
 */
const useUserProfileStore = create<UserProfileState>()((set) => ({
  profile: null,
  /**
   * Sets the user profile in the store.
   * @param {UserProfile} profile - The user profile data.
   */
  setProfile: (profile) => set({ profile }),
  /**
   * Clears the user profile from the store.
   */
  clearProfile: () => set({ profile: null }),
}));

export default useUserProfileStore;
