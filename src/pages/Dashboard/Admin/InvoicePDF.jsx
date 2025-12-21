
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  row: { display: "flex", flexDirection: "row", marginBottom: 5 },
  label: { width: "40%", fontWeight: "bold" },
  value: { width: "60%" },
});

const InvoicePDF = ({ payment }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Payment Invoice</Text>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Issue ID:</Text>
          <Text style={styles.value}>{payment.issueId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Transaction ID:</Text>
          <Text style={styles.value}>{payment.transactionId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Customer Email:</Text>
          <Text style={styles.value}>{payment.customer}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{payment.status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Reported By:</Text>
          <Text style={styles.value}>{payment.reportedBy}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Title:</Text>
          <Text style={styles.value}>{payment.title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{payment.category}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.value}>{payment.quantity}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>${payment.amount}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
