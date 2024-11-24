import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

// In a Next.js application, server-side rendering (SSR) occurs before the JavaScript is executed in the browser. This means that any code that relies on browser-specific objects like window, document, navigator, etc., will fail during SSR, leading to errors such as "ReferenceError: navigator is not defined."

// Even though "use client" also ensures client-side rendering, it doesn't control when the component's dependencies are loaded. In contrast, dynamic does this by dynamically importing the component only when required.

//  to tell next JS not to render this component on the server
// This means that SimpleMDE inside IssueForm will not be included in the initial JavaScript bundle.
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
