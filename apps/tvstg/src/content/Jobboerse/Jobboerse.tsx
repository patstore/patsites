import React from "react";
import { Layout } from "@components";
import { FlexBox, HeadContent } from "@ui";
import { siteContainer, wrapper } from "@styles";
import { useGetEntry } from "@provider";
import JobElement from "./components/JobElement";

export const JOBBOERSE_TITLE = "Jobbörse";
export const JOBBOERSE_TEXT =
  "Du möchtest dich im Verein engagieren? Hier findest du unsere offenen Stellen als Übungsleiter*in, Trainer*in und Helfer*in.";

const Jobboerse: React.FC = () => {
  const { entrys: jobs } = useGetEntry();

  return (
    <Layout>
      <div css={wrapper}>
        <HeadContent titel={JOBBOERSE_TITLE} titeltext={JOBBOERSE_TEXT} />
        <div css={siteContainer}>
          {jobs.length > 0 ? (
            <FlexBox
              direction="row"
              align="stretch"
              justify="flex-start"
              styles={{ gap: ["2%", "2%", "2%", "1%"] }}
              wrap
            >
              {jobs.map((job) => (
                <JobElement key={job.objectId} job={job} />
              ))}
            </FlexBox>
          ) : (
            <p>Aktuell sind keine Stellen ausgeschrieben.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Jobboerse;
