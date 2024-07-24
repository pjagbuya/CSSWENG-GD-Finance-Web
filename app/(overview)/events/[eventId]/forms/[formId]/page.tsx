import * as utility from '@/actions/utils';

type FormViewPageProps = {
    formId: string;
};

const FormViewPage = async ({
    formId
}: FormViewPageProps) => {
  // TODO: Put PDF code here.
  var formDetail =
    {
        academicYear : "YEAR1102-1103",
        formType : "Fund Transfer Form",
        formCode : "FT-001-0001-001"
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

    var staffData = await utility.getFormFooterData(formId)
  
    return (
      <div className="form">
        <div className="form-header">
            <div className="form-logo">
                <img className="logo" src="/icons/Logo.png"/>
            </div>
            <div className="form-details">
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
        <line/>
        <div className="form-main">

        </div>
        <line/>
        <div className="form-footer">
            {staffData.map(staff =>(
                <div className="staff-signature">
                {staff.message}
                <div className="signature-line">
                </div>
                <div className="staff-details">
                    <b>{staff.name}</b>
                    <br/>
                    {staff.position}
                </div>
            </div>
            ))}
        </div>
    </div>
  );
  
};

export default FormViewPage;
