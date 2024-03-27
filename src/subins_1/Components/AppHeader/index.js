import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../../API";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useMessage2 } from "../../../MessageContext2";

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const {message2}=useMessage2();

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  const handleClick = () => {
    // Add navigation logic here
    navigate('/'); // Navigate to the signout route
  };

  return (
    <div className="AppHeader">
      <Image
        width={60}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTap8M2SIS4STWQetk2jhhV6Gk718EF2TJs5g&usqp=CAU"
      ></Image>
      <center><h1>BANGLORE DISTRICT POLICE</h1></center>
      <Space>
        <button onClick={handleClick}>Signout</button>
        <Badge count={comments.length} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={message2.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
      </Space>
      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        ></List>
      </Drawer>
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
      <Typography>
      <ol>
      {message2.map((message,index)=>(
        <li key={index}>{message}</li>
  ))}
      </ol>
      </Typography>
      </Drawer>
    </div>
  );
}
export default AppHeader;
