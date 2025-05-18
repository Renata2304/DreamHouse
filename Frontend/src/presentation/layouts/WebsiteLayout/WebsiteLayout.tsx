import { Footer } from "../Footer";
import { MainContent } from "../MainContent";
import { Navbar } from "../Navbar";
import { memo, PropsWithChildren } from "react";
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";

/**
 * This component should be used for all pages in the application, it wraps other components in a layout with a navigation bar and a footer.
 */
export const WebsiteLayout = memo(
  (props: PropsWithChildren<{}>) => {
    const { children } = props;

    return <div className="flex flex-col min-h-screen">
      <Navbar />
      <MainContent>{children}</MainContent>
      <Footer />
      <FeedbackForm position={{ bottom: 20, right: 20 }} />
    </div>
  }
);
