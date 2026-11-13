import React from "react";
import { Layout } from "@components";
import { FlexBox, HeadContent } from "@ui";
import { siteContainer, wrapper } from "@styles";
import { useCollection } from "@provider";
import JobElement from "./components/JobElement";
import { JOBBOERSE_CATEGORY } from "./components/findTrainingGroup";

export const JOBBOERSE_TITLE = "Jobbörse";
export const JOBBOERSE_TEXT =
  "Du möchtest dich im Verein engagieren? Hier findest du unsere offenen Stellen als Übungsleiter*in, Trainer*in und Helfer*in.";

const Jobboerse: React.FC = () => {
  const { items: jobs } = useCollection("Entry");

  const actualJobs = jobs.filter((job) => job.categories?.includes(JOBBOERSE_CATEGORY));

  return (
    <Layout>
      <div css={wrapper}>
        <HeadContent titel={JOBBOERSE_TITLE} titeltext={JOBBOERSE_TEXT} />
        <div css={siteContainer}>
          {actualJobs.length > 0 ? (
            <FlexBox
              direction="row"
              align="stretch"
              justify="flex-start"
              styles={{ gap: ["2%", "2%", "2%", "1%"] }}
              wrap
              hasFullWidth
            >
              {actualJobs.map((job) => (
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
