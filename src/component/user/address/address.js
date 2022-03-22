import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginApi } from "../../../api/auth/login";
import PageHeader from "../../../utils/base";
import {
  ClearAllToast,
  ErrorToast,
  PendingToast,
  successToast,
  SuccessToast,
  ToastToError,
} from "../../toast/base";
import Footer from "../home/footer";
import Header from "../home/header";
import { LogOutAction } from "../../../api/base";
import { UpdateProfileApi } from "../../../api/account/profile/profile";
import {
  AddNewAddressApi,
  DeleteAddressApi,
  GetUserAddressApi,
} from "../../../api/address/address";

export default function Address() {
  //   const data1 = useSelector((state) => {
  //     return state.AccountReducer.data;
  //   });
  const [FromData, setFromData] = React.useState({ loader: false });
  const [AddressData, setAddressData] = useState([]);
  const dispatch = useDispatch();

  const getAndSetAddress = async () => {
    const response = await GetUserAddressApi();
    if (response.status) {
      setAddressData(response.data);
      return response.data;
    } else {
      ErrorToast("Got Error While Retriving Your address");
    }
  };

  useEffect(async () => {
    const data = await getAndSetAddress();
  }, []);

  const DeleteAddress = async (id) => {
    const response = await DeleteAddressApi(id);
    if (response.status) {
      getAndSetAddress();
      SuccessToast("Deleted Successfully !");
    } else {
      ErrorToast("Cant delete");
    }
  };

  const HandleInputChange = (event) => {
    setFromData({ ...FromData, [event.target.name]: event.target.value });
  };

  const handleFromSubmit = async () => {
    setFromData({ ...FromData, loader: true });
    // var pendingToasts = await PendingToast("Updating  ....");
    const response = await AddNewAddressApi(FromData);
    await ClearAllToast();
    if (response.status) {
      SuccessToast("Address Added Successfully ..");
      setFromData({ ...FromData, loader: false });
      getAndSetAddress();
    } else {
      var obj = Object.keys(response.data);
      for (var key in Object.keys(response.data)) {
        ErrorToast(obj[key] + " " + response.data[obj[key]]);
      }
      setFromData({ ...FromData, loader: false });
    }
    setFromData({ ...FromData, loader: false });
  };

  return (
    <div>
      <Header></Header>
      <PageHeader></PageHeader>
      <div className="container">
        <div className="row">
          <div className="  col-lg-4">
            <div className="card mr-3 p-3">
              <h5 className="mb-4 mx-2  ">Add New Address</h5>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <input
                  type={"text"}
                  className="mb-3 form-control"
                  onChange={HandleInputChange}
                  name="full_name"
                  placeholder="Enter your Full Name"
                  value={FromData.full_name}
                ></input>
                <input
                  onChange={HandleInputChange}
                  name="address"
                  placeholder="Enter Address"
                  value={FromData.address}
                  type={"text"}
                  className="mb-3 form-control"
                ></input>
                <input
                  onChange={HandleInputChange}
                  name="area_colony"
                  placeholder="Enter Area Colony ( Optional ) "
                  value={FromData.area_colony}
                  type={"text"}
                  className="mb-3 form-control"
                ></input>
                <input
                  onChange={HandleInputChange}
                  name="address_line1"
                  placeholder="Enter Address Line2 ( Optional ) "
                  value={FromData.address_line1}
                  type={"text"}
                  className="mb-3 form-control"
                ></input>

                <select
                  name="state"
                  onChange={HandleInputChange}
                  value={FromData.state}
                  className="form-control mb-3"
                >
                  <option value={"1"} selected={true}>
                    Madhya Pradesh
                  </option>
                  {/* <option value={"2"}>UP</option> */}
                </select>

                <select
                  name="city"
                  onChange={HandleInputChange}
                  className="form-control mb-3"
                >
                  <option value={"1"} selected={true}>
                    Ujjain
                  </option>
                  {/* <option value={"2"}>UP</option> */}
                </select>

                <input
                  onChange={HandleInputChange}
                  name="pincode"
                  value={FromData.pincode}
                  placeholder="Enter Pincode"
                  type={"number"}
                  className="mb-3 form-control"
                  max={999999}
                ></input>

                <input
                  onChange={HandleInputChange}
                  name="phone_number"
                  placeholder="Enter Mobile Number"
                  value={FromData.phone_number}
                  type={"number"}
                  className="mb-3 form-control"
                  max={9999999999}
                ></input>

                <select name="address_type" className="form-control mb-3">
                  <option value={"home"} selected={true}>
                    Home
                  </option>
                  <option value={"2"}>Indore</option>
                </select>

                <input
                  className="btn btn-primary"
                  type={"button"}
                  value="Add address"
                  onClick={handleFromSubmit}
                  disabled={FromData.loader}
                  style={{ width: "100%" }}
                ></input>
              </form>
            </div>
          </div>
          <div className=" col-lg-7">
            <div className="row">
              {AddressData
                ? AddressData.length > 0
                  ? AddressData.map((useraddress) => {
                      return (
                        <div className=" p-4 mr-2 card col-lg-5">
                          <b className="bold">{useraddress.full_name}</b>
                          {useraddress.address} <br></br>{" "}
                          {useraddress.address_line1},{useraddress.pincode}
                          <br></br>
                          {useraddress.address_type}
                          <br></br>{" "}
                          <div className="input-group mt-2">
                            <button className="btn text-warning">
                              <img
                                style={{ height: "25px" }}
                                src="https://img.icons8.com/cute-clipart/64/000000/edit.png"
                              />
                            </button>
                            &nbsp;
                            <button
                              onClick={() => {
                                DeleteAddress(useraddress.id);
                              }}
                              className="btn text-danger"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  : "Please add addrss to get started"
                : ""}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
