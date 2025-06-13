"use client";

import BoardView from "@/components/board/BoardView";
import Header from "@/components/headers/Header";
import AppConstants from "@/constants/AppConstants";
import { useBoards } from "@/hooks/useBoard";
import { IBoard } from "@/types/ClientUI";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: boards = [], isLoading } = useBoards();
  const [selectedBoard, setSelectedBoard] = useState<IBoard | null>(null);
  const [showAddBoard, setShowAddBoard] = useState<boolean>(false);

  const handleAddBoard = (newBoard: IBoard): void => {
    // setBoards((prev) => [...prev, newBoard]);
  };

  const handleSelectBoard = (board: IBoard): void => {
    setSelectedBoard(board);
    localStorage.setItem(AppConstants.SELECTED_BOARD_ID, board.id);
  };

  const handleBackToBoards = (): void => {
    setSelectedBoard(null);
    localStorage.removeItem(AppConstants.SELECTED_BOARD_ID);
  };

  useEffect(() => {
    const savedId = localStorage.getItem("selectedBoardId");
    if (savedId && boards.length > 0) {
      const found = boards.find((b) => b.id === savedId);
      if (found) setSelectedBoard(found);
    }
  }, [boards]);

  if (selectedBoard) {
    return <BoardView board={selectedBoard} onBack={handleBackToBoards} />;
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Header userBoards={boards} onSelectBoard={handleSelectBoard} />
      <Container maxWidth={false} sx={{ py: 3, mt: 8 }}>
        {isLoading ? (
          <Grid container spacing={3}>
            {[...Array(4)].map((_, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={idx}>
                <Skeleton
                  variant="rectangular"
                  height={120}
                  sx={{ borderRadius: 2, mb: 2 }}
                />
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </Grid>
            ))}
          </Grid>
        ) : boards.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 8 }}
          >
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 2, textAlign: "center" }}
            >
              Welcome to Mini Trello
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, textAlign: "center", maxWidth: 400 }}
            >
              Get started by creating your first board. Organize your tasks with
              lists like Icebox, Backlog, On Going, Waiting for Review, and
              Done.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<CirclePlus />}
              sx={{
                bgcolor: "#7e57c2",
                "&:hover": { bgcolor: "#6a1b9a" },
                px: 4,
                py: 1.5,
              }}
              onClick={() => setShowAddBoard(true)}
            >
              Create your first board
            </Button>
          </Box>
        ) : (
          <>
            <Typography
              variant="h4"
              sx={{ mb: 4, fontWeight: "bold", color: "#172b4d" }}
            >
              Your Boards
            </Typography>
            <Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
              {boards.map((board: IBoard) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={board.id}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      cursor: "pointer",
                      transition: "all 0.2s ease-in-out",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      minHeight: 120,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      },
                    }}
                    onClick={() => handleSelectBoard(board)}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      }}
                    >
                      {board.name}
                    </Typography>
                    {board.description && (
                      <Typography
                        variant="body2"
                        sx={{
                          opacity: 0.9,
                          mb: 2,
                        }}
                      >
                        {board.description}
                      </Typography>
                    )}
                    {/* <Typography
                      variant="caption"
                      sx={{
                        opacity: 0.7,
                      }}
                    >
                      Created {new Date(board.createdAt).toLocaleDateString()}
                    </Typography> */}
                  </Paper>
                </Grid>
              ))}

              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    bgcolor: "#f8f9fa",
                    border: "2px dashed #ddd",
                    minHeight: 120,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      bgcolor: "#f1f3f4",
                      borderColor: "#7e57c2",
                    },
                  }}
                  onClick={() => setShowAddBoard(true)}
                >
                  <CirclePlus />
                  <Typography
                    variant="body1"
                    sx={{ color: "#7e57c2", fontWeight: 500 }}
                  >
                    Create new board
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}
