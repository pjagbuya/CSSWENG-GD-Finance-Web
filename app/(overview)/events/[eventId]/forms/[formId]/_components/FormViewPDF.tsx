import * as utility from '@/actions/utils';
import { renderToString } from 'react-dom/server';
import { renderToStaticMarkup } from 'react-dom/server';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import jsPDF from 'jspdf';

type FormViewPageProps = {
  formId: string;
};

const scale = 1;
const styles: any = {
  form: {
    display: 'flex',
    width: `${1920 / scale}px`,
    flexDirection: 'column',
  },
  formHeader: {
    display: 'flex',
    width: `${1920 / scale}px`,
    height: `${480 / scale}px`,
    flexDirection: 'row',
  },
  formLogo: {
    height: `${480 / scale}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formDetails: {
    marginLeft: `${10 / scale}px`,
    fontSize: `${36 / scale}px`,
  },
  formMain: {
    display: 'flex',
    flexDirection: 'column',
    width: `${1920 / scale}px`,
    fontSize: `${36 / scale}px`,
  },
  formFooter: {
    display: 'flex',
    flexDirection: 'row',
    width: `${1920 / scale}px`,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  staffSignature: {
    display: 'flex',
    flexDirection: 'column',
    width: `${860 / scale}px`,
    fontSize: `${36 / scale}px`,
    marginTop: `${30 / scale}px`,
    marginBottom: `${30 / scale}px`,
  },
  signatureLine: {
    display: 'block',
    height: `${200 / scale}px`,
    border: '0',
    borderBottom: '1px solid black',
  },
  line: {
    display: 'block',
    height: `${5 / scale}px`,
    border: '0',
    borderTop: `${5 / scale}px solid black`,
    margin: `${1 / scale}em 0`,
    padding: '0',
  },
  underline: {
    borderBottom: `${3 / scale}px solid black`, // No need to divide by 3, it remains the same
    width: '33%',
    top: '-10px',
    display: 'block',
    position: 'relative',
  },
};

export const pdfGenerate = (
  reactElement: React.ReactElement,
  filename: string,
) => {
  const htmlString = renderToString(reactElement);
  // Function to generate PDF
  const generatePDF = (html: string) => {
    const doc = new jsPDF();
    doc.html(html, {
      callback: function (doc) {
        doc.save(filename);
      },
      x: 10,
      y: 10,
      width: 190, // Adjust width according to your page
      windowWidth: 500, // Adjust based on the actual width of your content
    });
    format: 'a4';
  };

  // Generate and download PDF
  generatePDF(htmlString);
};

const FormViewPDF = ({ formId }: FormViewPageProps) => {
  // TODO: Put PDF code here.
  var formDetail = {
    academicYear: 'YEAR1102-1103',
    formType: 'Fund Transfer Form',
    formCode: 'FT-001-0001-001',
  };

  var formData = [
    {
      message: 'Description/Reason:',
      description: 'Trade of RMA70-12 and Oriron Blocks',
    },
    {
      message: 'Transferred amount:',
      description: '480,000 LMD',
    },
    {
      message: 'Transferred from:',
      description: 'Lungmen',
    },
    {
      message: 'Transferred to:',
      description: 'Rhodes Island',
    },
    {
      message: 'Transferred on:',
      description: 'March 1102',
    },
    {
      message: 'Receipt link:',
      description:
        'https://docs.google.com/spreadsheets/d/1zYc2JU46X0XWmV7s1503bN4feRdOMa1eehrTQ2jGaiE/edit?pli=1#gid=890953453',
    },
  ];
  var staffData = [
    {
      id: 1,
      message: 'Prepared By:',
      name: "Dr. Kal'tsit",
      position: 'Rhodes Island Pharmaceuticals Oripathy Lead Researcher',
    },
    {
      id: 2,
      message: 'Certified By:',
      name: 'Dokutah',
      position: 'Rhodes Island Pharmaceuticals Strategist In Command',
    },
    {
      id: 3,
      message: 'Noted By:',
      name: 'Amiya',
      position: 'Rhodes Island Pharmaceuticals Leader',
    },
    {
      id: 4,
      message: 'Noted By:',
      name: 'Logos',
      position: 'Rhodes Island Pharmaceuticals Elite Operator',
    },
    {
      id: 5,
      message: 'Noted By:',
      name: 'Rosmontis',
      position: 'Rhodes Island Pharmaceuticals Elite Operator',
    },
  ];

  return (
    <div id="form-proper" className="form" style={styles.form}>
      <div className="form-header" style={styles.formHeader}>
        <div className="form-logo" style={styles.formLogo}>
          <img className="logo" src="/icons/Logo.png" />
        </div>
        <div className="form-details" style={styles.formDetails}>
          <table>
            <tbody>
              <tr>
                <td>
                  <b>Google Developers Student Clubs</b>
                </td>
              </tr>
              <tr>
                <td>
                  <b>De La Salle University</b>
                </td>
              </tr>
              <tr>
                <td>{formDetail.academicYear}</td>
              </tr>
              <tr>
                <td>{/* Additional form details */}</td>
              </tr>
              <tr>
                <td>{formDetail.formType}</td>
              </tr>
              <tr>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td>Report Code:</td>
                        <td>{formDetail.formCode}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr style={styles.line} />
      <div className="form-main" style={styles.formMain}>
        {/* Main form content */}
      </div>
      <hr style={styles.line} />
      <div className="form-footer" style={styles.formFooter}>
        {staffData.map(staff => (
          <div className="staff-signature" key={staff.id}>
            {staff.message}
            <div className="signature-line" style={styles.signatureLine}></div>
            <div className="staff-details">
              <b>{staff.name}</b>
              <br />
              {staff.position}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormViewPDF;
