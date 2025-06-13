import { IBoard, ICard } from "@/types/ClientUI";
import {
  Container,
  Box,
  Button,
  Typography,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import {
  ArrowLeft,
  CirclePlayIcon,
  CirclePlusIcon,
  MoreHorizontal,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import BoardList from "./BoardList";
import { useBoards } from "@/hooks/useBoard";
import { useCards, useCreateCard } from "@/hooks/useCard";

interface BoardViewProps {
  board: IBoard;
  onUpdateBoard?: (boardId: string, updates: Partial<IBoard>) => void;
  onBack?: () => void;
}

const BoardView: React.FC<BoardViewProps> = ({
  board,
  onUpdateBoard,
  onBack,
}) => {
  const [openAddList, setOpenAddList] = useState<boolean>(false);
  const [cardName, setCardName] = useState<string>("");
  const [cardDescription, setCardDescription] = useState<string>("");
  const [openInvite, setOpenInvite] = useState<boolean>(false);
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const { data: lists = [], isLoading } = useCards(board.id);
  const { mutate: createCard, isPending } = useCreateCard(board.id);

  const handleAddCard = () => {
    if (!cardName.trim()) return;
    createCard(
      {
        name: cardName,
        description: cardDescription,
        createdAt: "",
      },
      {
        onSuccess: () => {
          setCardName("");
          setCardDescription("");
          setOpenAddList(false);
        },
      }
    );
  };

  const handleUpdateCard = () => {};

  const handleDeleteCard = () => {};

  const handleInvitePeople = () => {};

  return (
    <>
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
              {onBack && (
                <IconButton onClick={onBack} sx={{ color: "white" }}>
                  <ArrowLeft />
                </IconButton>
              )}
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
              <IconButton
                sx={{ color: "white" }}
                onClick={() => setOpenInvite(true)}
              >
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
            {lists
              .slice()
              .sort((a, b) => a.position - b.position)
              .map((list) => (
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
                startIcon={<CirclePlusIcon />}
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
      <Dialog
        open={openAddList}
        onClose={() => setOpenAddList(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Create card</DialogTitle>
        <DialogContent>
          <TextField
            label="Card name"
            fullWidth
            required
            margin="normal"
            value={cardName}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setCardName(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={cardDescription}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setCardDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddList(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddCard}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openInvite}
        onClose={() => setOpenInvite(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Invite people to this board</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            type="email"
            placeholder="Enter email address"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInvite(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenInvite(false);
              setInviteEmail("");
            }}
            disabled={!inviteEmail}
          >
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BoardView;
