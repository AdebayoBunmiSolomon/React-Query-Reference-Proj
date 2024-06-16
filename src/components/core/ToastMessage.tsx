import Toast from "react-native-toast-message";

interface ToastMessageProps {
  type?: "success" | "error";
  message: string;
  duration?: number;
}

const ToastMessage = ({
  type,
  message,
  duration = 1500,
}: ToastMessageProps) => {
  const showToast = () => {
    Toast.show({
      type: type || "success",
      text1: message,
      swipeable: true,
      visibilityTime: duration,
      text1Style: {
        fontSize: 16,
        fontWeight: "normal",
        textAlign: "center",
      },
    });
  };

  return showToast();
};

export default ToastMessage;
