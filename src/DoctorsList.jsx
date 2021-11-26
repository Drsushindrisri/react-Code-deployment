import { useEffect, useState } from "react";
import styles from "./sass/DoctorsList.module.scss";
import { RiSearchLine } from "react-icons/ri";
import { uid } from "react-uid";
import { fetchData } from "./Api/Apis";

const filterItems = [
  "All",
  "Cardiology",
  "Neurology",
  "Dermatology",
  "Pediatric",
];

export const DoctorsList = (props) => {
  const [doctors, setDoctors] = useState({ real: [], modify: [] });
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    getDoctorsList();
  }, []);

  useEffect(() => {
    if (selectedFilter === "All") {
      setDoctors({ ...doctors, modify: doctors.real });
    } else {
      handleFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  async function getDoctorsList() {
    try {
      const resp = await fetchData("getDoctorsList");
      setDoctors({ real: resp, modify: resp });
    } catch (error) {}
  }

  const handleFilter = () => {
    const temp = doctors.real.reduce((acc, item) => {
      if (item.speciality_name === selectedFilter) {
        acc.push(item);
      }
      return acc;
    }, []);
    setDoctors({ ...doctors, modify: temp });
  };

  const handleSearch = (searchText) => {
    if (searchText) {
      const temp = doctors.real.reduce((acc, item) => {
        for (const key in item) {
          if (item[key].toLowerCase().includes(searchText.toLowerCase())) {
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

  return (
    <div className={`page-content ${styles.doctorsList__main}`}>
      <h3>Doctors</h3>
      <div className={styles.doctorsList__searchBar}>
        <RiSearchLine />
        <input
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className={styles.doctorsList__specalities}>
        {filterItems.map((item, ind) => (
          <div
            className={`${styles.doctorsList__specalityItem} ${
              selectedFilter === item &&
              styles.doctorsList__specalityItemSelected
            }`}
            key={uid(ind)}
            onClick={() => {
              if (item !== selectedFilter) {
                setSelectedFilter(item);
              }
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div className={styles.doctorsList__container}>
        {doctors.modify.map((item, ind) => (
          <div
            className={styles.doctorsList__item}
            key={uid(ind)}
            onClick={() => {
              props.history.push({
                pathname: "/Slot-BookAppointment",
                state: {
                  name: item.docName,
                  image: item.docProfileImg,
                  speciality: item.speciality_name,
                },
              });
            }}
          >
            <img
              src="https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt={item.docName}
            />
            <div>
              <p>{item.docName}</p>
              <p className={styles.doctorsList__qualification}>
                {item.docEduQualification.slice(0, 20)}
                {item.docEduQualification.length > 20 && "..."}
              </p>
              <p>{item.docWorkLocHosName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
