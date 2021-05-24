import React, { useContext,useState,useEffect } from "react";
import { useHistory,Link } from "react-router-dom";
import { Form, Input, Button, Divider } from "antd";
import { logoutFromFirebase, updateUserInfo,requestOrderDetail,UserOrderList } from "../actions";
import { StoreContext } from "../store";

//import {getOrderByUser} from "../api";


const ProfileCard = ({orderId}) => {
  const {
    state: {
      userSignin: { userInfo },
      userOrders,
    },
    state:{ orderDetail: { order } },
    dispatch,
  } = useContext(StoreContext);

  const { displayName, email } = userInfo;
  const history = useHistory();
  const [form] = Form.useForm();
 

  const handleUpdate = (values) => {
    console.log(values)
    updateUserInfo(dispatch, values);
  };

  const handleLogout = () => {
    logoutFromFirebase(dispatch);
    history.push("/");
  };
  

  const check = () => {
    let id;
    requestOrderDetail(dispatch);
    setOrdered(!Ordered);
    
    // history.push("/placeorder");
  }
  
  const [Ordered,setOrdered]=useState(false);

  //useEffect(() => {
  //  requestOrderDetail(dispatch, orderId)
 //}, [orderId])
 useEffect(()=>{
  UserOrderList(dispatch);
}, [userInfo])

  return (
    <Form
      onFinish={handleUpdate}
      name="normal_login"
      className="login-form"
      form={form}
      initialValues={userInfo}
    >
      <Form.Item
        label="name: "
        name="name"
        rules={[
          {
            type: "string",
            message: "The input is not valid name!",
          },
          {
            message: "Please input your name!",
          },
        ]}
        hasFeedback
      >
        <Input placeholder={displayName} />
      </Form.Item>
      <Form.Item
        label="email: "
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            message: "Please input your E-mail!",
          },
        ]}
        hasFeedback
      >
        <Input placeholder={email} />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="rePassword"
        label="Re-enter Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            message: "Please re-enter your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form__button"
        >
          Submit
        </Button>

        <Button
          type="danger"
          style={{ marginTop: "0.8rem" }}
          className="login-form__button"
          onClick={handleLogout}
        >
          Log out
        </Button>
        <Button
          type="primary"
          style={{ marginTop: "0.8rem" }}
          className="login-form__button"
          onClick={check}
        >
          Open Order List
        </Button>
       
      
        {Ordered?(
        userOrders.orders.map(order => (
          <Link to={`/order/${order.id}`}>
            <div className="order-block">
              <p>ID: {order.id}</p>
            </div>
          </Link>
        ))
        ):(
          <div></div>
        )}
       

      </Form.Item>
    </Form>
  );
};
export default ProfileCard;
