"use client";

import { Badge, Box, IconButton, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { CirclePlus } from "lucide-react";
import { IBoard } from "@/types/ClientUI";

interface IBoardColumnProps {
  board: IBoard;
  onAddBoard: (boardId: string, cardName: string) => void;
}

const BoardColumn: React.FC<IBoardColumnProps> = ({ board, onAddBoard }) => {
  const [showAddCard, setShowAddCard] = useState<boolean>(false);
  const [newCardTitle, setNewCardTitle] = useState<string>("");
  return (
    <Paper
      elevation={1}
      sx={{
        bgcolor: board.color,
        borderRadius: 2,
        height: "fit-content",
        minHeight: "200px",
      }}
    >
      <Box p={2}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={2}
        >
          <Typography variant="h6" fontWeight={"600"} sx={{ fontSize: "1rem" }}>
            {board.name}
          </Typography>
          <Badge badgeContent={board.cards.length} color="primary">
            <IconButton size="small">
              <CirclePlus />
            </IconButton>
          </Badge>
        </Box>
      </Box>
    </Paper>
  );
};

export default BoardColumn;
