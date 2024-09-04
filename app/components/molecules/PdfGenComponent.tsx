"use client";

import Image from "next/image";
import {
  Text,
  View,
  PDFDownloadLink,
  Document,
  Page,
  StyleSheet,
} from "@react-pdf/renderer";
import { useSectionData } from "@/app/contexts/SectionDataContext";
import { SectionData } from "@/types/components/main";

/**
 * Props for the Test component
 * @interface TestProps
 * @property {SectionData} sectionSelectedData - The selected section data
 */
interface TestProps {
  sectionSelectedData: SectionData;
}

/**
 * Test component for generating PDF content
 * @param {TestProps} props - The component props
 * @returns {JSX.Element} The PDF document structure
 */
const Test = ({ sectionSelectedData }: TestProps): JSX.Element => {
  // Define styles for PDF content
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: "#FFFFFF",
    },
    pageTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 20,
      textAlign: "center",
      textTransform: "uppercase",
    },
    header: {
      marginBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: "#333333",
      paddingBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#000000",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: "#666666",
      marginBottom: 8,
      fontStyle: "italic",
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 10,
    },
    paragraph: {
      fontSize: 12,
      color: "#000000",
      lineHeight: 1.5,
      marginBottom: 8,
    },
    flashcard: {
      marginBottom: 15,
      padding: 10,
      backgroundColor: "#F0F0F0",
      borderRadius: 4,
    },
    flashcardQuestion: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 5,
    },
    flashcardAnswer: {
      fontSize: 12,
      fontStyle: "italic",
    },
    keyword: {
      flexDirection: "row",
      marginBottom: 5,
    },
    keywordTitle: {
      fontSize: 12,
      fontWeight: "bold",
      marginRight: 5,
    },
    keywordDescription: {
      fontSize: 12,
      flex: 1,
    },
    keyTermsSection: {
      marginBottom: 20,
    },
    keyTermsTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#CCCCCC",
      paddingBottom: 5,
    },
    keyTermsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    keyTermItem: {
      width: "48%",
      marginBottom: 10,
      padding: 8,
      backgroundColor: "#F9F9F9",
      borderRadius: 4,
      borderLeftWidth: 3,
      borderLeftColor: "#333333",
    },
    keyTermTitle: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 3,
    },
    keyTermDescription: {
      fontSize: 10,
      color: "#666666",
    },
    studySheetSection: {
      marginBottom: 30,
      borderRadius: 8,
      padding: 20,
    },
    studySheetTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#1A1A1A",
      marginBottom: 15,
      borderBottomWidth: 2,
      borderBottomColor: "#A9A9A9",
      paddingBottom: 8,
    },
    studySheetSubsection: {
      marginBottom: 20,
    },
    studySheetSubtitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#2C3E50",
      marginBottom: 8,
    },
    studySheetContent: {
      marginBottom: 15,
      backgroundColor: "#FFFFFF",
      borderRadius: 6,
      padding: 10,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    studySheetContentTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#2C3E50",
      marginBottom: 5,
    },
    studySheetContentDescription: {
      fontSize: 12,
      color: "#34495E",
      marginBottom: 4,
      lineHeight: 1.4,
    },
    studySheetContentExample: {
      fontSize: 11,
      color: "#7F8C8D",
      fontStyle: "italic",
      backgroundColor: "#ECF0F1",
      padding: 5,
      borderRadius: 4,
    },
    footer: {
      position: "absolute",
      bottom: 20,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "#95A5A6",
      fontSize: 9,
      fontStyle: "italic",
    },
    flowchartSection: {
      marginBottom: 30,
    },
    flowchartTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#1A1A1A",
      marginBottom: 15,
      borderBottomWidth: 2,
      borderBottomColor: "#A9A9A9",
      paddingBottom: 8,
    },
    flowchartStep: {
      marginBottom: 15,
      paddingLeft: 16,
      position: "relative",
    },
    flowchartStepTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 5,
    },
    flowchartStepDescription: {
      fontSize: 12,
      color: "#34495E",
      marginBottom: 4,
      lineHeight: 1.4,
    },
    flowchartStepExample: {
      fontSize: 11,
      color: "#7F8C8D",
      fontStyle: "italic",
      backgroundColor: "#ECF0F1",
      padding: 5,
      borderRadius: 4,
      marginTop: 4,
    },
  });

  return (
    <Document>
      {/* Summary Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageTitle}>Summary</Text>
        <View style={styles.header}>
          <Text style={styles.title}>
            {sectionSelectedData.summaryData?.title}
          </Text>
          <Text style={styles.subtitle}>
            {sectionSelectedData.summaryData?.subtitle}
          </Text>
        </View>
        <View style={styles.section}>
          {sectionSelectedData.summaryData?.paragraphs.map(
            (paragraph, index) => (
              <Text key={index} style={styles.paragraph}>
                {paragraph.replace(/<\/?[^>]+(>|$)/g, "")}
              </Text>
            )
          )}
        </View>
        <Text style={styles.footer}>
          https://gnoseek.vercel.app | Thanks for downloading!
        </Text>
      </Page>

      {/* Key Terms Page */}
      {sectionSelectedData.keywordsData && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.pageTitle}>Key Terms</Text>
          <View style={styles.keyTermsSection}>
            <Text style={styles.keyTermsTitle}>Key Terms</Text>
            <View style={styles.keyTermsGrid}>
              {sectionSelectedData.keywordsData?.keywords
                .slice(0, 10)
                .map((keyword, index) => (
                  <View key={index} style={styles.keyTermItem}>
                    <Text style={styles.keyTermTitle}>{keyword.title}</Text>
                    <Text style={styles.keyTermDescription}>
                      {keyword.description}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
          <Text style={styles.footer}>
            https://gnoseek.vercel.app | Thanks for downloading!
          </Text>
        </Page>
      )}

      {/* Flowchart Page */}
      {sectionSelectedData.flowchartData && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.pageTitle}>Process Overview</Text>
          <View style={styles.flowchartSection}>
            <Text style={styles.flowchartTitle}>
              {sectionSelectedData.flowchartData.title}
            </Text>
            {sectionSelectedData.flowchartData.steps.map((step, index) => (
              <View key={index} style={styles.flowchartStep}>
                <Text style={styles.flowchartStepTitle}>{step.step}</Text>
                <Text style={styles.flowchartStepDescription}>
                  {step.description}
                </Text>
                {step.example && (
                  <Text style={styles.flowchartStepExample}>
                    Example: {step.example}
                  </Text>
                )}
              </View>
            ))}
          </View>
          <Text style={styles.footer}>
            https://gnoseek.vercel.app | Thanks for downloading!
          </Text>
        </Page>
      )}

      {/* Study Sheet Page */}
      {sectionSelectedData.studySheetData && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.pageTitle}>Study Sheet</Text>
          <View style={styles.studySheetSection}>
            <Text style={styles.studySheetTitle}>Study Sheet</Text>
            {sectionSelectedData.studySheetData?.sections.map(
              (section, sectionIndex) => (
                <View key={sectionIndex} style={styles.studySheetSubsection}>
                  <Text style={styles.studySheetSubtitle}>{section.title}</Text>
                  {section.content.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.studySheetContent}>
                      <Text style={styles.studySheetContentTitle}>
                        {item.title}
                      </Text>
                      <Text style={styles.studySheetContentDescription}>
                        {item.description}
                      </Text>
                      <Text style={styles.studySheetContentExample}>
                        Example: {item.example}
                      </Text>
                    </View>
                  ))}
                </View>
              )
            )}
          </View>
          <Text style={styles.footer}>
            https://gnoseek.vercel.app | Thanks for downloading!
          </Text>
        </Page>
      )}
    </Document>
  );
};

/**
 * PdfGenComponent for generating and downloading PDF
 * @returns {JSX.Element} The PDF download link component
 */
const PdfGenComponent = () => {
  const { sectionSelectedData } = useSectionData();

  return (
    <PDFDownloadLink
      document={<Test sectionSelectedData={sectionSelectedData} />}
      fileName={`gnoseek_summary.pdf`}
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          "Generating PDF..."
        ) : (
          <Image
            src={"/icons/pdf.svg"}
            alt="PDF"
            width={32}
            height={32}
            className="cursor-pointer"
          />
        )
      }
    </PDFDownloadLink>
  );
};

export default PdfGenComponent;
