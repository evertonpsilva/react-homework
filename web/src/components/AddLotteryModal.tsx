import { Box, Modal, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
 import * as Yup from 'yup';

interface Props {
    open: boolean;
    onClose: (success: boolean) => void;
    loading: boolean;
    createLottery: (name: string, prize: string) => Promise<any>;
}

const AddLotteryModal = ({ open, onClose, loading, createLottery }: Props) => {

    const formikValidation = useFormik({
        initialValues: {
            lotteryName: "",
            lotteryPrize: "",
        },
        validationSchema: Yup.object({
            lotteryName: Yup.string()
                .min(4, "Name must be at least 4 characters")
                .required("Name is required"),
            lotteryPrize: Yup.string()
                .min(4, "Prize must be at least 4 characters")
                .required("Prize is required"),
        }),
        onSubmit: (values) => {
            createLottery(values.lotteryName, values.lotteryPrize).then(() => {
                formikValidation.resetForm();
                onClose(true);
            });
        },
    });

  return (
    <Modal open={open} onClose={() => onClose(false)}>
        <form onSubmit={formikValidation.handleSubmit}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "#fff",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" sx={{
                    mb: 2,
                }}>Add Lottery</Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField 
                        label="Lottery Name" 
                        variant="outlined"
                        id="lotteryName"
                        name="lotteryName"
                        value={formikValidation.values.lotteryName}
                        onChange={formikValidation.handleChange}
                        error={formikValidation.touched.lotteryName && Boolean(formikValidation.errors.lotteryName)}
                        helperText={formikValidation.touched.lotteryName && formikValidation.errors.lotteryName}
                        sx={{ mb: 2 }} />
                    <TextField 
                        label="Lottery Prize" 
                        variant="outlined" 
                        id="lotteryPrize"
                        name="lotteryPrize"
                        value={formikValidation.values.lotteryPrize}
                        onChange={formikValidation.handleChange}
                        error={formikValidation.touched.lotteryPrize && Boolean(formikValidation.errors.lotteryPrize)}
                        helperText={formikValidation.touched.lotteryPrize && formikValidation.errors.lotteryPrize}
                        sx={{ mb: 2 }} />
                </Box>
                <LoadingButton 
                    variant="contained" 
                    color="primary" 
                    loading={loading} 
                    disabled={loading}
                    type="submit"
                >
                    Add
                </LoadingButton>
            </Box>
        </form>
    </Modal>
  );
};

export default AddLotteryModal;