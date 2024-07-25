// 'use client';

import * as utility from '@/actions/utils';
import { useEffect, useState } from 'react';

type FormViewPageProps = {
  params: {
    formId: string;
  }
};

async function getExpenseFormBody(formId: string ) {
    var formData = await utility.getESBodyData(formId)
    var itemData = await utility.getESBodyItems(formId)
    var itemTotal = 0

    if(itemData){
        for(let i = 0; i < itemData.length; i++){
            itemTotal += itemData[i].item_amount
        }
    }
    if(formData && itemData){
        return (
            <>
                <div className='form-items-ES'>
                        <table>
                        <tbody>
                            <tr>
                                <td><u>Item</u></td>
                                <td><u>Units</u></td>
                                <td><u>Per Unit Price</u></td>
                                <td><u>Amount</u></td>
                            </tr>
                            {itemData.map(item => (
                                <tr>
                                    <td>{item.item_name}</td>
                                    <td>{item.item_units}</td>
                                    <td>{item.item_price.toFixed(2)}</td>
                                    <td>{item.item_amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="form-total">
                        <table>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Total</b></td>
                                    <td>{itemTotal.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br />
                {formData.map(data => (
                    <div className="form-info">
                        <div className="form-info-title">
                            {data.message}
                        </div>
                        <div className="form-info-description">
                            {data.description}
                            <underline />
                        </div>
                    </div>
                ))}
            </>
        );
    }
}

async function getRevenueFormBody(formId: string) {
    var formData = await utility.getRSBodyData(formId)
    var itemData = await utility.getRSBodyItems(formId)
    var itemTotal = 0

    if(itemData){
        for(let i = 0; i < itemData.length; i++){
            itemTotal += itemData[i].item_amount
        }
    }
    if(formData && itemData){
        return (
            <>
                <div className='form-items-RS'>
                        <table>
                        <tbody>
                            <tr>
                                <td><u>Date</u></td>
                                <td><u>Items</u></td>
                                <td><u>Payment Details</u></td>
                                <td><u>Amount</u></td>
                            </tr>
                            {itemData.map(item => (
                                <tr>
                                    <td>{item.item_date}</td>
                                    <td>{item.item_name}</td>
                                    <td>{item.item_payment_details}</td>
                                    <td>{item.item_amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="form-total">
                        <table>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Total</b></td>
                                    <td>{itemTotal.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br />
                {formData.map(data => (
                    <div className="form-info">
                        <div className="form-info-title">
                            {data.message}
                        </div>
                        <div className="form-info-description">
                            {data.description}
                            <underline />
                        </div>
                    </div>
                ))}
            </>
        );
    }
}

async function getAISFFormBody(formId: string) {
    /*
    return (
        <>
          {formData.map(data =>(
              <div className="form-info">
                  <div className="form-info-title">
                      {data.message}
                  </div>
                  <div className="form-info-description">
                      <u>{data.description}</u>
                      <line/>
                  </div>
              </div>
          ))}
        </>
      );
    */
}

async function getFundTransferFormBody(formId: string) {

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
    
    return (
      <>
        {formData.map(data =>(
            <div className="form-info">
                <div className="form-info-title">
                    {data.message}
                </div>
                <div className="form-info-description">
                    <u>{data.description}</u>
                    <line/>
                </div>
            </div>
        ))}
      </>
    );
}

const FormViewPage = async ({
params: {formId}
}: FormViewPageProps) => {
    const bodyComponent = await getFormBody(formId);

//   const [bodyComponent, setBodyComponent] = useState<any>(null);

  console.log("Fetching FormID")

//   useEffect(() => {
//     async function doFetch() {
//       const res = await getFormBody(formId)
//       setBodyComponent(res);
//     }

//     doFetch();
//   }, [formId]);

  console.log("Generating Body")

    async function getFormBody(formId: string) {
        switch (formId.slice(0, 5)) {
            case 'expst':
                return await getExpenseFormBody(formId);
            
            case 'revst':
                return getRevenueFormBody(formId);

            case 'actin':
                return getAISFFormBody(formId);

            case 'fndtr':
                return getFundTransferFormBody(formId);

            default:
                throw new Error('Invalid form type received!');
        }
    }

    console.log("Getting Header")
  // TODO: Put PDF code here.
  var formDetail = await utility.getFormHeaderData(formId)

  console.log("Getting Footer")

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
            {bodyComponent!}
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
