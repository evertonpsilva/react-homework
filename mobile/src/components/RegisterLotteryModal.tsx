import React from "react";
import { Formik } from "formik";
import { Modal, StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable, Platform } from "react-native";
import * as Yup from "yup";
import useLotteryRegister from "../hooks/useRegisterLottery";

type RegisterLotteryModalProps = {
  visible: boolean;
  onClose: (success: boolean) => void;
  lotteries: string[];
};

export const RegisterLotteryModal = ({ visible, onClose, lotteries }: RegisterLotteryModalProps) => {
  const addLotteryValidationSchema = Yup.object({
    name: Yup.string().min(4).required("Lottery name is required"),
  });

  const initialValues = { name: "" };

  const { register, registerLoading } = useLotteryRegister();

  const submit = (values: typeof initialValues) => {
    register({ name: values.name, lotteries })
      .then(() => onClose(true))
      .catch(console.error);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => onClose(false)}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={() => onClose(false)} />

      <View style={styles.sheet}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Register</Text>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={addLotteryValidationSchema}
          onSubmit={submit}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View style={styles.content}>
              <Text style={styles.title}>Register to lotteries</Text>

              <TextInput
                value={values.name}
                onChangeText={handleChange("name")}
                placeholder="Enter your name"
                placeholderTextColor="#BDBDBD"
                style={styles.input}
              />

              {touched.name && errors.name ? (
                <Text style={styles.errorText}>{errors.name}</Text>
              ) : (
                <View style={{ height: 18 }} />
              )}

              <TouchableOpacity
                style={[
                  styles.button,
                  (registerLoading || !values.name) && styles.buttonDisabled,
                ]}
                disabled={registerLoading || !values.name}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "85%",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: -6 },
      },
      android: {
        elevation: 10,
      },
    }),
  },

  header: {
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 26,
  },
  title: {
    fontSize: 28,
    fontWeight: "400",
    marginBottom: 26,
  },

  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#D0D0D0",
    paddingVertical: 10,
    fontSize: 16,
  },

  errorText: {
    width: "100%",
    marginTop: 8,
    color: "red",
  },

  button: {
    marginTop: 24,
    minWidth: 160,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
    backgroundColor: "#D0D0D0",
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
  },
});