import { Fragment } from "react";
import { useParams } from "react-router";
import styles from "./user-details.module.scss";
import useGeneralDetails, { type Guarantor } from "@hooks/useGeneralDetails";
import Loader from "@components/loader";
import NotFound from "../notFound/NotFound";

const sectionTitles: Record<string, string> = {
  personalInformation: "Personal Information",
  educationAndEmployment: "Education and Employment",
  socials: "Socials",
  guarantor: "Guarantor",
};

const UserDetails: React.FC = () => {
  const { userId } = useParams();
  const { data: generalDetails, loading, error } = useGeneralDetails(userId);

  if (loading) {
    return <Loader />;
  }

  if (error || !generalDetails) {
    return (
      <NotFound
        message={error || "General details not found"}
        showBackButton={true}
      />
    );
  }

  return (
    <div className={styles.userDetails__container}>
      {Object.entries(generalDetails).map(([sectionKey, sectionValue]) => {
        if (Array.isArray(sectionValue)) {
          // Guarantor section
          return (
            <div className={styles.userDetails} key={sectionKey}>
              <div className={styles.userDetails__header}>
                <h3>{sectionTitles[sectionKey] || sectionKey}</h3>
              </div>
              <div className={styles.userDetails__content}>
                {(sectionValue as Guarantor[]).map((item, idx) => (
                  <Fragment key={idx}>
                    {Object.entries(item).map(([field, value]) => (
                      <div key={field}>
                        <p className={styles.title}>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                        <p className={styles.value}>{value}</p>
                      </div>
                    ))}
                  </Fragment>
                ))}
              </div>
            </div>
          );
        } else {
          // Other sections
          return (
            <div className={styles.userDetails} key={sectionKey}>
              <div className={styles.userDetails__header}>
                <h3>{sectionTitles[sectionKey] || sectionKey}</h3>
              </div>
              <div className={styles.userDetails__content}>
                {Object.entries(sectionValue as Record<string, string>).map(([field, value]) => (
                  <div key={field}>
                    <p className={styles.title}>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                    <p className={styles.value}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default UserDetails;
