import { Formik, useFormik } from "formik";
import { Button, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { useNewLottery } from "../hooks/useNewLottery";
import { useNavigation } from "@react-navigation/core";
import { HomeScreenNavigationProp } from "../types";

type Form = {
  lotteryName: string;
  lotteryPrize: string;
}

export const AddLottery = () => {
  const { navigate } = useNavigation<HomeScreenNavigationProp>();
  
  const navigateToHome = () => {
    navigate("Home")
  }

  const addLotteryValidationSchema = Yup.object({
    lotteryName: Yup.string().min(4).required("Lottery name is required"),
    lotteryPrize: Yup.string().min(4).required("Lottery prize is required"),
  });

  const { loading, createLottery, error } = useNewLottery();

  const initialValues: Form = {
    lotteryName: "",
    lotteryPrize: "",
  };

  const submit = (values: Form) => {
    console.log(values);
    createLottery(values.lotteryName, values.lotteryPrize)
    .catch((error) => {
      console.error(error);
    })
    .then(() => {
      navigateToHome();
    });
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={addLotteryValidationSchema}
        onSubmit={submit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
            <Text style={styles.addLotteryText}>Add new lottery</Text>
            <TextInput
            
              value={values.lotteryName}
              onChangeText={handleChange("lotteryName")}
              placeholder="Lottery name"
              style={styles.input}
            />
            {errors.lotteryName && <Text style={styles.errorText}>{errors.lotteryName}</Text>}
            
            <TextInput
              value={values.lotteryPrize}
              onChangeText={handleChange("lotteryPrize")}
              placeholder="Lottery prize"
              style={styles.input}
            />
            {errors.lotteryPrize && <Text style={styles.errorText}>{errors.lotteryPrize}</Text>}
            <TouchableOpacity style={{
              ...styles.button,
              ...(loading ? styles.buttonLoading : {})
            }} onPress={() => !loading && handleSubmit()}>
              <Text style={styles.buttonText}>ADD</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center"
  },
  addLotteryText: {
    fontSize: 24,
    marginBottom: 16
  },
  input: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderColor: "gray",
    padding: 8,
    marginBottom: 32
  },
  errorText: {
    color: "red",
    marginBottom: 8
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: 'rgba(245, 50, 131, 1)',
    padding: 16,
    borderRadius: 5,
  },
  buttonLoading: {
    opacity: 0.2
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
}