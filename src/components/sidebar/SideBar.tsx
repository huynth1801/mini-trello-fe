import { IBoard } from "@/types/ClientUI";
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  ListItemText,
} from "@mui/material";
import { ChevronLeft, LayoutDashboardIcon } from "lucide-react";
import React, { useState } from "react";

interface IUserBoard {
  id: string;
  name: string;
  isActive?: boolean;
}

interface SideBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  userBoards: IBoard[];
  onSelectBoard?: (board: IBoard) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  userBoards,
  onSelectBoard,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const currentUserEmail = localStorage.getItem("currentUserEmail");
  return (
    <Drawer
      anchor="left"
      open={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
      sx={{ color: "white", width: 400 }}
    >
      <Box
        p={2}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        gap={2}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={2}
        >
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Avatar />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Workspace of
              </Typography>
              <Typography variant="body2">{currentUserEmail}</Typography>
            </Box>
          </Box>
          <IconButton
            onClick={() => setSidebarOpen(false)}
            sx={{ color: "white" }}
          >
            <ChevronLeft />
          </IconButton>
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          Your boards
        </Typography>
        <List>
          {userBoards.map((board) => (
            <ListItem
              key={board.id}
              sx={{
                bgcolor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                borderRadius: 1,
                mb: 0.5,
                cursor: "pointer",
              }}
              onClick={() => {
                onSelectBoard?.(board);
                setSidebarOpen(false);
              }}
            >
              <ListItemText primary={board.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
