import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import type { AppTheme } from "../theme/theme";

/**
 * @description A styled `View` component serving as a standard container for screen content.
 * It ensures the container takes up the full available vertical space (`flex: 1`),
 * applies standard padding from the theme, and sets the background color based on the theme.
 * Use this as the top-level wrapper for most screen components.
 *
 * Note: It does *not* include centering (`justify-content` or `align-items`).
 * Centering should be applied within this container if needed by specific screen layouts.
 */
const StyledContainer = styled(View)`
  flex: 1; /* Take full available height */
  padding: ${({ theme }: { theme: AppTheme }) => theme.customSpacing.m}px;
  /* Apply standard margin */
  background-color: ${({ theme }: { theme: AppTheme }) =>
    theme.colors.background}; /* Use theme background */
`;

/**
 * @description Props for the ScreenContainer component.
 * Currently only accepts standard React children.
 * @interface ScreenContainerProps
 * @property {React.ReactNode} children - The content to be rendered within the container.
 */
interface ScreenContainerProps {
  children: React.ReactNode;
}

/**
 * @description A reusable container component designed to wrap the main content of a screen.
 * Provides consistent background color and padding based on the application theme.
 *
 * @param {ScreenContainerProps} props - Component props.
 * @param {React.ReactNode} props.children - The child elements to render inside the container.
 * @returns {React.ReactElement} The rendered screen container component.
 */
const ScreenContainer: React.FC<ScreenContainerProps> = ({ children }) => {
  // Simply renders the styled container, passing children through.
  return <StyledContainer>{children}</StyledContainer>;
};

export default ScreenContainer;
