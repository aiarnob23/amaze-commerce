import SuspenseWrapper from "@/components/SuspenseWrapper"; // Update the import path as necessary
import OTP from "@/components/user/OTP";
 // Update the import path as necessary

const Page: React.FC = () => {
  return (
    <SuspenseWrapper>
      <OTP />
    </SuspenseWrapper>
  );
};

export default Page;
