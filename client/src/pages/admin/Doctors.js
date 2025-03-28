import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    // get Doctors
    const getDoctors = async () => {
        try {
            // dispatch(showLoading())
            const res = await axios.get("/api/v1/admin/getAllDoctors", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            // dispatch(hideLoading())

            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    // Handle Approve Doctor Status
    const handleAccountStatus = async (record, status) => {
        try {
            const res = await axios.post(
                "/api/v1/admin/changeAccountStatus",
                { doctorId: record._id,userId: record.userId, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if(res.data.success){
                message.success(res.data.message)
                window.location.reload()
            }
        } catch (error) {
            message.error("Something Went Wrong!");
        }
    };

    useEffect(() => {
        getDoctors();
    }, []);

    //antD Table Columns
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span>
                    {record.firstName} {record.lastName}
                </span>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "Status",
            dataIndex: "status",
            ellipsis : true,
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === "pending" ? (
                        <button
                            className="btn btn-success"
                            onClick={() => handleAccountStatus(record, "approved")}
                        >
                            Approve
                        </button>
                    ) : (
                        <button className="btn btn-danger ">Reject</button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <Layout>
            <h1 className="text-center m-2">Doctors List</h1>
            <Table columns={columns} dataSource={doctors} />
        </Layout>
    );
};

export default Doctors;
