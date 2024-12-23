import prisma from "@/prisma/client";
import IssueSummary from "./issueSummary";
import IssueCharts from "./IssueCharts";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  const issueProps = { open, inProgress, closed };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary {...issueProps} />
        <IssueCharts {...issueProps} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "BOCUM Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
