
import './App.css'
import { Add } from '@mui/icons-material';
import { Box, Fab, Snackbar } from '@mui/material';
import { useState } from 'react';
import AddLotteryModal from './components/AddLotteryModal';
import { useNewLottery } from './hooks/useNewLottery';

function App() {
  const [showAddLotteryModal, setShowAddLotteryModal] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { loading, error, createLottery } = useNewLottery();

  const onCloseAddLotteryModal = (success: boolean) => {
    setShowAddLotteryModal(false);
    if (success) {
      setShowSnackbar(true);
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <AddLotteryModal 
        open={showAddLotteryModal} 
        onClose={(success) => onCloseAddLotteryModal(success)} 
        createLottery={createLottery}
        loading={loading}
      >
      </AddLotteryModal>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message="New lottery created"
      />
      <Fab
        color="primary"
        size="large"
        variant="extended"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        onClick={() => setShowAddLotteryModal(true)}
      >
          <Add />
          Add lottery
      </Fab>

    </Box>
  )
}

export default App
