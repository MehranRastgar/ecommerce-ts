import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { BsFillFileEarmarkPersonFill as PersonAdd } from "react-icons/bs";
import { RiLogoutBoxRFill as Logout } from "react-icons/ri";
import { IoMdSettings as Settings } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { MdBookmarkBorder } from "react-icons/md";
import { useAppDispatch } from "../../store/hooks";
import { removeProfile } from "../../store/slices/clientSlice";
import Router from "next/router";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
        <Tooltip title="پروفایل">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
            <BsPersonCircle size={25}></BsPersonCircle>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            direction: "rtl",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 40,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem className="flex justify-around">
          {" "}
          <div className="flex font-Vazir-Bold">پروفایل</div>
          <PersonAdd size={25} />
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <MdBookmarkBorder fontSize="25px" />
          </ListItemIcon>
          <div className="flex font-Vazir-Bold">پیگیری سفارش</div>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="25px" />
          </ListItemIcon>
          <div className="flex font-Vazir-Bold">تنظیمات</div>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="25px" />
          </ListItemIcon>
          <div
            onClick={() => {
              dispatch(removeProfile());
              Router.push("/");
            }}
            className="flex font-Vazir-Bold"
          >
            خروج از حساب
          </div>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
