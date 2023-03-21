import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Layout from "../component/Layout.js/Layout";

const PromoList = () => {
  const [promoRecord, setPromoRecord] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // if (!localStorage.getItem("token")) {
    //   navigate("/login");
    // }
    getPromoRecords();
  }, []);

  const getPromoRecords = async () => {
    console.log("promo code is ");
    const promoRecord = await axios.get(`/promocode`);
    console.log(promoRecord.data.successMessage);
    setPromoRecord(promoRecord.data.successMessage);
  };

  const handleEditShowDetails = (data) => {
    console.log(data);
    navigate(`/editpromo/${data._id}`);
  };

  const handleDeleteShowDetails = async (data) => {
    console.log(data.promo_name);
    //const movieShowData = await axios.delete(`/show/${data._id}`);
    navigate(-1);
  };

  return (
    <Layout>
      <div>
        <h4>PromoCodes</h4>
        <div>
          <ul className="list-group">
            {promoRecord &&
              promoRecord.map((data) => {
                return (
                  <li
                    key={data.promo_name}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span key={data.promo_name}>
                      {data.promo_name} - {"" + data.active_status}
                    </span>
                    <span></span>
                    <span>
                      <FiEdit2 onClick={() => handleEditShowDetails(data)} />
                      <MdDelete
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you Really want to delete this show?"
                          );
                          if (confirmBox === true) {
                            handleDeleteShowDetails(data);
                          }
                        }}
                      />
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default PromoList;
