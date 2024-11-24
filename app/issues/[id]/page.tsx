import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AsigneeSelect from "./AsigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { Metadata } from "next";
import { cache } from "react";

interface Props {
  params: {
    id: string;
  };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession();
  const issue = await fetchUser(parseInt(params.id));

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          {session && (
            <>
              <AsigneeSelect issue={issue} />
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </>
          )}
        </Flex>
      </Box>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue ? issue.title : "BOCUM Issue Tracker",
    description: issue ? `Details of issue: ${issue.title}` : "",
  };
}

export default IssueDetailPage;
