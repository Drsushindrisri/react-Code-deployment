import { useContext, useEffect, useState } from "react";
import styles from "./sass/DoctorsList.module.scss";
import { RiSearchLine } from "react-icons/ri";
import { uid } from "react-uid";
import { fetchData } from "./Api/Apis";
import { getRandomFour } from "./utils/getRandom";
import { SpecialitiesValueContext } from "./contexts/SpecalitiesList";

export const DoctorsList = (props) => {
  const [doctors, setDoctors] = useState({ real: [], modify: [] });
  const [selectedFilter, setSelectedFilter] = useState(
    props?.location?.state?.treatmentId
  );
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const specialitiesList = useContext(SpecialitiesValueContext);

  useEffect(() => {
    getDoctorsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  async function getDoctorsList() {
    try {
      const resp = await fetchData("getDoctorsList", "formData", {
        // OrganizationID: sessionStorage.getItem("orgId"),
        ...(selectedFilter && selectedFilter !== "all"
          ? { SpecialtyID: selectedFilter }
          : ""),
      });
      const parsedData = (resp?.data || []).map((datum) => ({
        ...datum,
        profilePic: (datum?.docProfileImgUrl || "").includes("amazon")
          ? datum.docProfileImgUrl
          : "/default-avatar.svg",
      }));
      setDoctors({
        real: parsedData,
        modify: parsedData,
      });
    } catch (error) {}
  }

  const handleSearch = (searchText) => {
    if (searchText) {
      const temp = doctors.real.reduce((acc, item) => {
        for (const key in item) {
          if (
            (item[key] || "")
              .toLowerCase()
              .includes((searchText || "").toLowerCase())
          ) {
            acc.push(item);
          }
        }

        return acc;
      }, []);
      setDoctors({ ...doctors, modify: temp });
    } else {
      setDoctors({ ...doctors, modify: doctors.real });
    }
  };

  const handleSelectedDoctor = (index) => setSelectedDoctor(index);

  const goToSlots = (doctor, type) => {
    props.history.push({
      pathname: "/available-slots",
      state: {
        name: doctor?.docName,
        image: doctor?.docProfileImg,
        speciality: doctor?.speciality_name,
        id: doctor?.docId,
        docWlocId: doctor?.hosWorkLId,
        fakeOrgId: doctor?.docWorkLSNHosId,
        happyPatients: getRandomFour(),
        profilePic: doctor?.profilePic,
        type,
      },
    });
  };

  return (
    <div className={`page-safeareas ${styles.doctorsList__main}`}>
      <h3 className="page-header">Doctors</h3>
      <div className={styles.doctorsList__searchBar}>
        <RiSearchLine />
        <input
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className={styles.doctorsList__specalities}>
        {specialitiesList.map((item, ind) => (
          <div
            className={`${styles.doctorsList__specalityItem} ${
              selectedFilter === item?.speciality_id &&
              styles.doctorsList__specalityItemSelected
            }`}
            key={uid(ind)}
            onClick={() => {
              if (item?.speciality_id !== selectedFilter) {
                setSelectedFilter(item?.speciality_id);
              }
            }}
          >
            {item?.speciality_name}
          </div>
        ))}
      </div>
      <div className={styles.doctorsList__container}>
        {doctors.modify.map((item, ind) => (
          <div
            className={`${styles.doctorsList__accordionItem} ${
              selectedDoctor === item?.docId &&
              styles.doctorsList__accordionItemActive
            }`}
            onClick={handleSelectedDoctor.bind(this, item?.docId)}
          >
            <div className={styles.doctorsList__item} key={uid(ind)}>
              <img src={item?.profilePic} alt={item.docName} />
              <div>
                <p className={styles.doctorsList__doctorName}>
                  {item?.docName}
                </p>
                <p className={styles.doctorsList__qualification}>
                  {item?.docEduQualification.slice(0, 15)}
                  {item?.docEduQualification.length > 15 && "..."}
                </p>
                <p>{item?.docWorkLocHosName}</p>
              </div>
            </div>
            <div
              className={`${styles.doctorsList__actionButtons} ${
                selectedDoctor === item?.docId &&
                styles.doctorsList__actionButtonsOpen
              }`}
            >
              <button
                className={styles.doctorsList__bookButton}
                onClick={() => goToSlots(item, "book")}
              >
                Book appointment
              </button>
              <button
                className={styles.doctorsList__consultButton}
                onClick={() => goToSlots(item, "consult")}
              >
                Consult online
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
