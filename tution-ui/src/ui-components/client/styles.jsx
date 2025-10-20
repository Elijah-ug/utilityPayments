import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#f9f9f9',
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    textAlign: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  subtitle: {
    fontSize: 17,
    color: '#555',
  },

  section: {
    flexDirection: 'column',
    gap: '20px',
    fontSize: 13,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: 8,
  },
  label: {
    color: '#111827',
    fontWeight: 'bold',
  },
  value: {
    color: '#374151',
  },

  cleared: {
    color: '#16a34a',
    fontWeight: 'bold',
  },
  pending: {
    color: '#dc2626',
    fontWeight: 'bold',
  },

  footer: {
    paddingTop: 10,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#555',
  },
  footerTextSmall: {
    fontSize: 9,
    color: '#777',
  },
});
