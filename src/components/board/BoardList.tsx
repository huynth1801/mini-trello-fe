import React from "react";
import { Paper, Typography, Box, Button, IconButton } from "@mui/material";
import { ICard } from "@/types/ClientUI";
import { CirclePlus, MoreHorizontal } from "lucide-react";

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
  return (
    <Paper
      elevation={1}
      sx={{
        width: 272,
        minHeight: "fit-content",
        bgcolor: "#f1f2f4",
        borderRadius: 2,
        p: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* List Header */}
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
        <IconButton size="small" sx={{ color: "#6b778c" }}>
          <MoreHorizontal fontSize="small" />
        </IconButton>
      </Box>

      {/* <Box sx={{ mb: 1 }}>
        {list.cards.map((card) => (
          <TaskCard
            key={card.id}
            card={card}
            onUpdate={onUpdateCard}
            onDelete={onDeleteCard}
          />
        ))}
      </Box> */}

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
