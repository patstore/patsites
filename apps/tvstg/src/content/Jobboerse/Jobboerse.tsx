import React from "react";
import { Layout } from "@components";
import { HeadContent } from "@ui";
import { useCollection } from "@provider";
import JobElement from "./components/JobElement";
import { JOBBOERSE_CATEGORY } from "./components/findTrainingGroup";
import styles from "./Jobboerse.module.css";

export const JOBBOERSE_TITLE = "Jobbörse";
export const JOBBOERSE_TEXT =
  "Du möchtest dich im Verein engagieren? Hier findest du unsere offenen Stellen als Übungsleiter*in, Trainer*in und Helfer*in.";

const Jobboerse: React.FC = () => {
  const { items: jobs } = useCollection("Entry");

  const actualJobs = jobs.filter((job) => job.categories?.includes(JOBBOERSE_CATEGORY));

  return (
    <Layout>
      <div className="wrapper">
        <HeadContent titel={JOBBOERSE_TITLE} titeltext={JOBBOERSE_TEXT} />
        <div className="site-container">
          {actualJobs.length > 0 ? (
            <div className={styles.jobs}>
              {actualJobs.map((job) => (
                <JobElement key={job.objectId} job={job} />
              ))}
            </div>
          ) : (
            <p>Aktuell sind keine Stellen ausgeschrieben.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Jobboerse;
