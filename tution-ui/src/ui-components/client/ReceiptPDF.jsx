import { Document, Page, View, Text, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { formatEther } from 'viem';
import { styles } from './styles';
import { hexToString } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import { wagmiContractConfig } from '@/contract/utils/contractAbs';
import { Button } from '@/components/ui/button';

export default function ReceiptPDF() {
  const { address } = useAccount();
  const {
    data: receipt,
    isPending,
    error,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getReceipt',
    args: [address],
  });
  const time = new Date(Number(receipt?.time) * 1000);
  const date = time.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  console.log('isPending==>', isPending);

  console.log('date==>', date);
  console.log('isPending==>', isPending, 'data==>', receipt);
  const MyReceipt = () => (
    <Document>
      {isPending ? (
        <Text>Loading...</Text>
      ) : (
        receipt && (
          <Page size={{ width: 595.28, height: 500 }} style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Payment Receipt</Text>
              <Text style={styles.subtitle}>Tuition Payment Confirmation</Text>
            </View>

            {/* Divider */}
            <View style={styles.content}>
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
                <Text style={styles.footerText}>
                  Thank you for using our tuition payment platform.
                </Text>
                <Text style={styles.footerTextSmall}>Powered by PayBlocks</Text>
              </View>
            </View>
          </Page>
        )
      )}
    </Document>
  );

  return (
    <div className="w-full">
      <Button>
        <PDFDownloadLink
          document={<MyReceipt />}
          fileName={`${new Date().toLocaleString().replace(/[:.,/ ]/g, '_')}` + 'flyer.pdf'}
        >
          {({ blob, url, loading, error }) => (loading ? 'Loading...' : 'download receipt')}
        </PDFDownloadLink>
      </Button>
      {/* {receipt ? (
        <PDFViewer className="w-full h-2/3">
          <MyReceipt />
        </PDFViewer>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
}
