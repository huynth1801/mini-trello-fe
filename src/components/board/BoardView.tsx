import { IBoard, ICard } from "@/types/ClientUI";
import {
  Container,
  Box,
  Button,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import BoardList from "./BoardList";
import { useBoards } from "@/hooks/useBoard";
import { useCards } from "@/hooks/useCard";

interface BoardViewProps {
  board: IBoard;
  onUpdateBoard?: (boardId: string, updates: Partial<IBoard>) => void;
}

const BoardView: React.FC<BoardViewProps> = ({ board, onUpdateBoard }) => {
  const [openAddList, setOpenAddList] = useState<boolean>(false);
  const [newListName, setNewListName] = useState<string | null>(null);
  const [openAddCard, setOpenAddCard] = useState<string | null>(null);
  const [newCardName, setNewCardName] = useState("");
  const { data: lists = [], isLoading } = useCards(board.id);

  const handleAddCard = () => {};

  const handleUpdateCard = () => {};

  const handleDeleteCard = () => {};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 2,
      }}
    >
      <Container maxWidth={false}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontWeight: "bold",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            {board.name}
          </Typography>
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              }}
            >
              Filters
            </Button>
            <IconButton sx={{ color: "white" }}>
              <MoreHorizontal />
            </IconButton>
          </Box>
        </Box>

        <Box
          display="flex"
          gap={2}
          sx={{
            overflowX: "auto",
            pb: 2,
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-track": {
              bgcolor: "rgba(255,255,255,0.1)",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "rgba(255,255,255,0.3)",
              borderRadius: 4,
            },
          }}
        >
          {lists.map((list) => (
            <BoardList
              key={list.id}
              list={list}
              onAddCard={handleAddCard}
              onUpdateCard={handleUpdateCard}
              onDeleteCard={handleDeleteCard}
            />
          ))}

          <Paper
            sx={{
              width: 272,
              minHeight: "fit-content",
              bgcolor: "rgba(255,255,255,0.24)",
              borderRadius: 2,
              p: 1,
            }}
          >
            <Button
              fullWidth
              sx={{
                justifyContent: "flex-start",
                color: "white",
                fontSize: "14px",
                textTransform: "none",
                py: 1,
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
              onClick={() => setOpenAddList(true)}
            >
              Add another list
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default BoardView;
