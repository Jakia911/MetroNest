import PageBanner from "@/components/shared/PageBanner";
import PropertyListingSection from "./components/PropertyListingSection";

const PropertiesPage = () => {
  return (
    <div>
      <PageBanner title="Properties" />
      <PropertyListingSection />
    </div>
  );
};

export default PropertiesPage;
