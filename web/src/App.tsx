import { Add, Casino, Search, SentimentVeryDissatisfied } from '@mui/icons-material';
import { Box, Card, CircularProgress, Fab, Grid, Snackbar, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import AddLotteryModal from './components/AddLotteryModal';
import { useNewLottery } from './hooks/useNewLottery';
import { useListLotteries } from './hooks/useListLotteries';
import LotteryCard from './components/LotteryCard';
import type { Lottery } from './interfaces/Lottery';
import RegisterLotteryModal from './components/RegisterLotteryModal';
import InputAdornment from '@mui/material/InputAdornment';

function App() {
  const [showAddLotteryModal, setShowAddLotteryModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [selectedLotteries, setSelectedLotteries] = useState<Lottery[]>([]);
  const [ searchTerm, setSearchTerm] = useState('');

  const { loading, error, createLottery } = useNewLottery();
  const { lotteries, fetchLotteries, listLoading} = useListLotteries();

  useEffect(() => {
    console.log('Fetching lotteries on mount');
    fetchLotteries();
  }, []);

  const onCloseAddLotteryModal = (success: boolean) => {
    setShowAddLotteryModal(false);
    if (success) {
      fetchLotteries();
      setSnackbarMessage("New lottery created");
    }
  }

  const onCloseRegisterModal = (success: boolean) => {
    setShowRegisterModal(false);
    if (success) {
      fetchLotteries();
      setSelectedLotteries([]);
      setSnackbarMessage("Successfully registered to lottery");
    }
  }

  const onSelectLottery = (lottery: Lottery) => {
    setSelectedLotteries((lotteries: Lottery[]) => {
      const alreadySelected = lotteries.find((l) => l.id === lottery.id);
      if (alreadySelected) {
        return lotteries.filter((l) => l.id !== lottery.id);
      } else {
        return [...lotteries, lottery];
      }
    });

    console.log('Selected lottery', lottery);
  }

  const filteredLotteries = lotteries.filter((lottery) => lottery.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 300,
        }}>Lotteries</h1>
        <Casino/>
      </div>

      <TextField id="search" 
        sx={{
          marginBottom: 4
        }}
        onChange={(event) => setSearchTerm(event.target.value)}
        label="Search" variant="outlined" 
        slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
      />

      {listLoading && <div style={{
          display: "flex",
          justifyContent: "center",
        }}>
        <CircularProgress size="6rem" />
      </div>}

        {lotteries.length === 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <SentimentVeryDissatisfied sx={{ fontSize: 48, mb: 4 }} />
            <h3 style={{
              margin: 0,
              fontSize: '1.5rem',
            }}>There are no lotteries currently</h3>
          </div>
        )}
      
      {listLoading === false && filteredLotteries.length > 0 && (
        <Grid container spacing={4}>
          {filteredLotteries.map((lottery) => (
            <Grid size={4} key={lottery.id}>
              <LotteryCard key={lottery.id} lottery={lottery} onSelect={() => onSelectLottery(lottery)} selected={selectedLotteries.some((l) => l.id === lottery.id)}></LotteryCard>
            </Grid>
          ))}
        </Grid>
      )}

      {!error && !loading && filteredLotteries.length === 0 && searchTerm.length > 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <SentimentVeryDissatisfied sx={{ fontSize: 48, mb: 4 }} />
          <h3 style={{
            margin: 0,
            fontSize: '1.5rem',
          }}>No results for "{searchTerm}"</h3>
        </div>
      )}
      
      <AddLotteryModal 
        open={showAddLotteryModal} 
        onClose={onCloseAddLotteryModal} 
        createLottery={createLottery}
        loading={loading}
        
      >
      </AddLotteryModal>
      <RegisterLotteryModal

        open={showRegisterModal}
        onClose={(success) => onCloseRegisterModal(success)}
        lotteriesId={selectedLotteries.map((l) => l.id)}
      ></RegisterLotteryModal>
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={() => setSnackbarMessage(null)}
        message={snackbarMessage}
      />
      <div style={{
        position: 'fixed',
        display: 'flex',
        gap: '1rem',
        bottom: 16,
        right: 16,
      }}>
        <Fab
          size="large"
          variant="extended"
          onClick={() => setShowRegisterModal(true)}
          disabled={selectedLotteries.length === 0}
        >
            Register
        </Fab>
        <Fab
          color="primary"
          size="large"
          variant="extended"
          onClick={() => setShowAddLotteryModal(true)}
        >
            <Add />
            Add lottery
        </Fab>
      </div>

    </Box>
  )
}

export default App
