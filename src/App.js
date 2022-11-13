import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  // Button,
} from "@material-ui/core";
import {
  QuestionAnswerOutlined,
  DraftsOutlined,
  HomeOutlined,
  SettingsOutlined,
  ContactSupportOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import Header from './components/Header.js';
import styles from './styles/appStyles.js';
import stylesCSS from './styles/App.module.css';

const data = [
  {
    name: "RavL",
    icon: <HomeOutlined />,
  },
  { name: "Settings", icon: <SettingsOutlined /> },
  { name: "Help", icon: <ContactSupportOutlined /> },
  { name: "Support", icon: <QuestionAnswerOutlined /> },
  { name: "Mega RavL", icon: <DraftsOutlined /> },
];

function App() {
  const [open, setOpen] = useState(false);

  const getList = () => (
    <div onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItem button key={index}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </div>
  );


return (
    <div style={styles.container}>
      <div className={stylesCSS.AppLeftBox}>

      </div>

      <div style={styles.appContainer}>
        <div style={styles.messageHeader}>
          here i am
        </div>
        <div style={styles.scoreContainer}>
        </div>
        <div style={styles.gameContainer}>
        </div>
        <div style={styles.footerContainer}>
        </div>
      </div>

        <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
          {getList()}
        </Drawer>
        <Header 
          clickMenu={() => setOpen(true)}
        />

      <div className={stylesCSS.AppRightBox}>

      </div>
    </div>
  );
}

export default App;
