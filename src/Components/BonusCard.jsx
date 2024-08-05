import React from "react";
import { View, Text } from "native-base";
import typography from "../Contants/fonts";
import color from "../Contants/color";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from "react-native";

export default function BonusCard({ item }) {
  let statusColor = "";
  switch (item.paymentStatus) {
    case "Paid":
      statusColor = "green";
      break;
    case "Admin Pandings":
      statusColor = "#a77c18";
      break;
    case "Pending":
      statusColor = "#ecbf58";
      break;
    case "Failed":
      statusColor = "red";
      break;
    default:
      statusColor = "black";
  }
  let paymentMode = "";
 
  switch (item.paymentMethod) {
    case "upi":
      paymentMode = "qr-code-scanner";
      break;
    case "bank":
      paymentMode = "bank";
      break;
    case "cash":
      paymentMode = "cash";
      break;

    default:
      paymentMode = "cash";
  }
  const [date, timeWithMs] = item?.paymentDate
    ? item?.paymentDate.split(" ")
    : "";
  const time = timeWithMs ? timeWithMs.split(".")[0] : "null";
  return (
    <View
      key={item.orderId}
      style={{
        backgroundColor: "white",
        padding: 10,
        marginBottom: 10,
        width: "100%",
        borderRadius: Platform.OS === "ios" ? 10 : 10,
        gap: 15,
        borderWidth: 1,
      }}
      borderColor={"gray.300"}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            padding: 4,
            color: "black",
            borderRadius: Platform.OS === "ios" ? 15 : 8,
            fontWeight: typography.h1.fontWeight,
            fontSize: typography.small.fontSize,
          }}
        >
          #ORD{item.orderAssignmentId}
        </Text>
        <Text
          style={{
            color: statusColor,
            fontSize: typography.small.fontSize,
            fontWeight: typography.bold.fontWeight,
          }}
        >
          {item.paymentStatus}
        </Text>
      </View>
      <View><Text style={{fontWeight: typography.bold.fontWeight,fontSize:typography.mainHeading.fontSize}}>{item.bonusTitle!=null?item.bonusTitle:"Performance"}</Text></View>
      <View flexDirection={'row'} gap={2}>
        {item.paymentMethod=='upi'?<MaterialIcons name={paymentMode} size={24} color="black" />:<MaterialCommunityIcons name={paymentMode} size={24} color="black" />}
       
        <Text>{item.paymentMethod.toUpperCase()}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: typography.subtitle.fontSize, color: "gray" }}
          >
            {date} at {time}{" "}
          </Text>
        </View>
        <Text
          style={{
            fontWeight: typography.bold.fontWeight,
            fontSize: typography.mainHeading.fontSize,
          }}
        >
          ${Math.abs(item.amountPaid)}
        </Text>
      </View>
    </View>
  );
}
