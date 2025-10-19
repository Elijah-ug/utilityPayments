import { Document, Page, View, Text } from '@react-pdf/renderer';
import { formatEther } from 'viem';
import { styles } from './styles';
import { hexToString } from 'viem';

export default function ReceiptPDF({ receipt, date, isPending }) {
  console.log('isPending==>', isPending);

  <Document>
    {isPending ? (
      <Text>Loading...</Text>
    ) : (
      receipt && (
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Payment Receipt</Text>
            <Text style={styles.subtitle}>Tuition Payment Confirmation</Text>
          </View>

          {/* Divider */}
          <Text style={styles.divider} />

          {/* Content */}
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.label}>Payer Address:</Text>
              <Text style={styles.value}>
                {`${receipt.payer.slice(0, 7)}...${receipt?.payer.slice(-5)}`}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>School Address:</Text>
              <Text style={styles.value}>
                {`${receipt.school.slice(0, 7)}...${receipt?.school.slice(-5)}`}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Student Name:</Text>
              <Text style={styles.value}>{hexToString(receipt.student)}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Class:</Text>
              <Text style={styles.value}>{hexToString(receipt.class)}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Amount Paid:</Text>
              <Text style={styles.value}>{formatEther(receipt.amount)} AFB</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Remaining Balance:</Text>
              <Text style={styles.value}>{formatEther(receipt.balance)} AFB</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Payment Date:</Text>
              <Text style={styles.value}>{date}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Status:</Text>
              <Text style={[styles.value, receipt.cleared ? styles.cleared : styles.pending]}>
                {receipt.cleared ? 'Cleared' : 'Not cleared'}
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Thank you for using our tuition payment platform.</Text>
            <Text style={styles.footerTextSmall}>Powered by PayBlocks</Text>
          </View>
        </Page>
      )
    )}
  </Document>;
}
