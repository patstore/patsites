import React, { FC, Suspense } from "react";
import { Await } from "@tanstack/react-router";
import { ScaleLoader } from "react-spinners";
import settings from "@settings";
import { PatstoreScope } from "@provider";
import type { PatstoreData } from "@types";
import Sidebar from "./Sidebar";
import { sidebarContent } from "./styles";
import { SidebarProps } from "./types";

type StreamedSidebarProps = SidebarProps & {
  data: Promise<PatstoreData>;
};

const StreamedSidebar: FC<StreamedSidebarProps> = ({ data, ...sidebarProps }) => (
  <Suspense
    fallback={
      <div css={[sidebarContent, { alignItems: "center", padding: "2em 0" }]}>
        <ScaleLoader color={settings.colors.primary} />
      </div>
    }
  >
    <Await promise={data}>
      {(resolved) => (
        <PatstoreScope data={resolved}>
          <Sidebar {...sidebarProps} />
        </PatstoreScope>
      )}
    </Await>
  </Suspense>
);

export default StreamedSidebar;
