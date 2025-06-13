import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Popover,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { ICard } from "@/types/ClientUI";
import { CirclePlus, MoreHorizontal, Plus, Trash2 } from "lucide-react";

interface BoardListProps {
  list: ICard;
  onAddCard: (listId: string) => void;
  onUpdateCard?: (cardId: string, updates: Partial<ICard>) => void;
  onDeleteCard?: (cardId: string) => void;
}

const BoardList: React.FC<BoardListProps> = ({
  list,
  onAddCard,
  onUpdateCard,
  onDeleteCard,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        width: { xs: "90vw", sm: 272 },
        minWidth: { xs: "80vw", sm: 240 },
        maxWidth: 400,
        minHeight: "fit-content",
        bgcolor: "#f1f2f4",
        borderRadius: 2,
        p: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1, px: 1 }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: "#172b4d",
            fontSize: "14px",
          }}
        >
          {list.name}
        </Typography>
        <IconButton
          size="small"
          sx={{ color: "#6b778c" }}
          onClick={handleMenuOpen}
        >
          <MoreHorizontal fontSize="small" />
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              onAddCard(list.id);
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <Plus size={18} />
            </ListItemIcon>
            <ListItemText>Add card</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDeleteCard?.(list.id);
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <Trash2 size={18} color="red" />
            </ListItemIcon>
            <ListItemText sx={{ color: "red" }}>Delete card</ListItemText>
          </MenuItem>
        </Popover>
      </Box>

      <Button
        startIcon={<CirclePlus />}
        sx={{
          justifyContent: "flex-start",
          color: "#6b778c",
          fontSize: "14px",
          textTransform: "none",
          py: 1,
          borderRadius: 2,
          "&:hover": {
            bgcolor: "#e4e6ea",
            color: "#172b4d",
          },
        }}
        onClick={() => onAddCard(list.id)}
      >
        Add a card
      </Button>
    </Paper>
  );
};

export default BoardList;
