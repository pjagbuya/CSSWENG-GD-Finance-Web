import * as utility from '@/actions/utils';
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

type FormViewPageProps = {
  formId: string;
};

const styles: any = {
  form: {
    display: 'flex',
    width: '1920px',
    flexDirection: 'column',
  },
  formHeader: {
    display: 'flex',
    width: '1920px',
    height: '480px',
    flexDirection: 'row',
  },
  formLogo: {
    height: '480px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '1050px',
    height: '400px',
  },
  formDetails: {
    height: '480px',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: '36px',
  },
  formDetailsTable: {
    width: '870px',
  },
  formDetailsTableRow: {
    height: '60px',
    justifyContent: 'center',
    textAlign: 'center',
  },
  formDetailsTableCell: {
    width: '50%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  formMain: {
    display: 'flex',
    flexDirection: 'column',
    width: '1920px',
    fontSize: '36px',
  },
  formMainInfo: {
    display: 'flex',
    flexDirection: 'row',
    width: '1900px',
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: '30px',
    marginBottom: '30px',
  },
  formMainInfoTitle: {
    margin: '5px',
    width: '390px',
  },
  formMainInfoDescription: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '5px',
    width: '1490px',
  },
  formFooter: {
    display: 'flex',
    flexDirection: 'row',
    width: '1920px',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  staffSignature: {
    display: 'flex',
    flexDirection: 'column',
    width: '860px',
    fontSize: '36px',
    marginTop: '30px',
    marginBottom: '30px',
  },
  staffDetails: {
    textAlign: 'center',
  },
  signatureLine: {
    display: 'block',
    height: '200px',
    border: '0',
    borderBottom: '1px solid black',
  },
  line: {
    display: 'block',
    height: '5px',
    border: '0',
    borderTop: '5px solid black',
    margin: '1em 0',
    padding: '0',
  },
  underline: {
    borderBottom: '3px solid black',
    width: '100%',
    top: '-10px',
    display: 'block',
    position: 'relative',
  },
};


export const generatePdf = (reactElement: React.ReactElement, filename: string) => {
  const htmlString = renderToStaticMarkup(reactElement);

  const pdfDoc = htmlToPdfmake(htmlString);

  const documentDefinition = { content: pdfDoc };

  pdfMake.createPdf(documentDefinition).download(filename);
};

const FormViewPDF = ({
  formId
}: FormViewPageProps) => {
  // TODO: Put PDF code here.
  var formDetail =
  {
    academicYear: "YEAR1102-1103",
    formType: "Fund Transfer Form",
    formCode: "FT-001-0001-001"
  }

  var formData = [
    {
      message: "Description/Reason:",
      description: 'Trade of RMA70-12 and Oriron Blocks'
    },
    {
      message: "Transferred amount:",
      description: '480,000 LMD'
    },
    {
      message: "Transferred from:",
      description: 'Lungmen'
    },
    {
      message: "Transferred to:",
      description: 'Rhodes Island'
    },
    {
      message: "Transferred on:",
      description: 'March 1102'
    },
    {
      message: "Receipt link:",
      description: 'https://docs.google.com/spreadsheets/d/1zYc2JU46X0XWmV7s1503bN4feRdOMa1eehrTQ2jGaiE/edit?pli=1#gid=890953453'
    }
  ]
  var staffData = [
    {
        id: 1,
        message: 'Prepared By:',
        name: "Dr. Kal'tsit",
        position: 'Rhodes Island Pharmaceuticals Oripathy Lead Researcher'
    },
    {
        id: 2,
        message: 'Certified By:',
        name: 'Dokutah',
        position: 'Rhodes Island Pharmaceuticals Strategist In Command'
    },
    {
        id: 3,
        message: 'Noted By:',
        name: 'Amiya',
        position: 'Rhodes Island Pharmaceuticals Leader'
    },
    {
        id: 4,
        message: 'Noted By:',
        name: 'Logos',
        position: 'Rhodes Island Pharmaceuticals Elite Operator'
    },
    {
        id: 5,
        message: 'Noted By:',
        name: 'Rosmontis',
        position: 'Rhodes Island Pharmaceuticals Elite Operator'
    }
]

  return (
    <div className="form" style={styles.form}>
      <div className="form-header" style={styles.formHeader}>
        <div className="form-logo" style={styles.formLogo}>
          {/* <img className="logo" src="/icons/Logo.png" /> */}
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
                <td>
                  {formDetail.academicYear}
                </td>
              </tr>
              <tr>
                <td>
                  {/* Additional form details */}
                </td>
              </tr>
              <tr>
                <td>
                  {formDetail.formType}
                </td>
              </tr>
              <tr>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          Report Code:
                        </td>
                        <td>
                          {formDetail.formCode}
                        </td>
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
