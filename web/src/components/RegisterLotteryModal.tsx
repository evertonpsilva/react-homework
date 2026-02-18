import { Modal } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import useLotteryRegister from "../hooks/useRegisterLottery";

interface Props {
    open: boolean;
    onClose: (success: boolean) => void;
    lotteriesId: string[];
}

const RegisterLotteryModal = ({ open, onClose, lotteriesId }: Props) => {
    const { registerLoading, registerError, register } = useLotteryRegister();

    const formikValidation = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(4, "Name must be at least 4 characters")
                .required("Name is required")
        }),
        onSubmit: (values) => {
            register({
                name: values.name,
                lotteries: lotteriesId,
            }).then(() => {
                onClose(true);  
                formikValidation.resetForm();
            });
        },
    });

  return (
    <Modal open={open} onClose={() => formikValidation.resetForm()}>
        <form onSubmit={formikValidation.handleSubmit}>
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                backgroundColor: "#fff",
                padding: "2rem",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}>
                <h2 style={{
                    marginBottom: "1rem",
                }}>Register to Lottery</h2>
                <input 
                    type="text"
                    placeholder="Your name"
                    id="name"
                    name="name"
                    value={formikValidation.values.name}
                    onChange={formikValidation.handleChange}
                    style={{
                        width: "100%",
                        padding: "0.5rem",
                        marginBottom: "1rem",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                    }}
                />
                {formikValidation.touched.name && formikValidation.errors.name && (
                    <p style={{
                        color: "red",
                        marginBottom: "1rem",
                    }}>{formikValidation.errors.name}</p>
                )}
                <button 
                    type="submit" 
                    disabled={registerLoading}
                    style={{
                        width: "100%",
                        padding: "0.75rem",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: registerLoading ? "not-allowed" : "pointer",
                    }}
                >
                    {registerLoading ? "Registering..." : "Register"}
                </button>
            </div>
        </form>
    </Modal>
  )
}

export default RegisterLotteryModal;