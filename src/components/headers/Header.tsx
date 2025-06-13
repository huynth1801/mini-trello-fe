"use client";

import {
  AppBar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Bell, ExpandIcon, Grid3x3, Icon, StarIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import SideBar from "../sidebar/SideBar";
import axiosClient from "@/lib/axios";
import AppConstants from "@/constants/AppConstants";
import { IBoard } from "@/types/ClientUI";
import { useBoards, useCreateBoard } from "@/hooks/useBoard";

interface HeaderProps {
  userBoards: IBoard[];
  onSelectBoard?: (board: IBoard) => void;
}

const Header: React.FC<HeaderProps> = ({ userBoards, onSelectBoard }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [boardName, setBoardName] = useState<string>("");
  const [boardDescription, setBoardDescription] = useState<string>("");
  const { mutate: createBoard, isPending } = useCreateBoard();

  const onCreateBoardClick = () => {
    setOpenCreate(true);
  };

  const handleCreateBoard = () => {
    createBoard(
      { name: boardName, description: boardDescription },
      {
        onSuccess: () => {
          setOpenCreate(false);
          setBoardName("");
          setBoardDescription("");
        },
      }
    );
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setSidebarOpen(true)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <Grid3x3 />
          </IconButton>

          <Box display={"flex"} alignItems={"center"} sx={{ mr: 4 }}>
            <Typography
              variant="h6"
              component={"div"}
              sx={{ fontWeight: "bold" }}
            >
              Mini trello
            </Typography>
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            gap={1}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Button color="inherit">Workspaces</Button>
            <Button color="inherit">Recent</Button>
            <Button color="inherit">Starred</Button>
            <Button color="inherit">Templates</Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#7e57c2", "&:hover": { bgcolor: "#6a1b9a" } }}
              onClick={onCreateBoardClick}
            >
              Create board
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box display={"flex"} alignItems={"center"} gap={1}>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <Bell />
              </Badge>
            </IconButton>
            <IconButton>
              <Avatar />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <SideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        userBoards={userBoards}
        onSelectBoard={onSelectBoard}
      />

      {/* Create new board dialog */}
      <Dialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Create board</DialogTitle>
        <DialogContent>
          <TextField
            label="Board name"
            fullWidth
            required
            margin="normal"
            value={boardName}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setBoardName(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={boardDescription}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setBoardDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateBoard}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
