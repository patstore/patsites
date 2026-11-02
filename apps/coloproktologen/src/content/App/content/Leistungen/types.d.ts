import React from "react";

export type LeistungArray = {
  title: string;
  subtitle?: string;
  description: string;
  content: React.ReactNode;
}[];

export type LeistungProps = {
  title: string;
  subtitle?: string;
  description: string;
  content: React.ReactNode;
  index: number;
};
