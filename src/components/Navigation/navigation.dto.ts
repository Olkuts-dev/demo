import { Routes } from "@router/router.dto";

export interface NavigationsSection {
  name?: string;
  id: number;
  items: Record<Routes | string, NavigationItem>;
}

export interface NavigationItem {
  name: string;
  query?: object;
}