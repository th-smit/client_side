import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import moment from "moment/moment";

const Report = () => {
  const [highestTimeUsedPC, setHighestTimeUsedPC] = useState([]);
  const [highestTimeUsedPCCount, setHighestTimeUsedPCCount] = useState();
  useEffect(() => {
    getPCNameHighestTimeUsed();
    getUserNameHighestTimeUsedPC();
  }, []);

  const getPCNameHighestTimeUsed = async () => {
    try {
      console.log("get promo data");
      const UserPromoData = await axios.get("/promocode/getuserpromodata");
      console.log(UserPromoData.data.successMessage);
      setHighestTimeUsedPCCount(
        UserPromoData.data.successMessage[0].totalLimit
      );
      setHighestTimeUsedPC(UserPromoData.data.successMessage);
    } catch (error) {
      console.log("error in fetching data from the promocode " + error);
    }
  };

  const getUserNameHighestTimeUsedPC = async () => {
    try {
      const data = await axios.get();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p>hello1</p>

      {highestTimeUsedPC &&
        highestTimeUsedPC.map((data) => {
          if (data.totalLimit === highestTimeUsedPCCount) {
            return <span>{data._id}</span>;
          }
        })}
      {/* Highest Time used Promocode<p>{highestTimePC}</p> */}
    </div>
  );
};

export default Report;
