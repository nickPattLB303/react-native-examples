import "styled-components/native";
import type { AppTheme } from "./theme/theme"; // Adjust path as needed

declare module "styled-components/native" {
  // Extend the DefaultTheme interface with our AppTheme type
  export interface DefaultTheme extends AppTheme {}
}
